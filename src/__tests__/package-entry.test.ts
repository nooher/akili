// package-entry.test.ts — guards the LIBRARY surface of Akili.
//
// The github-installable engine package exposes the engine via the `akili/engine`
// subpath, which maps to a build of src/akili/index.ts; src/node.ts is the stable
// Node re-export of that same module. This test asserts that the package entry
// resolves the experts and that askAkili actually routes — e.g. math → SNIL — so
// the shipped artifact's contract can't silently regress.

import { describe, it, expect } from 'vitest';
import {
  askAkili,
  createAkili,
  createAkiliSession,
  defaultExperts,
  afyaExpert,
  snilExpert,
} from '../node';

describe('package entry (akili/engine via src/node)', () => {
  it('re-exports the full expert registry and entry points', () => {
    expect(typeof askAkili).toBe('function');
    expect(typeof createAkili).toBe('function');
    expect(typeof createAkiliSession).toBe('function');
    expect(Array.isArray(defaultExperts)).toBe(true);
    // ten experts (afya, fasihi, lugha, sheria, kilimo, elimu, biashara, logistiki, snil, jumla)
    expect(defaultExperts.length).toBe(10);
    expect(defaultExperts).toContain(afyaExpert);
    expect(defaultExperts).toContain(snilExpert);
  });

  it('routes a math query through the SNIL expert and runs it', async () => {
    const a = await askAkili('kokotoa 2 + 3');
    expect(a.domain).toBe('snil');
    expect(a.expert).toBe(snilExpert.id);
    expect(a.snil?.code).toContain('2 + 3');
    expect(a.snil?.output.trim()).toBe('5');
  });

  it('routes a health query to the Afya/TibaAI expert', async () => {
    const a = await askAkili('dalili za malaria');
    expect(a.domain).toBe('afya');
    expect(a.expert).toBe(afyaExpert.id);
    expect(a.text.sw.length).toBeGreaterThan(0);
  });
});
