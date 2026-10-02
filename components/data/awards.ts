import type { Language } from "@/lib/translations";

// Every award Etno Okami has received, grouped by competition. Used by the
// home page AwardsSection and the /awards page. Certificates (where we have
// a scan) live in public/images/awards.

export type Localized = Record<Language, string>;

export type Medal = "gold" | "silver" | "bronze" | "rosso";

export type WineKey =
  | "shavkapito"
  | "tavkveri"
  | "khashmiSaperavi"
  | "chinuriGoruliMtsvane"
  | "rkatsiteli"
  | "okami";

export const wineNames: Record<WineKey, Localized> = {
  shavkapito: { en: "Shavkapito", ka: "შავკაპიტო", ru: "Шавкапито" },
  tavkveri: { en: "Tavkveri", ka: "თავკვერი", ru: "Тавквери" },
  khashmiSaperavi: { en: "Khashmi Saperavi", ka: "ხაშმის საფერავი", ru: "Хашми Саперави" },
  chinuriGoruliMtsvane: { en: "Chinuri-Goruli Mtsvane", ka: "ჩინური-გორული მწვანე", ru: "Чинури-Горули Мцване" },
  rkatsiteli: { en: "Rkatsiteli", ka: "რქაწითელი", ru: "Ркацители" },
  okami: { en: "Okami", ka: "ოკამი", ru: "Оками" },
};

export type Award = {
  wine: WineKey;
  vintage: number;
  medal: Medal;
  score?: number;
  certificate?: string;
};

export type Competition = {
  id: string;
  /** Year the award was given; null when we don't know it yet. */
  year: number | null;
  title: Localized;
  organizer: Localized;
  date: Localized | null;
  story: Localized[];
  awards: Award[];
};

const GWA: Localized = {
  en: "Georgian Wine Association",
  ka: "ასოციაცია „ქართული ღვინო“",
  ru: "Ассоциация «Грузинское вино»",
};

const IQWC: Localized = {
  en: "International Qvevri Wine Competition",
  ka: "ქვევრის ღვინის საერთაშორისო კონკურსი",
  ru: "Международный конкурс квеври-вин",
};

const SAPERAVI: Localized = {
  en: "Saperavi International Competition",
  ka: "საფერავის საერთაშორისო კონკურსი",
  ru: "Международный конкурс Саперави",
};

export const competitions: Competition[] = [
  {
    id: "qvevri-2024",
    year: 2024,
    title: IQWC,
    organizer: GWA,
    date: { en: "27–28 November 2024 · Tbilisi", ka: "27–28 ნოემბერი, 2024 · თბილისი", ru: "27–28 ноября 2024 · Тбилиси" },
    story: [
      {
        en: "Organised by the Georgian Wine Association with the support of the National Wine Agency, the International Qvevri Wine Competition is devoted exclusively to wines made in qvevri — the clay vessel at the heart of Georgia's ancient winemaking tradition.",
        ka: "ქვევრის ღვინის საერთაშორისო კონკურსს ასოციაცია „ქართული ღვინო“ ღვინის ეროვნული სააგენტოს მხარდაჭერით მართავს. კონკურსი მხოლოდ ქვევრში დაყენებულ ღვინოებს ეძღვნება — თიხის ჭურჭელს, რომელიც ქართული მეღვინეობის უძველესი ტრადიციის გულია.",
        ru: "Международный конкурс квеври-вин проводит Ассоциация «Грузинское вино» при поддержке Национального агентства вина. Конкурс посвящён исключительно винам, созданным в квеври — глиняном сосуде, лежащем в основе древней грузинской традиции виноделия.",
      },
      {
        en: "Every sample is tasted blind by an international jury; the 2024 certificates bear the signatures of Andrew Jefford, Julia Harding MW, Robert Joseph and Tina Kezeli. Three Etno Okami wines were awarded, led by a silver medal for Tavkveri 2022.",
        ka: "ყველა ნიმუშს საერთაშორისო ჟიური ბრმა დეგუსტაციით აფასებს; 2024 წლის სერტიფიკატებს ხელს აწერენ ენდრიუ ჯეფორდი, ჯულია ჰარდინგი (MW), რობერტ ჯოზეფი და თინა კეზელი. ეთნო ოკამის სამი ღვინო დაჯილდოვდა, მათ შორის თავკვერი 2022 — ვერცხლის მედლით.",
        ru: "Все образцы оцениваются международным жюри вслепую; сертификаты 2024 года подписаны Эндрю Джеффордом, Джулией Хардинг MW, Робертом Джозефом и Тиной Кезели. Награды получили три вина Этно Оками, среди них Тавквери 2022 — серебряная медаль.",
      },
    ],
    awards: [
      { wine: "tavkveri", vintage: 2022, medal: "silver", certificate: "iqwc-2024-silver-tavkveri-2022.png" },
      { wine: "chinuriGoruliMtsvane", vintage: 2021, medal: "bronze", certificate: "iqwc-2024-bronze-chinuri-goruli-mtsvane-2021.png" },
      { wine: "okami", vintage: 2023, medal: "bronze", certificate: "iqwc-2024-bronze-okami-2023.png" },
    ],
  },
  {
    id: "saperavi-2024",
    year: 2024,
    title: SAPERAVI,
    organizer: GWA,
    date: { en: "6–7 July 2024 · Tbilisi", ka: "6–7 ივლისი, 2024 · თბილისი", ru: "6–7 июля 2024 · Тбилиси" },
    story: [
      {
        en: "Since 2018 the Georgian Wine Association has held an international competition dedicated to a single grape — Saperavi, Georgia's signature red — supported by the Ministry of Environmental Protection and Agriculture and the National Wine Agency.",
        ka: "2018 წლიდან ასოციაცია „ქართული ღვინო“ მართავს საერთაშორისო კონკურსს, რომელიც ერთ ჯიშს — საქართველოს სავიზიტო ბარათს, საფერავს ეძღვნება. კონკურსს მხარს უჭერენ გარემოს დაცვისა და სოფლის მეურნეობის სამინისტრო და ღვინის ეროვნული სააგენტო.",
        ru: "С 2018 года Ассоциация «Грузинское вино» проводит международный конкурс, посвящённый одному сорту — Саперави, визитной карточке Грузии, при поддержке Министерства охраны окружающей среды и сельского хозяйства и Национального агентства вина.",
      },
      {
        en: "The 2024 judging, chaired by Andrew Jefford, took place on 6–7 July. Our Khashmi Saperavi was awarded for two consecutive vintages: silver for 2021 with 87 points and bronze for 2022 with 81 points.",
        ka: "2024 წლის შეფასება 6–7 ივლისს ენდრიუ ჯეფორდის თავმჯდომარეობით გაიმართა. ჩვენი ხაშმის საფერავი ზედიზედ ორი მოსავლისთვის დაჯილდოვდა: 2021 — ვერცხლი 87 ქულით, 2022 — ბრინჯაო 81 ქულით.",
        ru: "Судейство 2024 года под председательством Эндрю Джеффорда прошло 6–7 июля. Наш Хашми Саперави был награждён за два урожая подряд: 2021 — серебро с 87 баллами, 2022 — бронза с 81 баллом.",
      },
    ],
    awards: [
      { wine: "khashmiSaperavi", vintage: 2021, medal: "silver", score: 87 },
      { wine: "khashmiSaperavi", vintage: 2022, medal: "bronze", score: 81 },
    ],
  },
  {
    id: "qvevri-2023",
    year: 2023,
    title: IQWC,
    organizer: GWA,
    date: { en: "December 2023 · Tbilisi", ka: "დეკემბერი, 2023 · თბილისი", ru: "Декабрь 2023 · Тбилиси" },
    story: [
      {
        en: "In December 2023 the International Qvevri Wine Competition once again brought together qvevri winemakers from Georgia and beyond, organised by the Georgian Wine Association with the National Wine Agency.",
        ka: "2023 წლის დეკემბერში ქვევრის ღვინის საერთაშორისო კონკურსმა კვლავ შეკრიბა ქვევრის მეღვინეები საქართველოდან და მის ფარგლებს გარეთ. კონკურსი ასოციაცია „ქართულმა ღვინომ“ ღვინის ეროვნულ სააგენტოსთან ერთად მოაწყო.",
        ru: "В декабре 2023 года Международный конкурс квеври-вин вновь собрал виноделов из Грузии и других стран. Организатором выступила Ассоциация «Грузинское вино» совместно с Национальным агентством вина.",
      },
      {
        en: "The jury, headed by Robert Joseph, awarded silver medals to four Etno Okami wines — our most decorated competition to date: Chinuri-Goruli Mtsvane 2020 and 2022, Rkatsiteli 2021 and Okami 2022.",
        ka: "რობერტ ჯოზეფის ხელმძღვანელობით მომუშავე ჟიურიმ ეთნო ოკამის ოთხ ღვინოს ვერცხლის მედალი მიანიჭა — ეს ჩვენი ყველაზე წარმატებული კონკურსია: ჩინური-გორული მწვანე 2020 და 2022, რქაწითელი 2021 და ოკამი 2022.",
        ru: "Жюри под руководством Роберта Джозефа присудило серебряные медали четырём винам Этно Оками — наш самый успешный конкурс: Чинури-Горули Мцване 2020 и 2022, Ркацители 2021 и Оками 2022.",
      },
    ],
    awards: [
      { wine: "chinuriGoruliMtsvane", vintage: 2020, medal: "silver", certificate: "iqwc-2023-silver-chinuri-goruli-mtsvane-2020.png" },
      { wine: "chinuriGoruliMtsvane", vintage: 2022, medal: "silver", certificate: "iqwc-2023-silver-chinuri-goruli-mtsvane-2022.png" },
      { wine: "rkatsiteli", vintage: 2021, medal: "silver", certificate: "iqwc-2023-silver-rkatsiteli-2021.png" },
      { wine: "okami", vintage: 2022, medal: "silver", certificate: "iqwc-2023-silver-okami-2022.png" },
    ],
  },
  {
    id: "saperavi-2022",
    year: 2022,
    title: SAPERAVI,
    organizer: GWA,
    date: { en: "28–29 November 2022 · Tbilisi", ka: "28–29 ნოემბერი, 2022 · თბილისი", ru: "28–29 ноября 2022 · Тбилиси" },
    story: [
      {
        en: "The 2022 Saperavi International Competition again set out to introduce the world's best Saperavi wines — from Georgia and from producers abroad — to a wider audience.",
        ka: "2022 წლის საფერავის საერთაშორისო კონკურსის მიზანი კვლავ საუკეთესო საფერავის — როგორც ქართული, ისე უცხოური — ფართო აუდიტორიისთვის გაცნობა იყო.",
        ru: "Международный конкурс Саперави 2022 года вновь ставил целью представить широкой аудитории лучшие вина из Саперави — грузинские и зарубежные.",
      },
      {
        en: "Khashmi Saperavi 2020 received a bronze medal — the first award for a wine that would return to the podium in 2024.",
        ka: "ხაშმის საფერავი 2020 ბრინჯაოს მედლით დაჯილდოვდა — ეს იყო პირველი ჯილდო იმ ღვინისთვის, რომელიც 2024 წელს კვლავ პრიზიორთა შორის აღმოჩნდა.",
        ru: "Хашми Саперави 2020 получил бронзовую медаль — первую награду вина, которое в 2024 году снова вошло в число призёров.",
      },
    ],
    awards: [{ wine: "khashmiSaperavi", vintage: 2020, medal: "bronze" }],
  },
  {
    id: "winehunter-2022",
    year: 2022,
    title: {
      en: "The Qvevri WineHunter Award Georgia",
      ka: "The Qvevri WineHunter Award Georgia",
      ru: "The Qvevri WineHunter Award Georgia",
    },
    organizer: { en: "Merano WineFestival", ka: "მერანოს ღვინის ფესტივალი", ru: "Merano WineFestival" },
    date: { en: "19 June 2022 · Château Mukhrani", ka: "19 ივნისი, 2022 · შატო მუხრანი", ru: "19 июня 2022 · Шато Мухрани" },
    story: [
      {
        en: "In June 2022 Château Mukhrani hosted the Merano WineFestival — the first time the celebrated Italian festival had been held outside Italy. Around 70 Georgian and 60 Italian wine companies took part.",
        ka: "2022 წლის ივნისში შატო მუხრანმა მერანოს ღვინის ფესტივალს უმასპინძლა — ცნობილი იტალიური ფესტივალი იტალიის გარეთ პირველად სწორედ საქართველოში გაიმართა. მასში დაახლოებით 70 ქართული და 60 იტალიური ღვინის კომპანია მონაწილეობდა.",
        ru: "В июне 2022 года Шато Мухрани принял Merano WineFestival — знаменитый итальянский фестиваль впервые прошёл за пределами Италии. В нём участвовали около 70 грузинских и 60 итальянских винодельческих компаний.",
      },
      {
        en: "The festival closed with The Qvevri WineHunter Award, presented by founder Helmuth Köcher to wines that stand out for both quality and tradition. Our Okami 2021 received the ROSSO award.",
        ka: "ფესტივალი The Qvevri WineHunter Award-ით დასრულდა, რომელსაც დამფუძნებელი ჰელმუტ კოხერი ხარისხითა და ტრადიციით გამორჩეულ ღვინოებს გადასცემს. ჩვენმა ოკამი 2021-მა ROSSO ჯილდო დაიმსახურა.",
        ru: "Фестиваль завершился вручением The Qvevri WineHunter Award — основатель Хельмут Кёхер вручает её винам, выделяющимся качеством и верностью традиции. Наше Оками 2021 получило награду ROSSO.",
      },
    ],
    awards: [
      { wine: "okami", vintage: 2021, medal: "rosso", certificate: "winehunter-2022-rosso-okami-2021.png" },
    ],
  },
  {
    id: "kartli-wine",
    year: null,
    title: {
      en: "Kartli Wine: From Uplistsikhe to Modernity",
      ka: "ქართლის ღვინო — უფლისციხიდან თანამედროვეობამდე",
      ru: "Вино Картли: от Уплисцихе до современности",
    },
    organizer: { en: "Georgian Wine Guild", ka: "ქართული ღვინის გილდია", ru: "Гильдия грузинского вина" },
    date: null,
    story: [
      {
        en: "Initiated by the Georgian Wine Guild, this competition celebrates the wines of Kartli — the historic region that is home to Etno Okami. Wines are scored on colour and clarity, flaws, aroma, taste and harmony.",
        ka: "ქართული ღვინის გილდიის ინიციატივით გამართული კონკურსი ქართლის — ეთნო ოკამის მშობლიური ისტორიული მხარის — ღვინოებს ეძღვნება. ღვინოები ფასდება ფერის და გამჭვირვალობის, ნაკლოვანებების, არომატის, გემოსა და ჰარმონიის მიხედვით.",
        ru: "Конкурс, организованный по инициативе Гильдии грузинского вина, посвящён винам Картли — исторического края, где расположена Этно Оками. Вина оцениваются по цвету и прозрачности, недостаткам, аромату, вкусу и гармонии.",
      },
      {
        en: "Two wines from the 2020 vintage were honoured: Shavkapito 2020 with a gold medal and Tavkveri 2020 with bronze.",
        ka: "დაჯილდოვდა 2020 წლის მოსავლის ორი ღვინო: შავკაპიტო 2020 — ოქროს მედლით, თავკვერი 2020 — ბრინჯაოს მედლით.",
        ru: "Награды получили два вина урожая 2020 года: Шавкапито 2020 — золотая медаль, Тавквери 2020 — бронзовая.",
      },
    ],
    awards: [
      { wine: "shavkapito", vintage: 2020, medal: "gold" },
      { wine: "tavkveri", vintage: 2020, medal: "bronze" },
    ],
  },
];

export const allAwards = competitions.flatMap((competition) =>
  competition.awards.map((award) => ({ ...award, competition }))
);

// The product page each award belongs to. "Okami" certificates don't always
// say whether it was the red or the amber wine: only Okami 2022 is confirmed
// ("Etno Okami – Red Dry"), so the other Okami awards stay unlinked.
const awardWineSlugs: Record<WineKey, string> = {
  shavkapito: "shavkapito",
  tavkveri: "tavkveri",
  khashmiSaperavi: "khashmi-saperavi",
  chinuriGoruliMtsvane: "chinuri-goruli-mtsvane",
  rkatsiteli: "rkatsiteli",
  okami: "okami-red",
};

export function wineSlugForAward(award: Award): string | null {
  if (award.wine === "okami" && award.vintage !== 2022) return null;
  return awardWineSlugs[award.wine];
}

export function awardsForWine(slug: string) {
  return allAwards.filter((award) => wineSlugForAward(award) === slug);
}
