/* Страница «Геймдизайн»: вступление, умения, кейсы, опыт, процесс, кривая ценности */

L.gd=()=>`<div class="ab">
<section class="ab-top">${intro("Геймдизайн",SEC.gd.intro,{to:"b-cases",t:"Смотреть кейсы",ch:["GDD","Механики","Анализ рынка"],b:"Листать →"},[[GD.length,"кейсов"],[6,"игр в анализе рынка"],[12,"эмоций игрока разобрано"],[10,"ценностей на кривой"]])}${toolsPanel("gd")}</section>
${skillsBlock()}
${band("b-cases",{title:"Кейсы",sub:"Каждый кейс: проблема, решение и результат. Центральная карточка подсвечена.",hint:"нажми «Открыть кейс», чтобы прочитать целиком"})}
${practice()}
${proc("pr-gd","Мой процесс",PROC)}
${vcPanel()}
${footer("gd")}</div>`;

INIT.gd=()=>{
 skillsInit("gd");
 bandInit("b-cases",{k:()=>GD.map((c,i)=>({yr:c.type,y:"Кейс "+String(i+1).padStart(2,"0")+(c.wip?" · в работе":""),big:String(i+1).padStart(2,"0"),t:c.title,d:c.desc,chips:c.tags,cls:c.wip?"wipc":"",btn:{l:"Открыть кейс →",fn:()=>openCase(c)}}))},{wide:1,speed:38});
 practiceInit();
 procInit("pr-gd",PROC);toolsInit("gd");vcInit();pageInit()};

/* «Практика»: карточки как в настольной игре. Раздаются на стол, переворачиваются по клику */
const FL_IC=["search","candle","dice"];
const practice=()=>`<section class="pn ab-path rv pcards glow" id="b-xp"><div class="tl-head"><div class="bd-title"><h3>Практика</h3><p>Нажми на карточку, чтобы перевернуть её и увидеть, что я делала.</p></div><button class="btn sm" id="fl-all">Перевернуть все</button></div>
<div class="fl-g">${XPD.map((x,i)=>`<div class="fl-c" tabindex="0" role="button" aria-pressed="false" style="--i:${i}"><div class="fl-in">
 <div class="fl-f fl-front"><span class="fl-num">${String(i+1).padStart(2,"0")}</span><span class="fl-ic">${ico(FL_IC[i%3])}</span><div><small>${x.k}</small><h4>${x.t}</h4><em${/в работе|в разработке/i.test(x.p)?' class="live"':""}>${x.p}</em></div><span class="fl-hint">Нажми, чтобы перевернуть ↻</span></div>
 <div class="fl-f fl-back"><small>${x.k}</small><ul>${x.pts.map(t=>`<li>${t}</li>`).join("")}</ul></div></div></div>`).join("")}</div></section>`;

function practiceInit(){
 const root=$("#b-xp");if(!root)return;
 const cs=$$(".fl-c",root),all=$("#fl-all",root);
 const flip=(c,v)=>{const on=v===undefined?!c.classList.contains("flip"):v;c.classList.toggle("flip",on);c.setAttribute("aria-pressed",on)};
 cs.forEach(c=>{
  c.onclick=()=>flip(c);
  c.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();flip(c)}};
  c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px")})});
 /* высота карточек подстраивается под самый длинный список */
 const grid=$(".fl-g",root),fit=()=>{if(!root.isConnected){removeEventListener("resize",fit);return}grid.style.setProperty("--fh","200px");const h=Math.max(...$$(".fl-back",root).map(e=>e.scrollHeight));grid.style.setProperty("--fh",Math.max(240,h+2)+"px")};
 fit();addEventListener("resize",fit);setTimeout(fit,400);
 let stop=false,hov=false,idx=0;
 cs.forEach(c=>{c.addEventListener("click",()=>stop=true);c.addEventListener("pointerenter",()=>hov=true);c.addEventListener("pointerleave",()=>hov=false)});
 /* сами по очереди переворачиваются, пока не нажмёшь */
 const iv=setInterval(()=>{if(!root.isConnected){clearInterval(iv);return}if(stop||hov||document.hidden)return;const r=root.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;cs.forEach((c,k)=>flip(c,k===idx%cs.length));idx++},3400);
 all.onclick=()=>{stop=true;const on=!cs.every(c=>c.classList.contains("flip"));cs.forEach((c,i)=>setTimeout(()=>flip(c,on),i*140));all.textContent=on?"Перевернуть обратно":"Перевернуть все"};
 if("IntersectionObserver" in window){const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){cs.forEach(c=>c.classList.add("in"));io.disconnect()}},{root:root.closest(".pg"),threshold:.25});io.observe(root)}else cs.forEach(c=>c.classList.add("in"))}
