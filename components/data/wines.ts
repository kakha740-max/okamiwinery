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
  },

  {
    id: "khashmi-saperavi",
    slug: "khashmi-saperavi",
    category: "Red",

    name: "Khashmi Saperavi",
    subtitle: "Dry Red Qvevri Wine",

    year: "2020",
    variety: "100% Saperavi",
    alcohol: "11.5%",
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
  },
];
