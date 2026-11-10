// Shared page parts (topbar, dock, contact, dialog) live here so the 3 pages stay in sync.
const EMAIL = "duyanhkieu20092003@gmail.com";
const PHONE = "0888 695 854";

const ICON = {
  arrowRight: `<svg class="icon-circle" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="17" stroke="currentColor" stroke-width="2"/><path d="M16 24h16m-6-6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none"><path d="M7.5 17.06h9M11.3 3.21 3.5 8.49A1.3 1.3 0 0 0 3 9.42v9.87C3 20.23 3.8 21 4.8 21h14.4c1 0 1.8-.77 1.8-1.71V9.42c0-.37-.19-.72-.5-.93L12.7 3.21a1.3 1.3 0 0 0-1.4 0Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="none"><rect x="1.5" y="3.5" width="21" height="17" rx="4" stroke="currentColor" stroke-width="1.5"/><path d="m10 9 5 3-5 3V9Z" fill="currentColor"/></svg>`,
  cube: `<svg viewBox="0 0 24 24" fill="none"><path d="M2 9V7c0-3 2-5 5-5h10c3 0 5 2 5 5v2M2 15v2c0 3 2 5 5 5h10c3 0 5-2 5-5v-2M6.7 9.26 12 12.33l5.26-3.05M12 17.77v-5.45m-1.24-6.03-3.2 1.78c-.72.4-1.32 1.41-1.32 2.24v3.39c0 .83.59 1.84 1.32 2.24l3.2 1.78c.68.38 1.8.38 2.49 0l3.2-1.78c.72-.4 1.32-1.41 1.32-2.24v-3.39c0-.83-.59-1.84-1.32-2.24l-3.2-1.78c-.69-.39-1.81-.39-2.49 0Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none"><rect x="2.5" y="4.5" width="19" height="15" rx="3" stroke="currentColor" stroke-width="1.5"/><path d="m3.5 6.5 8.5 6 8.5-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  external: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.25" stroke="currentColor" stroke-width="1.5"/><path d="M8.7 14.34 15 9m-5.8.19 5.6-.47.47 5.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

const PARTIALS = {
  topbar: () => `
    <div class="topbar__left">
      <a class="topbar__brand" href="index.html">@ Edit by Duy Anh</a>
      <div class="lang" role="group" aria-label="Language">
        ${Object.entries(LANGS).map(([code, label]) => `<button type="button" data-lang="${code}">${label}</button>`).join("")}
      </div>
    </div>
    <p class="topbar__tagline" data-i18n="top.tagline"></p>`,

  dock: () => `
    <a href="index.html" class="dock__btn" data-page-link="home" data-i18n-aria="nav.home">${ICON.home}</a>
    <a href="projects.html" class="dock__btn" data-page-link="projects" data-i18n-aria="nav.projects">${ICON.play}</a>
    <a href="skills.html" class="dock__btn" data-page-link="skills" data-i18n-aria="nav.skills">${ICON.cube}</a>
    <a href="#contact" class="dock__btn" data-i18n-aria="nav.contact">${ICON.mail}</a>
    <a href="mailto:${EMAIL}" class="dock__btn" data-i18n-aria="nav.email">${ICON.external}</a>`,

  contact: () => `
    <div class="contact__head">
      <p class="mono" data-i18n="contact.mono"></p>
      <h2 class="contact__title" data-i18n-html="contact.title"></h2>
    </div>
    <div class="contact__rule">
      <a class="cta-circle" href="mailto:${EMAIL}" data-i18n="contact.cta"></a>
    </div>
    <dl class="contact__info">
      <div><dt data-i18n="contact.email"></dt><dd><a href="mailto:${EMAIL}">${EMAIL}</a></dd></div>
      <div><dt data-i18n="contact.phone"></dt><dd><a href="tel:+84888695854">${PHONE}</a></dd></div>
      <div><dt data-i18n="contact.location"></dt><dd data-i18n="contact.city"></dd></div>
    </dl>`,


  lightbox: () => `
    <form method="dialog"><button class="lightbox__close" data-i18n-aria="lightbox.close">×</button></form>
    <div class="lightbox__body"></div>`,
};

document.querySelectorAll("[data-partial]").forEach((el) => {
  el.innerHTML = PARTIALS[el.dataset.partial]();
});

const page = document.body.dataset.page;
document.querySelectorAll(`[data-page-link="${page}"]`).forEach((a) => a.classList.add("is-active"));

// ---------- Works grid ----------
function workCard(p, lang) {
  const c = p[lang];
  const mediaClass = ["work__media", p.phone && "work__media--phone", p.light && "work__media--light"].filter(Boolean).join(" ");
  return `
    <button type="button" class="work" data-project="${p.id}">
      <span class="${mediaClass}"><img src="assets/img/${p.cover}.jpg" alt="${c.title}"></span>
      <span class="work__title">${ICON.arrowRight}${c.title}</span>
      <span class="work__meta">${c.meta}</span>
    </button>`;
}

function renderWorks(lang) {
  document.querySelectorAll("[data-works]").forEach((grid) => {
    grid.innerHTML = PROJECTS.map((p) => workCard(p, lang)).join("");
  });
}

// ---------- Project dialog ----------
const lightbox = document.querySelector(".lightbox");

function openProject(id) {
  const lang = getLang();
  const p = PROJECTS.find((x) => x.id === id);
  const c = p[lang];
  const sub = [c.role, p.date && p.date[lang]].filter(Boolean).join(" · ");
  lightbox.querySelector(".lightbox__body").innerHTML = `
    <h3 class="lightbox__title">${c.title}</h3>
    <p class="lightbox__sub">${sub}</p>
    <div class="lightbox__info">
      <ul class="job__list">${c.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
      ${c.stats.length ? `<ul class="job__stats">${c.stats.map(([v, l]) => `<li><strong>${v}</strong><span>${l}</span></li>`).join("")}</ul>` : ""}
    </div>
    ${p.evidence.length ? `
      <h4 class="lightbox__label">${t("evidence.title", lang)}</h4>
      <div class="lightbox__grid">${p.evidence.map((ev) => `
        <figure>
          <img src="assets/img/${ev.img}.jpg" alt="${ev.cap[lang]}">
          <figcaption>${ev.cap[lang]}<span>${t("evidence.source", lang).replace("{page}", ev.page)}</span></figcaption>
        </figure>`).join("")}</div>` : ""}`;
  lightbox.showModal();
  lightbox.scrollTop = 0;
}

document.addEventListener("click", (e) => {
  const card = e.target.closest("[data-project]");
  if (card) openProject(card.dataset.project);
  const langBtn = e.target.closest("[data-lang]");
  if (langBtn) setLang(langBtn.dataset.lang);
});

lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.close();
});

// ---------- Language ----------
function applyLang(lang) {
  document.documentElement.lang = HTML_LANG[lang];
  document.title = t(document.body.dataset.title || "meta.title", lang);
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n, lang)));
  document.querySelectorAll("[data-i18n-html]").forEach((el) => (el.innerHTML = t(el.dataset.i18nHtml, lang)));
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nAria, lang)));
  document.querySelectorAll("[data-i18n-tip]").forEach((el) => (el.dataset.tip = t(el.dataset.i18nTip, lang)));
  document.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  renderWorks(lang);
  document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
}

function setLang(lang) {
  try { localStorage.setItem(LANG_KEY, lang); } catch {}
  const url = new URL(location.href);
  url.searchParams.set("lang", lang);
  history.replaceState(null, "", url);
  applyLang(lang);
}

applyLang(getLang());

// Keep ?lang= on internal page links so the choice survives navigation even without storage.
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href$='.html'], a[href*='.html#']");
  if (!a) return;
  const url = new URL(a.href);
  url.searchParams.set("lang", getLang());
  a.href = url.toString();
});
