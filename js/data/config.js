/* Настройки: роли на главной, навыки, почта */

const ROLES = ["Game Designer Intern","Puzzle & Mechanics Designer","3D Artist · 3ds Max","2D · интерфейсы в Photoshop"];
const SKILLS = [["Game Design",85],["GDD · ТЗ",80],["Notion · Taiga",70],["Программирование",60],["Photoshop",65],["3ds Max",60],["Unity",40],["Blender",25]];
const LV=v=>v>=70?"уверенно":v>=55?"работаю":v>=35?"осваиваю":"знакомлюсь";

const MAIL="mailto:mariadegtarenko34@gmail.com";

const TG="https://t.me/avtobus0";
/* КОНТАКТЫ (выпадающее окно «Контакты» в меню). Телефон и GitHub впиши свои: v — что видно, href — куда ведёт */
const CONTACTS=[
 {k:"phone",l:"Телефон",v:"+375 44 513-33-90",href:"tel:+375445133390",ic:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>'},
 {k:"tg",l:"Telegram",v:"@avtobus0",href:TG,ext:1,ic:'<path d="M21 4 3 11l6 2 2 6 3-4 5 4z"/><path d="m9 13 12-9"/>'},
 {k:"gh",l:"GitHub",v:"github.com/avtobus222",href:"https://github.com/avtobus222",ext:1,ic:'<path d="M9 19c-4 1.5-4-2-6-2m12 4v-3.5c0-1 .1-1.4-.5-2 2.800-.3 5.500-1.400 5.500-6a4.600 4.600 0 0 0-1.300-3.200 4.200 4.200 0 0 0-.1-3.200s-1.100-.3-3.500 1.300a12 12 0 0 0-6.200 0C6.500 2.800 5.400 3.100 5.400 3.100a4.200 4.200 0 0 0-.1 3.200A4.600 4.600 0 0 0 4 9.500c0 4.600 2.700 5.700 5.500 6-.6.600-.6 1.200-.5 2V21"/>'},
 {k:"mail",l:"Почта",v:"mariadegtarenko34@gmail.com",href:MAIL,ic:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'}
];
