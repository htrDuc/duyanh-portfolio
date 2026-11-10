// Skills page interactions: line icons, count-up stats, workflow stepper, card spotlight.
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Line icons for tools without an official logo ----------
const LINE = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const LINE_ICONS = {
  scissors: LINE('<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.1 8.1 20 20M20 4 8.1 15.9"/>'),
  film: LINE('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4M3 12h18"/>'),
  sparkle: LINE('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/>'),
  chart: LINE('<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>'),
  team: LINE('<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2c2.9.4 5 2.8 5 5.8"/>'),
  link: LINE('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'),
  clock: LINE('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  bolt: LINE('<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>'),
  globe: LINE('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z"/>'),
};
document.querySelectorAll("[data-icon]").forEach((el) => (el.innerHTML = LINE_ICONS[el.dataset.icon]));

// ---------- Count-up stats ----------
// Per-language display: vi/en use K/M, zh uses 万.
const STATS = {
  years:   { vi: { n: 2, suf: "+" },     en: { n: 2, suf: "+" },     zh: { n: 2, suf: "+" } },
  views:   { vi: { n: 31.1, dec: 1, suf: "M" }, en: { n: 31.1, dec: 1, suf: "M" }, zh: { n: 3110, suf: "万" } },
  revenue: { vi: { n: 11, pre: "$", suf: "K" }, en: { n: 11, pre: "$", suf: "K" }, zh: { n: 11, pre: "$", suf: "K" } },
  subs:    { vi: { n: 75, suf: "K" },    en: { n: 75, suf: "K" },    zh: { n: 7.5, dec: 1, suf: "万" } },
};

function formatStat(cfg, value, lang) {
  const num = new Intl.NumberFormat(HTML_LANG[lang], {
    minimumFractionDigits: cfg.dec || 0,
    maximumFractionDigits: cfg.dec || 0,
  }).format(value);
  return `${cfg.pre || ""}${num}${cfg.suf || ""}`;
}

let statsPlayed = false;
function renderStats(lang, animate) {
  document.querySelectorAll("[data-stat]").forEach((li) => {
    const cfg = STATS[li.dataset.stat][lang];
    const out = li.querySelector(".stat__num");
    if (!animate || reduceMotion) {
      out.textContent = formatStat(cfg, cfg.n, lang);
      return;
    }
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      out.textContent = formatStat(cfg, cfg.n * eased, lang);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

const statsEl = document.querySelector("[data-stats]");
new IntersectionObserver((entries, obs) => {
  if (!entries[0].isIntersecting) return;
  statsPlayed = true;
  renderStats(getLang(), true);
  obs.disconnect();
}, { threshold: 0.4 }).observe(statsEl);

// ---------- Workflow stepper ----------
const TOOL = {
  sheets: ["Google Sheets", "assets/icons/googlesheets.svg"],
  meta: ["Meta Business Suite", "assets/icons/meta.svg"],
  tiktok: ["TikTok", "assets/icons/tiktok.svg"],
  youtube: ["YouTube", "assets/icons/youtube.svg"],
  facebook: ["Facebook", "assets/icons/facebook.svg"],
  shopee: ["Shopee", "assets/icons/shopee.svg"],
  chatgpt: ["ChatGPT", "assets/icons/openai.svg"],
  grok: ["Grok", null, "sparkle"],
  premiere: ["Premiere Pro", "assets/icons/adobepremierepro.svg"],
  capcut: ["CapCut", null, "scissors"],
  veo: ["Veo 3", "assets/icons/google.svg"],
};
const FLOW = [
  ["sheets", "meta", "tiktok"],
  ["chatgpt", "grok"],
  ["premiere", "capcut", "veo"],
  ["tiktok", "youtube", "facebook", "shopee"],
  ["sheets", "meta", "chatgpt"],
];

const flowSteps = document.querySelector(".flow__steps");
const flowPanel = document.querySelector(".flow__panel");
let flowActive = 0;
let flowTimer = null;

function tileHtml(key) {
  const [name, src, icon] = TOOL[key];
  return `<li class="tile" data-tip="${name}">${src ? `<img src="${src}" alt="${name}">` : LINE_ICONS[icon]}</li>`;
}

function renderFlow(lang) {
  flowSteps.innerHTML = FLOW.map((_, i) => `
    <button type="button" class="flow__step" role="tab" aria-selected="${i === flowActive}" data-step="${i}">
      <span class="flow__num">0${i + 1}</span>
      <span class="flow__name">${t(`flow.${i + 1}.t`, lang)}</span>
    </button>`).join("");
  flowPanel.innerHTML = `
    <p class="flow__desc">${t(`flow.${flowActive + 1}.d`, lang)}</p>
    <ul class="tiles">${FLOW[flowActive].map(tileHtml).join("")}</ul>`;
  flowPanel.classList.remove("is-in");
  void flowPanel.offsetWidth; // restart the fade-in
  flowPanel.classList.add("is-in");
}

function setStep(i) {
  flowActive = i;
  renderFlow(getLang());
}

flowSteps.addEventListener("click", (e) => {
  const b = e.target.closest("[data-step]");
  if (!b) return;
  stopAuto();
  setStep(Number(b.dataset.step));
});

// Auto-advance until the visitor interacts.
function stopAuto() { clearInterval(flowTimer); flowTimer = null; }
if (!reduceMotion) {
  flowTimer = setInterval(() => setStep((flowActive + 1) % FLOW.length), 4000);
  document.querySelector("[data-flow]").addEventListener("pointerenter", stopAuto, { once: true });
}

// ---------- Card spotlight following the cursor ----------
document.querySelectorAll("[data-spot]").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - r.left}px`);
    card.style.setProperty("--y", `${e.clientY - r.top}px`);
  });
});

// ---------- Language ----------
renderFlow(getLang());
renderStats(getLang(), false);
document.querySelectorAll(".stat__num").forEach((el) => { if (!statsPlayed) el.textContent = "0"; });
document.addEventListener("langchange", (e) => {
  renderFlow(e.detail);
  if (statsPlayed) renderStats(e.detail, false);
});
