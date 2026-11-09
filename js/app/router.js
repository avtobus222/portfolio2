/* Переходы между разделами: show() и back(). x, y — откуда расходится волна перехода */

function show(k,x,y){
 if(busy||k===cur)return;if(k==="home")return back(x,y);busy=true;closeContacts();
 const c=SC[k].c,i=ORD.indexOf(k);
 curtain("0"+(i+1),SC[k].t,c,()=>{
  PC=[c,c];vis.add(k);if(vis.size===N)unlock("explore");
  $$("#lw").forEach(e=>e.removeAttribute("id"));
  $$(".pg").forEach(o=>o.remove());
  const el=document.createElement("div");el.className="pg";el.style.cssText=`--a:${c};--pk:${c};--acc:${c};--acc2:color-mix(in srgb,${c} 55%,#000)`;
  el.innerHTML=`<div id="lw">`+L[k]()+`</div>`;
  document.body.appendChild(el);
  (INIT[k]||(()=>{}))();caseGo();extras(el);carInit(el);fx(el);
  document.documentElement.style.setProperty("--a",c);hub.classList.add("dim");cur=k;nav(k)},x,y)}
function back(x,y){
 if(busy||!$$(".pg").length)return;busy=true;closeContacts();
 curtain("","Главная",SC[ORD[act]].c,()=>{
  $$(".pg").forEach(p=>p.remove());hub.classList.remove("dim");cur="home";nav("home");
  document.documentElement.style.setProperty("--a",SC[ORD[act]].c)},x,y)}
$$("#nav button[data-id]").forEach(b=>b.onclick=()=>{const r=b.getBoundingClientRect();show(b.dataset.id,r.left+r.width/2,r.top+r.height/2)});
