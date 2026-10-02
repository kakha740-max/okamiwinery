import type { Language } from "@/lib/translations";

// Etno Okami wine range. Type, vintage and alcohol come from the bottle
// labels; "—" marks a value the label doesn't show yet.
export const wines = [
  {
    id: "okami-red",
    slug: "okami-red",
    category: "Red",

    name: "Okami",
    subtitle: "Dry Red Qvevri Wine",

    year: "2022",
    variety: "100% Shavkapito",
    alcohol: "13%",
    volume: "750 ml",

    region: "Etno Okami Microzone",
    method: "Qvevri",
    sweetness: "Dry",

    image: "/images/wines/okami-red.png",

    description:
      "Our signature red and registered appellation wine, made from Shavkapito — an indigenous grape of Kartli — fermented and matured in qvevri.",

    taste: {
      sweetness: 1,
      acidity: 4,
      body: 4,
      tannins: 3,
    },

    notes: ["Red Cherry", "Pomegranate", "Black Pepper", "Dried Herbs"],

    pairing: ["Mtsvadi", "Lamb", "Mushroom Dishes", "Hard Cheese"],

    servingTemperature: "16–18°C",

    decanting: "20–30 Minutes",

    agingPotential: "5–7 Years",

    // Display text for the Georgian and Russian pages; English is above.
    translations: {
      ka: {
        name: "ოკამი",
        subtitle: "მშრალი წითელი ქვევრის ღვინო",
        description:
          "ჩვენი საფირმო წითელი და ადგილწარმოშობის დასახელების მქონე ღვინო, დაყენებული შავკაპიტოსგან — ქართლის ენდემური ჯიშისგან. დუღილი და დავარგება ქვევრში მიმდინარეობს.",
        variety: "100% შავკაპიტო",
        volume: "750 მლ",
        region: "ეთნო ოკამის მიკროზონა",
        method: "ქვევრი",
        pairing: ["მწვადი", "ცხვრის ხორცი", "სოკოს კერძები", "მაგარი ყველი"],
      },
      ru: {
        name: "Оками",
        subtitle: "Сухое красное вино в квеври",
        description:
          "Наше фирменное красное вино с наименованием места происхождения, созданное из Шавкапито — автохтонного сорта Картли. Брожение и выдержка проходят в квеври.",
        variety: "100% Шавкапито",
        volume: "750 мл",
        region: "Микрозона Этно Оками",
        method: "Квеври",
        pairing: ["Мцвади", "Баранина", "Блюда из грибов", "Твёрдый сыр"],
      },
    },
  },

  {
    id: "okami-white",
    slug: "okami-white",
    category: "White",

    name: "Okami",
    subtitle: "Dry Amber Qvevri Wine",

    year: "2021",
    variety: "Chinuri, Goruli Mtsvane",
    alcohol: "—",
    volume: "750 ml",

    region: "Etno Okami Microzone",
    method: "Qvevri",
    sweetness: "Dry",

    image: "/images/wines/okami-white.png",

    description:
      "An amber wine of Kartli's classic white grapes, Chinuri and Goruli Mtsvane, fermented on the skins in qvevri for depth, texture and a gentle grip.",

    taste: {
      sweetness: 1,
      acidity: 4,
      body: 3,
      tannins: 2,
    },

    notes: ["Dried Apricot", "Quince", "Walnut", "Honey"],

    pairing: ["Grilled Fish", "Chicken Satsivi", "Pkhali", "Sulguni"],

    servingTemperature: "12–14°C",

    decanting: "Not Required",

    agingPotential: "4–6 Years",

    // Display text for the Georgian and Russian pages; English is above.
    translations: {
      ka: {
        name: "ოკამი",
        subtitle: "მშრალი ქარვისფერი ქვევრის ღვინო",
        description:
          "ქართლის კლასიკური თეთრი ჯიშების — ჩინურისა და გორული მწვანის — ქარვისფერი ღვინო, ჭაჭაზე დადუღებული ქვევრში, რაც მას სიღრმეს, ტექსტურასა და რბილ სიმკვრივეს ანიჭებს.",
        variety: "ჩინური, გორული მწვანე",
        volume: "750 მლ",
        region: "ეთნო ოკამის მიკროზონა",
        method: "ქვევრი",
        pairing: ["შემწვარი თევზი", "ქათმის საცივი", "ფხალი", "სულგუნი"],
      },
      ru: {
        name: "Оками",
        subtitle: "Сухое янтарное вино в квеври",
        description:
          "Янтарное вино из классических белых сортов Картли — Чинури и Горули Мцване, сброженное на мезге в квеври, что придаёт ему глубину, текстуру и мягкую структуру.",
        variety: "Чинури, Горули Мцване",
        volume: "750 мл",
        region: "Микрозона Этно Оками",
        method: "Квеври",
        pairing: ["Рыба на гриле", "Сациви из курицы", "Пхали", "Сулугуни"],
      },
    },
  },

  {
    id: "khashmi-saperavi",
    slug: "khashmi-saperavi",
    category: "Red",

    name: "Khashmi Saperavi",
    subtitle: "Dry Red Qvevri Wine",

    year: "2020",
    variety: "100% Saperavi",
    alcohol: "13.5%",
    volume: "750 ml",

    region: "Etno Okami Microzone",
    method: "Qvevri",
    sweetness: "Dry",

    image: "/images/wines/khashmi-saperavi.png",

    description:
      "Saperavi from Khashmi, made in qvevri — deep in colour, with dark fruit and firm structure. Awarded at the Saperavi International Competition in 2022 and 2024.",

    taste: {
      sweetness: 1,
      acidity: 4,
      body: 5,
      tannins: 4,
    },

    notes: ["Blackberry", "Plum", "Black Cherry", "Spice"],

    pairing: ["Grilled Beef", "Lamb", "Khinkali", "Aged Cheese"],

    servingTemperature: "16–18°C",

    decanting: "30 Minutes",

    agingPotential: "8–10 Years",

    // Display text for the Georgian and Russian pages; English is above.
    translations: {
      ka: {
        name: "ხაშმის საფერავი",
        subtitle: "მშრალი წითელი ქვევრის ღვინო",
        description:
          "ხაშმის საფერავი, დაყენებული ქვევრში — მუქი ფერის, შავი ხილის არომატებითა და მტკიცე სტრუქტურით. დაჯილდოებულია საფერავის საერთაშორისო კონკურსზე 2022 და 2024 წლებში.",
        variety: "100% საფერავი",
        volume: "750 მლ",
        region: "ეთნო ოკამის მიკროზონა",
        method: "ქვევრი",
        pairing: ["შემწვარი საქონლის ხორცი", "ცხვრის ხორცი", "ხინკალი", "დავარგებული ყველი"],
      },
      ru: {
        name: "Хашми Саперави",
        subtitle: "Сухое красное вино в квеври",
        description:
          "Саперави из Хашми, созданное в квеври, — глубокого цвета, с тёмными ягодами и плотной структурой. Отмечено наградами Международного конкурса Саперави в 2022 и 2024 годах.",
        variety: "100% Саперави",
        volume: "750 мл",
        region: "Микрозона Этно Оками",
        method: "Квеври",
        pairing: ["Говядина на гриле", "Баранина", "Хинкали", "Выдержанный сыр"],
      },
    },
  },

  {
    id: "shavkapito",
    slug: "shavkapito",
    category: "Red",

    name: "Shavkapito",
    subtitle: "Dry Red Wine",

    year: "—",
    variety: "100% Shavkapito",
    alcohol: "12%",
    volume: "750 ml",

    region: "Etno Okami Microzone",
    method: "—",
    sweetness: "Dry",

    image: "/images/wines/shavkapito.png",

    description:
      "A rare red grape native to Kartli, Shavkapito gives a vibrant, medium-bodied wine with bright red fruit and a gentle spice.",

    taste: {
      sweetness: 1,
      acidity: 4,
      body: 3,
      tannins: 3,
    },

    notes: ["Raspberry", "Cherry", "Violet", "Spice"],

    pairing: ["Kebab", "Poultry", "Pasta", "Soft Cheese"],

    servingTemperature: "15–17°C",

    decanting: "20 Minutes",

    agingPotential: "4–6 Years",

    // Display text for the Georgian and Russian pages; English is above.
    translations: {
      ka: {
        name: "შავკაპიტო",
        subtitle: "მშრალი წითელი ღვინო",
        description:
          "ქართლის იშვიათი წითელი ჯიში შავკაპიტო ცოცხალ, საშუალო სხეულის ღვინოს იძლევა წითელი ხილის ნათელი არომატებითა და რბილი სანელებლის ნოტით.",
        variety: "100% შავკაპიტო",
        volume: "750 მლ",
        region: "ეთნო ოკამის მიკროზონა",
        method: "—",
        pairing: ["ქაბაბი", "შინაური ფრინველი", "პასტა", "რბილი ყველი"],
      },
      ru: {
        name: "Шавкапито",
        subtitle: "Сухое красное вино",
        description:
          "Редкий красный сорт Картли Шавкапито даёт живое вино средней полноты с яркими красными ягодами и лёгкой пряностью.",
        variety: "100% Шавкапито",
        volume: "750 мл",
        region: "Микрозона Этно Оками",
        method: "—",
        pairing: ["Кебаб", "Птица", "Паста", "Мягкий сыр"],
      },
    },
  },

  {
    id: "tavkveri",
    slug: "tavkveri",
    category: "Red",

    name: "Tavkveri",
    subtitle: "Dry Red Qvevri Wine",

    year: "2021",
    variety: "100% Tavkveri",
    alcohol: "11%",
    volume: "750 ml",

    region: "Etno Okami Microzone",
    method: "Qvevri",
    sweetness: "Dry",

    image: "/images/wines/tavkveri.png",

    description:
      "A light, fragrant red from the Kartli grape Tavkveri, made in qvevri — fresh red fruit, soft tannins and an easy, lively finish.",

    taste: {
      sweetness: 1,
      acidity: 4,
      body: 2,
      tannins: 2,
    },

    notes: ["Strawberry", "Red Currant", "Rose Petal"],

    pairing: ["Charcuterie", "Mushrooms", "Chicken", "Lobio"],

    servingTemperature: "14–16°C",

    decanting: "Not Required",

    agingPotential: "3–5 Years",

    // Display text for the Georgian and Russian pages; English is above.
    translations: {
      ka: {
        name: "თავკვერი",
        subtitle: "მშრალი წითელი ქვევრის ღვინო",
        description:
          "ქართლური ჯიშის, თავკვერისგან ქვევრში დაყენებული მსუბუქი, არომატული წითელი ღვინო — ახალი წითელი ხილით, რბილი ტანინებითა და ცოცხალი დაბოლოებით.",
        variety: "100% თავკვერი",
        volume: "750 მლ",
        region: "ეთნო ოკამის მიკროზონა",
        method: "ქვევრი",
        pairing: ["ცივი ხორცეული", "სოკო", "ქათამი", "ლობიო"],
      },
      ru: {
        name: "Тавквери",
        subtitle: "Сухое красное вино в квеври",
        description:
          "Лёгкое ароматное красное вино из картлийского сорта Тавквери, созданное в квеври, — свежие красные ягоды, мягкие танины и живое послевкусие.",
        variety: "100% Тавквери",
        volume: "750 мл",
        region: "Микрозона Этно Оками",
        method: "Квеври",
        pairing: ["Мясная нарезка", "Грибы", "Курица", "Лобио"],
      },
    },
  },

  {
    id: "rkatsiteli",
    slug: "rkatsiteli",
    category: "White",

    name: "Rkatsiteli",
    subtitle: "Dry Amber Qvevri Wine",

    year: "2021",
    variety: "100% Rkatsiteli",
    alcohol: "—",
    volume: "750 ml",

    region: "Etno Okami Microzone",
    method: "Qvevri",
    sweetness: "Dry",

    image: "/images/wines/rkatsiteli.png",

    description:
      "Georgia's best-known white grape, fermented with its skins in qvevri — an amber wine with structure, dried-fruit depth and a long, savoury finish.",

    taste: {
      sweetness: 1,
      acidity: 4,
      body: 4,
      tannins: 3,
    },

    notes: ["Dried Apricot", "Black Tea", "Orange Peel", "Walnut"],

    pairing: ["Satsivi", "Pkhali", "Roast Pork", "Aged Cheese"],

    servingTemperature: "12–14°C",

    decanting: "Not Required",

    agingPotential: "5–7 Years",

    // Display text for the Georgian and Russian pages; English is above.
    translations: {
      ka: {
        name: "რქაწითელი",
        subtitle: "მშრალი ქარვისფერი ქვევრის ღვინო",
        description:
          "საქართველოს ყველაზე ცნობილი თეთრი ჯიში, ჭაჭასთან ერთად დადუღებული ქვევრში — ქარვისფერი ღვინო სტრუქტურით, ჩირის არომატებითა და ხანგრძლივი დაბოლოებით.",
        variety: "100% რქაწითელი",
        volume: "750 მლ",
        region: "ეთნო ოკამის მიკროზონა",
        method: "ქვევრი",
        pairing: ["საცივი", "ფხალი", "შემწვარი ღორის ხორცი", "დავარგებული ყველი"],
      },
      ru: {
        name: "Ркацители",
        subtitle: "Сухое янтарное вино в квеври",
        description:
          "Самый известный белый сорт Грузии, сброженный на мезге в квеври, — янтарное вино со структурой, нотами сухофруктов и долгим пикантным послевкусием.",
        variety: "100% Ркацители",
        volume: "750 мл",
        region: "Микрозона Этно Оками",
        method: "Квеври",
        pairing: ["Сациви", "Пхали", "Жареная свинина", "Выдержанный сыр"],
      },
    },
  },

  {
    id: "chinuri-goruli-mtsvane",
    slug: "chinuri-goruli-mtsvane",
    category: "White",

    name: "Chinuri-Goruli Mtsvane",
    subtitle: "Dry Qvevri Wine",

    year: "2020",
    variety: "Chinuri, Goruli Mtsvane",
    alcohol: "11.5%",
    volume: "750 ml",

    region: "Etno Okami Microzone",
    method: "Qvevri",
    sweetness: "Dry",

    image: "/images/wines/chinuri-goruli-mtsvane.png",

    description:
      "A crisp white from two Kartli grapes, Chinuri and Goruli Mtsvane, made in qvevri — fresh orchard fruit, citrus and meadow herbs.",

    taste: {
      sweetness: 1,
      acidity: 4,
      body: 2,
      tannins: 1,
    },

    notes: ["Green Apple", "Pear", "Citrus", "Meadow Herbs"],

    pairing: ["Trout", "Fresh Salads", "Goat Cheese", "Seafood"],

    servingTemperature: "10–12°C",

    decanting: "Not Required",

    agingPotential: "3–5 Years",

    // Display text for the Georgian and Russian pages; English is above.
    translations: {
      ka: {
        name: "ჩინური-გორული მწვანე",
        subtitle: "მშრალი ქვევრის ღვინო",
        description:
          "ქართლის ორი ჯიშის — ჩინურისა და გორული მწვანის — ხალასი თეთრი ღვინო, დაყენებული ქვევრში: ახალი ხილის, ციტრუსისა და მინდვრის ბალახების არომატებით.",
        variety: "ჩინური, გორული მწვანე",
        volume: "750 მლ",
        region: "ეთნო ოკამის მიკროზონა",
        method: "ქვევრი",
        pairing: ["კალმახი", "ახალი სალათები", "თხის ყველი", "ზღვის პროდუქტები"],
      },
      ru: {
        name: "Чинури-Горули Мцване",
        subtitle: "Сухое вино в квеври",
        description:
          "Свежее белое вино из двух сортов Картли — Чинури и Горули Мцване, созданное в квеври: свежие фрукты, цитрусы и луговые травы.",
        variety: "Чинури, Горули Мцване",
        volume: "750 мл",
        region: "Микрозона Этно Оками",
        method: "Квеври",
        pairing: ["Форель", "Свежие салаты", "Козий сыр", "Морепродукты"],
      },
    },
  },
];

export type Wine = (typeof wines)[number];

// Swap in the visitor's language for the text shown on wine pages.
// Filtering and sorting keep using the English fields on the original object.
export function localizeWine(wine: Wine, language: Language): Wine {
  if (language === "en") return wine;
  return { ...wine, ...wine.translations[language] };
}
