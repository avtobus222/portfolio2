/* Появление при прокрутке, наклон карточек, магнитные кнопки, spotlight */

let IOo=null;
function revealInit(){
  const el=$$(".pg").pop();if(!el)return;
  if(IOo)IOo.disconnect();
  const items=$$(".rv",el);
  if(!("IntersectionObserver" in window)){items.forEach(e=>e.classList.add("in"));return}
  IOo=new IntersectionObserver(es=>{
    let q=0;
    es.forEach(en=>{
      if(en.isIntersecting){
        const t=en.target;
        t.style.transitionDelay=(q++*.07)+"s";
        t.classList.add("in");
        IOo.unobserve(t);
      }
    });
  },{root:el,threshold:.06,rootMargin:"0px 0px -5% 0px"});
  items.forEach(e=>IOo.observe(e));
}

/* Интерактив: spotlight под курсором, 3D-наклон, магнитные кнопки, progress bar, parallax */
function fx(el){
  const sel=".th3,.pn,.ab-intro,.ab-skills,.ab-path,.ft,.info3,.stage3",big=".pn,.ab-intro,.ab-skills,.ab-path,.ft,.info3,.stage3";   // большие панели только подсвечиваются, наклоняются маленькие карточки
  $$(sel,el).forEach(c=>{
    if(!c.classList.contains("tilt"))c.classList.add("tilt");
    if(!c.querySelector(".spot")){
      const sp=document.createElement("i");
      sp.className="spot";
      c.appendChild(sp);
    }
  });

  el.addEventListener("pointermove",e=>{
    // Spotlight + tilt
    const c=e.target.closest&&e.target.closest(sel);
    if(c&&el.contains(c)){
      const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
      c.style.setProperty("--mx",x+"px");
      c.style.setProperty("--my",y+"px");
    }
  });

  el.addEventListener("pointerout",e=>{
    
  });

  // Progress bar
  let pb=el.querySelector(".pbar");
  if(!pb){
    pb=document.createElement("div");
    pb.className="pbar";
    pb.innerHTML="<i></i>";
    el.appendChild(pb);
  }
  const bn=$(".bign",el),dc=$(".deco",el),bar=pb.firstChild;
  el.addEventListener("scroll",()=>{
    const m=el.scrollHeight-el.clientHeight;
    bar.style.transform=`scaleX(${m>0?el.scrollTop/m:0})`;
    if(bn)bn.style.transform=`translateY(${el.scrollTop*.16}px)`;
    if(dc)dc.style.transform=`translateY(${el.scrollTop*.07}px)`;
  },{passive:true});
}
