/* Состояние страниц и переход «волна»: мозаика плиток накрывает экран от места нажатия,
   по центру появляется название раздела, потом плитки волной убираются и открывают страницу */

let cur="home",busy=false;const vis=new Set();
function nav(k){$$("#nav button[data-id]").forEach(b=>b.classList.toggle("on",b.dataset.id===k))}
const caseGo=()=>{};
const RM=matchMedia("(prefers-reduced-motion:reduce)").matches;

function curtain(num,title,color,mid,ox,oy){
 if(RM){mid();revealInit();busy=false;return}
 const cv=document.createElement("div");cv.id="cur";cv.style.setProperty("--cc",color);
 cv.innerHTML=`<div class="cl2"><div class="ct2">${title}</div><b class="cbar"></b></div>`;
 document.body.appendChild(cv);
 const IN=380,HOLD=380,OUT=420,E="cubic-bezier(.4,0,.2,1)";
 const lab=cv.querySelector(".cl2"),bar=cv.querySelector(".cbar");
 cv.animate([{opacity:0},{opacity:1}],{duration:IN,easing:E,fill:"forwards"});
 lab.animate([{opacity:0,transform:"translateY(10px)"},{opacity:1,transform:"none"}],{duration:IN+100,delay:120,easing:E,fill:"both"});
 setTimeout(()=>{mid();bar.animate([{transform:"scaleX(0)"},{transform:"scaleX(1)"}],{duration:HOLD,easing:"ease-in-out",fill:"forwards"})},IN+20);
 setTimeout(()=>{
  cv.animate([{opacity:1},{opacity:0}],{duration:OUT,easing:E,fill:"forwards"});
  setTimeout(revealInit,OUT*.3);
 },IN+20+HOLD);
 setTimeout(()=>{cv.remove();busy=false},IN+20+HOLD+OUT+40)}
