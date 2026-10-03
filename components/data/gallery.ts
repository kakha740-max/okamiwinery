import type { Localized } from "./awards";

// Photos for the /gallery page and the home page preview, in the order a
// visit unfolds: the estate, its halls and cellar, production, tasting and
// the harvest. Files live in public/images.
export type GalleryImage = {
  src: string;
  alt: Localized;
};

export const galleryImages: GalleryImage[] = [
  { src: "29.webp", alt: { en: "The Etno Okami winery building", ka: "ეთნო ოკამის მეღვინეობის შენობა", ru: "Здание винодельни Этно Оками" } },
  { src: "story1.png", alt: { en: "Wood-panelled hall with chandeliers", ka: "ხის პანელებიანი დარბაზი ჭაღებით", ru: "Зал с деревянными панелями и люстрами" } },
  { src: "26.png", alt: { en: "Carved wooden ceiling", ka: "ხის ჩუქურთმიანი ჭერი", ru: "Резной деревянный потолок" } },
  { src: "story2.png", alt: { en: "Banquet hall with long tables", ka: "სადარბაზო გრძელი სუფრებით", ru: "Банкетный зал с длинными столами" } },
  { src: "story7.png", alt: { en: "Stone hall with a fireplace", ka: "ქვის დარბაზი ბუხრით", ru: "Каменный зал с камином" } },
  { src: "33.png", alt: { en: "Qvevri set into the cellar floor, lit by the sun", ka: "მარნის იატაკში ჩაფლული ქვევრები მზის შუქზე", ru: "Квеври в полу марани, освещённые солнцем" } },
  { src: "30.webp", alt: { en: "The old cellar with casks and a tasting table", ka: "ძველი მარანი კასრებითა და სადეგუსტაციო მაგიდით", ru: "Старый погреб с бочками и дегустационным столом" } },
  { src: "enoteka.webp", alt: { en: "The enoteka: a carved door and racks of aged bottles", ka: "ენოთეკა: ჩუქურთმიანი კარი და დავარგებული ბოთლების თაროები", ru: "Энотека: резная дверь и стеллажи с выдержанными бутылками" } },
  { src: "32.png", alt: { en: "Small wooden barrels marked with a grape cluster", ka: "პატარა ხის კასრები ყურძნის მტევნის გამოსახულებით", ru: "Небольшие деревянные бочки с изображением грозди" } },
  { src: "story5.png", alt: { en: "Aged bottles resting in the cellar", ka: "მარანში დავარგებული ბოთლები", ru: "Выдержанные бутылки в погребе" } },
  { src: "2.png", alt: { en: "Large oak casks in the cellar", ka: "დიდი მუხის კასრები მარანში", ru: "Большие дубовые бочки в погребе" } },
  { src: "35.png", alt: { en: "Racks of bottles in the wine library", ka: "ბოთლების თაროები ღვინის ბიბლიოთეკაში", ru: "Стеллажи с бутылками в винной библиотеке" } },
  { src: "22.jpg", alt: { en: "Etno Okami bottles resting in a rack", ka: "ეთნო ოკამის ბოთლები თაროზე", ru: "Бутылки Этно Оками на стеллаже" } },
  { src: "4.png", alt: { en: "Bottles of red wine on the production line", ka: "წითელი ღვინის ბოთლები საწარმოო ხაზზე", ru: "Бутылки красного вина на производственной линии" } },
  { src: "5.png", alt: { en: "Bottling equipment", ka: "ჩამოსხმის დანადგარი", ru: "Оборудование для розлива" } },
  { src: "6.png", alt: { en: "Laboratory", ka: "ლაბორატორია", ru: "Лаборатория" } },
  { src: "24.png", alt: { en: "Students at the grape harvest", ka: "სტუდენტები რთველზე", ru: "Студенты на сборе винограда" } },
  { src: "7.png", alt: { en: "Tasting table with Etno Okami wines", ka: "სადეგუსტაციო მაგიდა ეთნო ოკამის ღვინოებით", ru: "Дегустационный стол с винами Этно Оками" } },
  { src: "8.png", alt: { en: "Etno Okami bottles and brochure", ka: "ეთნო ოკამის ბოთლები და ბროშურა", ru: "Бутылки и буклет Этно Оками" } },
  { src: "19.jpg", alt: { en: "Etno Okami wines at a tasting", ka: "ეთნო ოკამის ღვინოები დეგუსტაციაზე", ru: "Вина Этно Оками на дегустации" } },
  { src: "28.webp", alt: { en: "The Etno Okami range, side by side", ka: "ეთნო ოკამის ღვინოები ერთ რიგში", ru: "Вина Этно Оками в ряд" } },
  { src: "27.webp", alt: { en: "Etno Okami bottles laid out on white", ka: "ეთნო ოკამის ბოთლები თეთრ ფონზე", ru: "Бутылки Этно Оками на белом фоне" } },
  { src: "20.jpg", alt: { en: "Decanting by candlelight", ka: "ღვინის დეკანტირება სანთლის შუქზე", ru: "Декантация при свете свечи" } },
  { src: "21.jpg", alt: { en: "Etno Okami wines with a decanter", ka: "ეთნო ოკამის ღვინოები და დეკანტერი", ru: "Вина Этно Оками с декантером" } },
  { src: "story8.png", alt: { en: "Hall with a portrait and chandeliers", ka: "დარბაზი პორტრეტითა და ჭაღებით", ru: "Зал с портретом и люстрами" } },
];

export const galleryImage = (src: string) => galleryImages.find((image) => image.src === src)!;
