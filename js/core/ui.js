/* Уведомления, искры, всплывающее окно */

function toast(t){const d=document.createElement("div");d.className="ts";d.innerHTML=t;$("#toast").appendChild(d);setTimeout(()=>d.remove(),3800)}
function burst(x,y,n=14){for(let i=0;i<n;i++){const d=document.createElement("i");d.className="spk";const a=Math.PI*2*i/n,r=40+Math.random()*70;d.style.cssText=`left:${x}px;top:${y}px;--dx:${Math.cos(a)*r}px;--dy:${Math.sin(a)*r}px;background:${i%2?PC[1]:PC[0]}`;document.body.appendChild(d);setTimeout(()=>d.remove(),850)}}
function pop(html,init){$("#popc").innerHTML=html;$("#pop").classList.add("open");init&&init()}
function closePop(){$("#pop").classList.remove("open");$("#popc").innerHTML=""}
$("#pop").addEventListener("click",e=>{if(e.target.id==="pop"||e.target.closest("[data-x]"))closePop()});
