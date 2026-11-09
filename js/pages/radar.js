/* Навыки: живая диаграмма. Растёт при появлении, «дышит», подсвечивает навык при наведении.
   Данные в js/data/config.js (SKILLS). */

const radar=()=>`<div class="rd"><svg viewBox="-46 -4 432 348" class="rdsvg" id="rdsvg" role="img" aria-label="Диаграмма навыков"></svg><div class="rd-read" id="rdr"><b>Наведи на навык</b><span></span></div></div>`;

function radarInit(){
 const svg=$("#rdsvg");if(!svg)return;
 const n=SKILLS.length,C=170,r=116,rm=matchMedia("(prefers-reduced-motion:reduce)").matches,
  pt=(i,v)=>{const a=i/n*Math.PI*2-Math.PI/2;return[C+Math.cos(a)*r*v/100,C+Math.sin(a)*r*v/100]};
 let g=`<defs><radialGradient id="rdg" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="var(--pk)" stop-opacity=".55"/><stop offset="1" stop-color="var(--acc2)" stop-opacity=".25"/></radialGradient></defs>`;
 [25,50,75,100].forEach(v=>g+=`<polygon points="${SKILLS.map((_,i)=>pt(i,v).join(",")).join(" ")}" fill="none" stroke="#ffffff22"/>`);
 SKILLS.forEach(([nm],i)=>{const[x,y]=pt(i,100),[lx,ly]=pt(i,127);
  g+=`<line class="spk" data-i="${i}" x1="${C}" y1="${C}" x2="${x}" y2="${y}" stroke="#ffffff22"/><text class="lab" data-i="${i}" x="${lx}" y="${ly+4}" text-anchor="middle" font-size="12">${nm}</text>`});
 g+=`<polygon id="rdp" fill="url(#rdg)" stroke="var(--pk)" stroke-width="2.5" stroke-linejoin="round"/>`;
 g+=SKILLS.map((_,i)=>`<circle class="dot" data-i="${i}" r="5.5" fill="#fff" stroke="var(--pk)" stroke-width="2.5"/><circle class="hit" data-i="${i}" r="20" fill="transparent"/>`).join("");
 svg.innerHTML=g;
 const poly=$("#rdp",svg),dots=$$(".dot",svg),hits=$$(".hit",svg),labs=$$(".lab",svg),spk=$$(".spk",svg),btns=$$("#rdl button"),
  rd=$("#rdr"),t0=performance.now();
 let focus=-1;
 function setFocus(i){
  focus=i;
  [dots,labs,spk,btns].forEach(a=>a.forEach((e,k)=>e.classList.toggle("f",k===i)));
  if(i<0){rd.firstChild.textContent="Наведи на навык";rd.lastChild.textContent=""}
  else{rd.firstChild.textContent=SKILLS[i][0];rd.lastChild.textContent=SKILLS[i][1]+"% · "+LV(SKILLS[i][1])}}
 let hovering=false,ai=0;
 hits.forEach(h=>{h.onpointerenter=()=>{hovering=true;setFocus(+h.dataset.i)};h.onpointerleave=()=>{hovering=false;setFocus(-1)};h.onclick=()=>setFocus(+h.dataset.i)});
 labs.forEach(l=>{l.onpointerenter=()=>{hovering=true;setFocus(+l.dataset.i)};l.onpointerleave=()=>{hovering=false;setFocus(-1)}});
 /* само перескакивает с навыка на навык, пока не наведёшь курсор */
 const auto=setInterval(()=>{if(!svg.isConnected){clearInterval(auto);return}
  const r=svg.getBoundingClientRect();if(hovering||document.hidden||r.bottom<0||r.top>innerHeight)return;
  setFocus(ai++%n)},1900);
 btns.forEach(b=>{b.onpointerenter=()=>setFocus(+b.dataset.i);b.onpointerleave=()=>setFocus(-1);b.onclick=()=>setFocus(+b.dataset.i)});
 /* полоски в списке заполняются, когда блок виден */
 setTimeout(()=>$("#rdl")&&$("#rdl").classList.add("in"),250);
 function draw(now){
  if(!svg.isConnected)return;
  const t=(now-t0)/1000,grow=rm?1:1-Math.pow(1-Math.min(1,t/1.4),3);
  const pts=SKILLS.map(([,val],i)=>{const w=rm?0:Math.sin(t*1.1+i*1.7)*2.8*grow;return pt(i,Math.max(4,val*grow+w))});
  poly.setAttribute("points",pts.map(p=>p.join(",")).join(" "));
  dots.forEach((d,i)=>{d.setAttribute("cx",pts[i][0]);d.setAttribute("cy",pts[i][1])});
  hits.forEach((d,i)=>{d.setAttribute("cx",pts[i][0]);d.setAttribute("cy",pts[i][1])});
  if(!rm)requestAnimationFrame(draw)}
 requestAnimationFrame(draw)}
