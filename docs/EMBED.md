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

## 1. Plain HTML page — the one-liner

Akili **serves its own widget bundle** from its deployment, so any site can drop
in a single script tag — no build step, no hosting the file yourself:

```html
<script src="https://akili-laetoli.vercel.app/embed/akili-widget.iife.js" defer
        onload="Akili.mount()"></script>
```

That's it. The `defer` + `onload` pair waits for the bundle, then mounts the
floating launcher (bottom-right, Swahili). The IIFE defines the global
`window.Akili = { mount }`; React and the engine are bundled in, so no module
system, framework, or peer dependency is required.

Want the launcher bottom-left, or in English? Call `mount` with options instead:

```html
<script src="https://akili-laetoli.vercel.app/embed/akili-widget.iife.js" defer
        onload="Akili.mount(undefined, { position: 'bottom-left', lang: 'en' })"></script>
```

> **Where the bundle comes from.** A single `npm run build` (what Vercel runs)
> emits **both** the console app (`dist/`) and the widget into `dist/embed/`, so
> the IIFE is published at `/embed/akili-widget.iife.js` on Akili's own origin.
> See [Build outputs](#build-outputs) below.

**Self-test:** this deployment also serves
[`/embed-demo.html`](https://akili-laetoli.vercel.app/embed-demo.html) — a page
that loads the local bundle and mounts it, so you can confirm a fresh build works
end-to-end. The source is [`public/embed-demo.html`](../public/embed-demo.html).

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

`npm run build` runs `tsc -b && vite build && vite build --config
vite.embed.config.ts`, so a **single build** (the one Vercel runs) emits the
console app to `dist/` **and** the widget bundle to `dist/embed/`:

| File                          | Format | Use                                   |
| ----------------------------- | ------ | ------------------------------------- |
| `dist/index.html` (+ assets)  | —      | the Akili console app                 |
| `dist/embed/akili-widget.js`  | ESM    | `import { mountAkili }`               |
| `dist/embed/akili-widget.umd.cjs` | UMD | CommonJS / AMD consumers              |
| `dist/embed/akili-widget.iife.js` | IIFE | `<script>` tag → `window.Akili.mount` |

Because the embed bundle lands **inside** the served `dist/`, it is published on
Akili's own origin at `https://akili-laetoli.vercel.app/embed/akili-widget.iife.js`
— that's what the one-liner above loads.

CSS is **inlined** into the JS (the widget injects its own `<style>` at mount),
so there is no separate stylesheet to wire up.

`npm run build:embed` builds only the widget (config: `vite.embed.config.ts`),
emitting into `dist/embed/` without clearing the rest of `dist/`. (`build:all`
is an alias for `build`.) Both `dist/` and `dist-embed/` are gitignored.

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
