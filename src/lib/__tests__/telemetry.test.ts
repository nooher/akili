// telemetry.test.ts — the telemetry seam must be a silent, non-throwing no-op
// when no endpoint is configured (VITE_AKILI_TELEMETRY_URL unset, as in tests).
import { describe, it, expect, vi, afterEach } from 'vitest';
import { track, reportError } from '../telemetry';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('telemetry no-op', () => {
  it('track() does not throw and does not beacon when no URL is set', () => {
    const beacon = vi.fn();
    // sendBeacon may not exist in node; define a spy and ensure it stays unused.
    vi.stubGlobal('navigator', { sendBeacon: beacon });
    expect(() => track('test_event', { a: 1, b: 'x' })).not.toThrow();
    expect(beacon).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it('reportError() does not throw on arbitrary input', () => {
    expect(() => reportError(new Error('boom'))).not.toThrow();
    expect(() => reportError('a string')).not.toThrow();
    expect(() => reportError(null)).not.toThrow();
    expect(() => reportError(undefined)).not.toThrow();
  });

  it('track() tolerates undefined / odd props', () => {
    expect(() => track('e')).not.toThrow();
    // @ts-expect-error — deliberately passing a non-conforming value
    expect(() => track('e', { fn: () => 1, ok: true })).not.toThrow();
  });
});
