// types.ts — slim language types the vendored translator needs.
// Kasuku's full learn/types.ts also models the Jifunze curriculum; Akili vendors
// only the bridge-language type aliases the rule translator consumes.

/** The learner's first language — the bridge we translate FROM into Kiswahili. */
export type Bridge = 'en' | 'ar' | 'zh' | 'ru';

/** Translation source languages (course bridges + extra rule-supported ones). */
export type TransLang = Bridge | 'fr' | 'pt';
