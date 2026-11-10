// Writes the Vietnamese copy from i18n.js into the static HTML (text, <title>, meta, Open Graph)
// so crawlers and link previews see real content before JavaScript runs.
// Run after editing i18n.js:  node scripts/bake-seo.mjs
import { readFileSync, writeFileSync } from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const ctx = {};
vm.runInNewContext(`${readFileSync(new URL("i18n.js", root), "utf8")}\nthis.I18N = I18N;`, ctx);
const vi = ctx.I18N.vi;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

for (const file of ["index.html", "projects.html", "skills.html"]) {
  const url = new URL(file, root);
  let html = readFileSync(url, "utf8");
  const titleKey = html.match(/data-title="([^"]+)"/)?.[1] || "meta.title";
  const descKey = html.match(/data-desc="([^"]+)"/)?.[1] || "meta.desc";
  const title = esc(vi[titleKey]);
  const desc = esc(vi[descKey]);
  html = html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${desc}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${desc}`)
    .replace(/(<(\w+)\b[^>]*\sdata-i18n="([^"]+)"[^>]*>)[^<]*(<\/\2>)/g, (m, open, tag, key, close) =>
      key in vi ? `${open}${esc(vi[key])}${close}` : m)
    .replace(/(<(\w+)\b[^>]*\sdata-i18n-html="([^"]+)"[^>]*>)[\s\S]*?(<\/\2>)/g, (m, open, tag, key, close) =>
      key in vi ? `${open}${vi[key]}${close}` : m);
  writeFileSync(url, html);
  console.log(`baked ${file}`);
}
