# Kiều Khánh Duy Anh · Portfolio

Static portfolio site for Kiều Khánh Duy Anh, Video Editor and Content Creator.

The layout and design tokens follow the Figma community file "Portfolio (Community)". Content comes from the CV and the portfolio PDF.

## Run locally

```bash
python3 -m http.server 4321
```

Then open http://localhost:4321.

## After editing text

Run this after changing `i18n.js` so the static HTML stays in sync:

```bash
node scripts/bake-seo.mjs
```

## Structure

- `index.html`, `skills.html`, `projects.html`: the 3 pages from the Figma file (Home, Skills, Projects)
- `i18n.js`: Vietnamese, English and Chinese text, plus project data. Pick a language with the switcher or `?lang=vi|en|zh`
- `main.js`: shared parts (top bar, dock, contact form, project dialog) and language switching. The contact form posts to FormSubmit (`formsubmit.co/ajax/<email>`). The first real message sends a one-time activation email to that address, which must be confirmed before messages are delivered. If the request fails, the form shows a `mailto:` link instead
- `anim.js`: shared animations (film-leader intro, scroll reveal, text scramble, hero word reveal and count-up, glitch, image wipes, scroll progress, scroll-speed marquees, page shutter transition, magnetic buttons, dock magnification)
- `home.js`: Home page interactions (hero timecode, word reveal, tools ticker, career timeline, card cursor)
- `skills.js`: Skills page interactions (tool orbit, count-up numbers, workflow steps, card spotlight)
- `styles.css`: design tokens on `:root` and component styles
- `assets/img/`: portrait and channel screenshots taken from the portfolio PDF
- `scripts/bake-seo.mjs`: writes the Vietnamese text, `<title>`, meta description and Open Graph tags into the HTML so crawlers see content without JavaScript
- `sitemap.xml`, `robots.txt`, `favicon.svg`, `assets/img/og.jpg` (1200x630 share image)
- `assets/icons/`: brand logos from Simple Icons, recolored with each brand color
