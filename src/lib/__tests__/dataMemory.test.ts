import { describe, it, expect, vi } from 'vitest';
import {
  DataMemoryStore,
  createDataClient,
  turnText,
  type DataClientLike,
  type HybridDocument,
  type TurnMetadata,
  type DataResult,
} from '../dataMemory';
import { EMBED_DIM } from '../embed';
import { createMemoryStore, type StoredMsg, type MemorySnapshot } from '../memory';

// A localStorage-like in-memory backing for the local mirror.
function fakeStorage() {
  const map = new Map<string, string>();
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => void map.set(k, v),
    removeItem: (k: string) => void map.delete(k),
  };
}

// A mock Laetoli Data client that records calls.
function mockClient() {
  const inserted: Array<{ content: string; embedding: number[]; metadata: TurnMetadata }> = [];
  const hybridCalls: Array<{ query: string; embedding: number[]; count?: number }> = [];
  let nextHybrid: HybridDocument<TurnMetadata>[] = [];

  const client: DataClientLike = {
    insertDocuments(rows) {
      inserted.push(...rows);
      return Promise.resolve({ data: null, error: null, status: 201 } as DataResult<unknown>);
    },
    hybridSearch(query, embedding, opts) {
      hybridCalls.push({ query, embedding, count: opts?.count });
      return Promise.resolve({ data: nextHybrid, error: null, status: 200 });
    },
  };

  return {
    client,
    inserted,
    hybridCalls,
    setHybridResult: (rows: HybridDocument<TurnMetadata>[]) => {
      nextHybrid = rows;
    },
  };
}

const userMsg = (id: string, text: string): StoredMsg => ({ id, role: 'user', text });
const akiliMsg = (id: string, sw: string): StoredMsg => ({
  id,
  role: 'akili',
  answer: { domain: 'jumla', expert: 'jumla', text: { sw }, confidence: 'high' },
});

describe('turnText', () => {
  it('extracts user/error text and Akili Swahili answer text', () => {
    expect(turnText(userMsg('1', 'Habari'))).toBe('Habari');
    expect(turnText(akiliMsg('2', 'Salama'))).toBe('Salama');
    expect(turnText({ id: '3', role: 'error', text: 'Hitilafu' })).toBe('Hitilafu');
  });
});

describe('DataMemoryStore — save', () => {
  it('writes the transcript to the local mirror', () => {
    const local = createMemoryStore(fakeStorage());
    const { client } = mockClient();
    const store = new DataMemoryStore(client, { session: 's1', local });

    const msgs = [userMsg('a', 'Habari za leo')];
    store.save(msgs);

    const snap = store.load() as MemorySnapshot;
    expect(snap.messages).toHaveLength(1);
    expect(snap.messages[0]).toMatchObject({ id: 'a', role: 'user', text: 'Habari za leo' });
  });

  it('persists each turn to Laetoli Data as a documents row (content + 384-dim embedding + metadata)', () => {
    const local = createMemoryStore(fakeStorage());
    const m = mockClient();
    const store = new DataMemoryStore(m.client, { session: 'sess-x', local });

    store.save([userMsg('a', 'Dalili za malaria'), akiliMsg('b', 'Homa na kichwa')]);

    expect(m.inserted).toHaveLength(2);
    const [first, second] = m.inserted;
    expect(first.content).toBe('Dalili za malaria');
    expect(first.embedding).toHaveLength(EMBED_DIM);
    expect(first.metadata).toMatchObject({ role: 'user', session: 'sess-x', source: 'akili' });
    expect(typeof first.metadata.ts).toBe('string');
    expect(second.content).toBe('Homa na kichwa');
    expect(second.metadata.role).toBe('akili');
  });

  it('does not re-send turns it already shipped (no duplicate rows)', () => {
    const local = createMemoryStore(fakeStorage());
    const m = mockClient();
    const store = new DataMemoryStore(m.client, { session: 's', local });

    store.save([userMsg('a', 'Swali la kwanza')]);
    store.save([userMsg('a', 'Swali la kwanza'), userMsg('b', 'Swali la pili')]);

    expect(m.inserted).toHaveLength(2);
    expect(m.inserted.map((r) => r.content)).toEqual(['Swali la kwanza', 'Swali la pili']);
  });

  it('skips empty-text turns', () => {
    const local = createMemoryStore(fakeStorage());
    const m = mockClient();
    const store = new DataMemoryStore(m.client, { session: 's', local });
    store.save([{ id: 'x', role: 'user', text: '   ' }]);
    expect(m.inserted).toHaveLength(0);
  });

  it('never throws when the Data write fails (chat keeps working)', () => {
    const local = createMemoryStore(fakeStorage());
    const client: DataClientLike = {
      insertDocuments: () => Promise.reject(new Error('network down')),
      hybridSearch: () => Promise.resolve({ data: [], error: null, status: 200 }),
    };
    const store = new DataMemoryStore(client, { session: 's', local });
    expect(() => store.save([userMsg('a', 'Habari')])).not.toThrow();
    // Local mirror still persisted.
    expect((store.load() as MemorySnapshot).messages).toHaveLength(1);
  });
});

describe('DataMemoryStore — recall', () => {
  it('calls hybridSearch with the query + its 384-dim embedding and maps results', async () => {
    const local = createMemoryStore(fakeStorage());
    const m = mockClient();
    m.setHybridResult([
      {
        id: 'doc1',
        content: 'Dalili za malaria ni homa',
        metadata: { role: 'user', ts: '2026-01-01T00:00:00Z', session: 's0', source: 'akili' },
        score: 0.9,
      },
      { id: 'doc2', content: null, metadata: {} as TurnMetadata, score: 0.1 }, // filtered out
    ]);
    const store = new DataMemoryStore(m.client, { session: 's', local });

    const out = await store.recall('malaria', 4);

    expect(m.hybridCalls).toHaveLength(1);
    expect(m.hybridCalls[0].query).toBe('malaria');
    expect(m.hybridCalls[0].embedding).toHaveLength(EMBED_DIM);
    expect(m.hybridCalls[0].count).toBe(4);

    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({
      text: 'Dalili za malaria ni homa',
      role: 'user',
      score: 0.9,
    });
  });

  it('returns [] for an empty query without hitting the network', async () => {
    const local = createMemoryStore(fakeStorage());
    const m = mockClient();
    const store = new DataMemoryStore(m.client, { session: 's', local });
    expect(await store.recall('   ')).toEqual([]);
    expect(m.hybridCalls).toHaveLength(0);
  });

  it('returns [] when the search errors', async () => {
    const local = createMemoryStore(fakeStorage());
    const client: DataClientLike = {
      insertDocuments: () => Promise.resolve({ data: null, error: null, status: 201 }),
      hybridSearch: () =>
        Promise.resolve({ data: null, error: { message: 'boom' }, status: 500 }),
    };
    const store = new DataMemoryStore(client, { session: 's', local });
    expect(await store.recall('chochote')).toEqual([]);
  });
});

describe('DataMemoryStore — clear', () => {
  it('clears the local mirror but keeps long-term memory durable', () => {
    const local = createMemoryStore(fakeStorage());
    const m = mockClient();
    const store = new DataMemoryStore(m.client, { session: 's', local });
    store.save([userMsg('a', 'Habari')]);
    store.clear();
    expect(store.load()).toBeNull();
    // clear() makes no delete call to Laetoli Data.
    expect(m.inserted).toHaveLength(1);
  });
});

describe('createDataClient — vendored thin client wire protocol', () => {
  it('POSTs an insert to /rest/documents with apikey + bearer headers', async () => {
    const fetchMock = vi.fn(async () => new Response('', { status: 201 }));
    const client = createDataClient({
      url: 'https://data.example.tz/',
      anonKey: 'anon-123',
      fetch: fetchMock as unknown as typeof fetch,
    });

    await client.insertDocuments([
      { content: 'x', embedding: [0, 1], metadata: { role: 'user', ts: 't', session: 's', source: 'akili' } },
    ]);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://data.example.tz/rest/documents'); // trailing slash stripped
    expect(init.method).toBe('POST');
    const headers = init.headers as Record<string, string>;
    expect(headers.apikey).toBe('anon-123');
    expect(headers.Authorization).toBe('Bearer anon-123');
  });

  it('POSTs hybrid_search RPC with query + embedding + RRF params', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify([]), { status: 200 }));
    const client = createDataClient({
      url: 'https://data.example.tz',
      anonKey: 'k',
      fetch: fetchMock as unknown as typeof fetch,
    });

    await client.hybridSearch('malaria', [0.1, 0.2], { count: 7 });

    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://data.example.tz/rest/rpc/hybrid_search');
    const body = JSON.parse(init.body as string);
    expect(body.query).toBe('malaria');
    expect(body.query_embedding).toEqual([0.1, 0.2]);
    expect(body.match_count).toBe(7);
    expect(body.filter).toEqual({ source: 'akili' });
  });

  it('folds network failures into a DataResult.error (never throws)', async () => {
    const client = createDataClient({
      url: 'https://x',
      anonKey: 'k',
      fetch: (() => Promise.reject(new Error('offline'))) as unknown as typeof fetch,
    });
    const res = await client.hybridSearch('q', [1]);
    expect(res.error?.code).toBe('fetch_error');
    expect(res.data).toBeNull();
  });
});
