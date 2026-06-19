// node.ts — Akili's programmatic entry for Node / scripts.
//
// The engine at src/akili is browser-free (no DOM, no window) — only the voice,
// memory and widget live in src/lib and src/embed, and none of those are
// imported here. So a Node consumer (a CLI, a cron job, a server) can:
//
//     import { askAkili, createAkili, createAkiliSession } from 'akili/node';
//     const ans = await askAkili('dalili za malaria ni zipi');
//     console.log(ans.text.sw);
//
// This file is just a thin, stable re-export of the sovereign engine so Node
// consumers never have to reach into src/akili paths directly.

export {
  akili,
  askAkili,
  createAkili,
  createAkiliSession,
  defaultExperts,
  afyaExpert,
  fasihiExpert,
  lughaExpert,
  sheriaExpert,
  kilimoExpert,
  elimuExpert,
  biasharaExpert,
  snilExpert,
  jumlaExpert,
} from './akili/index';

export type {
  Akili,
  AkiliExchange,
  AkiliSession,
} from './akili/index';

export type {
  AkiliAnswer,
  AkiliConfidence,
  AkiliDomain,
  AkiliLang,
  AkiliQuery,
  AkiliSnilTrace,
  AkiliSource,
  DomainExpert,
} from './akili/types';
