/* Unity: проекты, свои скриншоты и видео */

const UNITY_EMBED = "";   // ссылка на WebGL-игру, например "https://ник.github.io/game/" (пока пусто — блок скрыт)
/* СВОИ РАБОТЫ В UNITY: скриншоты и видео. Заполни поля, ненужные оставь "" */
const UNITY_WORKS = [
  // { title:"Игра", desc:"Жанр, механика, что делала именно ты", img:"images/game1.jpg", video:"videos/game1.mp4", youtube:"https://youtu.be/XXXXXXXXXXX", tags:["Unity","C#"], links:[["GitHub","https://..."]] },
  { title:"Лабиринт", desc:"Учебный проект по предмету «Двумерная визуализация»: игра-лабиринт, собранная в Unity.", img:"images/lab.jpg", video:"", youtube:"", tags:["Unity","C#"], links:[] },
  { title:"Пинг-понг", desc:"Классическая аркада в Unity: ракетки, мяч и счёт.", img:"images/pon.jpg", video:"", youtube:"", tags:["Unity","C#"], links:[] },
  { title:"Карточки-запоминашки", desc:"Мемори: переворачиваешь карточки и ищешь пары.", img:"images/memo.jpg", video:"", youtube:"", tags:["Unity","C#"], links:[] }
];
const UW=UNITY_WORKS.filter(w=>w.img||w.video||w.youtube);
const YT=u=>{const m=(u||"").match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);return m?m[1]:""};
const UNITY = [
  // { title:"Игра", desc:"Описание", img:"images/game.jpg", tags:["Unity"], links:[["Играть","https://..."],["GitHub","https://..."]] },
  { title:"Лабиринт", desc:"Учебный проект по предмету «Двумерная визуализация»: игра-лабиринт, собранная в Unity.", img:"", tags:["Unity","2D","Учебный проект"], links:[] },
  { title:"Пинг-понг", desc:"Классическая аркада в Unity: ракетки, мяч и счёт.", img:"", tags:["Unity","2D","Учебный проект"], links:[] },
  { title:"Карточки-запоминашки", desc:"Мемори: переворачиваешь карточки и ищешь пары.", img:"", tags:["Unity","2D","Учебный проект"], links:[] }
];
