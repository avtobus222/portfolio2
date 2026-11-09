/* Выпадающее окно «Контакты» в меню: телефон, Telegram, GitHub, почта.
   Список и подписи — в js/data/config.js (CONTACTS) */

const cbtn=$("#cbtn"),cpop=$("#cpop");
const CP_COPY='<svg viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>';
cpop.innerHTML=`<div class="cp-h"><b>Контакты</b><span>Ищу стажировку или практику</span></div>`+CONTACTS.map(c=>{
 const phone=c.k==="phone";
 const contact=phone
  ? `<button class="cp-m cp-reveal" type="button" data-reveal-phone><span class="cp-i"><svg viewBox="0 0 24 24">${c.ic}</svg></span><span class="cp-t"><small>${c.l}</small><b>Нажмите, чтобы показать номер</b></span></button>`
  : `<a class="cp-m" href="${c.href}"${c.ext?' target="_blank" rel="noopener"':""}><span class="cp-i"><svg viewBox="0 0 24 24">${c.ic}</svg></span><span class="cp-t"><small>${c.l}</small><b>${c.v}</b></span></a>`;
 return `<div class="cp-r" data-contact="${c.k}" data-value="${c.v}" data-href="${c.href}">${contact}${phone?"":`<button class="cp-c" data-v="${c.v}" aria-label="Скопировать: ${c.l}" title="Скопировать">${CP_COPY}</button>`}</div>`;
}).join("");

function placeContacts(){
 const r=cbtn.getBoundingClientRect(),w=Math.min(420,innerWidth-24),l=Math.max(12,Math.min(innerWidth-w-12,r.left+r.width/2-w/2));
 cpop.style.width=w+"px";cpop.style.left=l+"px";cpop.style.top=(r.bottom+12)+"px";
 cpop.style.setProperty("--ox",(r.left+r.width/2-l)+"px")}
function openContacts(){placeContacts();cpop.classList.add("open");cbtn.classList.add("open");cbtn.setAttribute("aria-expanded","true")}
function closeContacts(){cpop.classList.remove("open");cbtn.classList.remove("open");cbtn.setAttribute("aria-expanded","false")}
const contactsOpen=()=>cpop.classList.contains("open");

cbtn.onclick=e=>{e.stopPropagation();contactsOpen()?closeContacts():openContacts()};
addEventListener("pointerdown",e=>{if(contactsOpen()&&!cpop.contains(e.target)&&!cbtn.contains(e.target)&&!(e.target.closest&&e.target.closest("[data-contacts]")))closeContacts()});
addEventListener("resize",()=>{if(contactsOpen())placeContacts()});
cpop.addEventListener("click",e=>{
 const reveal=e.target.closest("[data-reveal-phone]");
 if(reveal){
  const row=reveal.closest(".cp-r"),value=row.dataset.value,href=row.dataset.href;
  row.innerHTML=`<a class="cp-m" href="${href}"><span class="cp-i"><svg viewBox="0 0 24 24">${CONTACTS.find(c=>c.k==="phone").ic}</svg></span><span class="cp-t"><small>Телефон</small><b>${value}</b></span></a><button class="cp-c" data-v="${value}" aria-label="Скопировать: Телефон" title="Скопировать">${CP_COPY}</button>`;
  return;
 }
 const b=e.target.closest(".cp-c");if(!b)return;
 const v=b.dataset.v,done=()=>{b.classList.add("ok");setTimeout(()=>b.classList.remove("ok"),1400);toast("Скопировано: <b>"+v+"</b>")};
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(v).then(done,()=>{});
 else{const t=document.createElement("textarea");t.value=v;document.body.appendChild(t);t.select();try{document.execCommand("copy");done()}catch(_){}t.remove()}});
/* кнопки «Написать мне» на главной открывают то же окно */
$$("[data-contacts]").forEach(b=>b.onclick=e=>{e.stopPropagation();contactsOpen()?closeContacts():openContacts()});
