/* Страница «3D и 2D»: просмотр моделей (<model-viewer>), сетка превью, 2D-работы.
   Модели берутся из PROJECTS (js/data/projects.js), поле model */

L["3d"]=()=>`<div class="ab">
<section class="ab-top">${intro("3D и 2D",SEC["3d"].intro,{to:"viewer",t:"Смотреть модели в 3D",ch:["3ds Max","Photoshop"],b:"Крутить →"},[[n3,"3D-моделей"],[n2,"2D-работы"]])}${toolsPanel("3d")}</section>
${skillsBlock()}
<section class="pn ab-path glow rv vw" id="viewer"><div class="pn-h"><h3>Просмотр моделей</h3><p>Крути мышкой, приближай колесом. Свой .glb можно перетащить прямо на сцену.</p></div>
<div class="show"><div class="stage3" id="stage3"><model-viewer id="sv" camera-controls auto-rotate interaction-prompt="none" shadow-intensity="1.4" exposure="1.1" camera-orbit="30deg 75deg auto" field-of-view="32deg" min-camera-orbit="auto auto 40%" max-camera-orbit="auto auto 400%" style="display:none"></model-viewer>
<div class="holo" id="holo">${CUBE}<span id="holot">Здесь появятся мои модели</span></div>
<div class="hudc tl">3D-ПРОСМОТР</div><div class="hudc tr" id="svn"></div>
<button class="fsx" id="sbx" aria-label="Выйти из полного экрана">${ico("x")} Выйти</button>
<div class="stbar"><button class="btn sm" id="sb1">${ico("rotate")} Вращение</button><button class="btn sm" id="sbw" aria-pressed="false">${ico("grid")} Сетка</button><button class="btn sm" id="sb4">${ico("fit")} Целиком</button><button class="btn sm" id="sb2">${ico("expand")} На весь экран</button><span>Свет</span><input id="sb3" type="range" min=".3" max="2.5" step=".1" value="1.1"><span>Фон</span><i class="swt" data-c="a"></i><i class="swt" data-c="b"></i><i class="swt" data-c="c"></i></div></div>
<aside class="info3"><span class="chip" id="s-cat"></span><h3 id="s-t"></h3><p class="sub" id="s-d"></p><div class="chips" id="s-tags"></div></aside></div></section>
<section class="pn ab-path glow rv" id="mdl"><div class="pn-h"><h3>Все модели</h3><p>Все модели сразу. Нажми на любую, чтобы открыть её в большом просмотре.</p></div><div id="thumbs"></div></section>
${band("b-2d",{title:"2D: интерфейс игры",sub:"Экраны хоррор-игры в Photoshop: старт, настройки, выбор уровня, загрузка."})}
${proc("pr-3d",SEC["3d"].procT,SEC["3d"].proc)}
${footer("3d")}</div>`;

INIT["3d"]=()=>{const list=PROJECTS.map((p,i)=>({p,i})).filter(o=>o.p.cat!=="2D"&&o.p.model),sv=$("#sv"),stg=$("#stage3");
 const SW={a:"radial-gradient(ellipse at 50% 30%,#3b1a78,#07050d 75%)",b:"radial-gradient(ellipse at 50% 30%,#0e5a73,#04141a 75%)",c:"radial-gradient(ellipse at 50% 30%,#555,#111 75%)"};
 function sel(k){const p=list[k].p;$("#s-cat").textContent=p.cat;$("#s-t").textContent=p.title;$("#s-d").textContent=p.desc;$("#s-tags").innerHTML=tg(p.tags);$("#svn").textContent=`${String(k+1).padStart(2,"0")} / ${String(list.length).padStart(2,"0")}`;
  if(p.model){sv.style.display="block";sv.src=p.model;$("#holo").style.display="none"}else{sv.removeAttribute("src");sv.style.display="none";$("#holo").style.display="flex";$("#holot").textContent="Модель скоро появится"}
  $$(".th3").forEach((t,i)=>t.classList.toggle("on",i===k));snd(500,.04)}
 $("#thumbs").innerHTML=`<div class="mgrid3">`+list.map((o,k)=>`<div class="th3" role="button" tabindex="0" data-k="${k}"><div class="mv">${o.p.model?`<model-viewer src="${o.p.model}" loading="lazy" auto-rotate rotation-per-second="20deg" camera-orbit="30deg 75deg auto" field-of-view="30deg" interaction-prompt="none" disable-zoom disable-pan shadow-intensity="1" style="pointer-events:none"></model-viewer>`:`<div class="empty">${CUBE}Модель скоро появится</div>`}</div><div class="row"><span class="tn">${String(k+1).padStart(2,"0")}</span><small>${o.p.title}</small></div></div>`).join("")+`</div>`;
 $$(".th3").forEach(b=>{const go=()=>{sel(+b.dataset.k);{const pg=stg.closest(".pg");pg&&pg.scrollTo({top:pg.scrollTop+stg.getBoundingClientRect().top-110,behavior:"smooth"})}};b.onclick=go;b.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go()}}});
 $("#sb1").onclick=()=>sv.autoRotate=!sv.autoRotate;const fit=()=>{sv.cameraOrbit="30deg 75deg auto";sv.fieldOfView="32deg";sv.cameraTarget="auto auto auto";sv.jumpCameraToGoal&&sv.jumpCameraToGoal()};$("#sb4").onclick=fit;sv.addEventListener("load",fit);
 /* полный экран: есть кнопка «Выйти», подпись кнопки меняется */
 const fsOn=()=>document.fullscreenElement===stg||document.webkitFullscreenElement===stg;
 const exitFs=()=>{(document.exitFullscreen||document.webkitExitFullscreen||(()=>{})).call(document)};
 $("#sb2").onclick=()=>{if(fsOn())exitFs();else(stg.requestFullscreen||stg.webkitRequestFullscreen||(()=>{})).call(stg)};
 $("#sbx").onclick=exitFs;
 const onFs=()=>{const on=fsOn();stg.classList.toggle("isfs",on);$("#sb2").innerHTML=on?ico("shrink")+" Свернуть":ico("expand")+" На весь экран"};
 document.addEventListener("fullscreenchange",onFs);document.addEventListener("webkitfullscreenchange",onFs);
 /* сетка (wireframe): model-viewer этого не умеет сам, поэтому правим материалы модели */
 let wire=false;
 const symOf=n=>Object.getOwnPropertySymbols(sv).find(x=>x.description===n);
 function applyWire(){
  try{
   const sc=sv[symOf("scene")];if(!sc)return false;
   (sc.target||sc).traverse(o=>{if(!o.isMesh)return;(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{if(m){m.wireframe=wire;m.needsUpdate=true}})});
   const nr=sv[symOf("needsRender")];if(typeof nr==="function")nr.call(sv);else sv.exposure=sv.exposure+1e-4;
   return true}catch(e){return false}}
 $("#sbw").onclick=()=>{
  if(!sv.src){toast("Сначала выбери модель");return}
  wire=!wire;
  if(!applyWire()){wire=false;toast("Сетка недоступна в этом браузере");return}
  $("#sbw").classList.toggle("on",wire);$("#sbw").setAttribute("aria-pressed",wire);$("#sbw").innerHTML=ico("grid")+(wire?" Сетка вкл":" Сетка")};
 sv.addEventListener("load",()=>{if(wire)applyWire()});$("#sb3").oninput=e=>{const v=Number(e.target.value);sv.setAttribute("exposure",v);sv.exposure=v};
 $$(".swt").forEach(w=>{w.style.background=SW[w.dataset.c];w.onclick=()=>stg.style.background=SW[w.dataset.c]});
 stg.ondragover=e=>e.preventDefault();stg.ondrop=e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f&&/\.(glb|gltf)$/i.test(f.name)){sv.style.display="block";sv.src=URL.createObjectURL(f);$("#holo").style.display="none"}};
 if(list.length)sel(0);else{$("#thumbs").innerHTML='<p class="sub">Здесь появятся мои модели из 3ds Max. Сейчас я делаю их на лабораторных, а дальше будет курсовая с катсценой.</p>';$("#s-cat").textContent="3D";$("#s-t").textContent="Модели в работе";$("#s-d").textContent="Первые модели скоро появятся здесь.";$("#svn").textContent=""}
 const w2=PROJECTS.filter(p=>p.cat==="2D");
 skillsInit("3d");
 bandInit("b-2d",{k:()=>w2.map((p,i)=>({yr:p.title.split(" ")[0],y:"Photoshop · UI",t:p.title,d:p.desc,chips:p.tags,media:p.img?`<img src="${p.img}" alt="${p.title}" loading="lazy">`:`<div class="empty">${CUBE}Здесь будет работа</div>`,mact:1,btn:{l:"Открыть →",fn:()=>openImg(p)}}))});
 procInit("pr-3d",SEC["3d"].proc);toolsInit("3d");pageInit()};
