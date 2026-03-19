# Webapp Publication Guide

This project is already a static PWA webapp and can be published directly without the Android wrapper.

## Current web-ready pieces

- Static app shell in `index.html`, `styles.css`, `script.js`
- Generated question bank in `assessment-data.js`
- Manifest and service worker for installable PWA behavior
- Existing GitHub Pages workflow in `.github/workflows/deploy-pages.yml`
- `.nojekyll` already present for GitHub Pages static hosting

## Fastest public release path

1. Push the repo to GitHub.
2. Keep the deployment branch as `main`.
3. In GitHub repo settings, enable Pages and choose GitHub Actions if prompted.
4. Push updates to `main`.
5. The workflow will publish the webapp automatically.

Current configured default URL in this repo:

- `https://thuanhuynh247.github.io/huong-nghiep-song-an-webapp/`

## Recommended follow-up before announcing publicly

1. Replace placeholder public URLs and social preview metadata when the final domain is ready.
2. Fastest way: run `python scripts/set_public_url.py https://your-real-public-domain/`
3. Add a real custom domain if you do not want to use the default GitHub Pages URL.
4. Test install behavior on Android Chrome and Safari iPhone.
5. Verify offline loading after the first successful visit.
6. Decide whether local-only history is enough or whether Stitch sync should be the next phase.

## Hosting options

- GitHub Pages: easiest because the repo already includes a deploy workflow.
- Netlify or Vercel: also works because the app is pure static hosting.
- Firebase Hosting: suitable if you later want tighter integration with backend services.

## Current release recommendation

Publish the webapp first, validate real user behavior and counselor feedback, then decide whether Android TWA and server-side sync should remain in the next release phase.
