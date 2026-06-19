import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Akili — embeddable widget library build.
//
// Produces a standalone, drop-in bundle of the floating Akili assistant that any
// Laetoli web app (or plain HTML page) can load with one script tag. React and
// the sovereign Akili engine are bundled IN (nothing is externalised) so the
// IIFE works dropped onto a non-React page, and CSS is inlined into the JS (the
// widget injects its own <style>) so there is no separate .css to ship.
//
//   dist-embed/akili-widget.js        ES module  (import { mountAkili })
//   dist-embed/akili-widget.umd.cjs   UMD        (CommonJS / AMD consumers)
//   dist-embed/akili-widget.iife.js   IIFE       (<script> → window.Akili)
//
// Build with:  npm run build:embed
export default defineConfig({
  plugins: [react()],
  define: {
    // The engine guards on import.meta.env.PROD in places; pin to production so
    // the standalone bundle behaves like a release artefact.
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: 'dist-embed',
    emptyOutDir: true,
    // Inline the widget's CSS into the JS (it self-injects a <style>); also
    // avoids emitting any standalone asset that a host would have to wire up.
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'src/embed/index.tsx'),
      name: 'Akili', // global for the IIFE build → window.Akili
      formats: ['es', 'umd', 'iife'],
      fileName: (format) => {
        if (format === 'es') return 'akili-widget.js';
        if (format === 'umd') return 'akili-widget.umd.cjs';
        return 'akili-widget.iife.js';
      },
    },
    // Bundle everything (incl. React) so the IIFE is self-sufficient on a plain
    // HTML page. No `external` → no peer deps required by the standalone path.
    rollupOptions: {},
  },
});
