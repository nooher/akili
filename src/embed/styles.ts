// styles.ts — the embeddable Akili widget's CSS, shipped as a string so the
// widget injects it at mount time. Everything is scoped under `.akili-w` and
// uses an `--akw-` token prefix so the widget neither leaks into nor inherits
// from the host page. Warm Tanzania palette, solid fills only (no gradients).
//
// This mirrors the visual language of src/styles.css but is fully self-contained
// (no global selectors on html/body/#root, no shared custom-property names).

export const WIDGET_STYLE_ID = 'akili-widget-styles';

export const widgetCss = `
.akili-w {
  --akw-sand:        #f3ebdc;
  --akw-sand-soft:   #faf5ea;
  --akw-sand-line:   #e2d6bf;
  --akw-green:       #1f5135;
  --akw-green-deep:  #173d28;
  --akw-green-soft:  #e7efe6;
  --akw-charcoal:    #26221c;
  --akw-ink-soft:    #6b6354;
  --akw-gold:        #c9962f;
  --akw-red:         #b23b2e;
  --akw-red-soft:    #f7e6e2;
  --akw-code-bg:     #211e18;
  --akw-code-ink:    #f0e8d6;
  --akw-d-afya:      #1f5135;
  --akw-d-fasihi:    #8a4d9e;
  --akw-d-lugha:     #2f6f8f;
  --akw-d-snil:      #c9962f;
  --akw-d-jumla:     #6b6354;
  --akw-radius:      14px;
  --akw-radius-s:    9px;
  --akw-mono: "SF Mono", "JetBrains Mono", "Fira Code", ui-monospace, Menlo, Consolas, monospace;
  --akw-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;

  position: fixed;
  bottom: 20px;
  z-index: 2147483000;
  font-family: var(--akw-sans);
  color: var(--akw-charcoal);
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
}
.akili-w--right { right: 20px; }
.akili-w--left  { left: 20px; }

.akili-w *, .akili-w *::before, .akili-w *::after { box-sizing: border-box; }

.akili-w-sr {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}

/* ---------- Launcher ---------- */
.akili-w-launcher {
  position: relative;
  display: flex; align-items: center; justify-content: center;
  width: 58px; height: 58px;
  margin-left: auto;
  border: none; cursor: pointer;
  border-radius: 17px;
  background: var(--akw-green);
  box-shadow: 0 8px 24px -8px rgba(0,0,0,.45);
  transition: transform .08s ease, background .15s ease;
}
.akili-w--left .akili-w-launcher { margin-left: 0; margin-right: auto; }
.akili-w-launcher:hover { background: var(--akw-green-deep); }
.akili-w-launcher:active { transform: translateY(1px); }
.akili-w-launcher-mark {
  width: 26px; height: 26px;
  border-radius: 7px;
  background: var(--akw-gold);
  position: relative;
}
.akili-w-launcher-mark::after {
  content: ""; position: absolute; inset: 7px;
  border-radius: 2px; background: var(--akw-green-deep);
}

/* ---------- Panel ---------- */
.akili-w-panel {
  position: absolute;
  bottom: 70px;
  width: 380px;
  max-width: calc(100vw - 32px);
  height: 560px;
  max-height: calc(100vh - 110px);
  display: flex;
  flex-direction: column;
  background: var(--akw-sand);
  border: 1px solid var(--akw-sand-line);
  border-radius: var(--akw-radius);
  overflow: hidden;
  box-shadow: 0 18px 50px -18px rgba(0,0,0,.5);
}
.akili-w--right .akili-w-panel { right: 0; }
.akili-w--left  .akili-w-panel { left: 0; }

/* ---------- Top bar ---------- */
.akili-w-top {
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px; padding: 12px 14px;
  background: var(--akw-green);
  color: var(--akw-sand-soft);
  border-bottom: 3px solid var(--akw-gold);
  flex: none;
}
.akili-w-brand { display: flex; align-items: center; gap: 11px; }
.akili-w-mark {
  width: 30px; height: 30px; border-radius: 8px;
  background: var(--akw-gold); position: relative; flex: none;
}
.akili-w-mark::after {
  content: ""; position: absolute; inset: 8px;
  border-radius: 3px; background: var(--akw-green-deep);
}
.akili-w-brand h2 {
  margin: 0; font-size: 16px; letter-spacing: .16em; font-weight: 800;
}
.akili-w-brand p { margin: 2px 0 0; font-size: 11px; color: #cfe0cf; }
.akili-w-x {
  display: flex; align-items: center; justify-content: center;
  width: 30px; height: 30px; flex: none;
  border: none; cursor: pointer; border-radius: 8px;
  background: transparent; color: var(--akw-sand-soft);
  transition: background .15s ease;
}
.akili-w-x:hover { background: rgba(255,255,255,.12); }

/* ---------- Stream ---------- */
.akili-w-stream {
  flex: 1; overflow-y: auto; min-height: 0;
  padding: 16px 14px;
  display: flex; flex-direction: column; gap: 14px;
}

/* ---------- Welcome ---------- */
.akili-w-welcome { text-align: left; }
.akili-w-welcome h3 {
  margin: 0 0 6px; font-size: 18px; color: var(--akw-green); font-weight: 700;
}
.akili-w-welcome p {
  margin: 0 0 16px; font-size: 13px; line-height: 1.55; color: var(--akw-ink-soft);
}
.akili-w-starters { display: flex; flex-direction: column; gap: 8px; }
.akili-w-chip {
  display: flex; align-items: center; gap: 10px; text-align: left;
  font: inherit; cursor: pointer;
  background: var(--akw-sand-soft);
  border: 1px solid var(--akw-sand-line);
  border-radius: var(--akw-radius);
  padding: 10px 12px;
  transition: border-color .15s ease, transform .06s ease;
}
.akili-w-chip:hover { border-color: var(--akw-gold); }
.akili-w-chip:active { transform: translateY(1px); }
.akili-w-chip:disabled { opacity: .5; cursor: default; }
.akili-w-chip-text { font-size: 13px; color: var(--akw-charcoal); font-weight: 550; }

/* ---------- Rows ---------- */
.akili-w-row { display: flex; }
.akili-w-row--user { justify-content: flex-end; }
.akili-w-row--akili { justify-content: flex-start; }

.akili-w-bubble--user {
  max-width: 84%;
  background: var(--akw-green);
  color: var(--akw-sand-soft);
  border-radius: var(--akw-radius) var(--akw-radius) 4px var(--akw-radius);
  padding: 10px 13px;
}
.akili-w-bubble--user p { margin: 0; font-size: 13.5px; line-height: 1.5; }
.akili-w-bubble--user p.akili-w-gap { height: 7px; }

/* ---------- Answer card ---------- */
.akili-w-card {
  max-width: 96%; width: 100%;
  background: var(--akw-sand-soft);
  border: 1px solid var(--akw-sand-line);
  border-radius: var(--akw-radius);
  padding: 13px 14px 14px;
}
.akili-w-card-head {
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 10px;
}
.akili-w-expert { font-family: var(--akw-mono); font-size: 11px; color: var(--akw-ink-soft); }

.akili-w-badge {
  display: inline-flex; align-items: center;
  font-size: 11px; font-weight: 700; letter-spacing: .04em;
  color: #fff; background: var(--akw-d-jumla);
  border-radius: 999px; padding: 4px 10px;
}
.akili-w-badge--mini { font-size: 10px; padding: 3px 8px; }
.akili-w-badge--afya   { background: var(--akw-d-afya); }
.akili-w-badge--fasihi { background: var(--akw-d-fasihi); }
.akili-w-badge--lugha  { background: var(--akw-d-lugha); }
.akili-w-badge--snil   { background: var(--akw-d-snil); color: var(--akw-green-deep); }
.akili-w-badge--jumla  { background: var(--akw-d-jumla); }

.akili-w-pill {
  margin-left: auto; font-size: 10.5px; font-weight: 650;
  border-radius: 999px; padding: 3px 9px; border: 1px solid;
}
.akili-w-pill--high   { color: var(--akw-green); background: var(--akw-green-soft); border-color: var(--akw-green); }
.akili-w-pill--medium { color: #8a6a18; background: #f5ead0; border-color: var(--akw-gold); }
.akili-w-pill--low    { color: var(--akw-ink-soft); background: var(--akw-sand); border-color: var(--akw-sand-line); }

.akili-w-answer p { margin: 0; font-size: 13.5px; line-height: 1.6; color: var(--akw-charcoal); }
.akili-w-answer p + p { margin-top: 2px; }
.akili-w-answer-gap { height: 8px; }
.akili-w-warn { color: var(--akw-red); font-weight: 600; }

.akili-w-en { margin-top: 11px; }
.akili-w-toggle {
  font: inherit; font-size: 12px; font-weight: 650;
  color: var(--akw-green); background: transparent; border: none; cursor: pointer;
  padding: 0; text-decoration: underline; text-underline-offset: 3px;
}
.akili-w-toggle:hover { color: var(--akw-green-deep); }
.akili-w-en-body {
  margin-top: 8px; padding: 10px 12px;
  background: var(--akw-sand); border-left: 3px solid var(--akw-sand-line);
  border-radius: var(--akw-radius-s);
}
.akili-w-en-body .akili-w-answer p { font-size: 13px; color: var(--akw-ink-soft); }

.akili-w-sources {
  display: flex; flex-wrap: wrap; gap: 6px;
  margin-top: 12px; padding-top: 11px; border-top: 1px solid var(--akw-sand-line);
}
.akili-w-source {
  font-size: 10.5px; font-weight: 600; color: var(--akw-green);
  background: var(--akw-green-soft); border: 1px solid #cfe0cf;
  border-radius: 7px; padding: 3px 8px;
}

/* ---------- SNIL trace ---------- */
.akili-w-snil { margin-top: 12px; display: flex; flex-direction: column; gap: 9px; }
.akili-w-snil-block { background: var(--akw-code-bg); border-radius: var(--akw-radius-s); overflow: hidden; }
.akili-w-snil-head {
  display: flex; align-items: center; gap: 7px;
  padding: 7px 13px; background: #2c281f; color: #b9ad93;
  font-family: var(--akw-mono); font-size: 11px; letter-spacing: .04em;
  border-bottom: 1px solid #3a3528;
}
.akili-w-snil-dot { width: 8px; height: 8px; border-radius: 2px; background: var(--akw-gold); }
.akili-w-code, .akili-w-out {
  margin: 0; padding: 12px 14px;
  font-family: var(--akw-mono); font-size: 12.5px; line-height: 1.55;
  white-space: pre-wrap; word-break: break-word;
}
.akili-w-code code { color: var(--akw-code-ink); font: inherit; }
.akili-w-out { color: #b7e0c0; }
.akili-w-out--err { color: #f0a59a; }
.akili-w-out--err::before { content: "\\26A0  "; color: var(--akw-red); }

/* ---------- Error card ---------- */
.akili-w-card--error { background: var(--akw-red-soft); border-color: var(--akw-red); }
.akili-w-card--error p { margin: 0; color: var(--akw-red); font-size: 13.5px; line-height: 1.55; }

/* ---------- Thinking ---------- */
.akili-w-thinking {
  display: inline-flex; gap: 5px; align-items: center;
  background: var(--akw-sand-soft); border: 1px solid var(--akw-sand-line);
  border-radius: 999px; padding: 10px 15px;
}
.akili-w-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--akw-green); opacity: .35;
  animation: akili-w-bounce 1.2s infinite ease-in-out;
}
.akili-w-dot:nth-child(2) { animation-delay: .15s; }
.akili-w-dot:nth-child(3) { animation-delay: .3s; }
@keyframes akili-w-bounce {
  0%, 60%, 100% { opacity: .3; transform: translateY(0); }
  30% { opacity: 1; transform: translateY(-3px); }
}
@media (prefers-reduced-motion: reduce) {
  .akili-w-dot { animation: none; opacity: .6; }
}

/* ---------- Composer ---------- */
.akili-w-form {
  flex: none; display: flex; align-items: flex-end; gap: 9px;
  padding: 11px 13px 13px;
  background: var(--akw-sand-soft); border-top: 1px solid var(--akw-sand-line);
}
.akili-w-input {
  flex: 1; font: inherit; font-size: 14px; line-height: 1.5;
  color: var(--akw-charcoal); background: var(--akw-sand);
  border: 1.5px solid var(--akw-sand-line); border-radius: var(--akw-radius);
  padding: 10px 12px; resize: none; min-height: 44px; max-height: 130px;
  outline: none; transition: border-color .15s ease;
}
.akili-w-input:focus { border-color: var(--akw-green); }
.akili-w-input:disabled { opacity: .6; }
.akili-w-send {
  flex: none; font: inherit; font-weight: 700; letter-spacing: .02em;
  cursor: pointer; color: var(--akw-green-deep); background: var(--akw-gold);
  border: none; border-radius: 999px; padding: 11px 18px;
  transition: background .15s ease, transform .06s ease;
}
.akili-w-send:hover:not(:disabled) { background: #d9a73e; }
.akili-w-send:active:not(:disabled) { transform: translateY(1px); }
.akili-w-send:disabled { opacity: .5; cursor: default; }

/* ---------- Focus visibility ---------- */
.akili-w :focus-visible {
  outline: 2px solid var(--akw-gold); outline-offset: 2px; border-radius: 4px;
}

/* ---------- Small screens ---------- */
@media (max-width: 480px) {
  .akili-w { bottom: 14px; }
  .akili-w--right { right: 14px; }
  .akili-w--left  { left: 14px; }
  .akili-w-panel {
    width: calc(100vw - 28px);
    height: calc(100vh - 100px);
  }
  /* 16px input prevents iOS Safari zoom-on-focus */
  .akili-w-input { font-size: 16px; }
}
`;
