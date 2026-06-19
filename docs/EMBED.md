# Embedding Akili

Drop Laetoli's sovereign Swahili AI assistant into any web app — THOS, Kasuku,
the gov platforms, or laetoli.tz — with **one script tag** or **one import**.
The Akili engine, React, and the widget's own scoped CSS are all bundled in, so
once the script has loaded the assistant runs **fully offline**: nothing is
fetched and no data ever leaves the page.

The widget renders a floating launcher (the Akili mark) in a corner that opens a
compact chat panel. Ask anything in Swahili — afya, fasihi, lugha, hesabu (SNIL)
— and Akili routes to the right domain expert, showing the domain badge,
confidence, sources, and any SNIL code/output.

---

## 1. Plain HTML page (`<script>` tag)

Build the standalone bundle, then load the IIFE and call `Akili.mount()`:

```bash
npm run build:embed   # → dist-embed/akili-widget.iife.js
```

```html
<script src="/path/to/akili-widget.iife.js"></script>
<script>
  Akili.mount(); // floats bottom-right, Swahili
</script>
```

The IIFE bundle defines the global `window.Akili = { mount }`. No module system,
framework, or peer dependency is required — React is bundled in.

See [`embed.html`](../embed.html) at the repo root for a runnable demo.

## 2. ES module / React host

Any host that uses a bundler can import the mount API directly:

```ts
import { mountAkili } from '@laetoli/akili/embed';
// (or, in this repo, from 'src/embed')

const widget = mountAkili();          // appends its own container to <body>

// Later, e.g. on route change or teardown:
widget.unmount();
```

You can also mount into a specific element or selector:

```ts
mountAkili('#assistant-slot', { lang: 'sw' });
mountAkili(document.getElementById('slot')!, { position: 'bottom-left' });
```

> React hosts can alternatively render `<AkiliWidget />` themselves
> (`import { AkiliWidget } from '@laetoli/akili/embed'`). If you do, inject the
> widget CSS once via the exported `widgetCss` string, or just use `mountAkili`,
> which handles styling for you.

---

## API

```ts
function mountAkili(
  target?: HTMLElement | string,
  opts?: {
    lang?: 'sw' | 'en';                       // default 'sw'
    position?: 'bottom-right' | 'bottom-left'; // default 'bottom-right'
  },
): { unmount(): void };
```

- **`target`** — an element, a CSS selector, or omitted. When omitted, a
  container is created and appended to `<body>` (and removed again on
  `unmount()`).
- **`lang`** — answer language and UI microcopy. `'sw'` (default) is
  Swahili-first; `'en'` switches labels to English. The engine still understands
  questions in either language.
- **`position`** — which corner the launcher and panel dock to.

Returns a handle; call **`unmount()`** to tear the widget down.

---

## Build outputs

`npm run build:embed` (config: `vite.embed.config.ts`) emits to `dist-embed/`:

| File                          | Format | Use                                   |
| ----------------------------- | ------ | ------------------------------------- |
| `akili-widget.js`             | ESM    | `import { mountAkili }`               |
| `akili-widget.umd.cjs`        | UMD    | CommonJS / AMD consumers              |
| `akili-widget.iife.js`        | IIFE   | `<script>` tag → `window.Akili.mount` |

CSS is **inlined** into the JS (the widget injects its own `<style>` at mount),
so there is no separate stylesheet to wire up.

`npm run build:all` produces both the console app (`dist/`) and the embed bundle
(`dist-embed/`).

---

## How the CSS is scoped

The widget never touches the host page's global styles and never inherits them:

- All rules are namespaced under a single root class **`.akili-w`** with a
  private custom-property prefix (`--akw-*`). There are no `html`/`body`/`#root`
  selectors and no shared variable names.
- The stylesheet ships as a string (`src/embed/styles.ts`) and is injected once
  per document (idempotent, keyed by an element id) when the widget mounts.
- The launcher/panel are `position: fixed` with a very high `z-index`, so they
  sit above host UI regardless of the host's stacking context.

Palette and visual language mirror the Akili console (warm Tanzania sand/green/
gold, solid fills, **no gradients**), but fully self-contained.

---

## Sovereignty

The Akili engine is pure, deterministic TypeScript with no external LLM and no
network dependency. It is compiled into the embed bundle. After the script
loads, the assistant works with the network disconnected — answers, sources, and
SNIL execution all happen on-device.
