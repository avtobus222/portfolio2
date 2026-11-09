/* Мини-игра: пинг-понг */

/* pong */
function pong(){$("#gm").innerHTML=`<p class="sub" style="margin-top:16px">Двигай мышкой или пальцем. Играешь слева. Забей 5 голов!</p><canvas id="pg"></canvas>`;const cv=$("#pg"),c=cv.getContext("2d"),W=cv.width=560,H=cv.height=340;
 let py=H/2,ay=H/2,bx=W/2,by=H/2,vx=4,vy=2.5,ps=0,as=0,msg="",hold=0;
 const mv=e=>{const r=cv.getBoundingClientRect(),y=(e.touches?e.touches[0].clientY:e.clientY);py=(y-r.top)/r.height*H;if(e.cancelable&&e.touches)e.preventDefault()};cv.onmousemove=mv;cv.addEventListener("touchmove",mv,{passive:false});
 const rs=d=>{bx=W/2;by=H/2;vx=4*d;vy=(Math.random()-.5)*5};
 (function tk(){if(!cv.isConnected)return;if(hold>0){hold--;if(!hold){ps=as=0;msg=""}}else{
  ay+=Math.max(-3.1,Math.min(3.1,by-ay));bx+=vx;by+=vy;if(by<6||by>H-6)vy*=-1;
  if(bx<24&&bx>8&&Math.abs(by-py)<36&&vx<0){vx=-vx*1.06;vy+=(by-py)*.1;snd(440,.04)}
  if(bx>W-24&&bx<W-8&&Math.abs(by-ay)<36&&vx>0){vx=-vx*1.04;snd(330,.04)}
  if(bx<0){as++;rs(1);snd(180,.15)}if(bx>W){ps++;rs(-1);snd(900,.1);if(ps===5)unlock("pong")}
  if(ps>=5||as>=5){msg=ps>=5?"ТЫ ПОБЕДИЛА!":"Выиграл компьютер. Ещё раз!";hold=110;if(ps>=5)burst(innerWidth/2,innerHeight/2,40)}}
  c.fillStyle="#0a0618";c.fillRect(0,0,W,H);c.strokeStyle="#2d1d52";c.setLineDash([8,10]);c.beginPath();c.moveTo(W/2,0);c.lineTo(W/2,H);c.stroke();c.setLineDash([]);
  c.fillStyle=PC[1];c.shadowColor=PC[1];c.shadowBlur=14;c.fillRect(10,py-34,8,68);c.fillStyle="#22d3ee";c.shadowColor="#22d3ee";c.fillRect(W-18,ay-34,8,68);c.fillStyle="#fff";c.shadowColor="#fff";c.beginPath();c.arc(bx,by,7,0,7);c.fill();c.shadowBlur=0;
  c.fillStyle="#9b8fc0";c.font="bold 28px Geologica,sans-serif";c.textAlign="center";c.fillText(ps+"   "+as,W/2,40);if(msg){c.fillStyle="#fff";c.font="bold 22px Geologica,sans-serif";c.fillText(msg,W/2,H/2)}
  requestAnimationFrame(tk)})()}
