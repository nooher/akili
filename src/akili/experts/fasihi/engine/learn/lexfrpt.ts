// lexfrpt.ts — curated French & Portuguese → Swahili core lexicons, so the
// translator accepts these two major languages as source (French especially
// matters across Kasuku's neighbourhood: DRC, Rwanda, Burundi). Swahili values
// mirror the English core, hand-checked. A curated core, not an exhaustive
// dictionary. Sovereign — no external API.

export const CORE_FR: Record<string, string> = {
  // pronouns / possessives / function words
  je: 'mimi', tu: 'wewe', il: 'yeye', elle: 'yeye', nous: 'sisi', vous: 'ninyi', ils: 'wao', elles: 'wao',
  mon: 'yangu', ma: 'yangu', mes: 'yangu', ton: 'yako', ta: 'yako', son: 'yake', sa: 'yake', notre: 'yetu', votre: 'yenu', leur: 'yao',
  le: '', la: '', les: '', un: '', une: '', et: 'na', ou: 'au', mais: 'lakini', avec: 'na', de: 'ya', dans: 'ndani', sur: 'juu',
  est: 'ni', sont: 'ni', suis: 'ni', ne: 'si', non: 'hapana', oui: 'ndiyo', pour: 'kwa', à: 'kwa',
  ici: 'hapa', là: 'pale', où: 'wapi', quoi: 'nini', qui: 'nani', quand: 'lini', comment: 'vipi', pourquoi: 'kwa nini',
  très: 'sana', plus: 'zaidi', tout: 'yote', beaucoup: 'mengi',
  // adjectives
  bon: 'nzuri', bonne: 'nzuri', mauvais: 'mbaya', grand: 'kubwa', petit: 'ndogo', nouveau: 'mpya', vieux: 'kuukuu',
  grande: 'kubwa', belle: 'zuri', petite: 'ndogo', nouvelle: 'mpya',
  long: 'refu', court: 'fupi', fort: 'imara', facile: 'rahisi', difficile: 'gumu', chaud: 'moto', froid: 'baridi', beau: 'zuri',
  // verbs (infinitive → ku-)
  manger: 'kula', boire: 'kunywa', aller: 'kwenda', venir: 'kuja', dormir: 'kulala', lire: 'kusoma', écrire: 'kuandika',
  aimer: 'kupenda', vouloir: 'kutaka', savoir: 'kujua', voir: 'kuona', entendre: 'kusikia', parler: 'kusema', dire: 'kusema',
  donner: 'kutoa', prendre: 'kuchukua', faire: 'kufanya', aider: 'kusaidia', apprendre: 'kujifunza', enseigner: 'kufundisha',
  marcher: 'kutembea', courir: 'kukimbia', acheter: 'kununua', vendre: 'kuuza', construire: 'kujenga', chanter: 'kuimba',
  // nouns
  personne: 'mtu', gens: 'watu', ami: 'rafiki', enseignant: 'mwalimu', élève: 'mwanafunzi', enfant: 'mtoto',
  homme: 'mwanaume', femme: 'mwanamke', mère: 'mama', père: 'baba', famille: 'familia',
  maison: 'nyumba', école: 'shule', marché: 'soko', ville: 'jiji', pays: 'nchi', monde: 'dunia',
  livre: 'kitabu', livres: 'vitabu', eau: 'maji', nourriture: 'chakula', thé: 'chai', argent: 'pesa', nom: 'jina',
  jour: 'siku', temps: 'wakati', année: 'mwaka', langue: 'lugha', histoire: 'hadithi', mot: 'neno', cœur: 'moyo', vie: 'maisha',
  montagne: 'mlima', rivière: 'mto', soleil: 'jua', lune: 'mwezi', arbre: 'mti', ciel: 'anga', feu: 'moto', route: 'barabara',
  // time / numbers / courtesy
  aujourdhui: 'leo', demain: 'kesho', hier: 'jana', matin: 'asubuhi', nuit: 'usiku',
  un1: 'moja', deux: 'mbili', trois: 'tatu', quatre: 'nne', cinq: 'tano',
  bonjour: 'hujambo', merci: 'asante', oui1: 'ndiyo', paix: 'amani', liberté: 'uhuru', vérité: 'ukweli', afrique: 'Afrika',
};

export const CORE_PT: Record<string, string> = {
  eu: 'mimi', tu: 'wewe', você: 'wewe', ele: 'yeye', ela: 'yeye', nós: 'sisi', eles: 'wao', elas: 'wao',
  meu: 'yangu', minha: 'yangu', teu: 'yako', tua: 'yako', seu: 'yake', sua: 'yake', nosso: 'yetu', deles: 'yao',
  o: '', a: '', os: '', as: '', um: '', uma: '', e: 'na', ou: 'au', mas: 'lakini', com: 'na', de: 'ya', em: 'ndani',
  é: 'ni', são: 'ni', sou: 'ni', não: 'hapana', sim: 'ndiyo', para: 'kwa',
  aqui: 'hapa', ali: 'pale', onde: 'wapi', que: 'nini', quem: 'nani', quando: 'lini', como: 'vipi', porquê: 'kwa nini',
  muito: 'sana', mais: 'zaidi', tudo: 'yote', muitos: 'mengi',
  bom: 'nzuri', boa: 'nzuri', mau: 'mbaya', grande: 'kubwa', pequeno: 'ndogo', novo: 'mpya', velho: 'kuukuu',
  longo: 'refu', curto: 'fupi', forte: 'imara', fácil: 'rahisi', difícil: 'gumu', quente: 'moto', frio: 'baridi', belo: 'zuri',
  comer: 'kula', beber: 'kunywa', ir: 'kwenda', vir: 'kuja', dormir: 'kulala', ler: 'kusoma', escrever: 'kuandika',
  amar: 'kupenda', querer: 'kutaka', saber: 'kujua', ver: 'kuona', ouvir: 'kusikia', falar: 'kusema', dizer: 'kusema',
  dar: 'kutoa', pegar: 'kuchukua', fazer: 'kufanya', ajudar: 'kusaidia', aprender: 'kujifunza', ensinar: 'kufundisha',
  andar: 'kutembea', correr: 'kukimbia', comprar: 'kununua', vender: 'kuuza', construir: 'kujenga', cantar: 'kuimba',
  pessoa: 'mtu', pessoas: 'watu', amigo: 'rafiki', professor: 'mwalimu', aluno: 'mwanafunzi', criança: 'mtoto',
  homem: 'mwanaume', mulher: 'mwanamke', mãe: 'mama', pai: 'baba', família: 'familia',
  casa: 'nyumba', escola: 'shule', mercado: 'soko', cidade: 'jiji', país: 'nchi', mundo: 'dunia',
  livro: 'kitabu', livros: 'vitabu', água: 'maji', comida: 'chakula', chá: 'chai', dinheiro: 'pesa', nome: 'jina',
  dia: 'siku', tempo: 'wakati', ano: 'mwaka', língua: 'lugha', história: 'hadithi', palavra: 'neno', coração: 'moyo', vida: 'maisha',
  montanha: 'mlima', rio: 'mto', sol: 'jua', lua: 'mwezi', árvore: 'mti', céu: 'anga', fogo: 'moto', estrada: 'barabara',
  hoje: 'leo', amanhã: 'kesho', ontem: 'jana', manhã: 'asubuhi', noite: 'usiku',
  dois: 'mbili', três: 'tatu', quatro: 'nne', cinco: 'tano',
  olá: 'hujambo', obrigado: 'asante', paz: 'amani', liberdade: 'uhuru', verdade: 'ukweli', áfrica: 'Afrika',
};
