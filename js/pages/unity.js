/* Страница «Unity»: в стиле «Обо мне» — вступление, инструменты, лента умений, лента игр, процесс */

L.unity=()=>`<div class="ab">
<section class="ab-top">${intro("Проекты на Unity",SEC.unity.intro,{to:"b-games",t:"Смотреть мои игры",ch:["Unity","C#","2D"],b:"Листать →"},[[UW.length,"игры"],[SEC.unity.sk.length,"направления"]])}${toolsPanel("unity")}</section>
${skillsBlock()}
${UW.length?band("b-games",{title:"Игры",sub:"Лабиринт, пинг-понг и мемори. Нажми на игру, чтобы рассмотреть.",hint:"листай или нажми на картинку"}):""}
${UNITY_EMBED?`<section class="pn ab-path glow rv"><div class="pn-h"><h3>Полная версия</h3></div><iframe class="emb" src="${UNITY_EMBED}" allowfullscreen></iframe></section>`:""}
${proc("pr-unity",SEC.unity.procT,SEC.unity.proc)}
${footer("unity")}</div>`;

INIT.unity=()=>{
 skillsInit("unity");
 bandInit("b-games",{k:()=>UW.map(w=>{const y=YT(w.youtube),th=w.img||(y?`https://img.youtube.com/vi/${y}/hqdefault.jpg`:"");
  return{yr:w.title.split(" ")[0].replace(/[«»]/g,""),y:"Unity · 2D",t:w.title,d:w.desc,chips:w.tags,mact:1,
   media:(w.video&&!th?`<video src="${w.video}#t=0.5" muted playsinline preload="metadata"></video>`:th?`<img src="${th}" alt="${w.title}" loading="lazy">`:`<div class="empty">${CUBE}Здесь будет скриншот или видео</div>`)+((w.video||y)?'<div class="play">▶</div>':""),
   btn:{l:(w.video||y)?"Смотреть видео →":"Открыть →",fn:()=>openWork(w)}}})});
 procInit("pr-unity",SEC.unity.proc);toolsInit("unity");pageInit()};
