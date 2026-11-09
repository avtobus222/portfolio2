/* Мини-игра: лабиринт */

/* maze */
function maze(){const g=$("#gm");g.innerHTML=`<div class="mi"><span>Время: <b id="mt">0</b> с</span><span id="mwin" style="color:var(--pk)"></span><button class="btn sm" id="mre">Новый лабиринт</button></div><canvas id="mz"></canvas><div class="dpad"><button data-d="0,-1">▲</button><button data-d="-1,0">◀</button><button data-d="0,1">▼</button><button data-d="1,0">▶</button></div>`;
 const cv=$("#mz"),c=cv.getContext("2d"),N=15,M=11,S=34;cv.width=N*S;cv.height=M*S;let R,B,px,py,t,won,iv;
 function gen(){R=Array.from({length:M},()=>Array(N).fill(1));B=Array.from({length:M},()=>Array(N).fill(1));const v=Array.from({length:M},()=>Array(N).fill(0)),st=[[0,0]];v[0][0]=1;
  while(st.length){const[x,y]=st[st.length-1],nb=[[1,0],[-1,0],[0,1],[0,-1]].map(([dx,dy])=>[x+dx,y+dy,dx,dy]).filter(([a,b])=>a>=0&&b>=0&&a<N&&b<M&&!v[b][a]);
   if(!nb.length){st.pop();continue}const[a,b,dx,dy]=nb[Math.random()*nb.length|0];v[b][a]=1;if(dx===1)R[y][x]=0;else if(dx===-1)R[b][a]=0;else if(dy===1)B[y][x]=0;else B[b][a]=0;st.push([a,b])}
  px=0;py=0;t=0;won=false;$("#mwin").textContent="";$("#mt").textContent=0;clearInterval(iv);iv=setInterval(()=>{if(!cv.isConnected){clearInterval(iv);return}if(!won)$("#mt").textContent=++t},1000);draw()}
 function draw(){c.fillStyle="#0a0618";c.fillRect(0,0,cv.width,cv.height);c.strokeStyle=PC[0];c.lineWidth=2.5;c.lineCap="round";c.shadowColor=PC[0];c.shadowBlur=8;c.beginPath();
  for(let y=0;y<M;y++)for(let x=0;x<N;x++){if(R[y][x]){c.moveTo((x+1)*S,y*S);c.lineTo((x+1)*S,(y+1)*S)}if(B[y][x]){c.moveTo(x*S,(y+1)*S);c.lineTo((x+1)*S,(y+1)*S)}}
  c.moveTo(0,0);c.lineTo(0,M*S);c.moveTo(0,0);c.lineTo(N*S,0);c.stroke();c.shadowBlur=0;
  c.fillStyle="#4ade80";c.fillRect((N-1)*S+9,(M-1)*S+9,S-18,S-18);c.fillStyle=PC[1];c.shadowColor=PC[1];c.shadowBlur=14;c.beginPath();c.arc(px*S+S/2,py*S+S/2,S/3,0,7);c.fill();c.shadowBlur=0}
 const can=(dx,dy)=>dx===1?!R[py][px]:dx===-1?px>0&&!R[py][px-1]:dy===1?!B[py][px]:py>0&&!B[py-1][px];
 function mv(dx,dy){if(won||!can(dx,dy))return;px+=dx;py+=dy;snd(300+px*8,.03);draw();if(px===N-1&&py===M-1){won=true;$("#mwin").textContent=`Выход найден за ${t} с!`;burst(innerWidth/2,innerHeight/2,40);unlock("maze")}}
 const kh=e=>{if(!cv.isConnected){removeEventListener("keydown",kh);return}const m={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],w:[0,-1],s:[0,1],a:[-1,0],d:[1,0]}[e.key.length>1?e.key:e.key.toLowerCase()];if(m){e.preventDefault();mv(...m)}};addEventListener("keydown",kh);
 $$(".dpad button").forEach(b=>b.onclick=()=>mv(...b.dataset.d.split(",").map(Number)));$("#mre").onclick=gen;gen()}
