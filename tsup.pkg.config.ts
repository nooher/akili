// tsup.pkg.config.ts — builds Akili's sovereign ENGINE as a github-installable
// library artifact, mirroring how snil-core ships its `dist`.
//
//   npm run build:pkg   →   pkg/index.js (ESM) + pkg/index.d.ts (types)
//
// Entry is the pure-TS engine (src/akili/index.ts): the router + all nine
// experts, with the TibaAI/Kasuku engines vendored in. No browser/DOM code is
// reachable from here (the voice/memory/widget live under src/lib + src/embed
// and are never imported by the engine), so the bundle is Node-importable.
//
// @laetoli/snil is BUNDLED in (noExternal) so a consumer who installs
// `github:nooher/akili` and imports `akili/engine` needs nothing beyond this
// repo — the SNIL runtime travels inside pkg/index.js. The committed pkg/ dir
// IS the shipped artifact (do not gitignore it), exactly like snil-core/dist.

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/akili/index.ts' },
  outDir: 'pkg',
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  // Bundle the SNIL runtime into the artifact so the package is self-contained.
  noExternal: ['@laetoli/snil'],
  // Keep Node built-ins external (the engine uses none, but be explicit).
  platform: 'node',
  target: 'node18',
});
