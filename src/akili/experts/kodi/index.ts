// experts/kodi/index.ts — Akili's Kodi (TRA / tax administration) expert.
//
// A sovereign, curated Kiswahili knowledge base covering Tanzania's tax system:
// usajili wa TIN, VAT, kodi ya makadirio (presumptive), EFD/VFD, malalamiko na
// rufaa (TRAB/TRAT), adhabu na riba, kodi ya mapato/PAYE, forodha, taasisi
// husika (BRELA/NIDA/TCRA), huduma za kidijitali (Taxpayer Portal/GePG), kodi
// ya zuio (WHT), stempu, SDL, cheti cha ukamilifu wa kodi, kodi ya kupangisha,
// kodi ya faida ya mtaji, ukaguzi wa kodi, kuripoti rushwa, kodi Zanzibar, na
// e-invoicing. Pure/deterministic TS — no external LLM, no network, works
// fully offline. Built for KODI360, Laetoli's national tax platform for Tanzania —
// reused here so any Laetoli product can embed the same sovereign tax
// assistant. NOT tax advice; every answer points the user to TRA or a
// registered tax consultant.

import type {
  AkiliAnswer,
  AkiliConfidence,
  AkiliQuery,
  AkiliSource,
  DomainExpert,
} from '../../types';

const STRIP = /[^\p{L}\p{N}']+/gu;
const norm = (s: string): string =>
  (s ?? '').toLowerCase().normalize('NFKC').replace(STRIP, ' ').replace(/\s+/g, ' ').trim();

function hasCue(hay: string, cue: string): boolean {
  return ` ${hay} `.includes(` ${cue} `) || hay === cue;
}

function cueScore(text: string, cues: string[], cap = 0.92): number {
  const n = norm(text);
  if (!n) return 0;
  const seen = new Set<string>();
  for (const c of cues) {
    if (hasCue(n, c)) seen.add(c);
    if (seen.size >= 3) break;
  }
  const hits = seen.size;
  if (hits === 0) return 0;
  return Math.min(cap, 0.32 + hits * 0.23);
}

const KODI_CUES = [
  // Kiswahili — core
  'kodi', 'ushuru', 'tra', 'mlipakodi', 'walipakodi', 'tin', 'nambari ya mlipakodi',
  'vat', 'ongezeko la thamani', 'makadirio', 'kodi ya makadirio', 'risiti', 'efd',
  'vfd', 'kifaa cha kielektroniki', 'pingamizi', 'malalamiko', 'rufaa', 'trab',
  'trat', 'tathmini', 'adhabu', 'faini', 'riba', 'kutolipa', 'kuchelewa kulipa',
  'paye', 'kodi ya mapato', 'mapato', 'forodha', 'ushuru wa forodha', 'brela',
  'leseni', 'usajili wa biashara', 'gepg', 'namba ya udhibiti', 'malipo ya kodi',
  'tamko la kodi', 'return', 'tathmini ya kodi', 'ukaguzi wa kodi', 'mkaguzi',
  'msamaha wa kodi', 'punguzo la kodi', 'stakabadhi',
  // Kiswahili — new topics
  'kodi ya zuio', 'zuio', 'stempu', 'stempu ya kodi', 'sdl', 'maendeleo ya ujuzi',
  'cheti cha kodi', 'kutokuwa na deni', 'kibali cha kodi', 'kupangisha', 'kodi ya pango',
  'faida ya mtaji', 'kuuza kiwanja', 'kuuza nyumba', 'ukaguzi', 'mkaguzi wa kodi',
  'rushwa', 'takukuru', 'pccb', 'zanzibar', 'zrb', 'e invoicing', 'risiti za kielektroniki mtandaoni',
  'kufungwa akaunti', 'kukamata bidhaa', 'kutaifisha', 'mauzo ya mtandaoni', 'matangazo ya mtandaoni',
  'kiwanja', 'facebook ads', 'google ads',
  // English
  'tax', 'taxes', 'taxpayer', 'tin', 'vat', 'value added tax', 'presumptive tax',
  'turnover tax', 'receipt', 'fiscal device', 'objection', 'appeal', 'assessment',
  'penalty', 'interest', 'paye', 'income tax', 'customs', 'excise', 'duty',
  'business registration', 'licence', 'license', 'control number', 'tax return',
  'tax audit', 'auditor', 'tax exemption', 'tax relief', 'withholding tax',
  'digital service tax', 'e-filing', 'taxpayer portal',
  // English — new topics
  'withholding', 'stamp duty', 'skills development levy', 'tax clearance', 'clearance certificate',
  'rental income', 'rent tax', 'capital gains', 'capital gains tax', 'tax audit',
  'corruption', 'bribery', 'whistleblower', 'zanzibar revenue', 'e-invoicing',
  'account frozen', 'seizure', 'enforcement', 'online sellers', 'facebook ads', 'google ads',
];

interface KBEntry {
  id: string;
  cues: string[];
  sw: string;
  en?: string;
  sources: AkiliSource[];
}

const KB: KBEntry[] = [
  {
    id: 'tin-usajili',
    cues: ['tin', 'nambari ya mlipakodi', 'usajili', 'kujisajili', 'register', 'taxpayer', 'namba ya kodi'],
    sw:
      'Kupata TIN (Nambari ya Mlipakodi):\n' +
      '• Jisajili bila malipo kupitia Taxpayer Portal ya TRA (taxpayerportal.tra.go.tz) au kituo cha TRA kilicho karibu nawe.\n' +
      '• Mtu binafsi anahitaji kitambulisho cha NIDA; kampuni inahitaji cheti cha usajili cha BRELA kwanza.\n' +
      '• TIN ni ya lazima kabla ya kufungua akaunti benki ya biashara, kupata leseni ya biashara, au kushiriki zabuni za serikali.\n' +
      '• TIN, usajili BRELA, na leseni ya biashara ya halmashauri ni vitu VITATU tofauti — vyote vinahitajika, si mbadala wa kila kimoja.',
    en:
      'Getting a TIN (Taxpayer Identification Number):\n' +
      '• Register free via the TRA Taxpayer Portal (taxpayerportal.tra.go.tz) or your nearest TRA office.\n' +
      '• Individuals need a NIDA national ID; companies need a BRELA certificate of incorporation first.\n' +
      '• A TIN is required before opening a business bank account, getting a business licence, or bidding on government tenders.\n' +
      '• TIN, BRELA registration, and a council business licence are THREE separate things — all are needed, none replaces another.',
    sources: [
      { label: 'TRA — Taxpayer Portal', url: 'https://taxpayerportal.tra.go.tz' },
      { label: 'BRELA — Wakala wa Usajili wa Biashara', url: 'https://www.brela.go.tz' },
    ],
  },
  {
    id: 'vat-usajili',
    cues: ['vat', 'ongezeko la thamani', 'usajili wa vat', 'kiwango cha vat', 'value added tax', 'vat registration', '18%'],
    sw:
      'VAT (Kodi ya Ongezeko la Thamani):\n' +
      '• Kiwango cha kawaida cha VAT ni 18%.\n' +
      '• Usajili wa LAZIMA unatakiwa mauzo ya biashara yakizidi TZS milioni 200 kwa mwaka (Tanzania Bara) au milioni 100 (Zanzibar).\n' +
      '• Ukifikisha kiwango hicho, una siku 30 kujisajili VAT tangu tarehe uliyovuka kiwango.\n' +
      '• Biashara ndogo zaidi ya kiwango zinaweza kujisajili kwa hiari (voluntary registration).\n' +
      '• Taasisi za serikali na baadhi ya makampuni ya kigeni yanayotoa huduma za kidijitali Tanzania (mfano huduma za mtandaoni kwa watumiaji) hutakiwa kujisajili VAT hata bila kufikia kiwango.',
    en:
      'VAT (Value Added Tax):\n' +
      '• The standard VAT rate is 18%.\n' +
      '• MANDATORY registration applies once annual taxable turnover exceeds TZS 200 million (Mainland) or TZS 100 million (Zanzibar).\n' +
      '• Once you cross that threshold you have 30 days to register from the date you first exceeded it.\n' +
      '• Smaller businesses below the threshold may register voluntarily.\n' +
      '• Government bodies and some non-resident digital suppliers serving Tanzanian consumers must register regardless of turnover.',
    sources: [
      { label: 'The Value Added Tax Act (Tanzania)' },
      { label: 'TRA — Value Added Tax (VAT)', url: 'https://www.tra.go.tz/page/value-added-tax-vat' },
    ],
  },
  {
    id: 'kodi-makadirio',
    cues: ['makadirio', 'kodi ya makadirio', 'presumptive', 'turnover tax', 'mauzo madogo', 'biashara ndogo kodi'],
    sw:
      'Kodi ya Makadirio (Presumptive Tax) kwa biashara ndogo:\n' +
      '• Inatumika kwa mtu binafsi mwenye biashara yenye mauzo (turnover) hadi TZS milioni 100 kwa mwaka.\n' +
      '• Badala ya kuandaa hesabu kamili za faida na hasara, unalipa kiwango kidogo kinacholingana na kiwango cha mauzo yako (bendi za mauzo, si asilimia moja tu).\n' +
      '• HAITUMIKI kwa huduma za kitaalamu/ufundi (professional, technical, management, construction, training) — hizo hulipa kodi ya kawaida ya mapato.\n' +
      '• Changamoto inayojulikana: biashara yenye faida ndogo (low margin) inaweza kulipa kiwango kikubwa zaidi kuliko biashara ya faida kubwa yenye mauzo sawa — kwa sababu kodi inategemea MAUZO si FAIDA.\n' +
      '• Pata bendi na kiwango sahihi cha mwaka husika kwenye jedwali rasmi la TRA (Taxes and Duties at a Glance).',
    en:
      'Presumptive (turnover-based) tax for small businesses:\n' +
      '• Applies to an individual whose business turnover is up to TZS 100 million per year.\n' +
      '• Instead of full profit-and-loss accounts, you pay a small fixed amount set by your turnover band.\n' +
      '• Does NOT apply to professional/technical/management/construction/training services — those pay standard income tax.\n' +
      '• Known fairness issue: a low-margin business can pay proportionally more than a high-margin one with the same turnover, because the tax is based on SALES, not PROFIT.\n' +
      '• Check the current year\'s official band table (TRA "Taxes and Duties at a Glance") for exact figures.',
    sources: [
      { label: 'Income Tax Act (Tanzania), Third Schedule' },
      { label: 'TRA — Taxes and Duties at a Glance', url: 'https://www.tra.go.tz/images/uploads/pages/TAXES_AND_DUTIES_AT_A_GLANCE_2025_2026.pdf' },
    ],
  },
  {
    id: 'efd-vfd',
    cues: ['efd', 'vfd', 'risiti', 'kifaa cha kielektroniki', 'fiscal device', 'receipt', 'stakabadhi', 'mashine ya risiti'],
    sw:
      'EFD/VFD (Vifaa vya Kielektroniki vya Kutolea Risiti):\n' +
      '• Kisheria, kila mauzo LAZIMA yatolewe risiti ya kielektroniki — ni kosa kutokutoa risiti.\n' +
      '• EFD (mashine) hugharimu zaidi ya TZS milioni 2, jambo linalolemea wafanyabiashara wadogo.\n' +
      '• VFD (Virtual Fiscal Device) ni mbadala nafuu zaidi — programu inayoweza kutumika kwenye simu/kompyuta badala ya mashine ya bei ghali.\n' +
      '• Changamoto za kawaida: kukatika kwa umeme/mtandao, gharama ya matengenezo, na ukosefu wa mafunzo kwa watumiaji.\n' +
      '• Toa risiti kwa kila mteja — hata mteja mmoja asiyepewa risiti ni ushahidi wa mauzo yasiyoripotiwa.',
    en:
      'EFD/VFD (Electronic/Virtual Fiscal Devices):\n' +
      '• By law, every sale MUST be issued an electronic receipt — failing to do so is an offence.\n' +
      '• An EFD machine costs over TZS 2 million, a real burden for small traders.\n' +
      '• A VFD (Virtual Fiscal Device) is a cheaper alternative — software on a phone/computer instead of a costly machine.\n' +
      '• Common barriers: power/network outages, maintenance cost, and lack of user training.\n' +
      '• Issue a receipt for every transaction — even one unreceipted sale is evidence of unreported income.',
    sources: [
      { label: 'TRA — Know About Electronic Fiscal Devices (EFD)', url: 'https://www.tra.go.tz/page/know-about-e-fiscal-devices-efd' },
      { label: 'Tax Administration Act, 2015 (R.E. 2019)' },
    ],
  },
  {
    id: 'pingamizi-rufaa',
    cues: ['pingamizi', 'malalamiko', 'rufaa', 'trab', 'trat', 'tathmini', 'objection', 'appeal', 'assessment', 'kupinga kodi', 'mapatano', 'mediation'],
    sw:
      'Pingamizi na Rufaa dhidi ya tathmini ya kodi:\n' +
      '• Ukipingana na tathmini ya TRA, wasilisha PINGAMIZI kwa Kamishna Mkuu ndani ya SIKU 30 tangu kupokea uamuzi, kwa maandishi na vielelezo.\n' +
      '• Pingamizi halitapokelewa mpaka ulipe kodi isiyobishaniwa AU THULUTHI MOJA (1/3) ya kodi iliyokadiriwa — kiwango kikubwa zaidi kati ya viwili hivyo (isipokuwa Kamishna Mkuu aridhie punguzo kwa sababu za msingi).\n' +
      '• Ukikosa muda, unaweza kuomba nyongeza ya muda (hadi siku 30) — ombi liwasilishwe angalau siku 7 kabla ya ukomo.\n' +
      '• Usipokubaliana na uamuzi wa pingamizi, kata rufaa Bodi ya Rufaa za Kodi (TRAB), kisha Baraza la Rufaa za Kodi (TRAT), na hatimaye Mahakama ya Rufaa.\n' +
      '• MAPATANO (mediation): tangu Sheria ya Fedha 2021, unaweza kuomba mapatano na TRA badala ya njia ndefu ya mahakama — ombi huwasilishwa kwa Kamishna Mkuu, ingawa sheria haiweki ukomo maalum wa muda wa kukamilisha mapatano hayo.',
    en:
      'Objecting to and appealing a tax assessment:\n' +
      '• If you disagree with a TRA assessment, file a written Notice of Objection to the Commissioner General within 30 DAYS of receiving the decision, with supporting evidence.\n' +
      '• The objection is not admitted until you pay the undisputed tax OR ONE-THIRD (1/3) of the assessed tax, whichever is greater (unless the Commissioner General grants a waiver for good reason).\n' +
      '• Missed the deadline? You can request an extension (up to 30 more days) — apply at least 7 days before the deadline expires.\n' +
      '• If you disagree with the objection decision, appeal to the Tax Revenue Appeals Board (TRAB), then the Tax Revenue Appeals Tribunal (TRAT), and finally the Court of Appeal.\n' +
      '• MEDIATION: since the 2021 Finance Act you can request mediation with TRA instead of the long court route — submitted to the Commissioner General, though the law sets no fixed timeline for completing it.',
    sources: [
      { label: 'Tax Administration Act, 2015 (R.E. 2019)' },
      { label: 'TRA — Objections & Appeals', url: 'https://www.tra.go.tz/page/objections-appeals' },
      { label: 'Tax Revenue Appeals Board (TRAB)', url: 'https://www.trab.go.tz' },
    ],
  },
  {
    id: 'adhabu-riba',
    cues: ['adhabu', 'faini', 'riba', 'kutolipa', 'kuchelewa', 'penalty', 'interest', 'late payment', 'kuchelewa kulipa'],
    sw:
      'Adhabu na riba kwa kuchelewa kulipa/kutamka kodi:\n' +
      '• Kutotamka (kuwasilisha return) au kutolipa kodi kwa wakati kunapelekea FAINI na RIBA juu ya kiasi kinachodaiwa.\n' +
      '• Riba huongezeka kila mwezi kadiri deni linavyoendelea — deni dogo linaweza kukua haraka.\n' +
      '• Kuwasilisha return kwa wakati hata kama huna uwezo wa kulipa mara moja ni bora zaidi ya kutowasilisha kabisa — unaweza kuomba mpango wa malipo (payment plan) na TRA.\n' +
      '• Rekodi safi na malipo ya wakati ndiyo njia rahisi zaidi ya kuepuka adhabu.',
    en:
      'Penalties and interest for late payment/filing:\n' +
      '• Failing to file a return or pay tax on time triggers PENALTIES and INTEREST on the amount owed.\n' +
      '• Interest accrues monthly on the outstanding balance — a small debt can grow quickly.\n' +
      '• Filing on time even if you can\'t pay in full immediately is better than not filing at all — you can request a payment plan with TRA.\n' +
      '• Clean records and on-time payment are the simplest way to avoid penalties.',
    sources: [{ label: 'Tax Administration Act, 2015 (R.E. 2019)' }],
  },
  {
    id: 'kodi-mapato-paye',
    cues: ['paye', 'kodi ya mapato', 'mshahara', 'income tax', 'employee tax', 'mapato ya ajira', 'kodi ya kampuni', 'corporate tax'],
    sw:
      'Kodi ya Mapato (Kampuni) na PAYE (Wafanyakazi):\n' +
      '• Kampuni zinalipa kodi ya mapato juu ya faida halisi (mapato − gharama halali), kwa kiwango cha kawaida cha ushirika.\n' +
      '• PAYE (Pay As You Earn) ni kodi ya mshahara inayokatwa na mwajiri moja kwa moja kutoka mshahara wa mfanyakazi kila mwezi, kwa bendi za viwango vinavyopanda kadiri mshahara unavyoongezeka.\n' +
      '• Mwajiri ndiye mwenye wajibu wa kukata na kuwasilisha PAYE TRA — mfanyakazi hahitaji kuwasilisha mwenyewe kwa kawaida.\n' +
      '• Watu binafsi wenye vyanzo vingine vya mapato (mfano kodi ya nyumba, biashara ya ziada) huenda wakahitaji kutamka mapato hayo tofauti.',
    en:
      'Corporate Income Tax and PAYE (employees):\n' +
      '• Companies pay income tax on actual profit (income minus allowable expenses), at the standard corporate rate.\n' +
      '• PAYE (Pay As You Earn) is salary tax withheld directly by the employer each month, on a rising scale of bands as salary increases.\n' +
      '• The employer is responsible for withholding and remitting PAYE to TRA — employees don\'t normally file it themselves.\n' +
      '• Individuals with other income sources (e.g. rental income, side business) may need to declare that income separately.',
    sources: [{ label: 'Income Tax Act (Tanzania)' }],
  },
  {
    id: 'forodha-ushuru',
    cues: ['forodha', 'ushuru wa forodha', 'customs', 'excise', 'duty', 'kuagiza bidhaa', 'import', 'export'],
    sw:
      'Ushuru wa Forodha na Bidhaa Maalum (Excise):\n' +
      '• Bidhaa zinazoingizwa nchini hutozwa ushuru wa forodha kulingana na Jedwali la Pamoja la Ushuru la Jumuiya ya Afrika Mashariki (EAC Common External Tariff).\n' +
      '• Baadhi ya bidhaa (mfano vinywaji, sigara, mafuta) hutozwa ziada ya "excise duty" juu ya ushuru wa kawaida.\n' +
      '• Wafanyabiashara wa kuagiza/kuuza nje wanahitaji TIN na usajili maalum wa forodha (ASYCUDA) kabla ya kufanya biashara ya kimataifa.',
    en:
      'Customs Duty and Excise:\n' +
      '• Imported goods are taxed under the East African Community Common External Tariff (EAC CET).\n' +
      '• Certain goods (e.g. beverages, cigarettes, fuel) carry an additional excise duty on top of standard customs duty.\n' +
      '• Import/export traders need a TIN and a customs registration (ASYCUDA) before trading internationally.',
    sources: [{ label: 'East African Community Customs Management Act' }, { label: 'TRA — Customs & Excise' }],
  },
  {
    id: 'taasisi-husika',
    cues: ['brela', 'nida', 'tcra', 'leseni', 'usajili wa biashara', 'business registration', 'licence', 'taasisi', 'halmashauri'],
    sw:
      'Taasisi husika mbali na TRA:\n' +
      '• BRELA — usajili wa jina la biashara/kampuni (unahitajika kabla ya TIN kwa makampuni).\n' +
      '• NIDA — kitambulisho cha taifa, kinachohitajika kusajili TIN ya mtu binafsi.\n' +
      '• Halmashauri (Local Government Authority) — leseni ya biashara na kodi za huduma za mtaa, tofauti na kodi za TRA.\n' +
      '• TCRA — inasimamia mawasiliano na huduma za pesa za simu zinazotumika kulipia kodi.\n' +
      '• Zanzibar Revenue Board (ZRB) — inasimamia kodi za Zanzibar kwa baadhi ya maeneo yasiyo ya muungano, sambamba na TRA.\n' +
      'Fahamu: mfanyabiashara anaweza kuhitaji taasisi zote hizi kwa nyakati tofauti — si TRA pekee.',
    en:
      'Related institutions beyond TRA:\n' +
      '• BRELA — business/company name registration (required before a company can get a TIN).\n' +
      '• NIDA — national ID, required to register an individual TIN.\n' +
      '• Local Government Authority (Halmashauri) — business licence and local service levies, separate from TRA taxes.\n' +
      '• TCRA — regulates telecoms and the mobile-money rails used to pay taxes.\n' +
      '• Zanzibar Revenue Board (ZRB) — administers Zanzibar\'s non-union taxes alongside TRA.\n' +
      'A business may need all of these institutions at different points — not TRA alone.',
    sources: [
      { label: 'BRELA — Wakala wa Usajili wa Biashara', url: 'https://www.brela.go.tz' },
      { label: 'NIDA — Mamlaka ya Vitambulisho vya Taifa', url: 'https://www.nida.go.tz' },
      { label: 'TCRA — Mamlaka ya Mawasiliano Tanzania', url: 'https://www.tcra.go.tz' },
      { label: 'Zanzibar Revenue Board (ZRB)', url: 'https://www.zanrevenue.org' },
    ],
  },
  {
    id: 'huduma-kidijitali',
    cues: ['gepg', 'namba ya udhibiti', 'control number', 'taxpayer portal', 'huduma za kidijitali', 'e-filing', 'malipo ya kodi mtandaoni', 'app ya tra',
      'facebook ads', 'google ads', 'matangazo ya mtandaoni', 'digital service tax', 'mauzo ya mtandaoni'],
    sw:
      'Huduma za kidijitali za TRA:\n' +
      '• Taxpayer Portal (taxpayerportal.tra.go.tz) — kuwasilisha tamko (return), kupata namba ya udhibiti (control number), kusimamia EFD/VFD, na kufuatilia marejesho ya kodi.\n' +
      '• Malipo hufanyika kupitia GePG (Serikali ya Mtandaoni ya Malipo) — benki, pesa za simu (M-Pesa/Tigo Pesa/Airtel Money), au wakala.\n' +
      '• "TRA Services" app (Google Play) inaruhusu huduma nyingi kufanyika kwa simu bila kuhitaji kompyuta.\n' +
      '• Digital Service Tax inatumika kwa makampuni ya kigeni yanayotoa huduma za kidijitali (mfano matangazo mtandaoni kama Facebook/Google Ads, programu) kwa watumiaji Tanzania — hii inahusisha pia biashara zinazouza mtandaoni kupitia majukwaa ya kigeni.',
    en:
      'TRA digital services:\n' +
      '• Taxpayer Portal (taxpayerportal.tra.go.tz) — file returns, generate a control number, manage EFD/VFD, and track refunds.\n' +
      '• Payments go through GePG (Government e-Payment Gateway) — bank, mobile money (M-Pesa/Tigo Pesa/Airtel Money), or an agent.\n' +
      '• The "TRA Services" app (Google Play) lets many services run entirely from a phone.\n' +
      '• Digital Service Tax applies to foreign companies providing digital services (e.g. online ads like Facebook/Google Ads, apps) to users in Tanzania — this also touches businesses selling through foreign online platforms.',
    sources: [
      { label: 'TRA — Taxpayer Portal', url: 'https://taxpayerportal.tra.go.tz' },
      { label: 'GePG — Government e-Payment Gateway' },
      { label: 'TRA — Digital Service Tax', url: 'https://www.tra.go.tz/page/digital-service-tax' },
    ],
  },
  {
    id: 'kodi-zuio-wht',
    cues: ['kodi ya zuio', 'zuio', 'withholding', 'withholding tax', 'wht', 'kukata kodi kwenye malipo'],
    sw:
      'Kodi ya Zuio (Withholding Tax):\n' +
      '• Ni kodi inayokatwa na anayelipa (mfano mwajiri, mpangaji, kampuni) kabla ya kumlipa mtu au taasisi nyingine, kisha kuiwasilisha TRA moja kwa moja.\n' +
      '• Gawio (dividend): kwa kawaida 10%; 5% kwa kampuni zilizoorodheshwa DSE au kampuni mama yenye hisa 25%+.\n' +
      '• Riba (interest, mfano akiba benki): 10%.\n' +
      '• Mrabaha (royalty): 15%.\n' +
      '• Pango (rent, mfano kodi ya nyumba/jengo la biashara): mpangaji hukata 10% na kuiwasilisha TRA ndani ya siku 7 baada ya mwezi wa malipo.\n' +
      '• Kiwango sahihi hutegemea aina ya malipo na hali ya mlipwaji (mkaazi/asiye mkaazi) — thibitisha na jedwali rasmi la TRA.',
    en:
      'Withholding Tax (WHT):\n' +
      '• Tax deducted by the PAYER (e.g. employer, tenant, company) before paying another party, then remitted directly to TRA.\n' +
      '• Dividends: typically 10%; 5% for DSE-listed companies or a parent holding 25%+ shares.\n' +
      '• Interest (e.g. bank savings): 10%.\n' +
      '• Royalties: 15%.\n' +
      '• Rent (e.g. residential/commercial rent): the tenant withholds 10% and remits it to TRA within 7 days of the month of payment.\n' +
      '• The exact rate depends on payment type and residency status — verify against TRA\'s official table.',
    sources: [
      { label: 'TRA — Withholding Tax', url: 'https://www.tra.go.tz/page/withholding-tax' },
      { label: 'Income Tax Act (Tanzania)' },
    ],
  },
  {
    id: 'stempu-stamp-duty',
    cues: ['stempu', 'stempu ya kodi', 'stamp duty', 'mkataba wa pango', 'nyaraka za kisheria'],
    sw:
      'Stempu ya Kodi (Stamp Duty):\n' +
      '• Hutozwa kwenye nyaraka fulani za kisheria (mfano mkataba wa pango, uhamisho wa mali) chini ya Sheria ya Stempu ya Kodi (Cap 189).\n' +
      '• Kwa mkataba wa kupanga (rental agreement), kiwango ni 1% ya kiasi cha pango la mwaka.\n' +
      '• Nyaraka lazima zipigwe muhuri (stamped) ndani ya siku 30 tangu kusainiwa — nyaraka isiyopigwa muhuri haikubaliki mahakamani wala usajili wa ardhi.\n' +
      '• Adhabu ya kutopiga muhuri kwa wakati: hadi 25% ya stempu inayodaiwa, au hadi mara 10 ya kiwango sahihi.',
    en:
      'Stamp Duty:\n' +
      '• Charged on certain legal instruments (e.g. rental agreements, property transfers) under the Stamp Duty Act (Cap 189).\n' +
      '• For a rental agreement, the rate is 1% of the annual rent amount.\n' +
      '• Instruments must be stamped within 30 days of signing — an unstamped document is not admissible in court or acceptable for land registration.\n' +
      '• Penalty for late stamping: up to 25% of the duty owed, or up to 10 times the correct duty.',
    sources: [{ label: 'TRA — Stamp Duty', url: 'https://www.tra.go.tz/page/stamp-duty' }, { label: 'Stamp Duty Act, Cap 189' }],
  },
  {
    id: 'sdl',
    cues: ['sdl', 'skills development levy', 'maendeleo ya ujuzi', 'ushuru wa ujuzi', 'kodi ya wafanyakazi kumi'],
    sw:
      'SDL (Skills and Development Levy):\n' +
      '• Ni kodi analipa MWAJIRI (si mfanyakazi) mwenye wafanyakazi 10 au zaidi.\n' +
      '• Kiwango ni asilimia ndogo ya jumla ya malipo ya mishahara (emoluments) kwa mwezi — thibitisha asilimia sahihi ya mwaka husika kwenye jedwali rasmi la TRA (imekuwa ikipungua miaka ya hivi karibuni).\n' +
      '• Baadhi ya taasisi zimesamehewa: serikali, balozi, mashirika ya kidini/hisani yaliyosajiliwa, mashamba, na taasisi za elimu zilizosajiliwa.\n' +
      '• Mwajiri huwasilisha SDL pamoja na PAYE kila mwezi.',
    en:
      'SDL (Skills and Development Levy):\n' +
      '• Paid by the EMPLOYER (not the employee) with 10 or more employees.\n' +
      '• The rate is a small percentage of total monthly emoluments — verify the current year\'s exact rate against TRA\'s official table (it has been reduced in recent years).\n' +
      '• Some entities are exempt: government, diplomatic missions, registered religious/charitable organizations, farms, and registered educational institutions.\n' +
      '• Employers remit SDL alongside PAYE each month.',
    sources: [{ label: 'TRA — Skills Development Levy (SDL)', url: 'https://www.tra.go.tz/page/skills-development-levy-sdl' }],
  },
  {
    id: 'cheti-cha-kodi',
    cues: ['cheti cha kodi', 'kutokuwa na deni', 'tax clearance', 'clearance certificate', 'kibali cha kodi'],
    sw:
      'Cheti cha Kutokuwa na Deni la Kodi (Tax Clearance Certificate):\n' +
      '• Kinathibitisha kuwa umetimiza wajibu wako wa kodi hadi tarehe fulani.\n' +
      '• Kinahitajika kwa: kuomba/kufanya upya leseni ya biashara, kushiriki zabuni za serikali, na taratibu nyingine za kiofisi.\n' +
      '• Omba kupitia mfumo wa IDRAS wa TRA baada ya kuhakikisha malipo na tamko zote za kodi ziko sawa.\n' +
      '• Ukiwa na deni la kodi lililobaki, cheti hakitatolewa mpaka ulipe au upange mpango wa malipo na TRA.',
    en:
      'Tax Clearance Certificate:\n' +
      '• Certifies that you have met your tax obligations up to a given date.\n' +
      '• Needed for: applying for/renewing a business licence, bidding on government tenders, and other official procedures.\n' +
      '• Apply through TRA\'s IDRAS system once all payments and returns are up to date.\n' +
      '• If you have outstanding tax debt, the certificate won\'t be issued until you pay or arrange a payment plan with TRA.',
    sources: [{ label: 'TRA — Starting a Business' }],
  },
  {
    id: 'kodi-kupangisha-nyumba',
    cues: ['kupangisha', 'kodi ya pango', 'nyumba ya kupanga', 'rental income', 'rent tax', 'mpangaji',
      'nyumba', 'kodi ya nyumba', 'ninayopangisha', 'napangisha', 'kupanga nyumba'],
    sw:
      'Kodi ya Mapato ya Kupangisha (Rental Income Tax):\n' +
      '• Mpangaji (anayelipa kodi ya pango) hukata 10% ya kiasi cha pango kama kodi ya zuio na kuiwasilisha TRA.\n' +
      '• Kwa mwenye nyumba mkaazi ambaye kupangisha si biashara yake kuu, kodi hiyo ya zuio mara nyingi ni kodi ya MWISHO (final tax) — hahitaji kulipa zaidi.\n' +
      '• Kwa mwenye nyumba asiye mkaazi, hii ni sehemu tu ya kodi inayotakiwa — analipa hadi 30% ya mapato halisi baada ya makato.\n' +
      '• Hakikisha mkataba wa pango umepigwa muhuri (stempu ya 1% ya kodi ya mwaka) — mkataba usio na muhuri hauna nguvu kisheria.',
    en:
      'Rental Income Tax:\n' +
      '• The tenant withholds 10% of the rent as withholding tax and remits it to TRA.\n' +
      '• For a resident landlord where renting isn\'t their main business, that withholding is often the FINAL tax — nothing more is owed.\n' +
      '• For a non-resident landlord, this is only part of what\'s owed — up to 30% of net income after deductions applies.\n' +
      '• Make sure the rental agreement is stamped (1% of annual rent stamp duty) — an unstamped agreement has no legal force.',
    sources: [{ label: 'TRA — Withholding Tax', url: 'https://www.tra.go.tz/page/withholding-tax' }],
  },
  {
    id: 'kodi-faida-ya-mtaji',
    cues: ['faida ya mtaji', 'capital gains', 'capital gains tax', 'kuuza kiwanja', 'kuuza nyumba', 'kuuza hisa',
      'kiwanja', 'nikiuza', 'niuze kiwanja', 'niuze nyumba'],
    sw:
      'Kodi ya Faida ya Mtaji (Capital Gains Tax):\n' +
      '• Si kodi tofauti — ni sehemu ya kodi ya mapato, inayotozwa faida unayopata ukiuza mali kama kiwanja, jengo, au hisa.\n' +
      '• Mkaazi: 10% ya faida halisi. Asiye mkaazi: hadi 30%.\n' +
      '• Hisa zilizoorodheshwa DSE zinazomilikiwa na mkaazi mara nyingi zimesamehewa.\n' +
      '• Wasilisha na ulipe kabla ya/wakati wa uhamisho wa umiliki — hii huhusiana moja kwa moja na stempu ya kodi kwenye hati ya uhamisho.',
    en:
      'Capital Gains Tax:\n' +
      '• Not a separate tax — it\'s part of income tax, charged on the gain from selling an asset like land, a building, or shares.\n' +
      '• Resident: 10% of the net gain. Non-resident: up to 30%.\n' +
      '• DSE-listed shares held by a resident are often exempt.\n' +
      '• Declare and pay before/at the point of ownership transfer — this ties directly to stamp duty on the transfer instrument.',
    sources: [{ label: 'TRA — Capital Gains Tax', url: 'https://www.tra.go.tz/page/capital-gains-tax' }, { label: 'Income Tax Act (Tanzania)' }],
  },
  {
    id: 'ukaguzi-wa-kodi',
    cues: ['ukaguzi wa kodi', 'mkaguzi wa kodi', 'tax audit', 'auditor', 'tra wananikagua'],
    sw:
      'Ukaguzi wa Kodi (Tax Audit):\n' +
      '• TRA ina haki ya kukagua kumbukumbu za biashara yako (mauzo, gharama, risiti za EFD/VFD) wakati wowote ndani ya muda uliowekwa kisheria.\n' +
      '• Andaa/hifadhi kumbukumbu safi za mauzo na matumizi kila wakati — ndiyo ulinzi wako mkubwa zaidi wakati wa ukaguzi.\n' +
      '• Una haki ya kuona barua rasmi ya taarifa ya ukaguzi na kujua ni vipindi/miaka gani inakaguliwa.\n' +
      '• Ukitokea tathmini mpya baada ya ukaguzi na hukubaliani nayo, unaweza kuwasilisha pingamizi (angalia sehemu ya "Pingamizi na Rufaa").\n' +
      '• Shirikiana kitaalamu; unaweza kutumia mshauri wa kodi aliyesajiliwa kukusaidia wakati wa ukaguzi.',
    en:
      'Tax Audit:\n' +
      '• TRA has the right to examine your business records (sales, expenses, EFD/VFD receipts) within the legally set time limits.\n' +
      '• Keep clean sales and expense records at all times — that is your strongest protection during an audit.\n' +
      '• You have the right to a formal audit notice and to know which periods/years are being examined.\n' +
      '• If a new assessment follows the audit and you disagree, you can file an objection (see "Objections & Appeals").\n' +
      '• Cooperate professionally; a registered tax consultant can assist you through the audit.',
    sources: [{ label: 'Tax Administration Act, 2015 (R.E. 2019)' }],
  },
  {
    id: 'kuripoti-rushwa',
    cues: ['rushwa', 'takukuru', 'pccb', 'whistleblower', 'corruption', 'bribery', 'afisa anaomba rushwa'],
    sw:
      'Kuripoti Rushwa ya Afisa wa Kodi:\n' +
      '• Rushwa katika ukusanyaji wa kodi ni kosa la jinai chini ya Sheria ya Kuzuia na Kupambana na Rushwa.\n' +
      '• Ripoti kwa TAKUKURU (PCCB) kupitia namba ya dharura 113, au tovuti/ofisi zao za mikoa.\n' +
      '• Sheria ya Ulinzi wa Watoa Taarifa na Mashahidi (Whistleblower and Witness Protection Act) inakupa ulinzi ukitoa taarifa kwa nia njema.\n' +
      '• Huduma nyingi za TRA sasa ni za mtandaoni (Taxpayer Portal/app) hasa ili kupunguza mwingiliano wa ana kwa ana unaoweza kusababisha rushwa — tumia njia hizo pale inapowezekana.\n' +
      '• Unaweza pia kuwasilisha malalamiko rasmi dhidi ya mwenendo wa afisa moja kwa moja kwa uongozi wa TRA.',
    en:
      'Reporting Bribery by a Tax Official:\n' +
      '• Bribery in tax collection is a criminal offence under the Prevention and Combating of Corruption Act.\n' +
      '• Report to PCCB (TAKUKURU) via the emergency line 113, or their website/regional offices.\n' +
      '• The Whistleblower and Witness Protection Act protects you when you report in good faith.\n' +
      '• Many TRA services are now online (Taxpayer Portal/app) specifically to reduce face-to-face interactions that enable bribery — use those channels where possible.\n' +
      '• You can also file a formal complaint about an officer\'s conduct directly with TRA management.',
    sources: [
      { label: 'PCCB — Prevention and Combating of Corruption Bureau', ref: 'Emergency line 113' },
      { label: 'Whistleblower and Witness Protection Act (Tanzania)' },
    ],
  },
  {
    id: 'kodi-zanzibar',
    cues: ['zanzibar', 'zrb', 'kodi zanzibar', 'zanzibar revenue', 'tofauti tra na zrb'],
    sw:
      'Kodi Zanzibar: TRA na ZRB (Zanzibar Revenue Board)\n' +
      '• Tanzania ina "kodi za muungano" na "kodi zisizo za muungano" kwa mujibu wa Katiba.\n' +
      '• TRA inakusanya kodi za MUUNGANO kwa Zanzibar pia: kodi ya mapato (Income Tax Act) na ushuru wa forodha (EAC Customs Management Act).\n' +
      '• ZRB (sasa Zanzibar Revenue Authority) inakusanya kodi ZISIZO za muungano kwa Zanzibar: VAT, excise duty, na stempu ya kodi — hizi ni tofauti na zile za TRA Bara.\n' +
      '• Halmashauri za Zanzibar husimamia ushuru/leseni za ndani, kama ilivyo Bara.\n' +
      '• Ukiwa na biashara pande zote mbili (Bara na Zanzibar), huenda ukahitaji kujisajili taasisi zote mbili kulingana na aina ya kodi.',
    en:
      'Zanzibar Taxes: TRA vs ZRB (Zanzibar Revenue Board)\n' +
      '• Tanzania has "union taxes" and "non-union taxes" per the Constitution.\n' +
      '• TRA collects UNION taxes for Zanzibar too: income tax (Income Tax Act) and customs duty (EAC Customs Management Act).\n' +
      '• ZRB (now Zanzibar Revenue Authority) collects NON-UNION taxes for Zanzibar: VAT, excise duty, and stamp duty — these differ from TRA\'s Mainland versions.\n' +
      '• Zanzibar\'s local councils administer local levies/licences, just as on the Mainland.\n' +
      '• If you operate on both sides (Mainland and Zanzibar), you may need to register with both institutions depending on the tax type.',
    sources: [{ label: 'Zanzibar Revenue Board (ZRB)', url: 'https://www.zanrevenue.org' }, { label: 'Constitution of the United Republic of Tanzania' }],
  },
  {
    id: 'e-invoicing',
    cues: ['e invoicing', 'e-invoicing', 'einvoicing', 'risiti za kielektroniki mtandaoni', 'tehama ya kodi',
      'kuripoti kielektroniki', 'uripoti wa muda halisi', 'real time reporting'],
    sw:
      'E-Invoicing (Uripoti wa Kielektroniki wa Mauzo):\n' +
      '• Ni mfumo unaounganisha vifaa vya risiti (EFD/VFD) moja kwa moja na mifumo ya TRA kwa muda halisi (real-time), kupunguza uwezekano wa kuficha mauzo.\n' +
      '• Lengo: kupanua wigo wa kodi kwa kuhakikisha kila muamala unaripotiwa moja kwa moja bila kusubiri tamko la mwisho wa mwezi.\n' +
      '• Kwa mfanyabiashara, hii inamaanisha VFD/EFD yako lazima iwe na muunganiko sahihi wa mtandao mara kwa mara ili kutuma taarifa TRA.\n' +
      '• Thibitisha matakwa mahususi ya sasa (toleo la programu, muunganiko) kwenye tovuti ya TRA kabla ya kuwekeza kwenye vifaa vipya.',
    en:
      'E-Invoicing (Real-Time Sales Reporting):\n' +
      '• A system that connects fiscal devices (EFD/VFD) directly to TRA in real time, reducing the ability to hide sales.\n' +
      '• Goal: widen the tax base by ensuring every transaction is reported immediately, not just at month-end filing.\n' +
      '• For a business, this means your VFD/EFD needs a reasonably reliable network connection to transmit data to TRA.\n' +
      '• Verify the current specific requirements (software version, connectivity) on TRA\'s website before investing in new devices.',
    sources: [{ label: 'TRA — E-Fiscal Devices (EFD)', url: 'https://www.tra.go.tz/page/know-about-e-fiscal-devices-efd' }],
  },
  {
    id: 'utekelezaji-kufunga-akaunti',
    cues: ['kufungwa akaunti', 'akaunti kufungwa', 'kukamata bidhaa', 'kutaifisha', 'account frozen', 'seizure', 'enforcement',
      'wamefunga akaunti', 'akaunti ya benki', 'benki imefungwa', 'kufunga akaunti', 'mali kukamatwa'],
    sw:
      'TRA Imefunga Akaunti/Kukamata Bidhaa — Enforcement:\n' +
      '• TRA ina mamlaka kisheria ya kuchukua hatua za kulazimisha ulipaji wa kodi iliyokwisha kuwa "deni la kodi" lisilobishaniwa: kufunga akaunti ya benki, kukamata bidhaa/mali, au kuzuia leseni.\n' +
      '• Hatua hizi kwa kawaida huja BAADA ya taarifa/uamuzi wa awali — kama umepokea tathmini na hukupinga ndani ya siku 30, deni linakuwa la lazima kulipwa.\n' +
      '• Ukiona hatua imechukuliwa bila taarifa au kimakosa, wasiliana na TRA mara moja na uonyeshe uthibitisho (risiti za malipo, pingamizi lililowasilishwa).\n' +
      '• Ukiwa na pingamizi halali lililowasilishwa kwa wakati na umelipa amana inayotakiwa (1/3 au kisichobishaniwa), hilo mara nyingi husimamisha baadhi ya hatua za utekelezaji hadi uamuzi utolewe.',
    en:
      'TRA Account Freeze/Seizure — Enforcement Action:\n' +
      '• TRA has legal authority to enforce collection of an undisputed tax debt: freezing bank accounts, seizing goods/property, or restricting licences.\n' +
      '• These actions normally follow an earlier notice/decision — if you received an assessment and didn\'t object within 30 days, the debt becomes enforceable.\n' +
      '• If action was taken without notice or in error, contact TRA immediately with evidence (payment receipts, a filed objection).\n' +
      '• A valid, timely-filed objection with the required deposit paid (1/3 or undisputed amount) often suspends certain enforcement steps pending the decision.',
    sources: [{ label: 'Tax Administration Act, 2015 (R.E. 2019)' }],
  },
];

const DISCLAIMER_SW =
  'Kumbuka: haya ni maelezo ya jumla kwa elimu tu — SI ushauri rasmi wa kodi. ' +
  'Kwa uamuzi mahususi, wasiliana na TRA au mshauri wa kodi aliyesajiliwa.';
const DISCLAIMER_EN =
  'Note: this is general information for education only — NOT formal tax advice. ' +
  'For specific decisions, consult TRA or a registered tax consultant.';

function tokens(s: string): string[] {
  return norm(s).split(' ').filter(Boolean);
}

function score(entry: KBEntry, qTokens: string[], qNorm: string): number {
  let s = 0;
  for (const c of entry.cues) {
    if (hasCue(qNorm, c)) s += 2;
    else if (qTokens.includes(c)) s += 1;
  }
  return s;
}

/** Best-matching KB entry, or null when nothing shares a real cue (score 0). */
function bestEntry(text: string): { entry: KBEntry; score: number } | null {
  const qNorm = norm(text);
  const qTokens = tokens(text);
  let best: KBEntry | null = null;
  let bestScore = 0;
  for (const e of KB) {
    const s = score(e, qTokens, qNorm);
    if (s > bestScore) {
      best = e;
      bestScore = s;
    }
  }
  return best ? { entry: best, score: bestScore } : null;
}

const NO_MATCH_SW =
  'Nimeelewa kuwa hili ni swali la kodi, lakini sina taarifa mahususi kuhusu hilo bado. ' +
  'Jaribu kuuliza kuhusu TIN, VAT, kodi ya makadirio, EFD/VFD, pingamizi na rufaa, kodi ya zuio, ' +
  'SDL, stempu ya kodi, au wasiliana na TRA moja kwa moja kwa jibu sahihi.';
const NO_MATCH_EN =
  'I can tell this is a tax question, but I don\'t have specific information on that yet. ' +
  'Try asking about TIN, VAT, presumptive tax, EFD/VFD, objections and appeals, withholding tax, ' +
  'SDL, stamp duty, or contact TRA directly for an authoritative answer.';

export const kodiExpert: DomainExpert = {
  id: 'kodi-tra-msingi',
  domain: 'kodi',
  label: 'Kodi',

  match(q: AkiliQuery): number {
    return cueScore(q.text ?? '', KODI_CUES);
  },

  answer(q: AkiliQuery): AkiliAnswer {
    const best = bestEntry(q.text ?? '');

    if (!best) {
      return {
        domain: 'kodi',
        expert: kodiExpert.id,
        text: { sw: `${NO_MATCH_SW}\n\n${DISCLAIMER_SW}`, en: `${NO_MATCH_EN}\n\n${DISCLAIMER_EN}` },
        confidence: 'low',
        sources: [{ label: 'Akili KB — Kodi', ref: 'Laetoli · KODI360' }],
        data: { entry: 'no-match', score: 0 },
      };
    }

    const { entry, score: s } = best;
    const confidence: AkiliConfidence = s >= 4 ? 'high' : s >= 2 ? 'medium' : 'low';

    const sw = `${entry.sw}\n\n${DISCLAIMER_SW}`;
    const en = entry.en ? `${entry.en}\n\n${DISCLAIMER_EN}` : undefined;

    return {
      domain: 'kodi',
      expert: kodiExpert.id,
      text: en ? { sw, en } : { sw },
      confidence,
      sources: [...entry.sources, { label: 'Akili KB — Kodi', ref: 'Laetoli · KODI360' }],
      data: { entry: entry.id, score: s },
    };
  },
};

export default kodiExpert;
