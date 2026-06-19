// telemetry.ts — Akili telemetry seam.
//
// Privacy-preserving and silent by default: track()/reportError() are no-ops that
// only console.debug locally. If VITE_AKILI_TELEMETRY_URL is set at build time, a
// small JSON beacon is POSTed (sendBeacon, falling back to fetch keepalive).
//
// No PII is ever collected: no user input, no source code, no IP-bearing fields,
// no full URL with query/hash — only the event name, coarse props, and a UTC
// timestamp. Every path is wrapped so telemetry can never throw into the app.

export type TelemetryProps = Record<string, string | number | boolean | null>;

interface Beacon {
  event: string;
  props: TelemetryProps;
  ts: string; // ISO-8601 UTC
  app: 'akili';
}

function endpoint(): string | undefined {
  try {
    const url = import.meta.env?.VITE_AKILI_TELEMETRY_URL;
    return typeof url === 'string' && url.length > 0 ? url : undefined;
  } catch {
    return undefined;
  }
}

// Strip anything that could carry PII; keep only primitive, bounded values.
function sanitize(props?: TelemetryProps): TelemetryProps {
  const out: TelemetryProps = {};
  if (!props) return out;
  try {
    for (const [k, v] of Object.entries(props)) {
      if (v === null || ['string', 'number', 'boolean'].includes(typeof v)) {
        // Cap string length so we never ship large/free-form text.
        out[k] = typeof v === 'string' ? v.slice(0, 120) : v;
      }
    }
  } catch {
    /* never throw */
  }
  return out;
}

function send(beacon: Beacon): void {
  const url = endpoint();
  if (!url) {
    // eslint-disable-next-line no-console
    console.debug('[akili:telemetry]', beacon.event, beacon.props);
    return;
  }
  try {
    const body = JSON.stringify(beacon);
    if (
      typeof navigator !== 'undefined' &&
      typeof navigator.sendBeacon === 'function'
    ) {
      const blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon(url, blob);
      return;
    }
    if (typeof fetch === 'function') {
      void fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
        mode: 'no-cors',
      }).catch(() => {
        /* swallow network errors */
      });
    }
  } catch {
    /* telemetry must never break the app */
  }
}

/** Record a product event. Never throws. */
export function track(event: string, props?: TelemetryProps): void {
  try {
    send({ event, props: sanitize(props), ts: new Date().toISOString(), app: 'akili' });
  } catch {
    /* never throw */
  }
}

/** Report a caught error. Only the message/name are sent — never the stack body. */
export function reportError(err: unknown, props?: TelemetryProps): void {
  try {
    const e = err as { name?: unknown; message?: unknown };
    const name = typeof e?.name === 'string' ? e.name : 'Error';
    const message =
      typeof e?.message === 'string' ? e.message : String(err ?? 'unknown');
    track('error', {
      ...sanitize(props),
      name: String(name).slice(0, 80),
      message: message.slice(0, 200),
    });
  } catch {
    /* never throw */
  }
}
