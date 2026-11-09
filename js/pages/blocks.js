/* Общие куски страниц в стиле «Обо мне»: вступление, инструменты, лента умений,
   процесс, единый футер. Тексты берутся из js/data/sections.js */

const caseIdx=t=>GD.findIndex(g=>g.type===t);

/* ---------- вступление + живые цифры ---------- */
const intro=(title,lead,seek,stats)=>`<div class="ab-intro pn rv glow"><h2>${title}</h2><p class="ab-lead">${lead}</p>
 ${seek?`<a class="ab-seek" href="#${seek.to}" data-go="${seek.to}"><span class="sh"></span><span class="sk-t"><b>${seek.t}</b><span class="sk-ch">${(seek.ch||[]).map(t=>`<em>${t}</em>`).join("")}</span></span><span class="sk-go">${seek.b}</span></a>`:""}
 ${stats?`<div class="ab-stats">${stats.map(([n,t])=>`<div><b data-n="${n}">0</b><small>${t}</small></div>`).join("")}</div>`:""}</div>`;

/* ---------- инструменты: плотные строки с иконкой и описанием, подсветка сама ходит по ним ---------- */
const TOOL_IC={"3ds Max":"cube","Photoshop":"palette","Blender":"orbit","model-viewer":"window","Unity (2D)":"gamepad","C#":"code","Notion":"book","Taiga":"board","UI-мокапы":"image"};
const toolsPanel=k=>`<div class="ab-skills pn rv glow tp" id="tp-${k}"><h3>Инструменты</h3>
 <div class="tp-list">${SEC[k].tools.map(([n,d],i)=>`<button data-i="${i}"><span class="tp-ic">${ico(TOOL_IC[n]||"gear")}</span><span class="tp-tx"><b>${n}</b><small>${d}</small></span><span class="tp-no">${String(i+1).padStart(2,"0")}</span><i></i></button>`).join("")}</div></div>`;

function toolsInit(k){
 const root=$("#tp-"+k);if(!root)return;
 const n=SEC[k].tools.length,bs=$$(".tp-list button",root);
 let cur=-1,auto=true,vis=true;
 const set=i=>{cur=i;bs.forEach((b,x)=>b.classList.toggle("on",x===i))};
 bs.forEach((b,i)=>{b.onpointerenter=()=>{auto=false;set(i)};b.onclick=()=>{auto=false;set(i)}});
 root.addEventListener("pointerleave",()=>{auto=true});
 set(0);
 if("IntersectionObserver" in window)new IntersectionObserver(es=>es.forEach(e=>vis=e.isIntersecting),{root:root.closest(".pg"),threshold:.3}).observe(root);
 const iv=setInterval(()=>{if(!root.isConnected){clearInterval(iv);return}if(auto&&vis&&!document.hidden)set((cur+1)%n)},2600);
}

/* ---------- карточки «Что я умею» в виде ленты ---------- */
const skillBand=(k,id="b-sk")=>band(id,{title:"Что я умею",sub:"Листай или нажми на карточку, чтобы поставить её в центр.",hint:"нажми на карточку, чтобы поставить её в центр"});
const skillItems=k=>SEC[k].sk.map(([ic,t,p,tgs,ct],i)=>({yr:SEC[k].short[i],ic,t,d:p,chips:tgs,btn:ct&&caseIdx(ct)>=0?{l:"Открыть кейс →",fn:()=>openCase(GD[caseIdx(ct)])}:null}));

/* ---------- процесс: шаги сами сменяются, есть стрелки и прогресс ---------- */
const proc=(id,title,arr)=>`<section class="pn ab-path glow rv pr" id="${id}">
 <div class="tl-head"><div class="bd-title"><h3>${title}</h3><p>Нажми на этап или листай стрелками.</p></div><div class="pr-ctl"><button class="car-b pp" aria-label="Назад">‹</button><span class="pr-n"></span><button class="car-b pn2" aria-label="Вперёд">›</button></div></div>
 <div class="pr-rail" style="--n:${arr.length}"><i class="pr-fill"></i>${arr.map((s,k)=>`<button data-k="${k}"><span>${k+1}</span><em>${s[0]}</em></button>`).join("")}</div>
 <div class="pr-card"><span class="pr-big"></span><div class="pr-tx"><h4></h4><p></p></div></div>
 <div class="pr-bar"><i></i></div></section>`;

function procInit(id,arr){
 const root=$("#"+id);if(!root)return;
 const bs=$$(".pr-rail button",root),fill=$(".pr-fill",root),big=$(".pr-big",root),h=$(".pr-card h4",root),p=$(".pr-card p",root),card=$(".pr-card",root),num=$(".pr-n",root),bar=$(".pr-bar i",root);
 const HOLD=4200;let cur=0,auto=true,vis=true,t0=performance.now();
 const set=(k,user)=>{
  cur=(k+arr.length)%arr.length;if(user)auto=false;t0=performance.now();
  bs.forEach((b,i)=>b.classList.toggle("on",i<=cur));bs.forEach((b,i)=>b.classList.toggle("cur",i===cur));
  fill.style.transform=`scaleX(${cur/(arr.length-1||1)})`;
  big.textContent=String(cur+1).padStart(2,"0");h.textContent=arr[cur][0];p.textContent=arr[cur][1];
  num.textContent=String(cur+1).padStart(2,"0")+" / "+String(arr.length).padStart(2,"0");
  card.classList.remove("sw");void card.offsetWidth;card.classList.add("sw")};
 bs.forEach(b=>b.onclick=()=>set(+b.dataset.k,1));
 $(".pp",root).onclick=()=>set(cur-1,1);$(".pn2",root).onclick=()=>set(cur+1,1);
 set(0);
 if("IntersectionObserver" in window)new IntersectionObserver(es=>es.forEach(e=>vis=e.isIntersecting),{root:root.closest(".pg"),threshold:.3}).observe(root);
 const tick=now=>{
  if(!root.isConnected)return;
  if(auto&&vis&&!document.hidden){const f=(now-t0)/HOLD;bar.style.transform=`scaleX(${Math.min(1,f)})`;if(f>=1)set(cur+1)}
  else bar.style.transform=auto?bar.style.transform:"scaleX(0)";
  requestAnimationFrame(tick)};
 requestAnimationFrame(tick)}

/* ---------- единый футер для всех страниц ---------- */
const footer=k=>{const c=SEC[k].cta;return `<footer class="pn ft glow rv"><div class="ft-t"><h3>${c[0]}</h3><p>${c[1]}</p></div>
 <div class="ft-b"><a class="btn main" href="${MAIL}">Написать на почту</a><a class="btn tgb" href="${TG}" target="_blank" rel="noopener">Написать в Telegram</a></div></footer>`};

/* ---------- общие оживления страницы ---------- */
function pageInit(){
 /* кнопка-«ищу» в шапке прокручивает к нужному блоку */
 $$("#lw [data-go]").forEach(a=>a.onclick=e=>{e.preventDefault();const t=document.getElementById(a.dataset.go),pg=a.closest(".pg");if(t&&pg)pg.scrollTo({top:pg.scrollTop+t.getBoundingClientRect().top-90,behavior:"smooth"})});
 /* цифры в шапке считают от нуля, когда страница открылась */
 $$("#lw .ab-stats b").forEach(b=>{const n=+b.dataset.n;let i=0;const t=setInterval(()=>{i++;b.textContent=i;if(i>=n)clearInterval(t)},Math.max(40,900/n))})}


/* ---------- «Обозреватель»: список слева, подробности справа (вместо карусели) ---------- */
const explorer=(id,title,sub,tabs)=>`<section class="pn ab-path glow rv ex${tabs===2?" ex-c":tabs?" ex-tabs":""}" id="${id}"><div class="pn-h"><h3>${title}</h3><p>${sub}</p></div><div class="ex-body"><div class="ex-l"></div><div class="ex-d"></div></div></section>`;

function explorerInit(id,items){
 const root=$("#"+id);if(!root)return;
 const l=$(".ex-l",root),d=$(".ex-d",root);
 l.innerHTML=items.map((e,i)=>`<button data-i="${i}"><span class="ex-i">${e.ic?ico(e.ic):String(i+1).padStart(2,"0")}</span><span class="ex-t"><b>${e.l}</b>${e.s?`<small>${e.s}</small>`:""}</span><u></u></button>`).join("");
 d.innerHTML=items.map((e,i)=>`<div class="ex-p" data-i="${i}">${e.k?`<small class="ex-k">${e.k}</small>`:""}<h4>${e.t}</h4>${e.p?`<em>${e.p}</em>`:""}${e.d?`<p>${e.d}</p>`:""}${e.pts?`<ul>${e.pts.map(t=>`<li>${t}</li>`).join("")}</ul>`:""}${e.chips?`<div class="chips">${tg(e.chips)}</div>`:""}${e.btn?`<button class="tc-a" data-a="${i}">${e.btn.l}</button>`:""}</div>`).join("");
 const bs=$$(".ex-l button",root),ps=$$(".ex-p",root);
 let cur=-1,auto=true,vis=true,t0=performance.now();const HOLD=3800;
 const set=(i,user)=>{if(user)auto=false;cur=i;t0=performance.now();bs.forEach((b,k)=>b.classList.toggle("on",k===i));ps.forEach((p,k)=>p.classList.toggle("on",k===i))};
 l.style.setProperty("--n",items.length);
 bs.forEach((b,i)=>{b.onclick=()=>set(i,1);b.onpointerenter=e=>{if(e.pointerType==="mouse")set(i,1)}});
 root.addEventListener("pointerleave",()=>{auto=true;t0=performance.now()});
 d.addEventListener("click",e=>{const a=e.target.closest(".tc-a");if(a)items[+a.dataset.a].btn.fn()});
 set(0);
 if("IntersectionObserver" in window)new IntersectionObserver(es=>es.forEach(e=>vis=e.isIntersecting),{root:root.closest(".pg"),threshold:.3}).observe(root);
 const tick=now=>{if(!root.isConnected)return;
  if(auto&&vis&&!document.hidden){const f=Math.min(1,(now-t0)/HOLD);bs[cur].style.setProperty("--p",f);if(f>=1)set((cur+1)%items.length)}
  bs.forEach((b,k)=>{if(k!==cur||!auto)b.style.setProperty("--p",0)});
  requestAnimationFrame(tick)};
 requestAnimationFrame(tick)}

/* ---------- Галерея кейсов с фильтром ---------- */
const gallery=(id,title,sub)=>`<section class="pn ab-path glow rv gl" id="${id}"><div class="tl-head"><div class="bd-title"><h3>${title}</h3><p>${sub}</p></div></div><div class="gl-f"></div><div class="gl-g"></div></section>`;

function galleryInit(id,items){
 const root=$("#"+id);if(!root)return;
 const f=$(".gl-f",root),g=$(".gl-g",root),types=[...new Set(items.map(e=>e.type))];
 f.innerHTML=["Все",...types].map((t,i)=>`<button class="${i?"":"on"}" data-t="${i?t:""}">${t}${i?"":` <em>${items.length}</em>`}</button>`).join("");
 g.innerHTML=items.map((e,i)=>`<button class="cg-c" data-i="${i}" data-t="${e.type}"><span class="cg-n">${String(i+1).padStart(2,"0")}</span><span class="cg-ty">${e.type}${e.wip?" · в работе":""}</span><h4>${e.t}</h4><p>${e.d}</p><span class="chips">${tg(e.tags||[])}</span><span class="cg-go">Открыть кейс <i>→</i></span></button>`).join("");
 const cs=$$(".cg-c",g);let locked=false;
 requestAnimationFrame(()=>{g.style.minHeight=g.offsetHeight+"px"});
 f.onclick=e=>{const b=e.target.closest("button");if(!b)return;$$("button",f).forEach(x=>x.classList.toggle("on",x===b));
  const t=b.dataset.t;cs.forEach(c=>{const show=!t||c.dataset.t===t;c.classList.toggle("off",!show)})};
 g.addEventListener("click",e=>{const c=e.target.closest(".cg-c");if(c)items[+c.dataset.i].open()});
 g.addEventListener("pointermove",e=>{const c=e.target.closest&&e.target.closest(".cg-c");if(!c)return;const r=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px")})}


/* «Что я умею» одинаково на всех страницах: плитки сверху, пояснение снизу, само перескакивает */
const skillsBlock=()=>explorer("b-sk","Что я умею","Само переключается, а ещё можно навести или нажать на навык.",2);
const skillsInit=k=>explorerInit("b-sk",SEC[k].sk.map(([ic,t,p,tgs,ct],i)=>({ic,l:SEC[k].short[i],t,d:p,chips:tgs,btn:ct&&caseIdx(ct)>=0?{l:"Открыть кейс →",fn:()=>openCase(GD[caseIdx(ct)])}:null})));
