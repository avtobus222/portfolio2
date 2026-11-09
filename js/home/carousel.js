/* Главная: карточки изогнуты по цилиндру + стрелки навигации */

const CW = 268, CH = 380;
const K = 64;              // больше полосок = плавный изгиб без «кривизны»
const SW = CW / K;
const OV = 1.15;           // перекрытие, чтобы не было щелей

function sliceHTML(k, s) {
  const x0 = s * SW;
  // иконка только в центральных полосках
  const showIcon = x0 > 20 && x0 + SW < 160;
  const svg = showIcon ? `<svg viewBox="0 0 24 24">${SC[k].i}</svg>` : "";
  return `
    <i class="sl" aria-hidden="true" style="left:${CW/2 - (SW+OV)/2}px;width:${SW+OV}px">
      <span class="fc" style="left:${(SW+OV)/2 - (s+.5)*SW}px;width:${CW}px">
        <span class="art"></span>
        <span class="shine"></span>
        ${svg}
        <span class="tx">
          <h3>${SC[k].t}</h3>
          <small>${SC[k].sub}</small>
          <span class="go">Открыть</span>
        </span>
      </span>
    </i>`;
}

ring.innerHTML = ORD.map(k => `
  <div class="cd" role="button" tabindex="0" data-k="${k}" aria-label="${SC[k].t}" style="--c:${SC[k].c}">
    ${Array.from({length: K}, (_, s) => sliceHTML(k, s)).join("")}
  </div>
`).join("");

/* светящаяся сфера в центре кольца: карточки огибают её */
ring.insertAdjacentHTML("afterbegin",'<div class="orb" aria-hidden="true"><b></b></div>');

// стрелки
const arrows = document.createElement("div");
arrows.className = "car-arrows";
arrows.innerHTML = `
  <button class="car-prev" aria-label="Предыдущая">
    <svg viewBox="0 0 24 24" width="22" height="22"><path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </button>
  <button class="car-next" aria-label="Следующая">
    <svg viewBox="0 0 24 24" width="22" height="22"><path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </button>
`;
st.appendChild(arrows);

const cards = $$(".cd");
cards.forEach(c => {
  c._sl = [...c.querySelectorAll(".sl")];
  c._sl.forEach(e => e._o = -1);
});

let R = 360;
let rot = -step * 1.5, tgt = rot, act = -1;
let drag = false, sx = 0, sr = 0, moved = 0, lx = 0, vel = 0;
let lastIn = 0, hov = false;
let lastT = performance.now();
let t0 = performance.now() + 200;

function size() {
  R = Math.min(400, Math.max(250, st.clientWidth * 0.40));
  ring.style.transform = `translateZ(${-R}px)`;
  cards.forEach(c => c._sl.forEach((e, s) => {
    const x = (s + 0.5) * SW - CW / 2;
    e.style.transformOrigin = `50% 50% ${-R}px`;
    const ph = (x / R) * (180 / Math.PI);
    e._ph = ph;
    // края карточки чуть ниже центра: получается выпуклая «сфера», а не плоский цилиндр
    const u = x / (CW / 2);
    const sy = 1 - 0.07 * u * u;
    e.style.transform = `rotateY(${ph}deg) scaleY(${sy})`;
  }));
}

function go(i) {
  lastIn = performance.now();
  const d = ((-i * step - rot) % 360 + 540) % 360 - 180;
  tgt = rot + d;
}

function frame(now) {
  now = now || performance.now();
  const dt = Math.min(0.05, (now - lastT) / 1000);
  lastT = now;

  if (!drag) {
    const idle = !hov
      && !hub.classList.contains("dim")
      && !$("#pop").classList.contains("open")
      && now - lastIn > 1600
      && Math.abs(tgt - rot) < 1.0;

    if (idle) {
      rot -= 6.5 * dt;
      tgt = rot;
    } else {
      rot += (tgt - rot) * (1 - Math.exp(-dt * 9));
    }
  }

  if (hub.classList.contains("dim") && !busy) {
    requestAnimationFrame(frame);
    return;
  }

  const p = Math.min(1, Math.max(0, (now - t0) / 1700));
  const e = 1 - Math.pow(1 - p, 3);

  cards.forEach((c, i) => {
    const a = i * step * e + rot;
    const d = ((a % 360) + 540) % 360 - 180;
    const cos = Math.cos(d * Math.PI / 180);
    const depth = (cos + 1) * 0.5;
    const bob = Math.sin(now / 1000 + i * 1.3) * (2.5 + depth * 3);

    c.style.transform =
      `rotateY(${a}deg) translateZ(${R + (1 - e) * (N - i) * 6}px) translateY(${bob}px)`;

    // освещение полосок — плавное, без рваных краёв
    c._sl.forEach(s => {
      const g = Math.cos((a + s._ph) * Math.PI / 180);
      let o = Math.min(1, Math.max(0, 0.08 + 0.98 * g));
      o *= Math.min(1, Math.max(0, g / 0.16));
      o *= Math.min(1, p * 2.0);
      o *= 0.5 + depth * 0.5;
      if (Math.abs(o - s._o) > 0.004) {
        s._o = o;
        s.style.opacity = o;
      }
    });
  });

  const n = ((Math.round(-rot / step) % N) + N) % N;
  if (n !== act) {
    act = n;
    cards.forEach((c, i) => c.classList.toggle("on", i === n));
    const col = SC[ORD[n]].c;
    hub.style.setProperty("--a", col);
    document.documentElement.style.setProperty("--a", col);
  }

  requestAnimationFrame(frame);
}

size();
addEventListener("resize", size);
requestAnimationFrame(frame);

// стрелки
$(".car-prev", arrows).onclick = () => go(act - 1);
$(".car-next", arrows).onclick = () => go(act + 1);

// drag
ring.addEventListener("pointerenter", () => hov = true);
ring.addEventListener("pointerleave", () => {
  hov = false;
  lastIn = performance.now() - 1800;
});

st.addEventListener("pointerdown", e => {
  if (e.target.closest(".car-arrows")) return;
  lastIn = performance.now();
  drag = true;
  sx = lx = e.clientX;
  sr = rot;
  moved = 0;
  vel = 0;
  st.classList.add("dg");
});

addEventListener("pointermove", e => {
  document.documentElement.style.setProperty("--x", e.clientX + "px");
  document.documentElement.style.setProperty("--y", e.clientY + "px");
  if (!drag) return;
  const d = e.clientX - sx;
  moved = Math.max(moved, Math.abs(d));
  vel = e.clientX - lx;
  lx = e.clientX;
  rot = sr + d * 0.34;
  tgt = rot;
});

addEventListener("pointerup", () => {
  if (!drag) return;
  drag = false;
  lastIn = performance.now();
  st.classList.remove("dg");
  if (moved > 6) tgt = Math.round((rot + vel * 1.25) / step) * step;
});

st.addEventListener("wheel", e => {
  e.preventDefault();
  if (Math.abs(e.deltaY) + Math.abs(e.deltaX) > 16 && !st._w) {
    st._w = 1;
    go(act + (e.deltaY + e.deltaX > 0 ? 1 : -1));
    setTimeout(() => st._w = 0, 400);
  }
}, { passive: false });

function openCard(c) {
  const r = c.getBoundingClientRect();
  show(c.dataset.k, r.left + r.width / 2, r.top + r.height / 2);
}

ring.addEventListener("click", e => {
  const c = e.target.closest(".cd");
  if (!c || moved > 6) return;
  const i = cards.indexOf(c);
  if (i === act) openCard(c);
  else go(i);
});

ring.addEventListener("keydown", e => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const c = e.target.closest(".cd");
  if (!c) return;
  e.preventDefault();
  const i = cards.indexOf(c);
  if (i === act) openCard(c);
  else go(i);
});

$("#open").onclick = e => {
  const r = e.currentTarget.getBoundingClientRect();
  show(ORD[act], r.left + r.width / 2, r.top + r.height / 2);
};
