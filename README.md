# Portfolio

My personal site: https://anirudhraj-sharma.github.io/portfolio/

It is a single-page static site: three featured case studies with figures, an archive of smaller projects, then experience, skills, education, and contact details.

## Stack

- Next.js 16 (App Router) with `output: "export"`, so the build is plain HTML, CSS and JS
- React 19, TypeScript, Tailwind CSS 4
- No animation library: scroll reveals use `IntersectionObserver` and CSS transitions
- Geist and Geist Mono, self-hosted at build time through `next/font`
- `lucide-react` for the few interface icons

There are no analytics, trackers, or third-party requests at runtime.

## Where the content lives

All copy and every number are in [`src/data/profile.ts`](src/data/profile.ts), including the data behind the figures, so a bar and its label read the same value; the build fails if they disagree. Components hold only accessibility phrases and control labels. When a number changes, update the source first and then this file.

## Local development

You need Node 24 (see `.nvmrc`).

```bash
npm ci --ignore-scripts
npm run dev        # http://localhost:3000/portfolio
```

The site is served under `/portfolio`, the same path GitHub Pages uses, so the dev server does the same.

## Build and preview

```bash
npm run build      # next build, then scripts/csp.mjs
npm run preview    # serves out/ at http://127.0.0.1:4173/portfolio/
npm run lint
```

`npm run build` writes the static site to `out/`. `scripts/csp.mjs` then adds a Content Security Policy to every HTML file (see below). It fails the build if it finds no HTML to process, meets an inline script type it does not know, or finds anything loaded before the policy.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which verifies registry signatures, audits dependencies, lints, builds, and publishes `out/` to GitHub Pages. In the repository settings, the Pages source must be set to "GitHub Actions". The workflow can also be started by hand from the Actions tab; only a run on `main` publishes.

`.github/workflows/ci.yml` runs the same checks on pull requests and once a week.

## Security notes

GitHub Pages cannot send custom response headers, so the protections that live in headers are not available here. What the site does instead:

- **Content Security Policy in a `<meta>` tag.** `scripts/csp.mjs` runs after the build. It hashes every inline script, inline style element and `style=""` attribute in each page and writes a policy that allows only scripts and styles from the site itself plus those exact hashes. Next.js inlines a few scripts whose text changes on every build, which is why the hashes are computed after the build instead of being written by hand. The same step adds a `strict-origin-when-cross-origin` referrer policy.
- **What a meta policy cannot do.** `frame-ancestors`, `report-uri` and `sandbox` are ignored in a meta tag, and `X-Content-Type-Options` and `Permissions-Policy` cannot be set at all. This site does not protect against being framed. Fixing that needs a host that can send headers.
- **No third-party code.** Fonts, icons and scripts are bundled. Links that leave the site use `rel="noopener noreferrer"`.
- **Structured data** is built from static data with `<` escaped, and it is the only place `dangerouslySetInnerHTML` is used.
- **Dependencies** are pinned to exact versions. Every CI and deploy run verifies their registry signatures (`npm audit signatures`) and runs `npm audit`. Dependabot opens weekly update pull requests for npm packages and GitHub Actions. Workflow actions are pinned to full commit SHAs and run with the minimum token permissions each job needs.

To report a problem, see [SECURITY.md](SECURITY.md).

## Layout

```
src/app/          layout, page, metadata, sitemap, icons, 404
src/components/   page sections, figures, and small client islands (header, theme toggle, reveals)
src/data/         profile.ts, the site content
src/lib/          small helpers
scripts/          csp.mjs (post-build CSP) and preview.mjs (local preview)
public/           og.png, the social preview image
```

Only the pieces that need the browser are client components: the header, the theme toggle, the scroll reveals, and the copy-email button. Everything else, including the figures, is rendered to static HTML at build time.

## Theme and motion

The site follows the system light or dark setting. The toggle in the header saves an override in `localStorage`, and a small inline script applies it before first paint so the page does not flash the wrong theme. Animations respect `prefers-reduced-motion`. The content is complete without JavaScript, and if the scripts have not run within three seconds, the page shows everything without the reveal animations.
