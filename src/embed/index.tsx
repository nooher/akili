// index.ts — the public mount API for the embeddable Akili widget.
//
// Two ways to use it:
//   1. As an ES module in a React (or any) host:
//        import { mountAkili } from '@laetoli/akili/embed';
//        const w = mountAkili();          // floats bottom-right
//        // …later: w.unmount();
//   2. As a standalone <script> (IIFE/UMD build, see vite.embed.config.ts):
//        <script src="akili-widget.iife.js"></script>
//        <script>Akili.mount();</script>
//
// The widget is fully sovereign + offline: the Akili engine is bundled in, so
// once the script has loaded nothing is fetched and no data leaves the page.

import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { AkiliWidget, type AkiliWidgetOptions } from './widget';
import { WIDGET_STYLE_ID, widgetCss } from './styles';

export type { AkiliWidgetOptions } from './widget';
export { AkiliWidget } from './widget';

/** Handle returned by mountAkili — call unmount() to tear the widget down. */
export interface AkiliWidgetHandle {
  unmount(): void;
}

const CONTAINER_ATTR = 'data-akili-widget';

/** Inject the widget's scoped stylesheet once per document. */
function ensureStyles(doc: Document): void {
  if (doc.getElementById(WIDGET_STYLE_ID)) return;
  const style = doc.createElement('style');
  style.id = WIDGET_STYLE_ID;
  style.textContent = widgetCss;
  doc.head.appendChild(style);
}

/** Resolve the host element: an element, a selector, or a fresh container. */
function resolveContainer(
  target: HTMLElement | string | undefined,
  doc: Document,
): HTMLElement {
  if (target instanceof HTMLElement) return target;
  if (typeof target === 'string') {
    const el = doc.querySelector<HTMLElement>(target);
    if (!el) throw new Error(`Akili: lengo "${target}" halikupatikana.`);
    return el;
  }
  // No target → create our own container appended to <body>.
  const el = doc.createElement('div');
  el.setAttribute(CONTAINER_ATTR, '');
  doc.body.appendChild(el);
  return el;
}

/**
 * Mount the floating Akili assistant.
 *
 * @param target  An element, a CSS selector, or omitted (a container is created
 *                and appended to <body>).
 * @param opts    Optional `{ lang, position }`.
 * @returns       A handle with `unmount()`.
 */
export function mountAkili(
  target?: HTMLElement | string,
  opts: AkiliWidgetOptions = {},
): AkiliWidgetHandle {
  if (typeof document === 'undefined') {
    throw new Error('Akili: mountAkili inahitaji mazingira ya kivinjari (DOM).');
  }
  const doc = document;
  ensureStyles(doc);

  const container = resolveContainer(target, doc);
  // We created the container ourselves only when it carries our marker AND no
  // explicit target was passed — in that case we own its removal on unmount.
  const ownsContainer = target === undefined;

  const root: Root = createRoot(container);
  root.render(
    <StrictMode>
      <AkiliWidget {...opts} />
    </StrictMode>,
  );

  let unmounted = false;
  return {
    unmount() {
      if (unmounted) return;
      unmounted = true;
      root.unmount();
      if (ownsContainer && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    },
  };
}

// ── Global for <script>-tag usage ──────────────────────────────────────────────
// When this bundle is loaded as an IIFE/UMD, attach a friendly global so a plain
// HTML page can call Akili.mount() with no module system.

export const Akili = { mount: mountAkili };

declare global {
  interface Window {
    Akili?: { mount: typeof mountAkili };
  }
}

if (typeof window !== 'undefined') {
  window.Akili = Akili;
}
