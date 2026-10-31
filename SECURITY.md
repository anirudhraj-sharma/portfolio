# Security

This repository is a static personal site. It has no server, no database, no accounts, and no forms.

## Reporting a problem

If you find a vulnerability in the site or in how it is built and deployed, please email rajsharmaanirudh@gmail.com instead of opening a public issue. Include the page or file involved and the steps to reproduce it. I will reply as soon as I can and credit you if you want that.

## Scope

- The deployed site at https://anirudhraj-sharma.github.io/portfolio/
- The code and workflows in this repository

Issues in GitHub Pages itself, or in packages this project depends on, are best reported to those projects. If a dependency problem affects this site, tell me and I will update it.

## Known limits

GitHub Pages cannot send custom response headers. The site sets a Content Security Policy and a referrer policy in `<meta>` tags, but protections such as `frame-ancestors`, `X-Content-Type-Options` and `Permissions-Policy` are not available. The README explains this in more detail.
