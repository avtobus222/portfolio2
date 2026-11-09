/* Главная: меняющаяся роль под именем.
   Каждая буква — маленький «барабан»: быстро прокручивается и останавливается на нужном символе.
   Под текстом бежит полоска до следующей роли. */

const hub=$("#hub"),ring=$("#ring"),st=$("#st");

const role=$("#role"),GL="ABCDEFGHJKLMNPQRSTUVWXYZ#$%&*+<>/=0123456789",rmv=matchMedia("(prefers-reduced-motion:reduce)").matches;
let ri=0,rNext=0;
const HOLD=2800;           // сколько роль стоит на месте, мс

/* печатается как в игровом терминале: набор, пауза, стирание, следующая роль */
function setRole(){
 const txt=ROLES[ri++%ROLES.length];clearTimeout(rNext);
 if(rmv){role.textContent=txt;rNext=setTimeout(setRole,HOLD);return}
 let n=0;
 const erase=()=>{if(n>0){role.textContent=txt.slice(0,--n);rNext=setTimeout(erase,24)}else setRole()};
 const type=()=>{if(n<txt.length){role.textContent=txt.slice(0,++n);rNext=setTimeout(type,55+Math.random()*45)}else rNext=setTimeout(erase,HOLD)};
 type()}
setTimeout(setRole,900);
