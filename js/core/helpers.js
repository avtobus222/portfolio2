/* Короткие помощники: $, $$, sleep, tg, общие переменные */

const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],sleep=ms=>new Promise(r=>setTimeout(r,ms));
const A=ABOUT,CUBE='<div class="wc"><div class="cube"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>';
const tg=a=>(a||[]).map(t=>`<span class="chip">${t}</span>`).join("");
let PC=["#b8a0ff","#ff7ab8"],started=true,curL=null,actI=0;
