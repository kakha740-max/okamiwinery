import type { Localized } from "./awards";

// Photos for the /gallery page and the home page preview, in the order a
// visit unfolds: the estate, its halls and cellar, production, tasting and
// the harvest. Files live in public/images.
export type GalleryImage = {
  src: string;
  alt: Localized;
};

export const galleryImages: GalleryImage[] = [
  { src: "29.webp", alt: { en: "The Etno Okami winery building", ka: "ეთნო ოკამის მეღვინეობის შენობა", ru: "Здание винодельни Этно Оками", zh: "埃特诺·奥卡米酒庄建筑" } },
  { src: "51.png", alt: { en: "The estate courtyard and its carved wooden galleries", ka: "მამულის ეზო და ხის ჩუქურთმიანი აივნები", ru: "Двор усадьбы с резными деревянными галереями", zh: "带有木雕回廊的庄园庭院" } },
  { src: "52.png", alt: { en: "A wooden pavilion behind the stone garden wall", ka: "ხის ფანჩატური ქვის გალავნის მიღმა", ru: "Деревянная беседка за каменной оградой сада", zh: "石砌花园围墙后的木制凉亭" } },
  { src: "story1.png", alt: { en: "Wood-panelled hall with chandeliers", ka: "ხის პანელებიანი დარბაზი ჭაღებით", ru: "Зал с деревянными панелями и люстрами", zh: "装有木质护墙板和枝形吊灯的大厅" } },
  { src: "26.png", alt: { en: "Carved wooden ceiling", ka: "ხის ჩუქურთმიანი ჭერი", ru: "Резной деревянный потолок", zh: "木雕天花板" } },
  { src: "48.png", alt: { en: "Spiralling wooden ceiling rising to a skylight", ka: "ხის სპირალური ჭერი სინათლის ღიობით", ru: "Спиральный деревянный свод со световым проёмом", zh: "带天窗的螺旋形木质穹顶" } },
  { src: "story2.png", alt: { en: "Banquet hall with long tables", ka: "სადარბაზო გრძელი სუფრებით", ru: "Банкетный зал с длинными столами", zh: "摆放长桌的宴会厅" } },
  { src: "story7.png", alt: { en: "Stone hall with a fireplace", ka: "ქვის დარბაზი ბუხრით", ru: "Каменный зал с камином", zh: "带壁炉的石砌大厅" } },
  { src: "46.png", alt: { en: "Stone hall with a round table and an iron chandelier", ka: "ქვის დარბაზი მრგვალი მაგიდითა და რკინის ჭაღით", ru: "Каменный зал с круглым столом и кованой люстрой", zh: "摆放圆桌、悬挂铁艺吊灯的石砌大厅" } },
  { src: "50.png", alt: { en: "Stone dining hall beneath a carved wooden ceiling", ka: "ქვის სასადილო დარბაზი ხის ჩუქურთმიანი ჭერის ქვეშ", ru: "Каменный обеденный зал под резным деревянным потолком", zh: "木雕天花板下的石砌餐厅" } },
  { src: "33.png", alt: { en: "Qvevri set into the cellar floor, lit by the sun", ka: "მარნის იატაკში ჩაფლული ქვევრები მზის შუქზე", ru: "Квеври в полу марани, освещённые солнцем", zh: "阳光下嵌入酒窖地面的陶罐" } },
  { src: "49.png", alt: { en: "The marani: rows of qvevri set into the stone floor", ka: "მარანი: ქვის იატაკში ჩაფლული ქვევრების რიგები", ru: "Марани: ряды квеври в каменном полу", zh: "传统酒窖：嵌入石砌地面的一排排陶罐" } },
  { src: "47.png", alt: { en: "Qvevri in the marani floor beside an old wooden wine press", ka: "ქვევრები მარნის იატაკში და ძველი ხის საწნახელი", ru: "Квеври в полу марани и старая деревянная давильня", zh: "嵌入酒窖地面的陶罐与古老的木制榨汁槽" } },
  { src: "30.webp", alt: { en: "The old cellar with casks and a tasting table", ka: "ძველი მარანი კასრებითა და სადეგუსტაციო მაგიდით", ru: "Старый погреб с бочками и дегустационным столом", zh: "摆放酒桶和品鉴桌的老酒窖" } },
  { src: "enoteka.webp", alt: { en: "The enoteka: a carved door and racks of aged bottles", ka: "ენოთეკა: ჩუქურთმიანი კარი და დავარგებული ბოთლების თაროები", ru: "Энотека: резная дверь и стеллажи с выдержанными бутылками", zh: "藏酒室：雕花木门与一排排陈年酒瓶" } },
  { src: "32.png", alt: { en: "Small wooden barrels marked with a grape cluster", ka: "პატარა ხის კასრები ყურძნის მტევნის გამოსახულებით", ru: "Небольшие деревянные бочки с изображением грозди", zh: "印有葡萄串图案的小木桶" } },
  { src: "story5.png", alt: { en: "Aged bottles resting in the cellar", ka: "მარანში დავარგებული ბოთლები", ru: "Выдержанные бутылки в погребе", zh: "酒窖中的陈年酒瓶" } },
  { src: "2.png", alt: { en: "Large oak casks in the cellar", ka: "დიდი მუხის კასრები მარანში", ru: "Большие дубовые бочки в погребе", zh: "酒窖中的大橡木桶" } },
  { src: "35.png", alt: { en: "Racks of bottles in the wine library", ka: "ბოთლების თაროები ღვინის ბიბლიოთეკაში", ru: "Стеллажи с бутылками в винной библиотеке", zh: "葡萄酒库中的一排排酒架" } },
  { src: "22.jpg", alt: { en: "Etno Okami bottles resting in a rack", ka: "ეთნო ოკამის ბოთლები თაროზე", ru: "Бутылки Этно Оками на стеллаже", zh: "酒架上的埃特诺·奥卡米酒瓶" } },
  { src: "4.png", alt: { en: "Bottles of red wine on the production line", ka: "წითელი ღვინის ბოთლები საწარმოო ხაზზე", ru: "Бутылки красного вина на производственной линии", zh: "生产线上的红葡萄酒瓶" } },
  { src: "5.png", alt: { en: "Bottling equipment", ka: "ჩამოსხმის დანადგარი", ru: "Оборудование для розлива", zh: "灌装设备" } },
  { src: "41.png", alt: { en: "Tasting wine drawn from a steel tank", ka: "ფოლადის ავზიდან ჩამოსხმული ღვინის დეგუსტაცია", ru: "Дегустация вина из стального резервуара", zh: "品尝从不锈钢罐中取出的葡萄酒" } },
  { src: "53.png", alt: { en: "Benches for wine analysis in the laboratory", ka: "ღვინის საანალიზო მაგიდები ლაბორატორიაში", ru: "Столы для анализа вина в лаборатории", zh: "实验室中的葡萄酒分析工作台" } },
  { src: "54.png", alt: { en: "Laboratory benches with microscopes", ka: "ლაბორატორიის მაგიდები მიკროსკოპებით", ru: "Лабораторные столы с микроскопами", zh: "配有显微镜的实验室工作台" } },
  { src: "55.png", alt: { en: "The laboratory's central workbench", ka: "ლაბორატორიის ცენტრალური სამუშაო მაგიდა", ru: "Центральный рабочий стол лаборатории", zh: "实验室中央工作台" } },
  { src: "56.png", alt: { en: "Individual booths for sensory tasting", ka: "ინდივიდუალური სადეგუსტაციო კაბინები", ru: "Индивидуальные дегустационные кабины", zh: "独立品鉴隔间" } },
  { src: "24.png", alt: { en: "Students at the grape harvest", ka: "სტუდენტები რთველზე", ru: "Студенты на сборе винограда", zh: "采收葡萄的学生" } },
  { src: "7.png", alt: { en: "Tasting table with Etno Okami wines", ka: "სადეგუსტაციო მაგიდა ეთნო ოკამის ღვინოებით", ru: "Дегустационный стол с винами Этно Оками", zh: "摆放埃特诺·奥卡米葡萄酒的品鉴桌" } },
  { src: "8.png", alt: { en: "Etno Okami bottles and brochure", ka: "ეთნო ოკამის ბოთლები და ბროშურა", ru: "Бутылки и буклет Этно Оками", zh: "埃特诺·奥卡米酒瓶与宣传册" } },
  { src: "19.jpg", alt: { en: "Etno Okami wines at a tasting", ka: "ეთნო ოკამის ღვინოები დეგუსტაციაზე", ru: "Вина Этно Оками на дегустации", zh: "品鉴会上的埃特诺·奥卡米葡萄酒" } },
  { src: "28.webp", alt: { en: "The Etno Okami range, side by side", ka: "ეთნო ოკამის ღვინოები ერთ რიგში", ru: "Вина Этно Оками в ряд", zh: "一字排开的埃特诺·奥卡米葡萄酒" } },
  { src: "27.webp", alt: { en: "Etno Okami bottles laid out on white", ka: "ეთნო ოკამის ბოთლები თეთრ ფონზე", ru: "Бутылки Этно Оками на белом фоне", zh: "白色背景上的埃特诺·奥卡米酒瓶" } },
  { src: "20.jpg", alt: { en: "Decanting by candlelight", ka: "ღვინის დეკანტირება სანთლის შუქზე", ru: "Декантация при свете свечи", zh: "烛光下醒酒" } },
  { src: "21.jpg", alt: { en: "Etno Okami wines with a decanter", ka: "ეთნო ოკამის ღვინოები და დეკანტერი", ru: "Вина Этно Оками с декантером", zh: "埃特诺·奥卡米葡萄酒与醒酒器" } },
  { src: "story8.png", alt: { en: "Hall with a portrait and chandeliers", ka: "დარბაზი პორტრეტითა და ჭაღებით", ru: "Зал с портретом и люстрами", zh: "挂有肖像和枝形吊灯的大厅" } },
];

export const galleryImage = (src: string) => galleryImages.find((image) => image.src === src)!;
