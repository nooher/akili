/**
 * Hypertension — Condition Knowledge
 *
 * Sources: WHO HEARTS, ISH 2020, NTLG STG 2023, AHA 2017 (as referenced by MoH).
 *
 * GOVERNANCE: DRAFT — pending clinical review by Dr. [Name].
 *
 * Language strategy:
 *   - sw_mtaa = how a patient actually talks (BP, presha, imepanda)
 *   - sw = clean Swahili (shinikizo la damu)
 *   - en = plain English (not medicalese)
 */

import { ConditionKnowledge, UrgencyLevel } from '../../types';
import { CONDITION_ALIASES } from '../../engine/synonyms';
import { src } from '../../governance/sources';

export const HYPERTENSION: ConditionKnowledge = {
  id: 'hypertension',
  aliases: CONDITION_ALIASES.hypertension,
  category: 'cardiovascular',

  whatItIs: {
    en: 'Hypertension means the pressure inside your blood vessels stays higher than it should. The heart has to work harder, and over years this damages vessels, the heart itself, the kidneys, the brain, and the eyes — usually quietly, without you feeling sick.',
    sw: 'Shinikizo la damu maana yake msukumo ndani ya mishipa yako ya damu unabaki juu kuliko inavyopaswa. Moyo unalazimika kufanya kazi zaidi, na kwa miaka mingi hii inaharibu mishipa, moyo wenyewe, figo, ubongo, na macho — mara nyingi kimya kimya, bila kujihisi mgonjwa.',
    sw_mtaa: 'BP ya juu ni hii: damu inakimbia kwa nguvu kubwa ndani ya mishipa kuliko inavyotakiwa. Moyo unahangaika sana, na hata kama unajisikia poa, ndani inaharibu mishipa, figo, na macho polepole. Ndiyo maana inaitwa "ugonjwa wa kimya".',
  },

  whyItMatters: {
    en: 'High blood pressure is the world\'s number-one cause of stroke, heart attack, heart failure, and kidney failure. The dangerous thing is that most people feel fine until something serious happens. Treating it early — even before symptoms appear — protects you for life.',
    sw: 'Shinikizo la juu la damu ni sababu namba moja duniani ya kiharusi, mshtuko wa moyo, moyo kushindwa kufanya kazi, na figo kushindwa kufanya kazi. Jambo la hatari ni kuwa watu wengi wanajisikia salama mpaka kitu kibaya kinatokea. Kutibu mapema — hata kabla dalili hazijatokea — inakulinda kwa maisha yote.',
    sw_mtaa: 'BP ya juu ndiyo sababu kubwa kabisa duniani ya kiharusi (stroke), heart attack, na figo kufeli. Hatari kubwa ni hii: utajisikia poa kabisa, halafu siku moja unaanguka. Ndio maana hata kama unajisikia vizuri, ukianza dawa unaendelea nayo.',
  },

  commonQuestions: [
    {
      q: {
        en: 'I feel fine — why should I take medicine every day?',
        sw: 'Najisikia vizuri — kwa nini nichukue dawa kila siku?',
      },
      a: {
        en: 'Because the damage happens silently. Blood pressure pills do not make you feel better today — they keep you from having a stroke or kidney failure in 5, 10, or 20 years. People who stop their medicine because they "feel fine" are the ones who end up in emergency rooms.',
        sw: 'Kwa sababu uharibifu unatokea kimya kimya. Dawa za shinikizo hazikusaidii ujihisi vizuri leo — zinakulinda usipate kiharusi au figo kufeli baada ya miaka 5, 10, au 20. Watu wanaoacha dawa kwa sababu "wanajisikia vizuri" ndio mara nyingi wanafika hospitali kwa dharura.',
        sw_mtaa: 'Kwa sababu uharibifu unafanyika kimya. Dawa za BP hazikufanyi ujisikie poa leo — zinakulinda usipate stroke au figo zikufeli baada ya miaka michache. Wale wanaoacha dawa kwa sababu "wanajisikia poa" ndio kwanza wanaishia ICU.',
      },
    },
    {
      q: {
        en: 'Can I stop the medicine if my BP becomes normal?',
        sw: 'Naweza kuacha dawa kama shinikizo limeshuka kuwa la kawaida?',
      },
      a: {
        en: 'In most cases, no. Your BP is normal because the medicine is working. Stopping it usually means the BP climbs back up within days or weeks. Only your doctor can decide if a medicine can be reduced or stopped — never decide alone.',
        sw: 'Kwa kawaida hapana. Shinikizo lako liko la kawaida kwa sababu dawa inafanya kazi. Kuacha dawa kwa kawaida maana yake shinikizo linapanda tena ndani ya siku au wiki chache. Daktari wako pekee anaweza kuamua kupunguza au kuacha dawa — usiamue mwenyewe.',
        sw_mtaa: 'Mara nyingi hapana. BP yako iko poa kwa sababu dawa inafanya kazi. Ukiacha, BP inapanda tena ndani ya siku chache. Daktari pekee ndiye anaweza kusema "punguza" au "acha" — usijiamulie wewe mwenyewe.',
      },
    },
    {
      q: {
        en: 'Will I have to take it forever?',
        sw: 'Itabidi nikunywe milele?',
      },
      a: {
        en: 'For most adults with established hypertension, treatment is lifelong — like wearing glasses for poor vision. Big lifestyle changes (weight loss, less salt, regular exercise, less alcohol) sometimes allow the doctor to reduce the dose, but very rarely to stop completely.',
        sw: 'Kwa watu wazima wengi wenye shinikizo la damu lililothibitishwa, matibabu ni ya maisha yote — kama kuvaa miwani ya kuona. Mabadiliko makubwa ya maisha (kupungua uzito, chumvi kidogo, mazoezi ya kawaida, pombe kidogo) wakati mwingine humsaidia daktari kupunguza dawa, lakini ni nadra sana kuiacha kabisa.',
        sw_mtaa: 'Kwa wengi, ndiyo — ni kwa maisha yote, kama kuvaa miwani ya kuona. Ukibadilisha sana lifestyle (uzito unashuka, chumvi unapunguza, mazoezi unafanya), daktari anaweza kupunguza dawa, lakini kuacha kabisa ni nadra.',
      },
    },
    {
      q: {
        en: 'Can I drink alcohol if I have hypertension?',
        sw: 'Naweza kunywa pombe nikiwa na shinikizo la damu?',
      },
      a: {
        en: 'Alcohol raises blood pressure — directly while you drink, and over months if drinking is regular. The safer guidance is: less is better, none is best. If you do drink, keep it occasional and small. Heavy drinking makes BP medicines work poorly and can damage the liver, which complicates everything.',
        sw: 'Pombe inapandisha shinikizo la damu — moja kwa moja unapokunywa, na kwa miezi mingi kama unakunywa mara kwa mara. Mwongozo salama: kidogo ni bora, hakuna kabisa ni bora zaidi. Ukinywa, iwe mara chache na kidogo. Kunywa sana hudhoofisha dawa za shinikizo na kunaweza kuharibu ini, jambo linalochanganya kila kitu.',
        sw_mtaa: 'Pombe inapandisha BP — papo hapo unapokunywa, na kwa muda mrefu ukikunywa mara kwa mara. Ukweli ni huu: kidogo bora, sifuri bora zaidi. Ukinywa, iwe mara chache na chache. Ukinywa sana, dawa zako za BP haziwezi kufanya kazi vizuri, na ini linaweza kuharibika.',
      },
    },
    {
      q: {
        en: 'How much salt can I eat?',
        sw: 'Naweza kula chumvi kiasi gani?',
      },
      a: {
        en: 'WHO recommends less than 5 grams of salt per day for adults — that is about one teaspoon, including salt already in food. Most of the salt we eat comes hidden in processed foods, bread, sausages, soups, and snacks — not from the saltshaker. Reducing salt alone can drop BP by 5-10 points for many people.',
        sw: 'WHO inashauri chumvi chini ya gramu 5 kwa siku kwa mtu mzima — hii ni karibu kijiko kimoja cha chai, ikijumuisha chumvi iliyomo tayari kwenye chakula. Chumvi nyingi tunazokula zinafichwa kwenye vyakula vilivyoshugulikiwa, mkate, sausage, supu, na vitafunwa — sio kutoka kwenye chumvi tu. Kupunguza chumvi pekee kunaweza kushusha shinikizo kwa pointi 5 mpaka 10 kwa watu wengi.',
        sw_mtaa: 'WHO wanasema chumvi isizidi gramu 5 kwa siku — yaani karibu kijiko kimoja cha chai, na hii ni pamoja na chumvi iliyo tayari kwenye chakula. Chumvi nyingi tunazokula zinajificha kwenye vitu kama mkate, sausage, supu za packet, na vitafunwa. Kupunguza chumvi tu pekee, BP inaweza kushuka pointi 5 mpaka 10.',
      },
    },
  ],

  selfManagement: [
    {
      en: 'Take your blood pressure medicine at the same time every day, even when you feel well. Set a phone reminder or link it to a daily habit like morning prayer or tea.',
      sw: 'Chukua dawa yako ya shinikizo wakati uleule kila siku, hata unapojisikia vizuri. Weka kikumbusho cha simu au ifungamanishe na tabia ya kila siku kama swala la asubuhi au chai.',
      sw_mtaa: 'Kunywa dawa yako ya BP saa moja kila siku, hata ukijisikia poa. Weka reminder kwenye simu, au ifungamanishe na kitu cha kila siku kama chai ya asubuhi.',
    },
    {
      en: 'Measure your BP at home if you can — same arm, sitting quietly for 5 minutes first, twice in the morning, twice in the evening. Write the numbers down and bring them to your clinic visit.',
      sw: 'Pima BP yako nyumbani ukiwezekana — mkono uleule, ukikaa kimya kwa dakika 5 kwanza, mara mbili asubuhi, mara mbili jioni. Andika namba na uzilete kliniki.',
      sw_mtaa: 'Pima BP yako nyumbani ukiwezekana — mkono uleule, kaa kimya dakika 5 kwanza, mara mbili asubuhi, mara mbili jioni. Andika namba kwenye karatasi, uzilete kwa daktari.',
    },
    {
      en: 'Walk briskly for at least 30 minutes, 5 days a week. Walking is enough — you do not need a gym.',
      sw: 'Tembea kwa kasi kwa angalau dakika 30, siku 5 kwa wiki. Kutembea kunatosha — huhitaji jim.',
      sw_mtaa: 'Tembea kwa kasi dakika 30, siku 5 kwa wiki. Hauhitaji jim — kutembea tu kunatosha.',
    },
    {
      en: 'Eat more vegetables, fruits, and beans. Reduce ugali portions, fried foods, sausages, and chips. Aim to make half your plate vegetables.',
      sw: 'Kula mboga zaidi, matunda, na maharage. Punguza ugali, vyakula vya kukaanga, sausage, na chipsi. Lengo: nusu ya sahani yako iwe mboga.',
      sw_mtaa: 'Kula mboga nyingi, matunda, na maharage. Punguza ugali, chipsi, sausage, vya kukaanga. Lengo: nusu ya sahani iwe mboga.',
    },
    {
      en: 'Reduce stress where you can. Stress raises BP. Short prayers, slow breathing, walking, and good sleep all help.',
      sw: 'Punguza msongo wa mawazo ukiwezekana. Msongo unapandisha shinikizo. Sala fupi, kupumua taratibu, kutembea, na kulala vizuri vyote vinasaidia.',
      sw_mtaa: 'Punguza stress ukiwezekana. Stress inapandisha BP. Sala fupi, kupumua taratibu, kutembea, na kulala vizuri vyote vinasaidia.',
    },
  ],

  warningTriggers: [
    {
      en: 'High salt intake (most of it hidden in processed foods)',
      sw: 'Chumvi nyingi (mara nyingi imefichwa kwenye vyakula vilivyoshugulikiwa)',
      sw_mtaa: 'Chumvi nyingi — sio tu chumvi unayotia, hata chumvi iliyo kwenye sausage, mkate, na supu za packet',
    },
    {
      en: 'Regular alcohol intake',
      sw: 'Kunywa pombe mara kwa mara',
      sw_mtaa: 'Kunywa pombe mara kwa mara',
    },
    {
      en: 'Long-term stress and poor sleep',
      sw: 'Msongo wa mawazo wa muda mrefu na kulala vibaya',
      sw_mtaa: 'Stress ya muda mrefu na kukosa usingizi',
    },
    {
      en: 'Pain medicines like ibuprofen, diclofenac, taken regularly without a doctor\'s advice',
      sw: 'Dawa za maumivu kama ibuprofen, diclofenac, zinazotumika mara kwa mara bila ushauri wa daktari',
      sw_mtaa: 'Dawa za maumivu kama ibuprofen, diclofenac — ukizitumia mara kwa mara bila daktari, BP inapanda',
    },
    {
      en: 'Smoking — raises BP and damages vessels at the same time',
      sw: 'Kuvuta sigara — kunapandisha shinikizo na kunaharibu mishipa kwa wakati mmoja',
      sw_mtaa: 'Sigara — inapandisha BP na inaharibu mishipa kwa wakati mmoja',
    },
  ],

  whenToSeekCare: [
    {
      sign: {
        en: 'Severe headache that does not go away, especially with vision changes',
        sw: 'Kichwa kinachouma sana ambacho hakiendi, hasa pamoja na mabadiliko ya kuona',
        sw_mtaa: 'Kichwa kinauma sana hakiondoki, kibaya zaidi ukianza kuona vibaya',
      },
      urgency: 'urgent' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Chest pain, shortness of breath, or pain spreading to your arm or jaw',
        sw: 'Maumivu ya kifua, kukosa pumzi, au maumivu yanaenea kwenye mkono au taya',
        sw_mtaa: 'Maumivu ya kifua, kushindwa kupumua, au maumivu yanahamia mkononi au tayani',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Sudden weakness on one side of the body, slurred speech, or face drooping',
        sw: 'Udhaifu wa ghafla upande mmoja wa mwili, kushindwa kuongea vizuri, au uso kushuka upande mmoja',
        sw_mtaa: 'Mkono au mguu mmoja ghafla unashindwa kufanya kazi, kushindwa kuongea, au uso umekaa upande mmoja',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'Home BP reading of 180/120 or higher, especially with symptoms',
        sw: 'Kipimo cha BP nyumbani cha 180/120 au juu zaidi, hasa pamoja na dalili',
        sw_mtaa: 'BP ikifika 180/120 au juu, hasa ukijisikia vibaya',
      },
      urgency: 'emergency' as UrgencyLevel,
    },
    {
      sign: {
        en: 'BP readings consistently above 160/100 even on medication',
        sw: 'Vipimo vya BP vinabaki juu ya 160/100 hata ukiwa kwenye dawa',
        sw_mtaa: 'BP haitaki kushuka chini ya 160/100 hata ukiwa kwenye dawa',
      },
      urgency: 'soon' as UrgencyLevel,
    },
  ],

  sources: [
    src('WHO_HEARTS_2023'),
    src('ISH_2020'),
    src('NTLG_STG_2023'),
    src('AHA_2017_BP'),
  ],

  governance: {
    status: 'draft',
    draftedBy: 'TibaAI-engine',
    contentVersion: '0.1.0',
  },
};
