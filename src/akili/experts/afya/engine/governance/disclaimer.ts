/**
 * Disclaimer text — the legal/clinical guard rails on every answer.
 *
 * Standard disclaimer = educational tool, see your doctor.
 * Strong disclaimer = urgent situations, doctor required.
 */

import { Bilingual } from '../types';

export const DISCLAIMERS: Record<'standard' | 'strong' | 'emergency', Bilingual> = {
  standard: {
    en: 'This is health education from published guidelines (WHO, NTLG, Muhimbili). It is not a diagnosis or prescription. Your doctor decides what is right for your specific case.',
    sw: 'Hii ni elimu ya afya kutoka kwa miongozo iliyochapishwa (WHO, NTLG, Muhimbili). Si utambuzi wa ugonjwa wala maagizo ya dawa. Daktari wako ndiye anayeamua kile kinachofaa kwa hali yako.',
  },
  strong: {
    en: 'This information may apply to your situation — but only your doctor can confirm. Do not change your treatment based on what you read here. Talk to a healthcare provider soon.',
    sw: 'Maelezo haya yanaweza kuhusu hali yako — lakini daktari wako pekee anaweza kuthibitisha. Usibadilishe matibabu yako kulingana na unachosoma hapa. Ongea na daktari haraka.',
  },
  emergency: {
    en: 'This may be an emergency. Go to the nearest hospital now or call 114. Do not wait. This app is not a substitute for emergency care.',
    sw: 'Hii inaweza kuwa dharura. Nenda hospitali ya karibu SASA au piga 114. Usisubiri. App hii si mbadala wa huduma ya dharura.',
  },
};

export const SCOPE_STATEMENT: Bilingual = {
  en: 'TibaHub helps you store, organize, and understand your own health information. It does not diagnose, prescribe, or replace your doctor.',
  sw: 'TibaHub inakusaidia kuhifadhi, kupanga, na kuelewa taarifa zako za afya. Haichunguzi magonjwa, haitoi dawa, wala haichukui nafasi ya daktari wako.',
};
