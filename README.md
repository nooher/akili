# Akili — sovereign Swahili AI

**Akili** is Laetoli's sovereign Swahili AI: **one brain that routes a Kiswahili
question to the right domain expert and answers it offline — no external LLM.**
It unifies the Laetoli engines behind a single conversational surface.

> _"AI ya Kiswahili · huru, bila mtandao."_ — Swahili-first, deterministic,
> runnable on a laptop or a **Raspberry Pi**. Every answer cites its source.

## The experts

| Domain | Expert | Powered by |
|--------|--------|------------|
| **Afya** (health/clinical) | `afya-tibaai` | **TibaAI** — Tanzania STG + WHO + NTLG; 24 conditions, 18 drugs, 14 labs; red-flags + disclaimers preserved |
| **Fasihi** (literature/reading/poetry) | `fasihi-kasuku` | **Kasuku AI** — book discovery, themes/dhamira, poetry (arudhi) |
| **Lugha** (Kiswahili language) | `lugha-kasuku` | **Kasuku AI** — translate, pronounce, grammar, dictionary |
| **SNIL** (compute / code) | `snil-tool` | **[SNIL](https://snil.vercel.app)** — Swahili intent → SNIL code → execution |
| **Jumla** (greetings / about / fallback) | `jumla` | sovereign KB |

The **SNIL tool** is the convergence piece: ask *"Kokotoa wastani wa 10, 20, 30"*
and Akili **writes a SNIL program**, runs it via `@laetoli/snil`, and shows you
both the code and the result (`20`). Natural Kiswahili intent → a Kiswahili
programming language → a verifiable answer. You can also paste SNIL to run it.

## Architecture

```
  Swali la Kiswahili
        │
   ┌────▼─────┐  router: match() every expert → dispatch to the best
   │  AKILI    │  (ties by registration order; jumla is the fallback)
   └────┬─────┘
   ┌────┼───────────┬───────────┬──────────┬─────────┐
   ▼    ▼           ▼           ▼          ▼         ▼
 AFYA  FASIHI      LUGHA       SNIL      JUMLA
 TibaAI Kasuku     Kasuku    SNIL tool   KB/fallback
   └────┴───────────┴───────────┴──────────┴─────────┘
        │  AkiliAnswer { domain, expert, text{sw,en}, confidence, sources, snil? }
        ▼  one answer, Swahili-first, with provenance
```

Every expert implements the same `DomainExpert` interface (`src/akili/types.ts`):
`match(q): number` (0..1) + `answer(q): AkiliAnswer`. Add a domain by adding an
expert to the registry — no router changes. **No network, no LLM** — the TibaAI
and Kasuku engines are vendored in (`src/akili/experts/*/engine/`, see each
`VENDORED.md`) so Akili is fully self-contained and offline.

## Run it
```bash
npm install      # pulls @laetoli/snil from GitHub
npm run dev      # http://localhost:5202
npm test         # vitest
npm run build
```

## Use the engine directly
```ts
import { askAkili } from './src/akili';
const a = await askAkili('Dalili za malaria ni zipi?');   // → Afya (TibaAI)
const b = await askAkili('Kokotoa wastani wa 10, 20, 30'); // → SNIL: code + output
```

Apache-2.0 · © 2026 Laetoli Ltd · part of the Laetoli sovereign stack
([SNIL](https://snil.vercel.app) · [Laetoli Data](https://laetoli-data.vercel.app)).
