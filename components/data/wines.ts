import type { Language } from "@/lib/translations";

// Etno Okami wine range. Vintage and alcohol as confirmed by the winery
// (2026-10); type, region and the tasting text from its wine sheet. "—"
// marks a value not given yet. Descriptions may hold paragraph breaks.
// Vintages are kept in the data but not shown on the site for now: wine
// pages, cards, page titles, technical sheets and structured data all follow
// this switch. (Award vintages are part of each award and stay.)
export const SHOW_VINTAGE = false;

export const wines = [
  {
    id: "okami-red",
    slug: "okami-red",
    category: "Red",

    name: "Okami",
    subtitle: "Dry Red Qvevri Wine",

    year: "2022",
    variety: "Shavkapito",
    alcohol: "13%",
    volume: "750 ml",

    region: "Kartli",
    method: "Qvevri",
    sweetness: "Dry",

    image: "/images/wines/okami-red.png",

    description:
      "“Okami” PDO wine is crafted using the traditional Georgian method in Qvevri with Shavkapito grapes from Kartli, featuring a garnet color with rich aromas of red plum, cherry, and apple. Full-bodied with velvety tannins and balanced acidity, it offers a complex palate of red stone fruits, dried leaves, and dark chocolate, culminating in a lasting aftertaste. Ideal for extended aging.",

    taste: {
      sweetness: 1,
      acidity: 4,
      body: 4,
      tannins: 3,
    },

    notes: ["Red Plum", "Cherry", "Apple", "Dark Chocolate"],

    pairing: ["Mtsvadi", "Lamb", "Mushroom Dishes", "Hard Cheese"],

    servingTemperature: "16–18°C",

    decanting: "20–30 Minutes",

    agingPotential: "5–7 Years",

    // Display text for the Georgian, Russian and Chinese pages; English is above.
    translations: {
      ka: {
        name: "ოკამი",
        subtitle: "მშრალი წითელი ქვევრის ღვინო",
        description:
          "„ოკამის“ ადგილწარმოშობის დაცული დასახელების ღვინო ტრადიციული ქართული მეთოდით, ქვევრში, ქართლის შავკაპიტოს ყურძნისგან მზადდება. მას ბროწეულისფერი შეფერილობა და წითელი ქლიავის, ბლისა და ვაშლის მდიდარი არომატი აქვს. სრული სხეულის ღვინოა ხავერდოვანი ტანინებითა და დაბალანსებული მჟავიანობით; გემოში წითელი კურკოვანი ხილის, გამხმარი ფოთლებისა და მუქი შოკოლადის რთული ნოტები იხსნება, რომლებიც ხანგრძლივ შემდეგგემოში გადადის. იდეალურია ხანგრძლივი დავარგებისთვის.",
        variety: "შავკაპიტო",
        volume: "750 მლ",
        region: "ქართლი",
        method: "ქვევრი",
        pairing: ["მწვადი", "ცხვრის ხორცი", "სოკოს კერძები", "მაგარი ყველი"],
      },
      ru: {
        name: "Оками",
        subtitle: "Сухое красное вино в квеври",
        description:
          "Вино с защищённым наименованием места происхождения «Оками» создаётся по традиционной грузинской технологии в квеври из винограда Шавкапито из Картли. Оно отличается гранатовым цветом и богатым ароматом красной сливы, вишни и яблока. Полнотелое, с бархатистыми танинами и сбалансированной кислотностью, оно раскрывает сложный вкус красных косточковых фруктов, сухих листьев и тёмного шоколада, переходящий в долгое послевкусие. Идеально для длительной выдержки.",
        variety: "Шавкапито",
        volume: "750 мл",
        region: "Картли",
        method: "Квеври",
        pairing: ["Мцвади", "Баранина", "Блюда из грибов", "Твёрдый сыр"],
      },
      zh: {
        name: "奥卡米",
        subtitle: "陶罐干红葡萄酒",
        description:
          "这款“奥卡米”原产地保护名称葡萄酒采用格鲁吉亚传统工艺，以卡特利的沙夫卡皮托葡萄在陶罐中酿造。酒液呈石榴红色，散发着红李子、樱桃和苹果的浓郁香气。酒体饱满，单宁如天鹅绒般柔滑，酸度均衡；口中展现出红色核果、干树叶和黑巧克力的复杂风味，并延伸至悠长的余味。非常适合长期陈年。",
        variety: "沙夫卡皮托",
        volume: "750毫升",
        region: "卡特利",
        method: "陶罐",
        pairing: ["姆茨瓦迪烤肉", "羊肉", "蘑菇菜肴", "硬质奶酪"],
      },
    },
  },

  {
    id: "okami-white",
    slug: "okami-white",
    category: "White",

    name: "Okami",
    subtitle: "Dry White Wine",

    year: "2023",
    variety: "Chinuri, Goruli Mtsvane",
    alcohol: "13%",
    volume: "750 ml",

    region: "Kartli",
    method: "Classical",
    sweetness: "Dry",

    image: "/images/wines/okami-white.png",

    description:
      "This exquisite wine is crafted using the classical method from the cherished Kartli grape varieties, “Chinuri” and “Goruli Mtsvane.” It displays a bright yellow hue with a greenish arc and exceptional clarity. The nose is rich with well-developed aromas of cream and apple pie, gradually giving way to delightful notes of pear and salted almonds. On the palate, the wine is vibrant and harmonious, featuring crisp acidity, a touch of spiciness, and a lingering mineral finish.",

    taste: {
      sweetness: 1,
      acidity: 4,
      body: 3,
      tannins: 2,
    },

    notes: ["Cream", "Apple Pie", "Pear", "Salted Almond"],

    pairing: ["Grilled Fish", "Chicken Satsivi", "Pkhali", "Sulguni"],

    servingTemperature: "12–14°C",

    decanting: "Not Required",

    agingPotential: "4–6 Years",

    // Display text for the Georgian, Russian and Chinese pages; English is above.
    translations: {
      ka: {
        name: "ოკამი",
        subtitle: "მშრალი თეთრი ღვინო",
        description:
          "ეს დახვეწილი ღვინო კლასიკური მეთოდით მზადდება ქართლის საყვარელი ჯიშებისგან — „ჩინურისა“ და „გორული მწვანისგან“. მას ნათელი ყვითელი ფერი მომწვანო ელფერით და განსაკუთრებული სისუფთავე აქვს. არომატი მდიდარია ნაღებისა და ვაშლის ღვეზელის განვითარებული ნოტებით, რომლებიც თანდათან მსხლისა და მარილიანი ნუშის სასიამოვნო ნოტებში გადადის. გემოში ღვინო ცოცხალი და ჰარმონიულია, ხალასი მჟავიანობით, მსუბუქი სიცხარითა და ხანგრძლივი მინერალური დაბოლოებით.",
        variety: "ჩინური, გორული მწვანე",
        volume: "750 მლ",
        region: "ქართლი",
        method: "კლასიკური",
        pairing: ["შემწვარი თევზი", "ქათმის საცივი", "ფხალი", "სულგუნი"],
      },
      ru: {
        name: "Оками",
        subtitle: "Сухое белое вино",
        description:
          "Это изысканное вино создано классическим методом из любимых сортов Картли — «Чинури» и «Горули Мцване». Оно ярко-жёлтого цвета с зеленоватым отливом и исключительной прозрачностью. Аромат богат развитыми нотами сливок и яблочного пирога, постепенно уступающими приятным оттенкам груши и солёного миндаля. Во вкусе вино живое и гармоничное, со свежей кислотностью, лёгкой пряностью и долгим минеральным послевкусием.",
        variety: "Чинури, Горули Мцване",
        volume: "750 мл",
        region: "Картли",
        method: "Классический",
        pairing: ["Рыба на гриле", "Сациви из курицы", "Пхали", "Сулугуни"],
      },
      zh: {
        name: "奥卡米",
        subtitle: "干白葡萄酒",
        description:
          "这款精致的葡萄酒以卡特利深受喜爱的“奇努里”和“戈鲁利·姆茨瓦内”葡萄品种，采用经典工艺酿造。酒液呈明亮的黄色，带有淡淡的绿色光泽，格外清澈。香气丰富，奶油和苹果派的成熟气息逐渐过渡到梨和咸杏仁的宜人香调。口感活泼和谐，酸度清爽，带有轻微的辛香和悠长的矿物感余味。",
        variety: "奇努里、戈鲁利·姆茨瓦内",
        volume: "750毫升",
        region: "卡特利",
        method: "经典工艺",
        pairing: ["烤鱼", "核桃酱鸡肉（萨茨维）", "普哈利（蔬菜核桃泥）", "苏卢古尼奶酪"],
      },
    },
  },

  {
    id: "khashmi-saperavi",
    slug: "khashmi-saperavi",
    category: "Red",

    name: "Khashmi Saperavi",
    subtitle: "Dry Red Qvevri Wine",

    year: "2022",
    variety: "Saperavi",
    alcohol: "12%",
    volume: "750 ml",

    region: "Kakheti",
    method: "Qvevri",
    sweetness: "Dry",

    image: "/images/wines/khashmi-saperavi.png",

    description:
      "Saperavi Khashmi PDO wine is crafted through traditional Georgian methods, fermented in Qvevri with the pulp of the Saperavi grape variety from Kakheti. This wine boasts a deep purple hue and is distinguished by its vibrant aromas of violets, red cherries, black plums, and ripe blackberries. On the palate, it offers a full-bodied experience, characterized by soft, balanced tannins, moderate acidity, and a delightful finish of roasted nuts.",

    taste: {
      sweetness: 1,
      acidity: 4,
      body: 5,
      tannins: 4,
    },

    notes: ["Violet", "Red Cherry", "Black Plum", "Blackberry"],

    pairing: ["Grilled Beef", "Lamb", "Khinkali", "Aged Cheese"],

    servingTemperature: "16–18°C",

    decanting: "30 Minutes",

    agingPotential: "8–10 Years",

    // Display text for the Georgian, Russian and Chinese pages; English is above.
    translations: {
      ka: {
        name: "ხაშმის საფერავი",
        subtitle: "მშრალი წითელი ქვევრის ღვინო",
        description:
          "ხაშმის საფერავი, ადგილწარმოშობის დაცული დასახელების ღვინო, ტრადიციული ქართული მეთოდით მზადდება — კახეთის საფერავის ყურძენი ჭაჭაზე დუღს ქვევრში. ღვინო ღრმა იისფერია და იების, წითელი ბლის, შავი ქლიავისა და მწიფე მაყვლის ცოცხალი არომატებით გამოირჩევა. გემოში სრული სხეულისაა, რბილი, დაბალანსებული ტანინებით, ზომიერი მჟავიანობითა და შემწვარი თხილეულის სასიამოვნო დაბოლოებით.",
        variety: "საფერავი",
        volume: "750 მლ",
        region: "კახეთი",
        method: "ქვევრი",
        pairing: ["შემწვარი საქონლის ხორცი", "ცხვრის ხორცი", "ხინკალი", "დავარგებული ყველი"],
      },
      ru: {
        name: "Хашми Саперави",
        subtitle: "Сухое красное вино в квеври",
        description:
          "Саперави Хашми — вино с защищённым наименованием места происхождения, созданное по традиционной грузинской технологии: виноград Саперави из Кахети бродит на мезге в квеври. Вино глубокого пурпурного цвета, с яркими ароматами фиалки, красной вишни, чёрной сливы и спелой ежевики. Во вкусе полнотелое, с мягкими сбалансированными танинами, умеренной кислотностью и приятным послевкусием жареных орехов.",
        variety: "Саперави",
        volume: "750 мл",
        region: "Кахети",
        method: "Квеври",
        pairing: ["Говядина на гриле", "Баранина", "Хинкали", "Выдержанный сыр"],
      },
      zh: {
        name: "哈什米·萨别拉维",
        subtitle: "陶罐干红葡萄酒",
        description:
          "哈什米·萨别拉维是一款原产地保护名称葡萄酒，采用格鲁吉亚传统工艺酿造——卡赫季的萨别拉维葡萄连同果皮和果渣在陶罐中发酵。酒液呈深紫色，以紫罗兰、红樱桃、黑李子和成熟黑莓的鲜活香气见长。口感酒体饱满、柔顺，单宁均衡，酸度适中，余味带有烤坚果的宜人风味。",
        variety: "萨别拉维",
        volume: "750毫升",
        region: "卡赫季",
        method: "陶罐",
        pairing: ["烤牛肉", "羊肉", "格鲁吉亚饺子（欣卡利）", "陈年奶酪"],
      },
    },
  },

  {
    id: "shavkapito",
    slug: "shavkapito",
    category: "Red",

    name: "Shavkapito",
    subtitle: "Dry Red Qvevri Wine",

    year: "2022",
    variety: "Shavkapito",
    alcohol: "13%",
    volume: "750 ml",

    region: "Kartli",
    method: "Qvevri",
    sweetness: "Dry",

    image: "/images/wines/shavkapito.png",

    description:
      "The grapes are cultivated in Kartli and the wine is made by using Georgian traditional Qvevri winemaking method, with full skin contact. It goes through 3-month maceration, and then continues aging in oak barrels for 6 months.\n\nThe wine is dark ruby in colour, with sharply distinguished aromas of spices, dried leaves, wet earth, cornel and black plum. The taste is full, distinct rich tannins and piquant spiciness that lasts for a long time.",

    taste: {
      sweetness: 1,
      acidity: 4,
      body: 3,
      tannins: 3,
    },

    notes: ["Black Plum", "Cornel", "Spice", "Wet Earth"],

    pairing: ["Kebab", "Poultry", "Pasta", "Soft Cheese"],

    servingTemperature: "15–17°C",

    decanting: "20 Minutes",

    agingPotential: "4–6 Years",

    // Display text for the Georgian, Russian and Chinese pages; English is above.
    translations: {
      ka: {
        name: "შავკაპიტო",
        subtitle: "მშრალი წითელი ქვევრის ღვინო",
        description:
          "ყურძენი ქართლშია მოყვანილი, ღვინო კი ქართული ტრადიციული ქვევრის მეთოდით, ჭაჭასთან სრული კონტაქტით მზადდება. ის 3-თვიან მაცერაციას გადის, შემდეგ კი 6 თვე მუხის კასრებში ძველდება.\n\nღვინო მუქი ლალისფერია, მკვეთრად გამოხატული სანელებლების, გამხმარი ფოთლების, სველი მიწის, შინდისა და შავი ქლიავის არომატებით. გემო სრულია, გამოკვეთილი მდიდარი ტანინებითა და პიკანტური სიცხარით, რომელიც დიდხანს რჩება.",
        variety: "შავკაპიტო",
        volume: "750 მლ",
        region: "ქართლი",
        method: "ქვევრი",
        pairing: ["ქაბაბი", "შინაური ფრინველი", "პასტა", "რბილი ყველი"],
      },
      ru: {
        name: "Шавкапито",
        subtitle: "Сухое красное вино в квеври",
        description:
          "Виноград выращивается в Картли, а вино производится по традиционной грузинской технологии квеври с полным контактом с мезгой. Оно проходит 3-месячную мацерацию, а затем выдерживается в дубовых бочках 6 месяцев.\n\nВино тёмно-рубинового цвета, с ярко выраженными ароматами пряностей, сухих листьев, влажной земли, кизила и чёрной сливы. Вкус полный, с выраженными насыщенными танинами и долгим пикантно-пряным послевкусием.",
        variety: "Шавкапито",
        volume: "750 мл",
        region: "Картли",
        method: "Квеври",
        pairing: ["Кебаб", "Птица", "Паста", "Мягкий сыр"],
      },
      zh: {
        name: "沙夫卡皮托",
        subtitle: "陶罐干红葡萄酒",
        description:
          "葡萄产自卡特利，葡萄酒采用格鲁吉亚传统陶罐工艺，与果皮和果渣充分接触酿造。酒液先经过3个月的浸渍，再在橡木桶中陈酿6个月。\n\n酒液呈深宝石红色，散发着鲜明的香料、干树叶、湿润泥土、山茱萸和黑李子的香气。口感饱满，单宁丰富而鲜明，辛香持久。",
        variety: "沙夫卡皮托",
        volume: "750毫升",
        region: "卡特利",
        method: "陶罐",
        pairing: ["烤肉串", "禽肉", "意大利面", "软质奶酪"],
      },
    },
  },

  {
    id: "tavkveri",
    slug: "tavkveri",
    category: "Red",

    name: "Tavkveri",
    subtitle: "Dry Red Qvevri Wine",

    year: "2023",
    variety: "Tavkveri",
    alcohol: "11%",
    volume: "750 ml",

    region: "Kartli",
    method: "Qvevri",
    sweetness: "Dry",

    image: "/images/wines/tavkveri.png",

    description:
      "Crafted using the traditional Georgian Qvevri method, this wine is fermented on the pulp of the Tavkveri grape from Kartli. It exhibits a deep purple color and is distinguished by vivid aromas of dried plums, Cornelian cherry, and ripe sour cherries that transition into subtle hints of liquorice. This medium-bodied wine is fresh with crisp acidity, youthful tannins, and a lingering finish of red plum.",

    taste: {
      sweetness: 1,
      acidity: 4,
      body: 2,
      tannins: 2,
    },

    notes: ["Dried Plum", "Cornelian Cherry", "Sour Cherry", "Liquorice"],

    pairing: ["Charcuterie", "Mushrooms", "Chicken", "Lobio"],

    servingTemperature: "14–16°C",

    decanting: "Not Required",

    agingPotential: "3–5 Years",

    // Display text for the Georgian, Russian and Chinese pages; English is above.
    translations: {
      ka: {
        name: "თავკვერი",
        subtitle: "მშრალი წითელი ქვევრის ღვინო",
        description:
          "ტრადიციული ქართული ქვევრის მეთოდით დაყენებული ეს ღვინო ქართლის თავკვერის ყურძნის ჭაჭაზე დუღს. მას ღრმა იისფერი შეფერილობა აქვს და ქლიავის ჩირის, შინდისა და მწიფე ალუბლის ცოცხალი არომატებით გამოირჩევა, რომლებიც ძირტკბილას ნაზ ნოტებში გადადის. საშუალო სხეულის, ხალასი ღვინოა ცოცხალი მჟავიანობით, ახალგაზრდა ტანინებითა და წითელი ქლიავის ხანგრძლივი დაბოლოებით.",
        variety: "თავკვერი",
        volume: "750 მლ",
        region: "ქართლი",
        method: "ქვევრი",
        pairing: ["ცივი ხორცეული", "სოკო", "ქათამი", "ლობიო"],
      },
      ru: {
        name: "Тавквери",
        subtitle: "Сухое красное вино в квеври",
        description:
          "Вино производится по традиционной грузинской технологии в квеври: оно бродит на мезге винограда Тавквери из Картли. Оно глубокого пурпурного цвета и отличается яркими ароматами чернослива, кизила и спелой вишни, переходящими в тонкие нотки солодки. Вино средней полноты, свежее, с хрустящей кислотностью, молодыми танинами и долгим послевкусием красной сливы.",
        variety: "Тавквери",
        volume: "750 мл",
        region: "Картли",
        method: "Квеври",
        pairing: ["Мясная нарезка", "Грибы", "Курица", "Лобио"],
      },
      zh: {
        name: "塔夫克维里",
        subtitle: "陶罐干红葡萄酒",
        description:
          "这款葡萄酒采用格鲁吉亚传统陶罐工艺，以卡特利的塔夫克维里葡萄带皮发酵酿成。酒液呈深紫色，以西梅干、山茱萸和成熟酸樱桃的鲜活香气见长，并逐渐过渡到甘草的细腻香调。酒体中等，清爽纯净，酸度活泼，单宁年轻，余味带有悠长的红李子风味。",
        variety: "塔夫克维里",
        volume: "750毫升",
        region: "卡特利",
        method: "陶罐",
        pairing: ["冷切肉", "蘑菇", "鸡肉", "洛比奥（炖豆）"],
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
    variety: "Rkatsiteli",
    alcohol: "12%",
    volume: "750 ml",

    region: "Okami microzone",
    method: "Qvevri",
    sweetness: "Dry",

    image: "/images/wines/rkatsiteli.png",

    description:
      "Georgia's best-known white grape, fermented with its skins in Qvevri — an amber wine with structure, dried-fruit depth and a long, savoury finish.",

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

    // Display text for the Georgian, Russian and Chinese pages; English is above.
    translations: {
      ka: {
        name: "რქაწითელი",
        subtitle: "მშრალი ქარვისფერი ქვევრის ღვინო",
        description:
          "საქართველოს ყველაზე ცნობილი თეთრი ჯიში, ჭაჭასთან ერთად დადუღებული ქვევრში — ქარვისფერი ღვინო სტრუქტურით, ჩირის არომატებითა და ხანგრძლივი დაბოლოებით.",
        variety: "რქაწითელი",
        volume: "750 მლ",
        region: "ოკამის მიკროზონა",
        method: "ქვევრი",
        pairing: ["საცივი", "ფხალი", "შემწვარი ღორის ხორცი", "დავარგებული ყველი"],
      },
      ru: {
        name: "Ркацители",
        subtitle: "Сухое янтарное вино в квеври",
        description:
          "Самый известный белый сорт Грузии, сброженный на мезге в квеври, — янтарное вино со структурой, нотами сухофруктов и долгим пикантным послевкусием.",
        variety: "Ркацители",
        volume: "750 мл",
        region: "Микрозона Оками",
        method: "Квеври",
        pairing: ["Сациви", "Пхали", "Жареная свинина", "Выдержанный сыр"],
      },
      zh: {
        name: "白羽",
        subtitle: "陶罐干型琥珀葡萄酒",
        description:
          "格鲁吉亚最著名的白葡萄品种，连同果皮和果渣在陶罐中发酵——一款结构感十足的琥珀色葡萄酒，带有果干香气和悠长的余味。",
        variety: "白羽",
        volume: "750毫升",
        region: "奥卡米微产区",
        method: "陶罐",
        pairing: ["核桃酱鸡肉（萨茨维）", "普哈利（蔬菜核桃泥）", "烤猪肉", "陈年奶酪"],
      },
    },
  },

  {
    id: "chinuri-goruli-mtsvane",
    slug: "chinuri-goruli-mtsvane",
    category: "White",

    name: "Chinuri-Goruli Mtsvane",
    subtitle: "Dry White Qvevri Wine",

    year: "2020",
    variety: "Chinuri, Goruli Mtsvane",
    alcohol: "11.5%",
    volume: "750 ml",

    region: "Kartli",
    method: "Qvevri",
    sweetness: "Dry",

    image: "/images/wines/chinuri-goruli-mtsvane.png",

    description:
      "The wine is intensive straw in colour, characterized by harmoniously combined, pleasant aromas of wild pear, green apple, raw walnut and white currant. It is balanced in taste, with medium velvety tannins and above-average cheerful acidity. It has a biting spiciness, a long and pleasant finish with tones of stone fruit.",

    taste: {
      sweetness: 1,
      acidity: 4,
      body: 2,
      tannins: 1,
    },

    notes: ["Wild Pear", "Green Apple", "Raw Walnut", "White Currant"],

    pairing: ["Trout", "Fresh Salads", "Goat Cheese", "Seafood"],

    servingTemperature: "10–12°C",

    decanting: "Not Required",

    agingPotential: "3–5 Years",

    // Display text for the Georgian, Russian and Chinese pages; English is above.
    translations: {
      ka: {
        name: "ჩინური-გორული მწვანე",
        subtitle: "მშრალი თეთრი ქვევრის ღვინო",
        description:
          "ღვინო ინტენსიური ჩალისფერია, ჰარმონიულად შერწყმული ტყის მსხლის, მწვანე ვაშლის, ნედლი კაკლისა და თეთრი მოცხარის სასიამოვნო არომატებით. გემოში დაბალანსებულია, საშუალო ხავერდოვანი ტანინებითა და საშუალოზე მაღალი ცოცხალი მჟავიანობით. აქვს მკვეთრი სიცხარე და ხანგრძლივი, სასიამოვნო დაბოლოება კურკოვანი ხილის ტონებით.",
        variety: "ჩინური, გორული მწვანე",
        volume: "750 მლ",
        region: "ქართლი",
        method: "ქვევრი",
        pairing: ["კალმახი", "ახალი სალათები", "თხის ყველი", "ზღვის პროდუქტები"],
      },
      ru: {
        name: "Чинури-Горули Мцване",
        subtitle: "Сухое белое вино в квеври",
        description:
          "Вино интенсивного соломенного цвета. В аромате гармонично сочетаются дикая груша, зелёное яблоко, молодой грецкий орех и белая смородина. Вкус сбалансированный: бархатистые танины средней насыщенности и живая кислотность выше средней. Отличается выраженной пряностью и долгим приятным послевкусием с тонами косточковых фруктов.",
        variety: "Чинури, Горули Мцване",
        volume: "750 мл",
        region: "Картли",
        method: "Квеври",
        pairing: ["Форель", "Свежие салаты", "Козий сыр", "Морепродукты"],
      },
      zh: {
        name: "奇努里-戈鲁利·姆茨瓦内",
        subtitle: "陶罐干白葡萄酒",
        description:
          "酒液呈浓郁的麦秆黄色，野梨、青苹果、鲜核桃和白醋栗的宜人香气和谐交融。口感均衡，单宁中等、如天鹅绒般柔滑，酸度鲜活、高于中等。带有鲜明的辛香，以及带核果风味的悠长宜人余味。",
        variety: "奇努里、戈鲁利·姆茨瓦内",
        volume: "750毫升",
        region: "卡特利",
        method: "陶罐",
        pairing: ["鳟鱼", "新鲜沙拉", "山羊奶酪", "海鲜"],
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
