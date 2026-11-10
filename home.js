// Home page interactions: hero timecode, word reveal, ticker, career timeline, works cursor.
// REDUCE_MOTION, FINE_POINTER and openProject come from main.js.

const pad = (n) => String(Math.floor(n)).padStart(2, "0");

// ---------- Hero REC timecode (25 fps) ----------
const tcEl = document.querySelector("[data-timecode]");
const tcStart = performance.now();
function timecode(ms) {
  const s = ms / 1000;
  return `${pad(s / 3600)}:${pad((s / 60) % 60)}:${pad(s % 60)}:${pad((ms % 1000) / 40)}`;
}
(function tickTc() {
  tcEl.textContent = timecode(performance.now() - tcStart);
  if (REDUCE_MOTION) setTimeout(tickTc, 1000);
  else requestAnimationFrame(tickTc);
})();

// ---------- Intro: reveal words while scrolling ----------
const reveal = document.querySelector("[data-reveal]");
function splitReveal(lang) {
  const text = reveal.textContent;
  const parts = lang === "zh" ? [...text] : text.split(/(\s+)/);
  reveal.innerHTML = parts.map((p) => (/^\s+$/.test(p) ? p : `<span class="w">${p}</span>`)).join("");
  updateReveal();
}
function updateReveal() {
  const words = reveal.querySelectorAll(".w");
  if (REDUCE_MOTION) { words.forEach((w) => w.classList.add("on")); return; }
  const r = reveal.getBoundingClientRect();
  const vh = innerHeight;
  const progress = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (r.height + vh * 0.35)));
  const lit = Math.round(progress * words.length);
  words.forEach((w, i) => w.classList.toggle("on", i < lit));
}
addEventListener("scroll", updateReveal, { passive: true });

// ---------- Ticker ----------
const TICKER = [
  ["TikTok", "tiktok"], ["YouTube", "youtube"], ["Facebook", "facebook"], ["Shopee", "shopee"],
  ["Premiere Pro", "adobepremierepro"], ["ChatGPT", "openai"], ["Veo 3", "google"],
  ["Google Sheets", "googlesheets"], ["Meta Business Suite", "meta"], ["Jimeng", "bytedance"],
];
const tickerRow = TICKER.map(([name, icon]) =>
  `<span class="ticker__item"><img src="assets/icons/${icon}.svg" alt="">${name}</span>`).join("");
document.querySelector("[data-ticker]").innerHTML = tickerRow + tickerRow;

// ---------- Career timeline ----------
// Month index 0 = 07/2023. Clips use [start, end) month indexes from the CV dates.
const T0 = { y: 2023, m: 7 };
const TOTAL = 42; // 07/2023 .. 12/2026
const idx = (y, m) => (y - T0.y) * 12 + (m - T0.m);
const NOW = idx(2026, 11) + 1;
const CLIPS = [
  { id: "tygy", start: idx(2023, 8), end: idx(2024, 1) + 1, color: "#f2c94c" },
  { id: "hq", start: idx(2024, 2), end: idx(2026, 2), color: "#7d8cff" },
  { id: "mido", start: idx(2026, 2), end: NOW, color: "#ff5a5a" },
];
const MIN = CLIPS[0].start;
const MAX = NOW - 0.01;

const area = document.querySelector("[data-tl-area]");
const head = document.querySelector("[data-tl-head]");
const pct = (i) => `${(i / TOTAL) * 100}%`;
let playhead = MIN + 0.5;
let currentClip = null;
let autoplay = !REDUCE_MOTION;

// Ruler: a tick per month, labels on January and at the start.
document.querySelector("[data-tl-ruler]").innerHTML = Array.from({ length: TOTAL }, (_, i) => {
  const m = ((T0.m - 1 + i) % 12) + 1;
  const y = T0.y + Math.floor((T0.m - 1 + i) / 12);
  const major = m === 1;
  return `<span class="tick${major ? " tick--major" : ""}" style="left:${pct(i)}">${major ? y : ""}</span>`;
}).join("");

function renderClips(lang) {
  document.querySelector("[data-tl-clips]").innerHTML = CLIPS.map((c) => {
    const p = PROJECTS.find((x) => x.id === c.id);
    const name = p[lang].title.split(" · ")[0];
    return `<button type="button" class="clip" data-clip="${c.id}" style="left:${pct(c.start)};width:calc(${pct(c.end - c.start)} - 3px);--clip:${c.color}">
      <span class="clip__name">${name}</span></button>`;
  }).join("");
}

// Decorative waveform; deterministic so it does not change on reload.
let seed = 7;
const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
document.querySelector("[data-tl-wave]").innerHTML = Array.from({ length: 140 }, (_, i) => {
  const at = (i / 140) * TOTAL;
  const inClip = CLIPS.some((c) => at >= c.start && at < c.end);
  const h = inClip ? 25 + rand() * 70 : 6 + rand() * 10;
  return `<i style="height:${h}%"></i>`;
}).join("");

function monthLabel(i) {
  const n = T0.m - 1 + Math.floor(i);
  return `${pad((n % 12) + 1)}/${T0.y + Math.floor(n / 12)}`;
}

function renderMonitor(lang) {
  const clip = CLIPS.find((c) => playhead >= c.start && playhead < c.end) || CLIPS[CLIPS.length - 1];
  const p = PROJECTS.find((x) => x.id === clip.id);
  const c = p[lang];
  const screen = document.querySelector("[data-tl-screen]");
  const img = document.querySelector("[data-tl-img]");
  img.src = `assets/img/${p.cover}.jpg`;
  img.alt = c.title;
  screen.classList.toggle("is-phone", !!p.phone);
  document.querySelector("[data-tl-role]").textContent = [c.role, p.date && p.date[lang]].filter(Boolean).join(" · ");
  document.querySelector("[data-tl-title]").textContent = c.title;
  document.querySelector("[data-tl-stats]").innerHTML = c.stats.slice(0, 2)
    .map(([v, l]) => `<li><strong>${v}</strong><span>${l}</span></li>`).join("");
  document.querySelector("[data-tl-open]").dataset.project = p.id;
  document.querySelectorAll(".clip").forEach((el) => el.classList.toggle("is-active", el.dataset.clip === clip.id));
  screen.classList.remove("is-cut");
  void screen.offsetWidth;
  screen.classList.add("is-cut");
  currentClip = clip.id;
}

function setPlayhead(v, lang = getLang()) {
  playhead = Math.min(MAX, Math.max(MIN, v));
  head.style.left = pct(playhead);
  head.setAttribute("aria-valuemax", String(TOTAL));
  head.setAttribute("aria-valuenow", playhead.toFixed(1));
  head.setAttribute("aria-valuetext", monthLabel(playhead));
  document.querySelector("[data-tl-date]").textContent = monthLabel(playhead);
  // Timecode on the editor bar: months as minutes, fraction as seconds/frames.
  document.querySelector("[data-tl-tc]").textContent = timecode(playhead * 60000);
  const clip = CLIPS.find((c) => playhead >= c.start && playhead < c.end);
  if (clip && clip.id !== currentClip) renderMonitor(lang);
}

function fromPointer(e) {
  const r = area.getBoundingClientRect();
  return ((e.clientX - r.left) / r.width) * TOTAL;
}
let dragging = false;
area.addEventListener("pointerdown", (e) => {
  autoplay = false;
  const clipBtn = e.target.closest(".clip");
  if (clipBtn) {
    const c = CLIPS.find((x) => x.id === clipBtn.dataset.clip);
    setPlayhead(c.start + 0.5);
    return;
  }
  dragging = true;
  area.setPointerCapture(e.pointerId);
  setPlayhead(fromPointer(e));
});
area.addEventListener("pointermove", (e) => dragging && setPlayhead(fromPointer(e)));
area.addEventListener("pointerup", () => (dragging = false));
head.addEventListener("keydown", (e) => {
  const step = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
  if (!step) return;
  e.preventDefault();
  autoplay = false;
  setPlayhead(Math.floor(playhead) + step + 0.5);
});

// Autoplay sweeps the playhead while the editor is on screen, until the visitor touches it.
let visible = false;
new IntersectionObserver(([en]) => (visible = en.isIntersecting), { threshold: 0.3 }).observe(area);
let last = performance.now();
(function loop(now) {
  const dt = now - last;
  last = now;
  if (autoplay && visible) {
    let next = playhead + dt * (TOTAL / 16000);
    if (next >= MAX) next = MIN;
    setPlayhead(next);
  }
  requestAnimationFrame(loop);
})(last);

// ---------- Custom cursor over project cards ----------
const cursor = document.querySelector(".cursor");
if (FINE_POINTER) {
  addEventListener("pointermove", (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursor.classList.toggle("is-on", !!e.target.closest(".work"));
  }, { passive: true });
}

// ---------- Language ----------
function renderHome(lang) {
  splitReveal(lang);
  renderClips(lang);
  currentClip = null;
  renderMonitor(lang);
  setPlayhead(playhead, lang);
}
renderHome(getLang());
document.addEventListener("langchange", (e) => renderHome(e.detail));
