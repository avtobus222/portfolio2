/* Клавиатура (стрелки, Esc, Konami) и запуск */

const KC=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];let ki=0;
addEventListener("keydown",e=>{
 if(e.target.tagName==="INPUT")return;
 const k=e.key.length===1?e.key.toLowerCase():e.key;ki=k===KC[ki]?ki+1:(k===KC[0]?1:0);
 if(ki===KC.length){ki=0;document.body.classList.add("rb");toast("<b>Режим радуги</b>");unlock("konami");setTimeout(()=>document.body.classList.remove("rb"),9000)}
 if(e.key==="Escape"){if($("#pop").classList.contains("open"))closePop();else if(contactsOpen())closeContacts();else if(cur!=="home")back(innerWidth/2,innerHeight/2);return}
 if(cur!=="home"||$("#pop").classList.contains("open"))return;
 if(e.key==="ArrowRight")go(act+1);else if(e.key==="ArrowLeft")go(act-1);else if(e.key==="Enter")$("#open").click();else if(/^[1-4]$/.test(e.key))go(+e.key-1)});
hud();setTimeout(()=>unlock("start"),2500);
