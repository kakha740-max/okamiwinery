import type { Localized } from "./awards";

// Photos for the /gallery page and the home page preview, in the order a
// visit unfolds: the estate, its halls and cellar, production, tasting and
// the harvest. Files live in public/images.
export type GalleryImage = {
  src: string;
  alt: Localized;
};

export const galleryImages: GalleryImage[] = [
  { src: "story9.png", alt: { en: "The Etno Okami winery building", ka: "ეთნო ოკამის მეღვინეობის შენობა", ru: "Здание винодельни Этно Оками" } },
  { src: "story1.png", alt: { en: "Wood-panelled hall with chandeliers", ka: "ხის პანელებიანი დარბაზი ჭაღებით", ru: "Зал с деревянными панелями и люстрами" } },
  { src: "26.png", alt: { en: "Carved wooden ceiling", ka: "ხის ჩუქურთმიანი ჭერი", ru: "Резной деревянный потолок" } },
  { src: "story2.png", alt: { en: "Banquet hall with long tables", ka: "სადარბაზო გრძელი სუფრებით", ru: "Банкетный зал с длинными столами" } },
  { src: "story7.png", alt: { en: "Stone hall with a fireplace", ka: "ქვის დარბაზი ბუხრით", ru: "Каменный зал с камином" } },
  { src: "story4.png", alt: { en: "Wine library with wooden racks", ka: "ღვინის კოლექცია ხის თაროებზე", ru: "Винная коллекция на деревянных стеллажах" } },
  { src: "story5.png", alt: { en: "Aged bottles resting in the cellar", ka: "მარანში დავარგებული ბოთლები", ru: "Выдержанные бутылки в погребе" } },
  { src: "2.png", alt: { en: "Large oak casks in the cellar", ka: "დიდი მუხის კასრები მარანში", ru: "Большие дубовые бочки в погребе" } },
  { src: "22.jpg", alt: { en: "Etno Okami bottles resting in a rack", ka: "ეთნო ოკამის ბოთლები თაროზე", ru: "Бутылки Этно Оками на стеллаже" } },
  { src: "3.png", alt: { en: "Quality control on the bottling line", ka: "ხარისხის კონტროლი ჩამოსხმის ხაზზე", ru: "Контроль качества на линии розлива" } },
  { src: "4.png", alt: { en: "Bottles of red wine on the production line", ka: "წითელი ღვინის ბოთლები საწარმოო ხაზზე", ru: "Бутылки красного вина на производственной линии" } },
  { src: "5.png", alt: { en: "Bottling equipment", ka: "ჩამოსხმის დანადგარი", ru: "Оборудование для розлива" } },
  { src: "6.png", alt: { en: "Laboratory", ka: "ლაბორატორია", ru: "Лаборатория" } },
  { src: "24.png", alt: { en: "Students at the grape harvest", ka: "სტუდენტები რთველზე", ru: "Студенты на сборе винограда" } },
  { src: "7.png", alt: { en: "Tasting table with Etno Okami wines", ka: "სადეგუსტაციო მაგიდა ეთნო ოკამის ღვინოებით", ru: "Дегустационный стол с винами Этно Оками" } },
  { src: "8.png", alt: { en: "Etno Okami bottles and brochure", ka: "ეთნო ოკამის ბოთლები და ბროშურა", ru: "Бутылки и буклет Этно Оками" } },
  { src: "19.jpg", alt: { en: "Etno Okami wines at a tasting", ka: "ეთნო ოკამის ღვინოები დეგუსტაციაზე", ru: "Вина Этно Оками на дегустации" } },
  { src: "20.jpg", alt: { en: "Decanting by candlelight", ka: "ღვინის დეკანტირება სანთლის შუქზე", ru: "Декантация при свете свечи" } },
  { src: "21.jpg", alt: { en: "Etno Okami wines with a decanter", ka: "ეთნო ოკამის ღვინოები და დეკანტერი", ru: "Вина Этно Оками с декантером" } },
  { src: "story3.png", alt: { en: "The great hall, set for guests", ka: "სტუმრებისთვის გაწყობილი დიდი დარბაზი", ru: "Большой зал, накрытый для гостей" } },
  { src: "story6.png", alt: { en: "Billiard room", ka: "ბილიარდის ოთახი", ru: "Бильярдная" } },
  { src: "story8.png", alt: { en: "Hall with a portrait and chandeliers", ka: "დარბაზი პორტრეტითა და ჭაღებით", ru: "Зал с портретом и люстрами" } },
];

export const galleryImage = (src: string) => galleryImages.find((image) => image.src === src)!;
