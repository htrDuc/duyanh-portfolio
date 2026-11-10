# Kiều Khánh Duy Anh · Portfolio

Static portfolio site for Kiều Khánh Duy Anh, Video Editor and Content Creator.

The layout and design tokens follow the Figma community file "Portfolio (Community)". Content comes from the CV and the portfolio PDF.

## Run locally

```bash
python3 -m http.server 4321
```

Then open http://localhost:4321.

## Structure

- `index.html`, `skills.html`, `projects.html`: the 3 pages from the Figma file (Home, Skills, Projects)
- `i18n.js`: Vietnamese, English and Chinese text, plus project data. Pick a language with the switcher or `?lang=vi|en|zh`
- `main.js`: shared parts (top bar, dock, contact, footer, project dialog) and language switching
- `styles.css`: design tokens on `:root` and component styles
- `assets/img/`: portrait and channel screenshots taken from the portfolio PDF
