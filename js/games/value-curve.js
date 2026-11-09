/* Геймдизайн: интерактивная кривая ценности.
   Наводи на график: подсвечивается ценность и справа видно, как с ней у каждой игры.
   Нажми на ценность, чтобы закрепить. Нажми на игру в легенде, чтобы скрыть её.
   Данные: VCL (ценности) и VC (игры, оценки 0–5) ниже. */

const VCL=["Атмосфера","Беспомощность","Честный ИИ","Сюжет","Ресурсы","Рассудок","Реиграбельность","Кооператив","Графика","Порог входа"];
const VC=[{n:"Alien: Isolation",c:"#ff5fd2",d:[5,4,3,4,3,1,1,0,5,2]},{n:"Amnesia: TDD",c:"#a78bfa",d:[5,5,1,5,4,5,1,0,3,3]},{n:"Outlast",c:"#22d3ee",d:[4,5,2,4,3,2,1,0,4,4]},{n:"Amnesia: Bunker",c:"#fbbf24",d:[4,4,2,3,4,1,3,0,4,3]},{n:"Hello Neighbor",c:"#4ade80",d:[3,3,2,2,2,1,2,0,2,2]},{n:"Phasmophobia",c:"#f8fafc",d:[4,3,3,1,3,4,3,5,3,4]}];
const VC_SAT=[0,1,3,8],VC_SPOT=[2,6];   // перенасыщено / белые пятна (вывод из анализа рынка)

const vcPanel=()=>`<section class="pn ab-path glow rv vcp" id="vcsec">
 <div class="tl-head"><div class="bd-title"><h3>Кривая ценности</h3><p>Из моего анализа рынка стелс-хоррора: шесть игр и десять ценностей. Наведи на график или нажми на ценность.</p></div>
  <div class="vc-ctl"><button class="btn sm" id="vc-avg" aria-pressed="false">Среднее по рынку</button><button class="btn sm" id="vc-all">Показать все</button><button class="btn sm" id="vc-re">↻ Заново</button></div></div>
 <div class="leg" id="leg"></div>
 <div class="vc-main"><div class="vcc"><svg id="vcs" viewBox="0 0 820 340" role="img" aria-label="Кривая ценности: шесть игр по десяти ценностям"></svg></div><aside class="vc-read" id="vcr" aria-live="polite"></aside></div>
</section>`;

function vcInit(){
 const svg=$("#vcs");if(!svg)return;
 const W=820,L0=44,R0=790,T=34,B=250,x=i=>L0+(R0-L0)*i/9,y=v=>B-(B-T)*v/5,n=VC.length;
 const rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
 const on=new Set(VC.map((_,i)=>i));let hl=-1,hov=-1,pin=2,avgOn=false;
 const avg=VCL.map((_,i)=>VC.reduce((a,s)=>a+s.d[i],0)/n);
 /* плавная линия через точки */
 const smooth=p=>{let d=`M${p[0][0]},${p[0][1]}`;for(let i=0;i<p.length-1;i++){const a=p[i-1]||p[i],b=p[i],c=p[i+1],e=p[i+2]||c,k=.18;
   const c1=[b[0]+(c[0]-a[0])*k,Math.min(B,Math.max(T,b[1]+(c[1]-a[1])*k))],c2=[c[0]-(e[0]-b[0])*k,Math.min(B,Math.max(T,c[1]-(e[1]-b[1])*k))];
   d+=`C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${c[0]},${c[1]}`}return d};
 let g=`<defs><filter id="vcg" x="-10%" y="-30%" width="120%" height="160%"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <linearGradient id="vsat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5f7a" stop-opacity=".2"/><stop offset="1" stop-color="#ff5f7a" stop-opacity="0"/></linearGradient>
  <linearGradient id="vspot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2ff5d3" stop-opacity=".3"/><stop offset="1" stop-color="#2ff5d3" stop-opacity="0"/></linearGradient></defs>`;
 /* зоны: перенасыщено и белые пятна */
 VC_SAT.forEach(i=>g+=`<rect x="${x(i)-34}" y="${T-14}" width="68" height="${B-T+14}" rx="12" fill="url(#vsat)"/>`);
 VC_SPOT.forEach(i=>g+=`<rect class="vspot" x="${x(i)-34}" y="${T-14}" width="68" height="${B-T+14}" rx="12" fill="url(#vspot)" stroke="#2ff5d3" stroke-opacity=".55" stroke-dasharray="4 5"/>`);
 VC_SPOT.forEach(i=>g+=`<text class="zl sp" x="${x(i)}" y="${T-20}" text-anchor="middle">белое пятно</text>`);
 [[0,1],[3],[8]].forEach(a=>g+=`<text class="zl st" x="${a.reduce((s,i)=>s+x(i),0)/a.length}" y="${T-20}" text-anchor="middle">перенасыщено</text>`);
 for(let v=0;v<=5;v++)g+=`<line x1="${L0}" x2="${R0}" y1="${y(v)}" y2="${y(v)}" class="gl"/><text x="${L0-12}" y="${y(v)+4}" text-anchor="end" class="yl">${v}</text>`;
 g+=`<rect id="vcol" x="0" y="${T-14}" width="56" height="${B-T+14}" rx="14"/><line id="vg" x1="0" x2="0" y1="${T-14}" y2="${B}"/>`;
 VCL.forEach((l,i)=>g+=`<text class="xl" data-i="${i}" transform="translate(${x(i)+4},${B+20}) rotate(-28)" text-anchor="end">${l}</text>`);
 VC.forEach((s,i)=>{
  g+=`<g class="vg-g" data-i="${i}" style="--c:${s.c}"><path class="vl" pathLength="1" style="--dl:${i*.14}s" d="${smooth(s.d.map((v,k)=>[x(k),y(v)]))}" fill="none" stroke="${s.c}" stroke-width="2.6" stroke-linecap="round" filter="url(#vcg)"/>
   <path class="vh" d="${smooth(s.d.map((v,k)=>[x(k),y(v)]))}" fill="none" stroke="transparent" stroke-width="16"/>`+
   s.d.map((v,k)=>`<circle class="vd" data-k="${k}" cx="${x(k)}" cy="${y(v)}" r="4.5" fill="${s.c}" style="--dl:${i*.14+.5+k*.05}s"/>`).join("")+`</g>`});
 g+=`<path id="vavg" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="2 7" stroke-linecap="round" d="${smooth(avg.map((v,k)=>[x(k),y(v)]))}" opacity="0"/>`;
 svg.innerHTML=g;
 const gs=$$(".vg-g",svg),col=$("#vcol",svg),gl=$("#vg",svg),avgp=$("#vavg",svg),xls=$$(".xl",svg),rd=$("#vcr");

 /* легенда */
 $("#leg").innerHTML=VC.map((s,i)=>`<button class="lgb" data-i="${i}" style="--c:${s.c}"><i></i>${s.n}</button>`).join("");
 const lgb=$$(".lgb");
 /* правая колонка: как у каждой игры с выбранной ценностью */
 let shown=-2;
 function read(i,force){
  if(i===shown&&!force)return;shown=i;
  if(i<0){rd.innerHTML=`<div class="vr-empty"><b>Наведи на график</b><p>Здесь будет видно, как у каждой игры с выбранной ценностью. Нажми на ценность, чтобы закрепить её.</p></div>`;return}
  const rows=VC.map((s,k)=>({s,k,v:s.d[i]})).filter(o=>on.has(o.k)).sort((a,b)=>b.v-a.v);
  const st=VC_SAT.includes(i)?["k-sat","Перенасыщено","Почти все игры делают это сильно. Выделиться здесь трудно."]:VC_SPOT.includes(i)?["k-spot","Белое пятно","Мало кто делает это хорошо. Здесь точка роста для моей игры."]:avg[i]<1.5?["k-low","Почти не занято","Единицы делают на этом ставку."]:["k-mid","Без перекосов","Рынок закрывает это ровно."];
  const top=rows.length?rows[0]:null;
  rd.innerHTML=`<div class="vr-h"><span class="vr-b ${st[0]}">${st[1]}</span><h4>${VCL[i]}</h4><p>${st[2]}</p></div>
   <div class="vr-rows">${rows.length?rows.map(o=>`<div class="vr-r" style="--c:${o.s.c}"><span>${o.s.n}</span><div><i style="--w:${o.v*20}%"></i></div><em>${o.v}/5</em></div>`).join(""):"<p class=\"vr-note\">Все игры скрыты. Включи их в легенде.</p>"}</div>
   <div class="vr-f"><span>среднее по рынку <b>${avg[i].toFixed(1)}</b></span>${top?`<span>лидер <b>${top.s.n}</b></span>`:""}</div>`}
 function paint(){
  const c=hov>=0?hov:pin;
  gs.forEach((e,i)=>{e.classList.toggle("off",!on.has(i));e.classList.toggle("hl",hl===i);e.classList.toggle("dim",hl>=0&&hl!==i)});
  lgb.forEach((b,i)=>{b.classList.toggle("off",!on.has(i));b.classList.toggle("hl",hl===i)});
  xls.forEach((t,i)=>t.classList.toggle("f",i===c));
  col.style.opacity=c>=0?1:0;gl.style.opacity=c>=0?1:0;
  if(c>=0){col.style.transform=`translateX(${x(c)-28}px)`;gl.style.transform=`translateX(${x(c)}px)`}
  $$(".vd",svg).forEach(d=>d.classList.toggle("big",+d.dataset.k===c));
  avgp.setAttribute("opacity",avgOn?.9:0);
  read(c)}
 const catAt=e=>{const r=svg.getBoundingClientRect(),px=(e.clientX-r.left)/r.width*W;return Math.max(0,Math.min(9,Math.round((px-L0)/((R0-L0)/9))))};
 svg.addEventListener("pointermove",e=>{if(e.target.closest&&e.target.closest(".xl"))return;const i=catAt(e);if(i!==hov){hov=i;paint()}});
 svg.addEventListener("pointerleave",()=>{hov=-1;paint()});
 svg.addEventListener("pointerdown",e=>{if(e.target.closest&&e.target.closest(".xl"))return;const i=catAt(e);pin=pin===i&&e.pointerType==="mouse"?-1:i;hov=e.pointerType==="mouse"?i:-1;paint()});
 xls.forEach(t=>{t.onpointerenter=()=>{hov=+t.dataset.i;paint()};t.onpointerleave=()=>{hov=-1;paint()};t.onclick=()=>{const i=+t.dataset.i;pin=pin===i?-1:i;paint()}});
 gs.forEach((e,i)=>{const h=$(".vh",e);h.onpointerenter=()=>{hl=i;paint()};h.onpointerleave=()=>{hl=-1;paint()}});
 lgb.forEach((b,i)=>{b.onclick=()=>{on.has(i)?on.delete(i):on.add(i);shown=-2;paint()};b.onpointerenter=()=>{hl=i;paint()};b.onpointerleave=()=>{hl=-1;paint()}});
 $("#vc-all").onclick=()=>{VC.forEach((_,i)=>on.add(i));shown=-2;paint()};
 $("#vc-avg").onclick=e=>{avgOn=!avgOn;e.currentTarget.classList.toggle("on",avgOn);e.currentTarget.setAttribute("aria-pressed",avgOn);paint()};
 $("#vc-re").onclick=()=>{svg.classList.remove("go");void svg.getBoundingClientRect();svg.classList.add("go")};
 /* линии рисуются, когда блок виден */
 if("IntersectionObserver" in window&&!rm){const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){svg.classList.add("go");io.disconnect()}},{root:svg.closest(".pg"),threshold:.25});io.observe(svg)}else svg.classList.add("go");
 paint()}
