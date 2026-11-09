/* Лента-карусель (как «Учёба / Опыт» в «Обо мне»): едет сама, бесконечная, листается
   мышкой, свайпом, стрелками и колесом. Карточка в центре подсвечивается, сверху — её подпись.
   Используется на всех страницах.
   band(id, {title, sub, tabs:[{k,l}], hint})  — разметка
   bandInit(id, {k1:()=>[items], ...}, {speed})  — оживление
   item: {yr, y, ic, t, p, d, media, chips:[], btn:{l, fn | href, ext}, cls, big} */

const band=(id,o={})=>`<section class="pn ab-path glow rv bd" id="${id}">
 <div class="tl-head">${o.tabs?`<div class="ab-tabs">${o.tabs.map((t,i)=>`<button class="${i?"":"on"}" data-t="${t.k}">${t.l}</button>`).join("")}</div>`:`<div class="bd-title"><h3>${o.title||""}</h3>${o.sub?`<p>${o.sub}</p>`:""}</div>`}<div class="tl-year"><span></span></div></div>
 <div class="tl-view" tabindex="0" aria-label="Лента: листай мышкой, свайпом или стрелками"><div class="tl-track"></div></div>
 <div class="tl-ui"><button class="car-b bp" aria-label="Назад">‹</button><span class="tl-hint">${o.hint||"листай или просто смотри"}</span><button class="car-b bn" aria-label="Вперёд">›</button></div>
</section>`;

function bandInit(id,sets,o={}){
 const root=$("#"+id);if(!root)return;
 const view=$(".tl-view",root),track=$(".tl-track",root),yearEl=$(".tl-year span",root),tabs=$$(".ab-tabs button",root),pg=root.closest(".pg"),
  rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
 const SPEED=o.speed||44;
 let key=Object.keys(sets)[0],items=[],n=0,cw=400,gap=24,period=0,pos=0,tgt=null,v=SPEED,drag=false,sx=0,p0=0,moved=0,hov=false,vis=true,
  lx=0,dv=0,lastT=performance.now(),els=[],act=-1,lastW=0,idle=0,mt=0;

 function build(){
  items=sets[key]();n=items.length;
  cw=Math.round(Math.max(270,Math.min(o.wide?470:410,view.clientWidth*.82)));lastW=view.clientWidth;
  view.style.setProperty("--cw",cw+"px");view.style.setProperty("--gap",gap+"px");
  period=n*(cw+gap);
  const copies=Math.ceil(view.clientWidth/period)+2;
  let h="";
  for(let c=0;c<copies;c++)items.forEach((e,i)=>{
   const b=e.btn?(e.btn.href?`<a class="tc-a" href="${e.btn.href}"${e.btn.ext?' target="_blank" rel="noopener"':""}>${e.btn.l}</a>`:`<button class="tc-a" data-a="${i}">${e.btn.l}</button>`):"";
   h+=`<article class="tc ${e.cls||""}" data-i="${i}"><span class="tc-dot"></span>
    <div class="tc-in">${e.media?`<div class="tc-m" ${e.mact?`data-m="${i}"`:""}>${e.media}</div>`:""}
    ${e.big?`<span class="tc-big">${e.big}</span>`:""}
    ${e.ic||e.y?`<div class="tc-top">${e.ic?`<span class="tc-ic">${ico(e.ic)}</span>`:""}${e.y?`<span class="tc-y">${e.y}</span>`:""}</div>`:""}
    <h4>${e.t}</h4>${e.p?`<em>${e.p}</em>`:""}<p>${e.d}</p>${e.chips&&e.chips.length?`<div class="chips">${tg(e.chips)}</div>`:""}${b}</div></article>`});
  track.innerHTML=h;els=$$(".tc",track);act=-1;pos=Math.min(pos,period-1);tgt=null}

 const wrap=()=>{if(pos>=period){pos-=period;if(tgt!==null)tgt-=period}else if(pos<0){pos+=period;if(tgt!==null)tgt+=period}};
 const shift=dir=>{idle=performance.now();tgt=(tgt===null?pos:tgt)+dir*(cw+gap)};

 function frame(now){
  if(!root.isConnected)return;
  const dt=Math.min(.05,(now-lastT)/1000);lastT=now;
  const pop=$("#pop").classList.contains("open");
  if(drag){}
  else if(tgt!==null){pos+=(tgt-pos)*(1-Math.exp(-dt*7));if(Math.abs(tgt-pos)<.4){pos=tgt;tgt=null}}
  else{
   const auto=!rm&&!hov&&vis&&!pop&&now-idle>1800;
   v+=((auto?SPEED:0)-v)*(1-Math.exp(-dt*(auto?2.2:5)));
   pos+=v*dt}
  wrap();
  track.style.transform=`translate3d(${-pos}px,0,0)`;
  const cx=view.clientWidth/2,slot=Math.floor((pos+cx)/(cw+gap)),i=Math.min(els.length-1,Math.max(0,slot));
  if(i!==act){act=i;els.forEach((e,k)=>e.classList.toggle("on",k===i));
   const y=items[i%n].yr;if(yearEl.textContent!==y){yearEl.classList.remove("sw");void yearEl.offsetWidth;yearEl.textContent=y;yearEl.classList.add("sw")}}
  requestAnimationFrame(frame)}

 view.addEventListener("pointerdown",e=>{if(e.button>0||e.target.closest(".tc-a"))return;drag=true;sx=lx=e.clientX;p0=pos;moved=0;dv=0;mt=performance.now();tgt=null;view.classList.add("dg")});
 const mv=e=>{if(!root.isConnected){removeEventListener("pointermove",mv);removeEventListener("pointerup",up);removeEventListener("pointercancel",up);return}
  if(!drag)return;const dx=e.clientX-sx,now=performance.now();moved=Math.max(moved,Math.abs(dx));pos=p0-dx;dv=-(e.clientX-lx)/Math.max(.001,(now-mt)/1000);mt=now;lx=e.clientX};
 const up=()=>{if(!drag)return;drag=false;view.classList.remove("dg");idle=performance.now();v=Math.max(-900,Math.min(900,dv))};
 addEventListener("pointermove",mv);addEventListener("pointerup",up);addEventListener("pointercancel",up);
 view.addEventListener("pointerenter",()=>hov=true);view.addEventListener("pointerleave",()=>hov=false);
 view.addEventListener("dragstart",e=>e.preventDefault());
 /* подсветка под курсором */
 view.addEventListener("pointermove",e=>{const c=e.target.closest&&e.target.closest(".tc-in");if(!c)return;const r=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px")});

 view.addEventListener("click",e=>{
  if(moved>6){moved=0;return}
  const a=e.target.closest(".tc-a");
  if(a){if(a.dataset.a!==undefined){const it=items[+a.dataset.a];it&&it.btn&&it.btn.fn&&it.btn.fn()}return}
  const m=e.target.closest(".tc-m[data-m]");
  if(m){const it=items[+m.dataset.m];if(it&&it.btn&&it.btn.fn){it.btn.fn();return}}
  const c=e.target.closest(".tc");if(!c)return;
  const r=c.getBoundingClientRect(),vr=view.getBoundingClientRect(),d=(r.left+r.width/2)-(vr.left+vr.width/2);
  if(Math.abs(d)>20){idle=performance.now();tgt=pos+d}});
 view.addEventListener("keydown",e=>{if(e.key==="ArrowRight"){e.preventDefault();shift(1)}else if(e.key==="ArrowLeft"){e.preventDefault();shift(-1)}});
 view.addEventListener("wheel",e=>{if(Math.abs(e.deltaX)<=Math.abs(e.deltaY)||Math.abs(e.deltaX)<8)return;e.preventDefault();idle=performance.now();tgt=null;pos+=e.deltaX},{passive:false});
 $(".bp",root).onclick=()=>shift(-1);$(".bn",root).onclick=()=>shift(1);
 tabs.forEach(b=>b.onclick=()=>{if(b.dataset.t===key)return;key=b.dataset.t;tabs.forEach(x=>x.classList.toggle("on",x===b));pos=0;build()});
 let rz;const onrs=()=>{if(!root.isConnected){removeEventListener("resize",onrs);return}clearTimeout(rz);rz=setTimeout(()=>{if(Math.abs(view.clientWidth-lastW)>2)build()},150)};addEventListener("resize",onrs);
 if("IntersectionObserver" in window)new IntersectionObserver(es=>es.forEach(en=>vis=en.isIntersecting),{root:pg,threshold:.2}).observe(view);
 build();requestAnimationFrame(frame)}
