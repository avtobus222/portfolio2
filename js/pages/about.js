/* Страница «Обо мне»: вступление, живая диаграмма навыков и лента «Учёба / Опыт».
   Лента едет сама, ровно и бесконечно. Листается мышкой, свайпом и стрелками. */

const CERT="docs/certificate-edvice.pdf";

L.about=()=>`<div class="ab">
<section class="ab-top">
 <div class="ab-intro rv glow"><h2>Обо мне</h2><p class="ab-lead">${A.lead}</p>
  <a class="ab-seek" href="${MAIL}"><span class="sh"></span><span class="sk-t"><b>${A.seek[0]}</b><span class="sk-ch">${A.seek[1].split("/").map(t=>`<em>${t.trim()}</em>`).join("")}</span></span><span class="sk-go">Написать →</span></a>
  ${A.text.map(t=>`<p class="ab-p">${t}</p>`).join("")}</div>
 <div class="ab-skills rv glow"><h3>Навыки</h3>${radar()}</div>
</section>
${band("path",{tabs:[{k:"edu",l:"Учёба"},{k:"exp",l:"Опыт"}]})}
${footer("about")}</div>`;

/* данные ленты: карточка «Дальше» в опыте ведёт на почту */
const TL={
 edu:()=>EDU.map(e=>({...e,btn:e.l?{l:"Открыть сертификат",fn:()=>openCert(e.l)}:null})),
 exp:()=>EXP.concat([{yr:"Дальше",y:"Дальше",t:"Следующий шаг",p:A.seek[0]+" · "+A.seek[1],d:"Напиши мне, расскажу про проекты и покажу работы.",cls:"mailc",btn:{l:"Написать →",href:MAIL}}])
};
const pathInit=()=>bandInit("path",TL);

/* сертификат открывается в окне; если браузер не показывает PDF, есть кнопка «в новой вкладке» */
function openCert(src){
 pop(`<button class="btn sm x" data-x>${ico("x")}</button><h3 style="margin:0 0 4px">Сертификат «Введение в Game Dev»</h3><p class="sub" style="margin:0 0 12px">Edvice, 14.08.2026</p>
  <iframe class="cert" src="${src}#view=FitH" title="Сертификат"></iframe>
  <div class="cl"><a class="btn sm" href="${src}" target="_blank" rel="noopener">Открыть в новой вкладке →</a><a class="btn sm" href="${src}" download>Скачать PDF</a></div>`)}

INIT.about=()=>{pathInit();radarInit()};
