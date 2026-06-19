# Akili — sovereign Swahili AI

**Akili** is Laetoli's sovereign Swahili AI: **one brain that routes a Kiswahili
question to the right domain expert and answers it offline — no external LLM.**
It unifies the Laetoli engines behind a single conversational surface.

> _"AI ya Kiswahili · huru, bila mtandao."_ — Swahili-first, deterministic,
> runnable on a laptop or a **Raspberry Pi**. Every answer cites its source.

## The experts

| Domain | Expert | Powered by |
|--------|--------|------------|
| **Afya** (health/clinical) | `afya-tibaai` | **TibaAI** — Tanzania STG + WHO + NTLG; 24 conditions, 18 drugs, 14 labs; red-flags + disclaimers preserved |
| **Fasihi** (literature/reading/poetry) | `fasihi-kasuku` | **Kasuku AI** — book discovery, themes/dhamira, poetry (arudhi) |
| **Lugha** (Kiswahili language) | `lugha-kasuku` | **Kasuku AI** — translate, pronounce, grammar, dictionary |
| **SNIL** (compute / code) | `snil-tool` | **[SNIL](https://snil.vercel.app)** — Swahili intent → SNIL code → execution |
| **Jumla** (greetings / about / fallback) | `jumla` | sovereign KB |

The **SNIL tool** is the convergence piece: ask *"Kokotoa wastani wa 10, 20, 30"*
and Akili **writes a SNIL program**, runs it via `@laetoli/snil`, and shows you
both the code and the result (`20`). Natural Kiswahili intent → a Kiswahili
programming language → a verifiable answer. You can also paste SNIL to run it.

## Architecture

```
  Swali la Kiswahili
        │
   ┌────▼─────┐  router: match() every expert → dispatch to the best
   │  AKILI    │  (ties by registration order; jumla is the fallback)
   └────┬─────┘
   ┌────┼───────────┬───────────┬──────────┬─────────┐
   ▼    ▼           ▼           ▼          ▼         ▼
 AFYA  FASIHI      LUGHA       SNIL      JUMLA
 TibaAI Kasuku     Kasuku    SNIL tool   KB/fallback
   └────┴───────────┴───────────┴──────────┴─────────┘
        │  AkiliAnswer { domain, expert, text{sw,en}, confidence, sources, snil? }
        ▼  one answer, Swahili-first, with provenance
```

Every expert implements the same `DomainExpert` interface (`src/akili/types.ts`):
`match(q): number` (0..1) + `answer(q): AkiliAnswer`. Add a domain by adding an
expert to the registry — no router changes. **No network, no LLM** — the TibaAI
and Kasuku engines are vendored in (`src/akili/experts/*/engine/`, see each
`VENDORED.md`) so Akili is fully self-contained and offline.

## Run it
```bash
npm install      # pulls @laetoli/snil from GitHub
npm run dev      # http://localhost:5202
npm test         # vitest
npm run build
```

## Long-term memory (Laetoli Data) — optional, OFF by default

Akili remembers your conversation in the browser (localStorage) and **stays
fully offline by default**. You can optionally give it *long-term vector memory*
backed by [Laetoli Data](https://github.com/nooher/laetoli-data) — every turn is
embedded with a sovereign **local** embedder (`src/lib/embed.ts`, deterministic
384-dim feature hashing, no model/network) and stored as a `documents` row;
before each answer Akili recalls (`hybrid_search`) the most relevant past turns.

To turn it on, point Akili at a **running** Laetoli Data deployment via two
build-time env vars (e.g. in `.env.local`):

```bash
VITE_AKILI_DATA_URL=https://your-laetoli-data.tz   # base URL of the deployment
VITE_AKILI_DATA_ANON_KEY=your-anon-public-key       # its anon/public api key
```

With **neither** set, `getMemory()` returns the plain localStorage store and the
app behaves exactly as before — no network, no Data dependency. The embedding is
always computed locally, so even when Data is on, no model ever runs remotely.
The vector dimension (384) matches Laetoli Data's default `documents.embedding`
column, so the lexical embedder is swappable for a neural one later with no other
change. (Akili vendors a tiny typed fetch client for Data's REST/RPC endpoints —
see `src/lib/dataMemory.ts` — because `@laetoli/data` lives in the repo's
`client/` subdir, which npm can't install via a git sub-path.)

## Use Akili as a library

Akili's engine is a **github-installable package** — drop the sovereign brain into
any Laetoli or third-party app, server, or script. It runs anywhere Node runs
(no browser, no DOM, no network, no external LLM).

```bash
npm i github:nooher/akili
```

Then import from the `akili/engine` subpath (the engine ships as a committed,
self-contained ESM bundle in `pkg/` — `@laetoli/snil` is bundled in, so this is
the only install you need):

```ts
import { askAkili, createAkiliSession } from 'akili/engine';

// one-shot
const a = await askAkili('Dalili za malaria ni zipi?');   // → Afya (TibaAI)
console.log(a.domain, a.expert);                          // 'afya' 'afya-tibaai'
console.log(a.text.sw);                                   // Swahili answer + sources

const b = await askAkili('Kokotoa wastani wa 10, 20, 30'); // → SNIL: code + output
console.log(b.snil?.code, '=>', b.snil?.output);          // SNIL source => '20'

// stateful, context-aware conversation
const session = createAkiliSession();
await session.ask('Habari Akili');
const follow = await session.ask('na malaria je?');        // remembers context
```

`askAkili(q)` returns an `AkiliAnswer` — `{ domain, expert, text: { sw, en? },
confidence, sources, snil? }`. Also exported: `createAkili(experts)` (build a
custom registry), `createAkiliSession(akili?, maxTurns?)`, every individual
expert (`afyaExpert`, `snilExpert`, …), and all the contract types.

> **Offline & sovereign.** Every answer is computed by deterministic, vendored
> TypeScript — the TibaAI and Kasuku engines are baked in, SNIL is bundled. No
> model is ever downloaded or called. The package is byte-for-byte reproducible
> and runs on a laptop or a Raspberry Pi.

Inside this repo you can also import straight from source: `import { askAkili }
from './src/akili'` (or `'./src/node'` for the stable Node re-export).

### Build the package

The shipped artifact lives in `pkg/` and is **committed** (like snil-core's
`dist/`). Rebuild it with:

```bash
npm run build:pkg    # tsup → pkg/index.js (ESM) + pkg/index.d.ts
```

Apache-2.0 · © 2026 Laetoli Ltd · part of the Laetoli sovereign stack
([SNIL](https://snil.vercel.app) · [Laetoli Data](https://laetoli-data.vercel.app)).
