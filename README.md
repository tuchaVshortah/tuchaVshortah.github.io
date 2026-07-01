# nurkanatb.kz

Source for [www.nurkanatb.kz](https://www.nurkanatb.kz) — the personal site of **Nurkanat Baisenkul**, a Platform, Solutions & Security Engineer.

The site is two projects built together and deployed to GitHub Pages:

| Path | Stack | Served at |
|------|-------|-----------|
| `portfolio/` | Next.js (static export) | `/` — landing page |
| `blog/` | Hugo (PaperMod theme) | `/blog` — blog & articles |

## Local development

**Portfolio**
```bash
cd portfolio
npm install
npm run build   # static export to portfolio/out
```

**Blog**
```bash
cd blog
git submodule update --init --recursive   # pulls the theme
hugo server                               # local preview
```

## Deployment

Pushing to `main` triggers [`.github/workflows/ci.yaml`](.github/workflows/ci.yaml), which
builds the Next.js portfolio and the Hugo blog and publishes the combined output to GitHub Pages.
