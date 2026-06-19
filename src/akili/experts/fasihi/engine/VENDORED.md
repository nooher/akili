# Vendored Kasuku AI core (Fasihi + Lugha)

This folder is a **sovereign, offline copy** of Kasuku's AI engine, vendored into
Akili so the Fasihi (literature) and Lugha (Kiswahili language) domain experts
run without any dependency on the Kasuku app or any external LLM/network.

## Origin

- `kasuku/src/lib/ai/` → `engine/ai/` — `index.ts` (askKasuku), `nlu.ts`,
  `personas.ts`, `ushairi.ts`, `fasihi.ts`, `catalog.ts`
- `kasuku/src/lib/companion/` → `engine/companion/` — `router.ts`, `knowledge.ts`
- `kasuku/src/lib/swahili/` → `engine/swahili/` — `phonemize.ts`, `exceptions.ts`
- `kasuku/src/lib/learn/` → `engine/learn/` — `morph.ts`, `translate.ts`,
  `lexfrpt.ts`, and a slimmed `types.ts` (Bridge/TransLang only)
- `kasuku/src/lib/lang/` → `engine/lang/` — `dictionary.ts`, `wold_sw.ts`
  (WOLD Swahili vocabulary, CC-BY — data, not book text)

`askKasuku(query)` is the single entry point; both experts call it.

## What was intentionally EXCLUDED

1. **`ai/ml.ts`** — Kasuku's optional external-model seam. Akili keeps only the
   offline, deterministic core, so this was **not** vendored. Zero network calls
   remain (verified: the only URL anywhere is a CC-BY attribution comment in
   `lang/wold_sw.ts`).

2. **Full book manuscripts** (`kasuku/src/lib/books/*.ts`, ~25 MB of chapter
   text, e.g. SILT). The source `catalog.ts` indexed `BASE_CATALOG` from
   `store.ts`, which imports every full book body. Instead we ship a
   **metadata-only** catalog: `engine/ai/works.ts` (`WORKS_META`) — each work's
   id, type, title, author, language, genre, a short blurb (`about`, trimmed to
   ~360 chars), key quotes, themes/dhamira and year. **No chapter text.**
   - `catalog.ts` was rewired from `BASE_CATALOG` → `WORKS_META`.
   - `engine/ai/types.ts` is a slim local `Work` (literary metadata only). Its
     `chapters?` field is typed but always absent, so `fasihi.ts`'s
     character-extraction (`wahusikaOf`) and chapter outline degrade gracefully
     to empty lists — summaries, themes, discussion questions and quizzes still
     work (they read metadata, not body text).

3. **Curriculum dependency** in `learn/translate.ts`. The source imported
   `LEVELS` (from `learn/content.ts` → `darasa.ts`) only to auto-include taught
   words. Akili replaces `LEVELS` with an empty typed stand-in; the curated
   `CORE_EN` dictionary + WOLD gap-filler cover assistive translation, keeping
   the engine Pi-light and avoiding the whole curriculum payload.

4. **React/UI, TTS, ASR, IndexedDB/localStorage** seams (`ai/voice.ts`,
   `lib/tts`, `lib/voice/*`, `lib/lugha/index.ts`, `store.ts`) — not needed for
   pure question-answering, so not vendored.

## Refreshing from source

When Kasuku's engine changes, re-copy the files listed under **Origin** and
re-apply the three exclusions above. To regenerate `works.ts`, run a small script
in the Kasuku repo that imports `BASE_CATALOG` from `src/lib/store.ts`, filters
`type ∈ {book, story, poetry}`, projects the metadata fields (dropping
`chapters`/`cover`/media), trims `about`, and writes the `WORKS_META` array.
(The original extraction used `npx tsx` against `src/lib/store.ts`.)

Everything here is pure, deterministic TypeScript and compiles under Akili's
strict `tsconfig.json` (`strict`, `noUnusedLocals`, `noUnusedParameters`).
