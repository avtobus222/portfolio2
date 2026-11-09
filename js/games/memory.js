/* Мини-игра: мемори */

/* memory */
function memory(){$("#gm").innerHTML=`<div class="mi"><span>Ходы: <b id="mmv">0</b></span><span>Пары: <b id="mpr">0</b>/8</span><span id="mwin" style="color:var(--pk)"></span><button class="btn sm" id="mre">Заново</button></div><div class="mgrid" id="mgrid"></div>`;
 const EM=["gamepad","cube","palette","puzzle","eye","poly","key","dice"];let a=null,lock=false,mv=0,pr=0;
 const init=()=>{const g=$("#mgrid");g.innerHTML="";a=null;lock=false;mv=0;pr=0;$("#mmv").textContent=0;$("#mpr").textContent=0;$("#mwin").textContent="";
  [...EM,...EM].sort(()=>Math.random()-.5).forEach(e=>{const c=document.createElement("div");c.className="mc";c.dataset.e=e;c.innerHTML=`<div><u>?</u><b>${ico(e)}</b></div>`;c.onclick=ev=>{ev.stopPropagation();flip(c)};g.appendChild(c)})};
 function flip(c){if(lock||c.classList.contains("f"))return;c.classList.add("f");snd(500+Math.random()*200,.05);if(!a){a=c;return}mv++;$("#mmv").textContent=mv;
  if(a.dataset.e===c.dataset.e){a.classList.add("m");c.classList.add("m");pr++;$("#mpr").textContent=pr;a=null;snd(880,.1,"triangle");if(pr===8)setTimeout(()=>{$("#mwin").textContent=`Победа за ${mv} ходов! `;const r=$("#mgrid").getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,40);unlock("memory")},450)}
  else{lock=true;const b=a;a=null;setTimeout(()=>{b.classList.remove("f");c.classList.remove("f");lock=false},800)}}
 $("#mre").onclick=init;init()}
