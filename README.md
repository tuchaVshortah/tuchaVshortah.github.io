# nurkanatb.kz

Source for [www.nurkanatb.kz](https://www.nurkanatb.kz) — the personal site of **Nurkanat Baisenkul**, a Platform, Solutions & Security Engineer.

The site is two projects built together and deployed to GitHub Pages:

| Path | Stack | Served at |
|------|-------|-----------|
| `portfolio/` | Next.js (static export) | `/` — landing page |
| `blog/` | Hugo (PaperMod theme) | `/blog` — blog & articles |

## Résumé

The résumé is **not** stored in this repo. It is built and released by
[`tuchaVshortah/resume`](https://github.com/tuchaVshortah/resume), and CI pulls the latest
release asset into `portfolio/public/resume.pdf` at build time, so the site serves it at
[`/resume.pdf`](https://www.nurkanatb.kz/resume.pdf) and can never go stale.

That repo is private, so the fetch needs a repository secret:

| Secret | Value |
|--------|-------|
| `RESUME_REPO_TOKEN` | Fine-grained PAT with **contents: read** on `tuchaVshortah/resume` |

Without it the deploy fails loudly rather than publishing a site whose Résumé button 404s.
`portfolio/public/resume.pdf` is git-ignored — committing a copy would reintroduce the drift
this setup exists to prevent.

## Local development

**Portfolio**
```bash
cd portfolio
npm install
npm run build   # static export to portfolio/out
```

`/resume.pdf` will 404 locally unless you drop a copy at `portfolio/public/resume.pdf`
(git-ignored). Grab one from the résumé repo's latest release:

```bash
gh release download --repo tuchaVshortah/resume \
  --pattern resume.pdf --output portfolio/public/resume.pdf
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
