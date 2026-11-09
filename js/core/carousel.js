/* Горизонтальная карусель: листается мышкой, свайпом, стрелками и точками.
   Разметка: car(["<div>...</div>", ...]). Оживляется функцией carInit(страница). */

const car=(items,cls="",auto=0)=>`<div class="car ${cls} rv" data-auto="${auto}"><div class="car-track" tabindex="0">${items.map(h=>`<div class="car-it">${h}</div>`).join("")}</div><div class="car-ui"><button class="car-b prev" aria-label="Назад">‹</button><div class="car-bar"><i></i></div><span class="car-n"></span><button class="car-b next" aria-label="Вперёд">›</button></div></div>`;

function carInit(root){
 $$(".car",root).forEach(c=>{
  const tr=$(".car-track",c),its=$$(".car-it",c),bar=$(".car-bar i",c),num=$(".car-n",c),n=its.length;
  const pg=root.closest?root:null;
  let idx=0,drag=false,sx=0,sl=0,moved=0,hov=false,vis=true,last=0;
  const stepW=()=>its.length>1?its[1].offsetLeft-its[0].offsetLeft:tr.clientWidth;
  const upd=()=>{
   const max=tr.scrollWidth-tr.clientWidth;
   idx=Math.max(0,Math.min(n-1,Math.round(tr.scrollLeft/stepW())));
   bar.style.transform=`scaleX(${max>0?Math.max(.08,tr.scrollLeft/max):1})`;
   num.textContent=String(idx+1).padStart(2,"0")+" / "+String(n).padStart(2,"0");
   its.forEach((e,i)=>e.classList.toggle("on",i===idx));
   $(".prev",c).disabled=tr.scrollLeft<4;$(".next",c).disabled=tr.scrollLeft>max-4};
  const go=(i,user)=>{if(user)last=performance.now();i=Math.max(0,Math.min(n-1,i));tr.scrollTo({left:i*stepW(),behavior:"smooth"})};
  tr.addEventListener("scroll",upd,{passive:true});
  $(".prev",c).onclick=()=>go(idx-1,1);
  $(".next",c).onclick=()=>go(idx+1,1);
  tr.addEventListener("keydown",e=>{if(e.key==="ArrowRight"){e.preventDefault();go(idx+1,1)}else if(e.key==="ArrowLeft"){e.preventDefault();go(idx-1,1)}});
  /* перетаскивание мышкой (на телефоне работает обычный свайп) */
  tr.addEventListener("pointerdown",e=>{if(e.pointerType!=="mouse"||e.button>0)return;drag=true;sx=e.clientX;sl=tr.scrollLeft;moved=0;last=performance.now();tr.classList.add("dg")});
  const mv=e=>{if(!c.isConnected){removeEventListener("pointermove",mv);removeEventListener("pointerup",up);return}
   if(!drag)return;const dx=e.clientX-sx;moved=Math.max(moved,Math.abs(dx));tr.scrollLeft=sl-dx};
  const up=()=>{if(!drag)return;drag=false;tr.classList.remove("dg");go(Math.round(tr.scrollLeft/stepW()),1)};
  addEventListener("pointermove",mv);addEventListener("pointerup",up);
  tr.addEventListener("click",e=>{if(moved>6){e.stopPropagation();e.preventDefault();moved=0}},true);
  tr.addEventListener("dragstart",e=>e.preventDefault());
  c.addEventListener("pointerenter",()=>hov=true);c.addEventListener("pointerleave",()=>hov=false);
  /* сам листает, если задан интервал (мс); на наведении и после ручного листания ждёт */
  const every=+c.dataset.auto;
  if(every){
   if("IntersectionObserver" in window)new IntersectionObserver(es=>es.forEach(en=>vis=en.isIntersecting),{root:pg&&pg.classList&&pg.classList.contains("pg")?pg:null,threshold:.3}).observe(c);
   const iv=setInterval(()=>{if(!c.isConnected){clearInterval(iv);return}
    if(hov||drag||!vis||document.hidden||performance.now()-last<every*1.6)return;
    go(idx>=n-1?0:idx+1)},every)}
  upd();addEventListener("resize",upd)})}
