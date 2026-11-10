// Shared page animations: film-leader intro, scroll reveal, hero parallax, card tilt, dock magnification.
// Loaded after main.js on every page.

// ---------- Intro: film leader countdown, once per browser session ----------
let introDelay = 250;
(function intro() {
  let seen = false;
  try { seen = sessionStorage.getItem("duyanh-intro") === "1"; } catch {}
  if (seen) return;
  introDelay = 1350;
  try { sessionStorage.setItem("duyanh-intro", "1"); } catch {}
  const el = document.createElement("div");
  el.className = "leader";
  el.setAttribute("aria-hidden", "true");
  el.innerHTML = `
    <div class="leader__ring"><span class="leader__sweep"></span><span class="leader__num">3</span></div>
    <p class="leader__tc">@ Edit by Duy Anh</p>`;
  document.body.appendChild(el);
  const num = el.querySelector(".leader__num");
  [2, 1].forEach((n, i) => setTimeout(() => (num.textContent = n), 380 * (i + 1)));
  setTimeout(() => el.classList.add("is-out"), 1150);
  setTimeout(() => el.remove(), 1900);
})();

// ---------- Scroll reveal ----------
const REVEAL_SELECTOR = [
  ".section-head", ".intro__lead", ".intro__side", ".ticker", ".editor", ".work", ".btn-pill",
  ".contact__left", ".cform", ".projects__title", ".skills__title", ".skills__lead",
  ".orbit-wrap", ".stat", ".flow", ".bento > *",
].join(",");

// ---------- Text scramble (timecode-style decode) ----------
const SCRAMBLE_ON_REVEAL = ".section-head .display, .projects__title, .skills__title";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+/<>=";
let langEpoch = 0;
document.addEventListener("langchange", () => langEpoch++);
function scramble(el, duration = 900) {
  const final = el.textContent;
  if (!final.trim()) return;
  const epoch = langEpoch;
  const start = performance.now();
  el.classList.add("scr");
  const timer = setInterval(() => {
    if (epoch !== langEpoch) { clearInterval(timer); return; }
    const p = Math.min(1, (performance.now() - start) / duration);
    const done = Math.floor(p * final.length);
    el.textContent = [...final].map((ch, i) =>
      i < done || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]).join("");
    if (p >= 1) { el.textContent = final; clearInterval(timer); }
  }, 40);
}

// Position check on scroll instead of IntersectionObserver: it never leaves content hidden
// when the observer is throttled (background tabs, embedded previews).
let pending = [];
function checkReveal() {
  const limit = innerHeight * 0.94;
  pending = pending.filter((el) => {
    if (el.getBoundingClientRect().top < limit) {
      el.classList.add("in");
      el.querySelectorAll(SCRAMBLE_ON_REVEAL).forEach((t) => scramble(t));
      if (el.matches(SCRAMBLE_ON_REVEAL)) scramble(el);
      return false;
    }
    return true;
  });
}
// Called directly (no rAF): only a handful of elements, and rAF is paused in hidden tabs.
addEventListener("scroll", checkReveal, { passive: true });
addEventListener("resize", checkReveal);

function setupReveal() {
  document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
    if (el.classList.contains("reveal")) return;
    // Stagger siblings that reveal together (cards in a grid).
    const siblings = [...el.parentElement.children].filter((s) => s.matches(REVEAL_SELECTOR));
    el.style.setProperty("--d", `${Math.min(siblings.indexOf(el), 6) * 90}ms`);
    el.classList.add("reveal");
    pending.push(el);
  });
  checkReveal();
}
setupReveal();
// Works cards are re-rendered when the language changes.
document.addEventListener("langchange", () => requestAnimationFrame(setupReveal));

// ---------- Hero parallax ----------
const heroImg = document.querySelector(".hero__bg");
const heroMarquee = document.querySelector(".marquee");
if (heroImg) {
  addEventListener("scroll", () => {
    const y = Math.min(scrollY, innerHeight);
    heroImg.style.translate = `0 ${y * 0.25}px`;
    heroImg.style.scale = String(1 + y / innerHeight * 0.08);
    if (heroMarquee) heroMarquee.style.translate = `0 ${y * -0.15}px`;
  }, { passive: true });
}

// ---------- 3D tilt on project cards ----------
if (FINE_POINTER) {
  document.addEventListener("pointermove", (e) => {
    const media = e.target.closest?.(".work__media");
    document.querySelectorAll(".work__media.is-tilt").forEach((m) => {
      if (m !== media) { m.classList.remove("is-tilt"); m.style.transform = ""; }
    });
    if (!media) return;
    const r = media.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    media.classList.add("is-tilt");
    media.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${y * -8}deg)`;
  }, { passive: true });
}

// ---------- Dock magnification (macOS style) ----------
const dock = document.querySelector(".dock");
if (dock && FINE_POINTER) {
  const buttons = [...dock.querySelectorAll(".dock__btn")];
  dock.addEventListener("pointermove", (e) => {
    buttons.forEach((b) => {
      const r = b.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2));
      const s = 1 + Math.max(0, 1 - d / 120) * 0.35;
      b.style.scale = s.toFixed(3);
      b.style.translate = `0 ${-(s - 1) * 22}px`;
    });
  });
  dock.addEventListener("pointerleave", () => buttons.forEach((b) => { b.style.scale = ""; b.style.translate = ""; }));
}

// ---------- Hero: split hook, kicker decode, count-up proof, periodic glitch ----------
const heroBottom = document.querySelector(".hero__bottom");
function splitWords(el) {
  const zh = getLang() === "zh";
  const parts = zh ? [...el.textContent] : el.textContent.split(/(\s+)/);
  let i = 0;
  el.innerHTML = parts.map((w) => (/^\s+$/.test(w) ? w : `<span class="sw"><span class="sw__i" style="--i:${i++}">${w}</span></span>`)).join("");
}
function countUp(el, duration = 1600) {
  const final = el.textContent;
  const m = final.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!m) return;
  const [, pre, num, post] = m;
  const sep = /[.,]/.exec(num)?.[0] || "";
  const decimals = sep ? num.split(sep)[1].length : 0;
  const value = parseFloat(num.replace(",", "."));
  const epoch = langEpoch;
  const start = performance.now() + 700;
  const timer = setInterval(() => {
    if (epoch !== langEpoch) { clearInterval(timer); return; }
    const p = Math.max(0, Math.min(1, (performance.now() - start) / duration));
    const eased = 1 - Math.pow(2, -10 * p);
    el.textContent = pre + (value * eased).toFixed(decimals).replace(".", sep || ".") + post;
    if (p >= 1) { el.textContent = final; clearInterval(timer); }
  }, 30);
}
function playHero() {
  if (!heroBottom) return;
  heroBottom.classList.remove("is-in");
  heroBottom.querySelectorAll("[data-split]").forEach(splitWords);
  void heroBottom.offsetWidth;
  heroBottom.classList.add("is-in");
  heroBottom.querySelectorAll("[data-scramble]").forEach((el) => scramble(el, 1100));
  heroBottom.querySelectorAll("[data-count]").forEach((el) => countUp(el));
}
if (heroBottom) {
  setTimeout(playHero, introDelay);
  document.addEventListener("langchange", () => setTimeout(playHero, 0));
  const hook = heroBottom.querySelector(".hero__hook");
  setInterval(() => {
    if (document.hidden || scrollY > innerHeight) return;
    hook.classList.remove("glitch");
    void hook.offsetWidth;
    hook.classList.add("glitch");
  }, 4200);
}

// ---------- Magnetic buttons ----------
document.querySelectorAll("[data-magnet]").forEach((el) => {
  if (!FINE_POINTER) return;
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    el.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.3}px ${(e.clientY - r.top - r.height / 2) * 0.4}px`;
  });
  el.addEventListener("pointerleave", () => (el.style.translate = ""));
});

// ---------- Scroll progress bar + scroll-velocity marquees ----------
const bar = document.createElement("div");
bar.className = "progress";
document.body.appendChild(bar);
const speedTracks = [...document.querySelectorAll(".marquee__track, .ticker__track")];
let lastY = scrollY, velocity = 0, ticking = false;
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.scale = `${max > 0 ? scrollY / max : 0} 1`;
  velocity = Math.max(-60, Math.min(60, velocity + (scrollY - lastY) * 0.6));
  lastY = scrollY;
  if (!ticking && speedTracks.length) { ticking = true; requestAnimationFrame(decay); }
}
function decay() {
  velocity *= 0.9;
  speedTracks.forEach((track) => {
    track.getAnimations().forEach((a) => { if (a.animationName === "marquee") a.playbackRate = 1 + Math.abs(velocity) / 6; });
    track.parentElement.style.transform = `skewX(${(-velocity / 6).toFixed(2)}deg)`;
  });
  if (Math.abs(velocity) > 0.1) requestAnimationFrame(decay);
  else { ticking = false; velocity = 0; }
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Page transition: shutter cut between pages ----------
const cut = document.createElement("div");
cut.className = "cutfx is-closed";
cut.setAttribute("aria-hidden", "true");
document.body.appendChild(cut);
requestAnimationFrame(() => requestAnimationFrame(() => cut.classList.remove("is-closed")));
setTimeout(() => cut.classList.remove("is-closed"), 600); // fallback if rAF is paused
addEventListener("pageshow", (e) => { if (e.persisted) cut.classList.remove("is-closed"); });
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href]");
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === "_blank") return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || !/\.html$/.test(url.pathname) || url.pathname === location.pathname) return;
  e.preventDefault();
  cut.classList.add("is-closed");
  setTimeout(() => (location.href = a.href), 480);
});
