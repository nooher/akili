// Kasuku AI companion — "Uliza Kasuku"
// SOVEREIGN knowledge base. Pure TypeScript data. No external API, no network.
// Powers a bounded, accurate, bilingual (Kiswahili + English) Q&A assistant.
//
// Areas:
//   'app'       — using Kasuku (Jifunze, Soma/Sikiliza, Pulse, Jumuiya, etc.)
//   'kiswahili' — grammar/tense facts (ngeli, viambishi vya nyakati, etc.)
//   'register'  — Kiswahili fasaha vs Kiswahili cha mtaani (Sheng)
//   'fasihi'    — African & Swahili literature facts
//
// Every answer is bilingual { sw, en }, accurate, concise (1–4 sentences),
// and uses Kiswahili fasaha.

export interface KbEntry {
  id: string;
  topic: 'app' | 'kiswahili' | 'fasihi' | 'register' | 'uandishi';
  q: string[];
  a: { sw: string; en: string };
  tags?: string[];
}

export const KNOWLEDGE: KbEntry[] = [
  // ----------------------------------------------------------------------
  // APP — using Kasuku
  // ----------------------------------------------------------------------
  {
    id: 'app-what-is-kasuku',
    topic: 'app',
    q: [
      'Kasuku ni nini?',
      'What is Kasuku?',
      'nini maana ya Kasuku',
      'tell me about Kasuku',
      'this app does what',
    ],
    a: {
      sw: 'Kasuku ni jukwaa la Kiafrika la waandishi na wasomaji — fasihi, mashairi, muziki na sauti, likitilia mkazo Kiswahili. Unaweza kusoma, kusikiliza, kujifunza Kiswahili, na kuungana na jumuiya.',
      en: 'Kasuku is an African creator-and-reader platform for literature, poetry, music and audio, with a Swahili-first focus. You can read, listen, learn Kiswahili, and connect with a community.',
    },
    tags: ['overview', 'home'],
  },
  {
    id: 'app-uliza-kasuku',
    topic: 'app',
    q: [
      'Uliza Kasuku ni nini?',
      'what is Uliza Kasuku',
      'who are you',
      'wewe ni nani',
      'msaidizi ni nani',
    ],
    a: {
      sw: 'Mimi ni Uliza Kasuku, msaidizi wako ndani ya programu. Naweza kukusaidia kutumia Kasuku, kueleza sarufi ya Kiswahili, kutofautisha Kiswahili fasaha na cha mtaani, na kushiriki mambo ya fasihi.',
      en: 'I am Uliza Kasuku, your in-app assistant. I can help you use Kasuku, explain Swahili grammar, distinguish standard from street Swahili, and share facts about literature.',
    },
    tags: ['companion'],
  },
  {
    id: 'app-jifunze-overview',
    topic: 'app',
    q: [
      'Jifunze ni nini?',
      'what is Jifunze',
      'how do I learn Swahili here',
      'nijifunzeje Kiswahili',
      'learning section',
    ],
    a: {
      sw: 'Jifunze ni sehemu ya kujifunza Kiswahili hatua kwa hatua. Imepangwa kwa viwango — Mwanzo hadi Umahiri — kila kimoja kikiwa na Mada na Masomo, mitihani, na cheti baada ya kufaulu.',
      en: 'Jifunze is the section for learning Kiswahili step by step. It is organised into levels — from Mwanzo to Umahiri — each with topics (Mada) and lessons (Somo), exams, and a certificate when you pass.',
    },
    tags: ['jifunze', 'learning'],
  },
  {
    id: 'app-jifunze-levels',
    topic: 'app',
    q: [
      'viwango vya Jifunze ni vipi?',
      'what are the levels',
      'Mwanzo Umahiri',
      'how many levels',
      'level order',
    ],
    a: {
      sw: 'Viwango huanzia Mwanzo (mwanzilishi), kupitia viwango vya kati, hadi Umahiri (ubingwa). Unapanda kiwango baada ya kumaliza masomo na kufaulu mtihani wa kiwango hicho.',
      en: 'Levels run from Mwanzo (beginner), through the intermediate levels, up to Umahiri (mastery). You advance after completing the lessons and passing that level’s exam.',
    },
    tags: ['jifunze', 'levels'],
  },
  {
    id: 'app-jifunze-mada-somo',
    topic: 'app',
    q: [
      'Mada na Somo ni nini?',
      'what is a Mada',
      'what is Somo',
      'topic vs lesson',
      'tofauti ya Mada na Somo',
    ],
    a: {
      sw: 'Mada ni kichwa kikubwa cha mafunzo (kwa mfano, "Salamu" au "Nyakati"), nayo Somo ni funzo moja moja ndani ya Mada hiyo. Mada huwa na Masomo kadhaa.',
      en: 'A Mada is a learning topic (for example, "Greetings" or "Tenses"), and a Somo is a single lesson within that topic. Each Mada contains several Masomo.',
    },
    tags: ['jifunze'],
  },
  {
    id: 'app-jifunze-exam-cheti',
    topic: 'app',
    q: [
      'nitapataje cheti?',
      'how do I get a certificate',
      'cheti cha Kiswahili',
      'mtihani uko wapi',
      'exam and certificate',
    ],
    a: {
      sw: 'Maliza Masomo ya kiwango kisha ufanye mtihani wa kiwango hicho. Ukifaulu, utapata cheti (cheti cha kuhitimu kiwango) kinachoonyesha umahiri wako.',
      en: 'Complete a level’s lessons, then sit that level’s exam. When you pass, you receive a certificate (cheti) recognising your achievement at that level.',
    },
    tags: ['jifunze', 'exam', 'certificate'],
  },
  {
    id: 'app-soma',
    topic: 'app',
    q: [
      'Soma ni nini?',
      'what is Soma',
      'how do I read books',
      'nisomeje vitabu',
      'reader',
    ],
    a: {
      sw: 'Soma ni msomaji wa Kasuku ambapo unasoma vitabu, mashairi na hadithi. Unaweza kurekebisha mwonekano wa maandishi na kuendelea pale ulipoishia.',
      en: 'Soma is the Kasuku reader where you read books, poetry and stories. You can adjust the text appearance and resume where you left off.',
    },
    tags: ['soma', 'reader'],
  },
  {
    id: 'app-sikiliza-sauti',
    topic: 'app',
    q: [
      'Sikiliza ni nini?',
      'Sauti ya Kasuku ni nini?',
      'what is the audiobook',
      'how do I listen',
      'TTS player',
      'kusikiliza kitabu',
    ],
    a: {
      sw: 'Sikiliza hukuwezesha kusikiliza badala ya kusoma, kupitia Sauti ya Kasuku — kisomaji cha sauti kinachosoma maandishi kwa sauti. Ni kama kitabu cha kusikiliza.',
      en: 'Sikiliza lets you listen instead of read, through Sauti ya Kasuku — the voice player that reads the text aloud. It works like an audiobook.',
    },
    tags: ['sikiliza', 'audio', 'tts'],
  },
  {
    id: 'app-pulse',
    topic: 'app',
    q: [
      'Pulse ni nini?',
      'what is Pulse',
      'whats happening feed',
      'mapigo ya jukwaa',
    ],
    a: {
      sw: 'Pulse ni mtiririko wa mambo mapya na yanayovuma kwenye Kasuku — kazi mpya, mialiko na shughuli za jumuiya. Ni mahali pa kuona kinachoendelea.',
      en: 'Pulse is the feed of what is new and trending on Kasuku — fresh works, highlights and community activity. It is where you see what is happening.',
    },
    tags: ['pulse', 'feed'],
  },
  {
    id: 'app-jumuiya',
    topic: 'app',
    q: [
      'Jumuiya ni nini?',
      'what is Jumuiya',
      'community section',
      'how do I connect with others',
      'kuungana na wengine',
    ],
    a: {
      sw: 'Jumuiya ni nafasi ya kijamii ya Kasuku — kuungana na wasomaji na waandishi wengine, kujadili kazi, na kushiriki mawazo. Ni jamii ya wapenzi wa fasihi.',
      en: 'Jumuiya is Kasuku’s community space — connecting with other readers and creators, discussing works, and sharing ideas. It is the community of literature lovers.',
    },
    tags: ['jumuiya', 'community'],
  },
  {
    id: 'app-wataalamu',
    topic: 'app',
    q: [
      'Wataalamu ni nani?',
      'what is Wataalamu',
      'experts section',
      'find a tutor',
      'wataalam wa lugha',
    ],
    a: {
      sw: 'Wataalamu ni sehemu ya kupata wabobezi — walimu, wahariri na wataalamu wa lugha na fasihi wanaoweza kukusaidia kuboresha kazi au ujifunzaji wako.',
      en: 'Wataalamu is where you find experts — teachers, editors and specialists in language and literature who can help you improve your work or learning.',
    },
    tags: ['wataalamu', 'experts'],
  },
  {
    id: 'app-tafsiri',
    topic: 'app',
    q: [
      'Tafsiri ni nini?',
      'what is Tafsiri',
      'translation tool',
      'nitafsirije',
      'translate feature',
    ],
    a: {
      sw: 'Tafsiri ni zana ya kufasiri maneno na misemo baina ya Kiswahili na lugha nyingine, ikikusaidia kuelewa unaposoma au kujifunza.',
      en: 'Tafsiri is the translation tool for words and phrases between Kiswahili and other languages, helping you understand while you read or learn.',
    },
    tags: ['tafsiri', 'translation'],
  },
  {
    id: 'app-creator-studio',
    topic: 'app',
    q: [
      'Creator Studio ni nini?',
      'how do I publish my work',
      'nitachapishaje kazi yangu',
      'studio ya muundaji',
      'become a creator',
    ],
    a: {
      sw: 'Creator Studio ni mahali pa waumbaji kuandaa na kuchapisha kazi zao — vitabu, mashairi, muziki na sauti — kwa wasomaji wa Kasuku.',
      en: 'Creator Studio is where creators prepare and publish their works — books, poetry, music and audio — for Kasuku readers.',
    },
    tags: ['creator', 'studio', 'publish'],
  },
  {
    id: 'app-get-verified',
    topic: 'app',
    q: [
      'nitathibitishwaje?',
      'how do I get verified',
      'verification',
      'alama ya kuthibitishwa',
      'verified badge',
    ],
    a: {
      sw: 'Ili kuthibitishwa, kamilisha wasifu wako na uombe uthibitisho kupitia akaunti yako. Uthibitisho hudhihirisha kuwa muumbaji au mtaalamu ni halisi.',
      en: 'To get verified, complete your profile and request verification from your account. Verification confirms that a creator or expert is genuine.',
    },
    tags: ['verified', 'account'],
  },
  {
    id: 'app-download-books',
    topic: 'app',
    q: [
      'naweza kupakua vitabu?',
      'how do I download books',
      'nipakueje kitabu',
      'offline reading',
      'save book offline',
    ],
    a: {
      sw: 'Unaweza kupakua vitabu ili kuvisoma bila intaneti. Kitabu kilichopakuliwa hubaki kwenye kifaa chako kwa usomaji wa nje ya mtandao.',
      en: 'You can download books to read without an internet connection. A downloaded book stays on your device for offline reading.',
    },
    tags: ['download', 'offline'],
  },
  {
    id: 'app-pwa-install',
    topic: 'app',
    q: [
      'nitasakinishaje Kasuku?',
      'how do I install the app',
      'install PWA',
      'add to home screen',
      'weka kwenye simu',
    ],
    a: {
      sw: 'Kasuku ni programu ya wavuti inayoweza kusakinishwa (PWA). Kwenye kivinjari chako, chagua "Sakinisha" au "Ongeza kwenye skrini ya nyumbani" ili kuiweka kama programu.',
      en: 'Kasuku is an installable web app (PWA). In your browser, choose "Install" or "Add to Home Screen" to keep it like a native app.',
    },
    tags: ['pwa', 'install', 'offline'],
  },
  {
    id: 'app-offline',
    topic: 'app',
    q: [
      'Kasuku inafanya kazi bila intaneti?',
      'does it work offline',
      'offline mode',
      'naweza kutumia bila mtandao',
    ],
    a: {
      sw: 'Ndiyo, baada ya kusakinisha Kasuku na kupakua kazi, unaweza kuendelea kusoma na kusikiliza hata bila intaneti.',
      en: 'Yes. Once Kasuku is installed and your works are downloaded, you can keep reading and listening even without internet.',
    },
    tags: ['offline', 'pwa'],
  },
  {
    id: 'app-account',
    topic: 'app',
    q: [
      'nitafungua akaunti vipi?',
      'how do I create an account',
      'sign up',
      'jisajili',
      'manage my account',
    ],
    a: {
      sw: 'Fungua akaunti ili kuhifadhi maendeleo yako, vitabu na vyeti. Kupitia wasifu wako unaweza kusimamia taarifa zako na mipangilio.',
      en: 'Create an account to save your progress, books and certificates. From your profile you can manage your details and settings.',
    },
    tags: ['account', 'profile'],
  },
  {
    id: 'app-silt-book',
    topic: 'app',
    q: [
      'kitabu cha What the Fish Knew',
      'SILT book',
      'novel by Anaim',
      'kuna kitabu gani',
      'founder novel',
    ],
    a: {
      sw: 'Kasuku ina riwaya "What the Fish Knew" (SILT, Kitabu cha Kwanza) iliyoandikwa na Anaim. Unaweza kuisoma katika Soma au kuisikiliza kupitia Sauti ya Kasuku.',
      en: 'Kasuku features the novel "What the Fish Knew" (SILT, Book One) by Anaim. You can read it in Soma or listen via Sauti ya Kasuku.',
    },
    tags: ['silt', 'book', 'reader'],
  },
  {
    id: 'app-music-audio',
    topic: 'app',
    q: [
      'naweza kusikiliza muziki?',
      'is there music',
      'muziki na sauti',
      'audio works',
    ],
    a: {
      sw: 'Ndiyo. Mbali na fasihi, Kasuku hubeba muziki na kazi za sauti kutoka kwa waumbaji wa Kiafrika, vyote kwa msisitizo wa Kiswahili.',
      en: 'Yes. Beyond literature, Kasuku carries music and audio works from African creators, all with a Swahili-first emphasis.',
    },
    tags: ['music', 'audio'],
  },

  // ----------------------------------------------------------------------
  // KISWAHILI — grammar / tense facts
  // ----------------------------------------------------------------------
  {
    id: 'sw-ngeli-what',
    topic: 'kiswahili',
    q: [
      'ngeli ni nini?',
      'what are noun classes',
      'noun class system',
      'aina za majina',
      'what is ngeli',
    ],
    a: {
      sw: 'Ngeli ni makundi ya nomino katika Kiswahili. Kila ngeli ina viambishi vyake vya umoja na wingi vinavyoamua upatanisho wa kisarufi (vivumishi, vitenzi, viwakilishi). Mfano: mtu/watu (ngeli ya A-WA).',
      en: 'Ngeli are the noun classes of Kiswahili. Each class has singular and plural prefixes that govern grammatical agreement (adjectives, verbs, pronouns). Example: mtu/watu (the A-WA class).',
    },
    tags: ['ngeli', 'nouns'],
  },
  {
    id: 'sw-ngeli-mwa',
    topic: 'kiswahili',
    q: [
      'ngeli ya M-WA',
      'A-WA class',
      'mtu watu',
      'people class',
      'class for humans',
    ],
    a: {
      sw: 'Ngeli ya M-/WA- (A-WA) ni ya watu na viumbe hai vingi: umoja huanza na m- na wingi na wa-. Mfano: mtoto → watoto, mwalimu → walimu.',
      en: 'The M-/WA- (A-WA) class is for people and most living beings: the singular begins with m- and the plural with wa-. Example: mtoto → watoto (child → children), mwalimu → walimu.',
    },
    tags: ['ngeli', 'plural'],
  },
  {
    id: 'sw-ngeli-miti',
    topic: 'kiswahili',
    q: [
      'ngeli ya M-MI',
      'mti miti class',
      'tree class',
      'U-I class',
    ],
    a: {
      sw: 'Ngeli ya M-/MI- ni ya miti na vitu vingi visivyo na uhai mahususi: umoja m-, wingi mi-. Mfano: mti → miti, mkono → mikono, mji → miji.',
      en: 'The M-/MI- class covers trees and many inanimate things: singular m-, plural mi-. Example: mti → miti (tree → trees), mkono → mikono (hand → hands).',
    },
    tags: ['ngeli', 'plural'],
  },
  {
    id: 'sw-ngeli-kivi',
    topic: 'kiswahili',
    q: [
      'ngeli ya KI-VI',
      'kitu vitu class',
      'thing class',
      'ki vi plural',
    ],
    a: {
      sw: 'Ngeli ya KI-/VI- ni ya vitu vingi: umoja ki-, wingi vi-. Mfano: kitabu → vitabu, kiti → viti, kisu → visu. (Baadhi huwa ch-/vy-: chakula → vyakula.)',
      en: 'The KI-/VI- class is for many objects: singular ki-, plural vi-. Example: kitabu → vitabu (book → books), kiti → viti (chair → chairs). (Some take ch-/vy-: chakula → vyakula.)',
    },
    tags: ['ngeli', 'plural'],
  },
  {
    id: 'sw-ngeli-njn',
    topic: 'kiswahili',
    q: [
      'ngeli ya N',
      'N class',
      'nyumba class',
      'same singular plural',
    ],
    a: {
      sw: 'Ngeli ya N- mara nyingi huwa na umbo moja kwa umoja na wingi; idadi hutambulika kwa upatanisho. Mfano: nyumba (moja na nyingi), ndizi, kalamu → kalamu.',
      en: 'The N- class often has the same form in singular and plural; number is shown by agreement. Example: nyumba (one and many houses), ndizi (banana/bananas), kalamu → kalamu.',
    },
    tags: ['ngeli', 'plural'],
  },
  {
    id: 'sw-ngeli-jima',
    topic: 'kiswahili',
    q: [
      'ngeli ya JI-MA',
      'LI-YA class',
      'jicho macho',
      'ji ma plural',
    ],
    a: {
      sw: 'Ngeli ya JI-/MA- (LI-YA): wingi huchukua ma-. Mfano: jicho → macho, gari → magari, tunda → matunda, jiwe → mawe.',
      en: 'The JI-/MA- (LI-YA) class: the plural takes ma-. Example: jicho → macho (eye → eyes), gari → magari (car → cars), tunda → matunda (fruit → fruits).',
    },
    tags: ['ngeli', 'plural'],
  },
  {
    id: 'sw-ngeli-uni',
    topic: 'kiswahili',
    q: [
      'ngeli ya U',
      'U class',
      'ufunguo class',
      'u ny plural',
    ],
    a: {
      sw: 'Ngeli ya U- mara nyingi huwa na umoja u- na wingi katika ngeli ya N-. Mfano: ufunguo → funguo, ukuta → kuta, uimbo/wimbo → nyimbo.',
      en: 'The U- class typically has singular u- with a plural in the N- class. Example: ufunguo → funguo (key → keys), ukuta → kuta (wall → walls), wimbo → nyimbo (song → songs).',
    },
    tags: ['ngeli', 'plural'],
  },
  {
    id: 'sw-ngeli-pahali',
    topic: 'kiswahili',
    q: [
      'ngeli ya PA-KU-MU',
      'place class',
      'mahali ngeli',
      'locative class',
    ],
    a: {
      sw: 'Ngeli ya mahali (PA-/KU-/MU-) hutumika kwa nomino ya mahali kama "mahali" na huelezea ukaribu (pa-), umbali/jumla (ku-), na ndani (mu-). Mfano: mahali pazuri, kunako, mna watu.',
      en: 'The locative class (PA-/KU-/MU-) is used for place, as with "mahali", expressing nearness (pa-), general/distant (ku-), and inside (mu-). Example: mahali pazuri (a good place), mna watu (there are people inside).',
    },
    tags: ['ngeli', 'locative'],
  },
  {
    id: 'sw-tense-overview',
    topic: 'kiswahili',
    q: [
      'viambishi vya nyakati',
      'tense markers in Swahili',
      'nyakati za Kiswahili',
      'how do tenses work',
      'na li ta me',
    ],
    a: {
      sw: 'Nyakati za Kiswahili huonyeshwa kwa kiambishi katikati ya kitenzi: -na- (sasa), -li- (wakati uliopita), -ta- (ujao), -me- (timilifu), na hu- (mazoea). Mfano: ninasoma, nilisoma, nitasoma, nimesoma, husoma.',
      en: 'Swahili tense is shown by an infix inside the verb: -na- (present), -li- (past), -ta- (future), -me- (perfect), and hu- (habitual). Example: ninasoma (I am reading), nilisoma (I read/past), nitasoma (I will read), nimesoma (I have read), husoma (I usually read).',
    },
    tags: ['tense', 'verb'],
  },
  {
    id: 'sw-tense-na',
    topic: 'kiswahili',
    q: [
      'kiambishi -na-',
      'present tense Swahili',
      'na tense',
      'wakati uliopo',
    ],
    a: {
      sw: 'Kiambishi -na- huonyesha wakati uliopo (sasa) — kitendo kinachoendelea au kweli ya sasa. Mfano: anacheza (anacheza sasa), tunakula.',
      en: 'The marker -na- shows the present tense — an action happening now or a current fact. Example: anacheza (he/she is playing), tunakula (we are eating).',
    },
    tags: ['tense', 'present'],
  },
  {
    id: 'sw-tense-li',
    topic: 'kiswahili',
    q: [
      'kiambishi -li-',
      'past tense Swahili',
      'li tense',
      'wakati uliopita',
    ],
    a: {
      sw: 'Kiambishi -li- huonyesha wakati uliopita — kitendo kilichotokea na kukamilika. Mfano: alikuja (alikuja jana), tulisoma.',
      en: 'The marker -li- shows the past tense — an action that happened and finished. Example: alikuja (he/she came), tulisoma (we read/studied).',
    },
    tags: ['tense', 'past'],
  },
  {
    id: 'sw-tense-ta',
    topic: 'kiswahili',
    q: [
      'kiambishi -ta-',
      'future tense Swahili',
      'ta tense',
      'wakati ujao',
    ],
    a: {
      sw: 'Kiambishi -ta- huonyesha wakati ujao — kitendo kitakachotokea. Mfano: nitakwenda (nitakwenda kesho), watasoma.',
      en: 'The marker -ta- shows the future tense — an action that will happen. Example: nitakwenda (I will go), watasoma (they will read).',
    },
    tags: ['tense', 'future'],
  },
  {
    id: 'sw-tense-me',
    topic: 'kiswahili',
    q: [
      'kiambishi -me-',
      'perfect tense Swahili',
      'me tense',
      'timilifu',
      'have done',
    ],
    a: {
      sw: 'Kiambishi -me- huonyesha hali timilifu — kitendo kimekamilika na matokeo yake yapo sasa. Mfano: amefika (yuko hapa sasa), nimemaliza.',
      en: 'The marker -me- shows the perfect — an action completed with present relevance. Example: amefika (he/she has arrived, is here now), nimemaliza (I have finished).',
    },
    tags: ['tense', 'perfect'],
  },
  {
    id: 'sw-tense-hu',
    topic: 'kiswahili',
    q: [
      'kiambishi hu-',
      'habitual tense Swahili',
      'hu tense',
      'mazoea',
      'usually do',
    ],
    a: {
      sw: 'Kiambishi hu- huonyesha mazoea — jambo linalofanyika mara kwa mara. Halichukui kiambishi cha nafsi. Mfano: husoma kila siku, paka hula samaki.',
      en: 'The marker hu- shows habitual action — something done regularly. It takes no subject prefix. Example: husoma kila siku (he/she reads every day), paka hula samaki (cats eat fish).',
    },
    tags: ['tense', 'habitual'],
  },
  {
    id: 'sw-subject-prefixes',
    topic: 'kiswahili',
    q: [
      'viambishi vya nafsi',
      'subject prefixes',
      'ni u a tu m wa',
      'person markers',
      'how do I say I you he',
    ],
    a: {
      sw: 'Viambishi vya nafsi (kwa watu): ni- (mimi), u- (wewe), a- (yeye), tu- (sisi), m- (ninyi), wa- (wao). Huja mwanzoni mwa kitenzi. Mfano: ninasoma, unasoma, anasoma, tunasoma, mnasoma, wanasoma.',
      en: 'Subject prefixes (for people): ni- (I), u- (you sg.), a- (he/she), tu- (we), m- (you pl.), wa- (they). They come at the start of the verb. Example: ninasoma, unasoma, anasoma, tunasoma, mnasoma, wanasoma.',
    },
    tags: ['subject', 'verb', 'person'],
  },
  {
    id: 'sw-verb-structure',
    topic: 'kiswahili',
    q: [
      'muundo wa kitenzi',
      'verb structure Swahili',
      'how is a verb built',
      'parts of a verb',
    ],
    a: {
      sw: 'Kitenzi cha Kiswahili hujengwa kwa mpangilio: nafsi + wakati + mzizi (na viambishi vingine). Mfano: a-na-soma = a (yeye) + na (sasa) + soma. Kwa shamirisho: a-na-ki-soma = anakisoma.',
      en: 'A Swahili verb is built as: subject + tense + root (plus other markers). Example: a-na-soma = a (he/she) + na (present) + soma. With an object: a-na-ki-soma (he/she is reading it).',
    },
    tags: ['verb', 'structure'],
  },
  {
    id: 'sw-tense-vs-english',
    topic: 'kiswahili',
    q: [
      'tofauti ya nyakati Kiswahili na Kiingereza',
      'how Swahili tense differs from English',
      'why no word for is',
      'Swahili vs English grammar',
    ],
    a: {
      sw: 'Tofauti na Kiingereza kinachotumia maneno tofauti na vitenzi visaidizi, Kiswahili huonyesha nafsi, wakati na shamirisho ndani ya kitenzi kimoja. Mfano: "nitakupenda" = neno moja kwa "I will love you".',
      en: 'Unlike English, which uses separate words and auxiliary verbs, Swahili packs subject, tense and object into a single verb. Example: "nitakupenda" is one word for "I will love you".',
    },
    tags: ['tense', 'contrast', 'english'],
  },
  {
    id: 'sw-possessives',
    topic: 'kiswahili',
    q: [
      'milki katika Kiswahili',
      'possessives Swahili',
      'how to say my your his',
      'wangu wako wake',
      '-a unganifu',
    ],
    a: {
      sw: 'Milki huundwa kwa kiunganishi -a + mzizi wa nafsi: -angu, -ako, -ake, -etu, -enu, -ao, na hupatana na ngeli. Mfano: kitabu changu, watoto wangu, nyumba yangu.',
      en: 'Possessives use the -a linker + a personal root: -angu, -ako, -ake, -etu, -enu, -ao, agreeing with the noun class. Example: kitabu changu (my book), watoto wangu (my children), nyumba yangu (my house).',
    },
    tags: ['possessive', 'agreement'],
  },
  {
    id: 'sw-a-unganifu',
    topic: 'kiswahili',
    q: [
      '-a unganifu ni nini',
      'the associative a',
      'a of connection',
      'cha ya wa la',
      'genitive a',
    ],
    a: {
      sw: 'Kiunganishi -a ("cha/ya/wa/la/za...") huonyesha uhusiano au umiliki kati ya nomino mbili, kikipatana na ngeli ya nomino ya kwanza. Mfano: kitabu cha mwalimu, nyumba ya jirani, watoto wa shule.',
      en: 'The associative -a ("cha/ya/wa/la/za...") links two nouns showing relationship or possession, agreeing with the first noun’s class. Example: kitabu cha mwalimu (the teacher’s book), nyumba ya jirani (the neighbour’s house).',
    },
    tags: ['associative', 'agreement'],
  },
  {
    id: 'sw-negation',
    topic: 'kiswahili',
    q: [
      'ukanushaji Kiswahili',
      'negative verbs Swahili',
      'how to say not',
      'sina sitaki',
      'negation',
    ],
    a: {
      sw: 'Ukanushaji hubadilisha kitenzi: nafsi ya kwanza huchukua ha- kuwa si-, na mwisho -a hubadilika kuwa -i kwa wakati uliopo. Mfano: ninasoma → sisomi; anakuja → haji.',
      en: 'Negation reshapes the verb: the first-person ha- becomes si-, and the final -a changes to -i in the present. Example: ninasoma → sisomi (I am not reading); anakuja → haji (he/she is not coming).',
    },
    tags: ['negation', 'verb'],
  },
  {
    id: 'sw-imperative',
    topic: 'kiswahili',
    q: [
      'amri katika Kiswahili',
      'imperative Swahili',
      'how to give commands',
      'soma njoo',
      'commands',
    ],
    a: {
      sw: 'Amri ya umoja hutumia mzizi wa kitenzi pekee; wingi huongeza -ni. Mfano: Soma! (mmoja) → Someni! (wengi); Njoo! → Njooni! Vitenzi vya silabi moja hubaki na ku-: Kula!',
      en: 'Singular commands use the bare verb root; the plural adds -ni. Example: Soma! (read, to one) → Someni! (to many); Njoo! → Njooni! Monosyllabic verbs keep ku-: Kula! (eat).',
    },
    tags: ['imperative', 'verb'],
  },
  {
    id: 'sw-ng-apostrophe',
    topic: 'kiswahili',
    q: [
      'tofauti ya ng na ng\'',
      'ng vs ng apostrophe',
      'what is the ng sound',
      'ngombe ngaa',
      'velar nasal',
    ],
    a: {
      sw: 'Andiko "ng\'" (lenye kibainishi) ni sauti moja ya nazali (kama mwisho wa "sing" Kiingereza), mfano: ng\'ombe, ng\'aa. Bila kibainishi, "ng" ni sauti mbili (n + g), mfano: ngoma, anga.',
      en: 'Written "ng\'" (with the apostrophe) is a single nasal sound (like the end of English "sing"), e.g. ng\'ombe (cow), ng\'aa (shine). Without the mark, "ng" is two sounds (n + g), e.g. ngoma (drum), anga (sky).',
    },
    tags: ['phonology', 'spelling', 'ng'],
  },
  {
    id: 'sw-adjective-agreement',
    topic: 'kiswahili',
    q: [
      'upatanisho wa kivumishi',
      'adjective agreement Swahili',
      'how adjectives change',
      'mzuri wazuri',
    ],
    a: {
      sw: 'Vivumishi hupatana na ngeli ya nomino. Mfano wa "-zuri": mtu mzuri → watu wazuri, kitu kizuri → vitu vizuri, nyumba nzuri.',
      en: 'Adjectives agree with the noun’s class. For "-zuri" (good/beautiful): mtu mzuri → watu wazuri, kitu kizuri → vitu vizuri, nyumba nzuri.',
    },
    tags: ['adjective', 'agreement'],
  },
  {
    id: 'sw-object-infix',
    topic: 'kiswahili',
    q: [
      'shamirisho katika kitenzi',
      'object infix Swahili',
      'how to say it him her in the verb',
      'ninakupenda',
    ],
    a: {
      sw: 'Shamirisho (kitu/mtu kinachotendewa) huingia kati ya wakati na mzizi. Mfano: ni-na-ku-penda (ninakupenda), a-li-ni-ona (aliniona), tu-ta-wa-saidia.',
      en: 'The object marker goes between the tense and the root. Example: ni-na-ku-penda (I love you), a-li-ni-ona (he/she saw me), tu-ta-wa-saidia (we will help them).',
    },
    tags: ['object', 'verb'],
  },
  {
    id: 'sw-monosyllabic-ku',
    topic: 'kiswahili',
    q: [
      'vitenzi vya silabi moja',
      'monosyllabic verbs Swahili',
      'why kula not la',
      'ku in verbs',
    ],
    a: {
      sw: 'Vitenzi vifupi (silabi moja) huhifadhi ku- vinapotamkwa katika baadhi ya nyakati. Mfano: kula → ninakula, nilikula; kunywa → atakunywa.',
      en: 'Short (monosyllabic) verbs keep ku- in certain tenses. Example: kula (to eat) → ninakula, nilikula; kunywa (to drink) → atakunywa.',
    },
    tags: ['verb', 'monosyllabic'],
  },
  {
    id: 'sw-greetings-grammar',
    topic: 'kiswahili',
    q: [
      'salamu za Kiswahili',
      'Swahili greetings',
      'habari shikamoo',
      'how to greet',
    ],
    a: {
      sw: 'Salamu rasmi: "Habari yako?" (jibu: "Nzuri"). Kwa heshima kwa mkubwa: "Shikamoo" (jibu: "Marahaba"). Asubuhi: "Habari za asubuhi?".',
      en: 'Standard greeting: "Habari yako?" (reply: "Nzuri"). Respectful, to an elder: "Shikamoo" (reply: "Marahaba"). Morning: "Habari za asubuhi?".',
    },
    tags: ['greetings', 'register'],
  },

  // ----------------------------------------------------------------------
  // REGISTER — Kiswahili fasaha vs Kiswahili cha mtaani (Sheng)
  // ----------------------------------------------------------------------
  {
    id: 'reg-what-is-fasaha',
    topic: 'register',
    q: [
      'Kiswahili fasaha ni nini?',
      'what is standard Swahili',
      'fasaha maana yake',
      'formal Swahili',
    ],
    a: {
      sw: 'Kiswahili fasaha ni Kiswahili sanifu, rasmi na cha kifasihi — kinachotumika shuleni, kwenye vitabu, habari na mawasiliano rasmi. Ndicho kinachofundishwa katika Jifunze.',
      en: 'Kiswahili fasaha is standard, formal, literary Swahili — used in school, books, news and official communication. It is what Jifunze teaches.',
    },
    tags: ['fasaha', 'standard'],
  },
  {
    id: 'reg-what-is-mtaani',
    topic: 'register',
    q: [
      'Kiswahili cha mtaani ni nini?',
      'what is Sheng',
      'street Swahili',
      'mtaani maana yake',
      'slang Swahili',
    ],
    a: {
      sw: 'Kiswahili cha mtaani (Sheng) ni lugha ya kawaida ya mjini, isiyo rasmi, ya vijana na maongezi ya kirafiki. Hubadilika haraka na huchanganya Kiswahili, Kiingereza na lugha za jamii.',
      en: 'Kiswahili cha mtaani (Sheng) is casual urban speech — informal, youthful and friendly. It changes quickly and blends Swahili, English and community languages.',
    },
    tags: ['mtaani', 'sheng', 'slang'],
  },
  {
    id: 'reg-when-to-use',
    topic: 'register',
    q: [
      'lini nitumie fasaha au mtaani',
      'when to use formal vs street Swahili',
      'which register to use',
      'fasaha au mtaani',
    ],
    a: {
      sw: 'Tumia Kiswahili fasaha kwa shule, kazi, maandishi rasmi na watu wakubwa. Tumia Kiswahili cha mtaani kwa marafiki na mazingira yasiyo rasmi. Kasuku hufundisha fasaha, lakini hutambua mtaani.',
      en: 'Use Kiswahili fasaha for school, work, formal writing and elders. Use Kiswahili cha mtaani with friends and informal settings. Kasuku teaches fasaha while recognising mtaani.',
    },
    tags: ['register', 'usage'],
  },
  {
    id: 'reg-greeting',
    topic: 'register',
    q: [
      'Habari yako vs Mambo',
      'formal greeting vs slang greeting',
      'how to say hi casually',
      'Vipi Niaje Mambo',
    ],
    a: {
      sw: 'Fasaha: "Habari yako?" → Mtaani: "Mambo?", "Vipi?", "Niaje?". Salamu za mtaani ni za kirafiki; "Habari yako?" ni rasmi na salama kwa kila mtu.',
      en: 'Fasaha: "Habari yako?" → Mtaani: "Mambo?", "Vipi?", "Niaje?". The street greetings are friendly; "Habari yako?" is formal and safe with anyone.',
    },
    tags: ['pair', 'greeting'],
  },
  {
    id: 'reg-friend',
    topic: 'register',
    q: [
      'rafiki vs beste',
      'friend in street Swahili',
      'how to say friend casually',
      'beste maana',
    ],
    a: {
      sw: 'Fasaha: "rafiki" → Mtaani: "beste", "msee", "buda". "Rafiki" hufaa kila mahali; "beste" ni cha kirafiki kati ya vijana.',
      en: 'Fasaha: "rafiki" (friend) → Mtaani: "beste", "msee", "buda". "Rafiki" fits everywhere; "beste" is casual among young people.',
    },
    tags: ['pair', 'vocabulary'],
  },
  {
    id: 'reg-money',
    topic: 'register',
    q: [
      'pesa vs doo',
      'money in slang Swahili',
      'how to say money casually',
      'doo mulla',
    ],
    a: {
      sw: 'Fasaha: "pesa" / "fedha" → Mtaani: "doo", "mulla", "ganji". Katika maandishi na mahojiano rasmi tumia "pesa" au "fedha".',
      en: 'Fasaha: "pesa" / "fedha" (money) → Mtaani: "doo", "mulla", "ganji". In writing and formal contexts use "pesa" or "fedha".',
    },
    tags: ['pair', 'vocabulary'],
  },
  {
    id: 'reg-good',
    topic: 'register',
    q: [
      'mzuri vs poa',
      'good in slang Swahili',
      'how to say cool',
      'poa fiti',
    ],
    a: {
      sw: 'Fasaha: "-zuri" / "vizuri" → Mtaani: "poa", "fiti", "safi". Mfano: "Nzuri" (fasaha) → "Poa" (mtaani) ukiulizwa hali yako.',
      en: 'Fasaha: "-zuri" / "vizuri" (good/well) → Mtaani: "poa", "fiti", "safi". Example: "Nzuri" (fasaha) → "Poa" (mtaani) when asked how you are.',
    },
    tags: ['pair', 'vocabulary'],
  },
  {
    id: 'reg-girl-woman',
    topic: 'register',
    q: [
      'msichana vs dem',
      'girl in slang',
      'how to say girl casually',
      'dame manzi',
    ],
    a: {
      sw: 'Fasaha: "msichana" / "binti" → Mtaani: "dem", "manzi", "dame". Katika fasihi na heshima tumia "msichana" au "binti".',
      en: 'Fasaha: "msichana" / "binti" (girl) → Mtaani: "dem", "manzi", "dame". In literature and respectful speech use "msichana" or "binti".',
    },
    tags: ['pair', 'vocabulary'],
  },
  {
    id: 'reg-boy-man',
    topic: 'register',
    q: [
      'kijana vs msee',
      'guy in slang',
      'how to say guy man casually',
      'manze boyz',
    ],
    a: {
      sw: 'Fasaha: "kijana" / "mwanaume" → Mtaani: "msee", "manze", "buda". "Kijana" ni cha heshima; "msee" ni cha kirafiki.',
      en: 'Fasaha: "kijana" / "mwanaume" (young man/man) → Mtaani: "msee", "manze", "buda". "Kijana" is respectful; "msee" is casual.',
    },
    tags: ['pair', 'vocabulary'],
  },
  {
    id: 'reg-food',
    topic: 'register',
    q: [
      'chakula vs dishi',
      'food in slang',
      'how to say food casually',
      'dishi maana',
    ],
    a: {
      sw: 'Fasaha: "chakula" → Mtaani: "dishi". Mfano: "Tule chakula" (fasaha) → "Tudishi" / "Tule dishi" (mtaani).',
      en: 'Fasaha: "chakula" (food) → Mtaani: "dishi". Example: "Tule chakula" (let’s eat, fasaha) → "Tule dishi" (mtaani).',
    },
    tags: ['pair', 'vocabulary'],
  },
  {
    id: 'reg-city-town',
    topic: 'register',
    q: [
      'mjini vs mtaa',
      'town in slang',
      'how to say in town casually',
      'tao mtaa',
    ],
    a: {
      sw: 'Fasaha: "mjini" / "mji" → Mtaani: "tao" (kutoka "town"), "mtaa" (kwa kitongoji). Maandishi rasmi hutumia "mjini".',
      en: 'Fasaha: "mjini" / "mji" (in town/city) → Mtaani: "tao" (from "town"), "mtaa" (neighbourhood). Formal writing uses "mjini".',
    },
    tags: ['pair', 'vocabulary'],
  },
  {
    id: 'reg-understand',
    topic: 'register',
    q: [
      'kuelewa vs kuget',
      'understand in slang',
      'how to say I get it casually',
      'nimeget',
    ],
    a: {
      sw: 'Fasaha: "kuelewa" → Mtaani: "kuget" (kutoka Kiingereza "get"). Mfano: "Nimeelewa" (fasaha) → "Nimeget" (mtaani).',
      en: 'Fasaha: "kuelewa" (to understand) → Mtaani: "kuget" (from English "get"). Example: "Nimeelewa" (fasaha) → "Nimeget" (mtaani).',
    },
    tags: ['pair', 'vocabulary'],
  },
  {
    id: 'reg-yes-okay',
    topic: 'register',
    q: [
      'sawa vs sawasawa',
      'okay in slang',
      'how to say okay casually',
      'mzuka sawa',
    ],
    a: {
      sw: 'Fasaha: "Sawa" / "Vyema" → Mtaani: "Poa", "Fiti", "Mzuka mzuri". "Sawa" hufaa kila mahali kama makubaliano.',
      en: 'Fasaha: "Sawa" / "Vyema" (okay/fine) → Mtaani: "Poa", "Fiti". "Sawa" works everywhere as agreement.',
    },
    tags: ['pair', 'vocabulary'],
  },
  {
    id: 'reg-house-home',
    topic: 'register',
    q: [
      'nyumbani vs keja',
      'home in slang',
      'how to say home casually',
      'keja maana',
    ],
    a: {
      sw: 'Fasaha: "nyumbani" / "nyumba" → Mtaani: "keja", "mtaa". Mfano: "Niko nyumbani" (fasaha) → "Niko keja" (mtaani).',
      en: 'Fasaha: "nyumbani" / "nyumba" (home/house) → Mtaani: "keja". Example: "Niko nyumbani" (fasaha) → "Niko keja" (mtaani).',
    },
    tags: ['pair', 'vocabulary'],
  },
  {
    id: 'reg-car',
    topic: 'register',
    q: [
      'gari vs ndai',
      'car in slang',
      'how to say car casually',
      'ndai maana',
    ],
    a: {
      sw: 'Fasaha: "gari" / "motokaa" → Mtaani: "ndai", "mali". Maandishi na habari hutumia "gari".',
      en: 'Fasaha: "gari" / "motokaa" (car) → Mtaani: "ndai". Writing and news use "gari".',
    },
    tags: ['pair', 'vocabulary'],
  },
  {
    id: 'reg-talk',
    topic: 'register',
    q: [
      'kuongea vs kupiga story',
      'talk chat in slang',
      'how to say chat casually',
      'kupiga story',
    ],
    a: {
      sw: 'Fasaha: "kuzungumza" / "kuongea" → Mtaani: "kupiga story", "kustori". Mfano: "Tuzungumze" (fasaha) → "Tupige story" (mtaani).',
      en: 'Fasaha: "kuzungumza" / "kuongea" (to talk) → Mtaani: "kupiga story", "kustori". Example: "Tuzungumze" (fasaha) → "Tupige story" (mtaani).',
    },
    tags: ['pair', 'vocabulary'],
  },
  {
    id: 'reg-thanks',
    topic: 'register',
    q: [
      'asante vs sawa sana',
      'thanks in slang',
      'how to say thanks casually',
      'shukran asante',
    ],
    a: {
      sw: 'Fasaha: "Asante" / "Asante sana" / "Nashukuru" → Mtaani: mara nyingi "Poa", "Sawa", au "Ahsante" kwa wepesi. Katika heshima na maandishi, tumia "Asante".',
      en: 'Fasaha: "Asante" / "Nashukuru" (thank you) → Mtaani: often a light "Poa" or "Sawa". For respect and writing, use "Asante".',
    },
    tags: ['pair', 'vocabulary'],
  },
  {
    id: 'reg-problem',
    topic: 'register',
    q: [
      'tatizo vs noma',
      'problem trouble in slang',
      'how to say problem casually',
      'noma maana',
    ],
    a: {
      sw: 'Fasaha: "tatizo" / "shida" → Mtaani: "noma", "stori mbaya". Mfano: "Kuna tatizo" (fasaha) → "Kuna noma" (mtaani).',
      en: 'Fasaha: "tatizo" / "shida" (problem) → Mtaani: "noma". Example: "Kuna tatizo" (fasaha) → "Kuna noma" (mtaani).',
    },
    tags: ['pair', 'vocabulary'],
  },
  {
    id: 'reg-cool-nice',
    topic: 'register',
    q: [
      'nzuri sana vs moto',
      'awesome in slang',
      'how to say awesome casually',
      'moto kali',
    ],
    a: {
      sw: 'Fasaha: "nzuri sana" / "bora" → Mtaani: "moto", "kali", "fiti". Mfano: "Wimbo huu ni mzuri sana" → "Wimbo huu ni moto".',
      en: 'Fasaha: "nzuri sana" / "bora" (very good/excellent) → Mtaani: "moto", "kali", "fiti". Example: "Wimbo huu ni mzuri sana" → "Wimbo huu ni moto" (this song is fire).',
    },
    tags: ['pair', 'vocabulary'],
  },

  // ----------------------------------------------------------------------
  // FASIHI — African & Swahili literature
  // ----------------------------------------------------------------------
  {
    id: 'fasihi-shaaban-robert',
    topic: 'fasihi',
    q: [
      'Shaaban Robert ni nani?',
      'who is Shaaban Robert',
      'father of Swahili literature',
      'baba wa fasihi ya Kiswahili',
    ],
    a: {
      sw: 'Shaaban Robert (1909–1962) alikuwa mwandishi na mshairi wa Kitanzania anayeheshimika sana, mara nyingi huitwa "baba wa fasihi ya Kiswahili". Miongoni mwa kazi zake ni "Kusadikika" na "Adili na Nduguze".',
      en: 'Shaaban Robert (1909–1962) was a revered Tanzanian writer and poet, often called the "father of Swahili literature". His works include "Kusadikika" and "Adili na Nduguze".',
    },
    tags: ['author', 'tanzania', 'swahili'],
  },
  {
    id: 'fasihi-kezilahabi',
    topic: 'fasihi',
    q: [
      'Euphrase Kezilahabi ni nani?',
      'who is Kezilahabi',
      'Rosa Mistika author',
      'free verse Swahili',
    ],
    a: {
      sw: 'Euphrase Kezilahabi (1944–2020) alikuwa mwandishi na mwanazuoni wa Kitanzania, mwanzilishi wa ushairi huru wa Kiswahili. Riwaya yake maarufu ni "Rosa Mistika".',
      en: 'Euphrase Kezilahabi (1944–2020) was a Tanzanian writer and scholar, a pioneer of free verse in Swahili poetry. His best-known novel is "Rosa Mistika".',
    },
    tags: ['author', 'tanzania', 'poetry'],
  },
  {
    id: 'fasihi-ngugi',
    topic: 'fasihi',
    q: [
      'Ngugi wa Thiong\'o ni nani?',
      'who is Ngugi wa Thiongo',
      'Weep Not Child author',
      'Decolonising the Mind',
    ],
    a: {
      sw: 'Ngũgĩ wa Thiong\'o (mzaliwa 1938) ni mwandishi wa Kikenya mashuhuri anayetetea uandishi kwa lugha za Kiafrika (Kikuyu). Kazi zake ni pamoja na "Weep Not, Child" na insha "Decolonising the Mind".',
      en: 'Ngũgĩ wa Thiong\'o (born 1938) is a celebrated Kenyan writer who champions writing in African languages (Gĩkũyũ). His works include "Weep Not, Child" and the essays "Decolonising the Mind".',
    },
    tags: ['author', 'kenya', 'language'],
  },
  {
    id: 'fasihi-achebe',
    topic: 'fasihi',
    q: [
      'Chinua Achebe ni nani?',
      'who is Chinua Achebe',
      'Things Fall Apart',
      'Nigerian writer',
    ],
    a: {
      sw: 'Chinua Achebe (1930–2013) alikuwa mwandishi wa Kinaijeria, maarufu kwa riwaya "Things Fall Apart" (1958) inayosimulia athari za ukoloni kwa jamii ya Kiigbo. Anachukuliwa kuwa baba wa riwaya ya Kiafrika ya kisasa.',
      en: 'Chinua Achebe (1930–2013) was a Nigerian writer famous for "Things Fall Apart" (1958), which depicts colonialism’s impact on Igbo society. He is regarded as a father of the modern African novel.',
    },
    tags: ['author', 'nigeria', 'novel'],
  },
  {
    id: 'fasihi-things-fall-apart',
    topic: 'fasihi',
    q: [
      'Things Fall Apart inahusu nini?',
      'what is Things Fall Apart about',
      'Okonkwo story',
      'kitabu Things Fall Apart',
    ],
    a: {
      sw: '"Things Fall Apart" husimulia maisha ya Okonkwo, shujaa katika kijiji cha Kiigbo, na jinsi ujio wa wakoloni na wamisionari unavyovuruga utamaduni wake. Ni mojawapo ya riwaya zinazosomwa sana barani Afrika.',
      en: '"Things Fall Apart" tells of Okonkwo, a strong man in an Igbo village, and how the arrival of colonialists and missionaries unravels his culture. It is one of Africa’s most widely read novels.',
    },
    tags: ['novel', 'nigeria'],
  },
  {
    id: 'fasihi-utenzi',
    topic: 'fasihi',
    q: [
      'utenzi ni nini?',
      'what is utenzi',
      'Swahili epic poetry',
      'tenzi',
    ],
    a: {
      sw: 'Utenzi (wingi: tenzi) ni shairi refu la kimapokeo la Kiswahili linalosimulia hadithi au mafundisho, mara nyingi la kidini au kihistoria. Mfano maarufu ni "Utenzi wa Mwana Kupona".',
      en: 'An utenzi (plural: tenzi) is a long traditional Swahili narrative poem telling a story or teaching, often religious or historical. A famous example is "Utenzi wa Mwana Kupona".',
    },
    tags: ['poetry', 'form', 'swahili'],
  },
  {
    id: 'fasihi-ushairi',
    topic: 'fasihi',
    q: [
      'ushairi ni nini?',
      'what is ushairi',
      'Swahili poetry',
      'shairi mashairi',
    ],
    a: {
      sw: 'Ushairi ni sanaa ya mashairi ya Kiswahili. Ushairi wa kimapokeo huzingatia vina (mwisho wa mistari) na mizani (idadi ya silabi), ilhali ushairi huru hauna masharti hayo.',
      en: 'Ushairi is the art of Swahili poetry. Traditional ushairi observes rhyme (vina) and metre (mizani, syllable counts), while free verse (ushairi huru) does not.',
    },
    tags: ['poetry', 'form', 'swahili'],
  },
  {
    id: 'fasihi-vina-mizani',
    topic: 'fasihi',
    q: [
      'vina na mizani ni nini',
      'rhyme and metre in Swahili poetry',
      'what are vina mizani',
      'shairi rules',
    ],
    a: {
      sw: 'Katika ushairi wa kimapokeo, "vina" ni sauti za mwisho zinazopatana kati ya mistari, na "mizani" ni idadi ya silabi katika kila mstari. Sheria hizi hutoa mahadhi ya shairi.',
      en: 'In traditional Swahili poetry, "vina" are the matching end-sounds (rhyme) between lines, and "mizani" is the syllable count per line. These rules give a poem its rhythm.',
    },
    tags: ['poetry', 'form'],
  },
  {
    id: 'fasihi-methali-what',
    topic: 'fasihi',
    q: [
      'methali ni nini?',
      'what is a proverb',
      'Swahili proverbs',
      'misemo ya hekima',
    ],
    a: {
      sw: 'Methali ni msemo mfupi wa kale wenye hekima na mafunzo, unaopitishwa kizazi hadi kizazi. Methali ni sehemu muhimu ya fasihi simulizi ya Kiswahili.',
      en: 'A methali is a short, time-honoured saying carrying wisdom and a lesson, passed down across generations. Proverbs are a key part of Swahili oral literature.',
    },
    tags: ['proverb', 'oral'],
  },
  {
    id: 'fasihi-methali-haraka',
    topic: 'fasihi',
    q: [
      'Haraka haraka haina baraka',
      'proverb about haste',
      'methali ya haraka',
    ],
    a: {
      sw: '"Haraka haraka haina baraka" humaanisha kuwa kufanya jambo kwa pupa mno huzaa makosa; subira na utaratibu huleta matokeo bora.',
      en: '"Haraka haraka haina baraka" means that doing things in too much haste leads to mistakes; patience and care bring better results. (Haste has no blessing.)',
    },
    tags: ['proverb'],
  },
  {
    id: 'fasihi-methali-umoja',
    topic: 'fasihi',
    q: [
      'Umoja ni nguvu',
      'proverb about unity',
      'methali ya umoja',
      'unity is strength',
    ],
    a: {
      sw: '"Umoja ni nguvu, utengano ni udhaifu" humaanisha kuwa watu wakishirikiana huwa na nguvu, lakini wakigawanyika hudhoofika.',
      en: '"Umoja ni nguvu, utengano ni udhaifu" means that people united are strong, but divided they become weak. (Unity is strength, division is weakness.)',
    },
    tags: ['proverb'],
  },
  {
    id: 'fasihi-methali-pole',
    topic: 'fasihi',
    q: [
      'Pole pole ndio mwendo',
      'proverb slow steady',
      'methali ya pole pole',
    ],
    a: {
      sw: '"Pole pole ndio mwendo" humaanisha kuwa kwenda taratibu kwa uthabiti huleta safari ya hakika; uvumilivu hufanikisha.',
      en: '"Pole pole ndio mwendo" means going slowly but steadily makes for sure progress; patience gets you there. (Slow and steady is the way.)',
    },
    tags: ['proverb'],
  },
  {
    id: 'fasihi-methali-mtoto',
    topic: 'fasihi',
    q: [
      'Asiyefunzwa na mamaye hufunzwa na ulimwengu',
      'proverb about upbringing',
      'methali ya malezi',
    ],
    a: {
      sw: '"Asiyefunzwa na mamaye hufunzwa na ulimwengu" humaanisha kuwa mtu asiyepata malezi na mafunzo nyumbani, hatimaye hufundishwa na maisha kwa njia ngumu.',
      en: '"Asiyefunzwa na mamaye hufunzwa na ulimwengu" means one not taught at home by their mother will eventually be taught by the world — the hard way.',
    },
    tags: ['proverb'],
  },
  {
    id: 'fasihi-methali-jembe',
    topic: 'fasihi',
    q: [
      'Mtaka cha mvunguni sharti ainame',
      'proverb about effort',
      'methali ya juhudi',
    ],
    a: {
      sw: '"Mtaka cha mvunguni sharti ainame" humaanisha kuwa anayetaka kupata kitu lazima ajitahidi na ajinyenyekeze; mafanikio huja kwa juhudi.',
      en: '"Mtaka cha mvunguni sharti ainame" means whoever wants what is under the bed must bend down — success requires effort and humility.',
    },
    tags: ['proverb'],
  },
  {
    id: 'fasihi-methali-fadhila',
    topic: 'fasihi',
    q: [
      'Mgeni njoo mwenyeji apone',
      'proverb about guests',
      'hospitality proverb',
    ],
    a: {
      sw: '"Mgeni njoo mwenyeji apone" humaanisha kuwa ujio wa mgeni huleta baraka na faida hata kwa mwenyeji; ukarimu hulipa.',
      en: '"Mgeni njoo mwenyeji apone" means a guest’s arrival brings blessing and benefit even to the host — hospitality rewards both. ',
    },
    tags: ['proverb'],
  },
  {
    id: 'fasihi-oral-literature',
    topic: 'fasihi',
    q: [
      'fasihi simulizi ni nini',
      'what is oral literature',
      'hadithi za kale',
      'oral tradition Swahili',
    ],
    a: {
      sw: 'Fasihi simulizi ni fasihi inayopitishwa kwa mdomo: hadithi, ngano, methali, vitendawili na nyimbo. Ni hazina ya hekima na utamaduni wa jamii za Kiafrika.',
      en: 'Fasihi simulizi is orally transmitted literature: stories, folktales, proverbs, riddles and songs. It is a treasury of wisdom and culture for African communities.',
    },
    tags: ['oral', 'tradition'],
  },
  {
    id: 'fasihi-vitendawili',
    topic: 'fasihi',
    q: [
      'vitendawili ni nini',
      'what are riddles',
      'kitendawili tega',
      'Swahili riddles',
    ],
    a: {
      sw: 'Vitendawili ni mafumbo ya kawaida ya Kiafrika. Msemaji husema "Kitendawili!" na wasikilizaji hujibu "Tega!", kisha hutoa fumbo lihitajilo jibu. Ni mchezo wa akili na fasihi simulizi.',
      en: 'Vitendawili are traditional African riddles. The teller says "Kitendawili!" and listeners reply "Tega!", then a puzzle is posed for an answer. They are a game of wit and oral literature.',
    },
    tags: ['oral', 'riddle'],
  },
  {
    id: 'fasihi-riwaya-tamthilia',
    topic: 'fasihi',
    q: [
      'tofauti ya riwaya na tamthilia',
      'novel vs play Swahili',
      'aina za fasihi andishi',
      'genres of literature',
    ],
    a: {
      sw: 'Riwaya ni kazi ndefu ya kinathari inayosimulia hadithi; tamthilia ni mchezo wa kuigiza ulioandikwa kwa majibizano ya wahusika. Ushairi ni utungo wa kishairi. Vyote ni fasihi andishi.',
      en: 'A riwaya is a long prose narrative; a tamthilia is a written drama in characters’ dialogue. Ushairi is poetic composition. All are forms of written literature (fasihi andishi).',
    },
    tags: ['genre', 'form'],
  },
  {
    id: 'fasihi-kasuku-focus',
    topic: 'fasihi',
    q: [
      'Kasuku inalenga fasihi gani',
      'what literature does Kasuku focus on',
      'African focus Kasuku',
      'kwa nini Kiswahili',
    ],
    a: {
      sw: 'Kasuku hutilia mkazo fasihi ya Kiafrika na Kitanzania, hasa kwa Kiswahili — riwaya, mashairi, hadithi, muziki na sauti — ili kuinua sauti za waandishi wa bara.',
      en: 'Kasuku centres African and Tanzanian literature, especially in Kiswahili — novels, poetry, stories, music and audio — to amplify the continent’s creative voices.',
    },
    tags: ['kasuku', 'focus', 'africa'],
  },
  {
    id: 'fasihi-mwana-kupona',
    topic: 'fasihi',
    q: [
      'Utenzi wa Mwana Kupona',
      'who is Mwana Kupona',
      'classic Swahili poem',
    ],
    a: {
      sw: '"Utenzi wa Mwana Kupona" ni shairi mashuhuri la Kiswahili la karne ya 19, lililotungwa na Mwana Kupona binti Msham kama ushauri kwa binti yake. Ni mfano bora wa utenzi wa kimapokeo.',
      en: '"Utenzi wa Mwana Kupona" is a famous 19th-century Swahili poem composed by Mwana Kupona binti Msham as advice to her daughter. It is a classic example of the traditional utenzi form.',
    },
    tags: ['poetry', 'classic', 'swahili'],
  },
  {
    id: 'fasihi-soyinka',
    topic: 'fasihi',
    q: [
      'Wole Soyinka ni nani?',
      'who is Wole Soyinka',
      'first African Nobel literature',
    ],
    a: {
      sw: 'Wole Soyinka (mzaliwa 1934) ni mwandishi na mwanatamthilia wa Kinaijeria. Mnamo 1986 alikuwa Mwafrika wa kwanza kutunukiwa Tuzo ya Nobel ya Fasihi.',
      en: 'Wole Soyinka (born 1934) is a Nigerian writer and playwright. In 1986 he became the first African to be awarded the Nobel Prize in Literature.',
    },
    tags: ['author', 'nigeria', 'nobel'],
  },
  {
    id: 'fasihi-adichie',
    topic: 'fasihi',
    q: [
      'Chimamanda Ngozi Adichie ni nani',
      'who is Chimamanda Adichie',
      'Half of a Yellow Sun',
      'contemporary African writer',
    ],
    a: {
      sw: 'Chimamanda Ngozi Adichie (mzaliwa 1977) ni mwandishi wa Kinaijeria wa kisasa, maarufu kwa riwaya "Half of a Yellow Sun" na "Purple Hibiscus", na hotuba "We Should All Be Feminists".',
      en: 'Chimamanda Ngozi Adichie (born 1977) is a contemporary Nigerian writer, known for "Half of a Yellow Sun" and "Purple Hibiscus", and the talk "We Should All Be Feminists".',
    },
    tags: ['author', 'nigeria', 'contemporary'],
  },
  {
    id: 'fasihi-gurnah',
    topic: 'fasihi',
    q: [
      'Abdulrazak Gurnah ni nani',
      'who is Abdulrazak Gurnah',
      'Zanzibar Nobel writer',
      'Paradise novel',
    ],
    a: {
      sw: 'Abdulrazak Gurnah (mzaliwa 1948) ni mwandishi mzaliwa wa Zanzibar, aliyetunukiwa Tuzo ya Nobel ya Fasihi mwaka 2021. Miongoni mwa kazi zake ni riwaya "Paradise" na "Afterlives".',
      en: 'Abdulrazak Gurnah (born 1948) is a Zanzibar-born writer who won the Nobel Prize in Literature in 2021. His works include the novels "Paradise" and "Afterlives".',
    },
    tags: ['author', 'tanzania', 'zanzibar', 'nobel'],
  },
  {
    id: 'fasihi-silt-anaim',
    topic: 'fasihi',
    q: [
      'SILT ni nini',
      'who is Anaim',
      'What the Fish Knew story',
      'novel on Kasuku',
    ],
    a: {
      sw: '"What the Fish Knew" (SILT, Kitabu cha Kwanza) ni riwaya ya Anaim inayopatikana kwenye Kasuku. Ni mfano wa kazi mpya ya Kiafrika unayoweza kuisoma au kuisikiliza papo hapo.',
      en: '"What the Fish Knew" (SILT, Book One) is a novel by Anaim available on Kasuku — an example of new African writing you can read or listen to right here.',
    },
    tags: ['silt', 'novel', 'kasuku'],
  },

  // ----------------------------------------------------------------------
  // UANDISHI — the craft of writing (fiction, poetry, drama, process)
  // ----------------------------------------------------------------------
  {
    id: 'uandishi-anza-hadithi',
    topic: 'uandishi',
    q: ['Nianzeje kuandika hadithi?', 'how do I start writing a story', 'kuanza kuandika', 'how to begin a story', 'nataka kuandika riwaya'],
    a: {
      sw: 'Anza na wazo moja linalokuvutia — mhusika anayetaka kitu na kizuizi kinachomzuia. Andika sentensi ya kwanza inayozua swali kichwani mwa msomaji. Usisubiri ploti kamili; andika tukio moja halisi, kisha jenga. Kasuku Studio inakupa nafasi ya kuandika na kuchapisha papo hapo.',
      en: 'Start with one idea that grips you — a character who wants something and an obstacle in the way. Write a first sentence that plants a question in the reader’s mind. Don’t wait for a full plot; write one real scene, then build. Kasuku Studio lets you draft and publish right here.',
    },
    tags: ['uandishi', 'writing', 'hadithi', 'story', 'anza', 'riwaya'],
  },
  {
    id: 'uandishi-ploti',
    topic: 'uandishi',
    q: ['Ploti ni nini?', 'what is plot', 'muundo wa hadithi', 'story structure', 'mwanzo kati mwisho'],
    a: {
      sw: 'Ploti ni mpangilio wa matukio: mwanzo (utangulizi wa mhusika na mgogoro), kati (mgogoro unaokua na vikwazo), kilele (hatua ya juu kabisa), na mwisho (suluhu). Kila tukio lisukume linalofuata kwa sababu na matokeo — si tu "kisha, kisha".',
      en: 'Plot is the order of events: a beginning (character and conflict set up), a middle (rising stakes and obstacles), a climax (the peak), and a resolution. Each event should drive the next by cause and effect — not just "and then, and then".',
    },
    tags: ['ploti', 'plot', 'muundo', 'structure', 'mgogoro'],
  },
  {
    id: 'uandishi-wahusika',
    topic: 'uandishi',
    q: ['Nijengeje wahusika?', 'how to build characters', 'kujenga mhusika', 'character development', 'mhusika mkuu'],
    a: {
      sw: 'Mhusika hai ana lengo (anataka nini), kizuizi (kinachomzuia), na udhaifu (kasoro inayombadilisha). Mwoneshe kupitia matendo, maamuzi na majibizano — si kwa kueleza tu. Mpe sauti ya kipekee na mabadiliko toka mwanzo hadi mwisho.',
      en: 'A living character has a goal (what they want), an obstacle (what blocks them), and a flaw (a weakness that forces change). Reveal them through action, choices and dialogue — not just description. Give a distinct voice and an arc of change from start to end.',
    },
    tags: ['wahusika', 'character', 'mhusika', 'development'],
  },
  {
    id: 'uandishi-onyesha',
    topic: 'uandishi',
    q: ['Onyesha usisimulie', 'show dont tell', 'show not tell ni nini', 'jinsi ya kuonyesha'],
    a: {
      sw: '"Onyesha, usisimulie" maana yake: badala ya kusema "alikuwa na hasira", onyesha — "alipiga meza, sauti yake ikatetemeka". Tumia hisi (kuona, kusikia, kunusa) na matendo ili msomaji ahisi tukio, si kuambiwa tu.',
      en: '"Show, don’t tell" means: instead of saying "she was angry", show it — "she slammed the table, her voice shaking". Use the senses (sight, sound, smell) and action so the reader feels the moment rather than being told about it.',
    },
    tags: ['onyesha', 'show', 'tell', 'mbinu', 'craft'],
  },
  {
    id: 'uandishi-mtazamo',
    topic: 'uandishi',
    q: ['Mtazamo wa msimulizi', 'point of view', 'nafsi ya kwanza au ya tatu', 'POV', 'msimulizi ni nani'],
    a: {
      sw: 'Mtazamo ni jicho linalosimulia: nafsi ya kwanza ("mimi") hutoa ukaribu na hisia; nafsi ya tatu ("yeye") hutoa upana na uhuru wa kuona wahusika wengi. Chagua mmoja na ushikilie ndani ya kila sehemu ili msomaji asichanganyikiwe.',
      en: 'Point of view is the eye telling the story: first person ("I") gives intimacy and feeling; third person ("he/she") gives breadth and freedom to see many characters. Pick one and stay consistent within each section so the reader isn’t disoriented.',
    },
    tags: ['mtazamo', 'pov', 'msimulizi', 'narrator', 'nafsi'],
  },
  {
    id: 'uandishi-majibizano',
    topic: 'uandishi',
    q: ['Niandikeje majibizano?', 'how to write dialogue', 'mazungumzo katika hadithi', 'dialogue tips'],
    a: {
      sw: 'Majibizano mazuri husikika kama mazungumzo halisi lakini yameng\'arishwa: kila mhusika ana sauti yake, maneno yanasonga hadithi mbele au yanafichua tabia, na hayarudii yanayojulikana tayari. Tumia "alisema" mara nyingi — ni neno lisiloonekana.',
      en: 'Good dialogue sounds like real speech but polished: each character has a distinct voice, lines move the story or reveal character, and they don’t repeat what we already know. Use "said" freely — it’s an invisible word.',
    },
    tags: ['majibizano', 'dialogue', 'mazungumzo'],
  },
  {
    id: 'uandishi-mandhari',
    topic: 'uandishi',
    q: ['Mandhari ni nini katika hadithi', 'setting in a story', 'mahali pa hadithi', 'jinsi ya kuelezea mandhari'],
    a: {
      sw: 'Mandhari ni wakati na mahali pa hadithi. Iteue kupitia maelezo machache yenye nguvu — harufu ya mvua kwenye udongo, sauti ya soko la Kariakoo — si orodha ndefu. Mandhari nzuri huwa pia inahisiwa na hali ya mhusika.',
      en: 'Setting is the time and place of the story. Evoke it with a few strong details — the smell of rain on soil, the noise of Kariakoo market — not a long list. Strong setting also reflects the character’s mood.',
    },
    tags: ['mandhari', 'setting', 'mahali'],
  },
  {
    id: 'uandishi-dhamira-craft',
    topic: 'uandishi',
    q: ['Dhamira katika uandishi', 'theme in writing', 'ujumbe wa hadithi', 'how to write theme'],
    a: {
      sw: 'Dhamira ni wazo kuu hadithi inalochunguza — mathalani haki, mapenzi, ukombozi. Usiitamke wazi kama hotuba; iache ijitokeze kupitia chaguo za wahusika na matokeo yao. Dhamira huguswa, haifundishwi kwa nguvu.',
      en: 'Theme is the central idea a story explores — say justice, love, liberation. Don’t state it openly like a sermon; let it emerge through the characters’ choices and their consequences. Theme is felt, not forced.',
    },
    tags: ['dhamira', 'theme', 'ujumbe', 'maudhui'],
  },
  {
    id: 'uandishi-ushairi',
    topic: 'uandishi',
    q: ['Niandikeje shairi?', 'how to write a poem', 'vina na mizani', 'ushairi wa Kiswahili', 'arudhi'],
    a: {
      sw: 'Ushairi wa kimapokeo wa Kiswahili hufuata arudhi: vina (sauti zinazofanana mwishoni mwa mistari) na mizani (idadi ya silabi kwa kila mstari, mara nyingi 16, ikigawanyika 8+8 kwenye kituo). Ushairi huru hauna vina vya lazima — lakini bado hutumia taswira, takriri na mahadhi. Anza na hisia moja kali.',
      en: 'Traditional Swahili poetry follows arudhi: vina (matching end-sounds of lines) and mizani (syllable count per line, often 16, split 8+8 at a caesura). Free verse drops fixed rhyme — but still uses imagery, repetition and rhythm. Begin with one strong feeling.',
    },
    tags: ['ushairi', 'poetry', 'shairi', 'vina', 'mizani', 'arudhi'],
  },
  {
    id: 'uandishi-tamthilia',
    topic: 'uandishi',
    q: ['Niandikeje tamthilia?', 'how to write a play', 'tamthilia ni nini', 'drama writing', 'mchezo wa kuigiza'],
    a: {
      sw: 'Tamthilia husimuliwa kwa majibizano na maelekezo ya jukwaa, si masimulizi. Jenga migogoro kati ya wahusika, gawanya kazi kwa maonyesho (scenes), na acha kila onyesho liishe kwa mvutano unaovuta linalofuata. Kila neno lisikike likitamkwa jukwaani.',
      en: 'A play is told through dialogue and stage directions, not narration. Build conflict between characters, divide the work into scenes, and end each scene on tension that pulls to the next. Every line should work when spoken on stage.',
    },
    tags: ['tamthilia', 'play', 'drama', 'mchezo', 'jukwaa'],
  },
  {
    id: 'uandishi-ukwamo',
    topic: 'uandishi',
    q: ['Nimekwama kuandika', 'writer\'s block', 'sina la kuandika', 'how to beat writer block', 'kukwama'],
    a: {
      sw: 'Ukwamo ni wa kawaida. Andika bila kuhariri kwa dakika kumi — ruhusu uandishi mbaya, utausafisha baadaye. Badilisha mandhari, soma kazi unayoipenda, au anza katikati ya tukio. Lengo si ukamilifu, ni kuendelea.',
      en: 'Blocks are normal. Write without editing for ten minutes — allow bad writing, you’ll clean it later. Change your setting, read work you love, or start in the middle of a scene. The goal isn’t perfection, it’s momentum.',
    },
    tags: ['ukwamo', 'writers block', 'block', 'motisha'],
  },
  {
    id: 'uandishi-hariri',
    topic: 'uandishi',
    q: ['Niharirije kazi yangu?', 'how to edit my writing', 'kuhariri', 'revision tips', 'kusahihisha'],
    a: {
      sw: 'Hariri kwa awamu: kwanza muundo (je, hadithi inasonga?), kisha aya na sentensi (ufupisho, uwazi), mwisho sarufi na herufi. Soma kwa sauti ili kusikia mahadhi — Kasuku inaweza kukusomea kazi yako. Pumzika kabla ya kuhariri ili kuona kwa jicho jipya.',
      en: 'Edit in passes: first structure (does the story move?), then paragraphs and sentences (tighten, clarify), last grammar and spelling. Read aloud to hear the rhythm — Kasuku can narrate your work back to you. Rest before editing so you see it with fresh eyes.',
    },
    tags: ['hariri', 'edit', 'revision', 'kusahihisha'],
  },
  {
    id: 'uandishi-kichwa',
    topic: 'uandishi',
    q: ['Nichague kichwa gani?', 'how to title my book', 'jina la kitabu', 'good title', 'kichwa cha habari'],
    a: {
      sw: 'Kichwa kizuri ni kifupi, kinakumbukika, na kinagusa kiini cha kazi bila kufichua kila kitu. Jaribu nukuu kutoka kwenye kazi, taswira kuu, au kitendawili kinachozua udadisi. Andika orodha ya kumi, kisha chagua.',
      en: 'A strong title is short, memorable, and touches the heart of the work without giving everything away. Try a line from the text, a central image, or a small riddle that stirs curiosity. List ten, then choose.',
    },
    tags: ['kichwa', 'title', 'jina'],
  },
  {
    id: 'uandishi-lugha-gani',
    topic: 'uandishi',
    q: ['Niandike kwa Kiswahili au Kiingereza?', 'should I write in Swahili or English', 'lugha ya kuandikia'],
    a: {
      sw: 'Andika kwa lugha unayoiwaza na kuihisi vizuri zaidi — ndimo sauti yako halisi ipo. Kiswahili kinakufikisha kwa mamilioni ya wasomaji Afrika Mashariki na kina utajiri wa methali na taswira. Unaweza kuandika kwa lugha moja kisha Kasuku ikusaidie rasimu ya tafsiri.',
      en: 'Write in the language you think and feel in most fully — that’s where your true voice lives. Swahili reaches millions of readers across East Africa and carries a wealth of proverb and imagery. You can write in one and let Kasuku draft a translation.',
    },
    tags: ['lugha', 'language', 'kiswahili', 'kiingereza', 'choice'],
  },

  // ----------------------------------------------------------------------
  // KISWAHILI — more language coverage (grammar, idiom, usage)
  // ----------------------------------------------------------------------
  {
    id: 'kiswahili-methali',
    topic: 'kiswahili',
    q: ['Methali ni nini?', 'what is a proverb', 'mfano wa methali', 'Swahili proverbs', 'misemo'],
    a: {
      sw: 'Methali ni usemi mfupi wa hekima wa jadi, k.m. "Haba na haba hujaza kibaba" (vidogo vidogo hukusanyika kuwa kikubwa). Misemo na nahau hupamba lugha na kubeba busara ya jamii. Niulize maana ya methali yoyote.',
      en: 'A proverb (methali) is a short traditional saying of wisdom, e.g. "Haba na haba hujaza kibaba" (little by little fills the measure). Sayings and idioms enrich the language and carry a community’s wisdom. Ask me the meaning of any proverb.',
    },
    tags: ['methali', 'proverb', 'misemo', 'nahau', 'hekima'],
  },
  {
    id: 'kiswahili-nahau',
    topic: 'kiswahili',
    q: ['Nahau ni nini?', 'what is an idiom', 'mfano wa nahau', 'idioms in Swahili'],
    a: {
      sw: 'Nahau ni kifungu chenye maana isiyo ya moja kwa moja, k.m. "kupiga chuku" (kutia chumvi/kuzidisha) au "mkono wa birika" (mtu bahili). Maana yake haifuati maneno moja moja — hujifunzwa kama kifungu kizima.',
      en: 'An idiom (nahau) is a phrase whose meaning isn’t literal, e.g. "kupiga chuku" (to exaggerate) or "mkono wa birika" (a stingy person). Its meaning doesn’t follow the individual words — it’s learned as a whole phrase.',
    },
    tags: ['nahau', 'idiom', 'msemo'],
  },
  {
    id: 'kiswahili-vivumishi',
    topic: 'kiswahili',
    q: ['Vivumishi ni nini?', 'what are adjectives in Swahili', 'vivumishi vya sifa', 'adjective agreement'],
    a: {
      sw: 'Vivumishi ni maneno yanayoeleza sifa ya nomino (k.m. -zuri, -kubwa, -refu). Hukubaliana na ngeli ya nomino kwa kiambishi: mtu mzuri, kitu kizuri, vitu vizuri. Mzizi ni mmoja (-zuri), kiambishi hubadilika kulingana na ngeli.',
      en: 'Adjectives (vivumishi) describe a noun’s quality (e.g. -zuri = good, -kubwa = big). They agree with the noun’s class via a prefix: mtu mzuri, kitu kizuri, vitu vizuri. The root is one (-zuri); the prefix changes with the class.',
    },
    tags: ['vivumishi', 'adjective', 'sifa', 'agreement', 'ngeli'],
  },
  {
    id: 'kiswahili-viunganishi',
    topic: 'kiswahili',
    q: ['Viunganishi ni nini?', 'conjunctions in Swahili', 'maneno ya kuunganisha', 'na lakini kwa sababu'],
    a: {
      sw: 'Viunganishi huunganisha maneno au sentensi: "na" (and), "au" (or), "lakini" (but), "kwa sababu" (because), "ingawa" (although), "ili" (so that), "kwa hiyo" (therefore). Hutumika kujenga sentensi ndefu zenye mantiki.',
      en: 'Conjunctions join words or sentences: "na" (and), "au" (or), "lakini" (but), "kwa sababu" (because), "ingawa" (although), "ili" (so that), "kwa hiyo" (therefore). They build longer, logically connected sentences.',
    },
    tags: ['viunganishi', 'conjunction', 'na', 'lakini'],
  },
  {
    id: 'kiswahili-alama',
    topic: 'kiswahili',
    q: ['Alama za uakifishaji', 'punctuation in Swahili', 'matumizi ya nukta na mkato', 'punctuation marks'],
    a: {
      sw: 'Alama za uakifishaji: nukta (.) humaliza sentensi; mkato (,) hupumzisha; alama ya kuuliza (?) kwa swali; alama ya mshangao (!) kwa hisia; nukta-mkato (;) huunganisha sentensi mbili zinazohusiana; alama za usemi ("…") huonyesha maneno yaliyosemwa.',
      en: 'Punctuation: full stop (.) ends a sentence; comma (,) pauses; question mark (?) for questions; exclamation (!) for strong feeling; semicolon (;) links two related sentences; quotation marks ("…") show spoken words.',
    },
    tags: ['alama', 'uakifishaji', 'punctuation', 'nukta', 'mkato'],
  },
];
