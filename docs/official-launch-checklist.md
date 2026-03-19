# Official Launch Checklist

Use this checklist for the first public webapp release.

## Product

- Confirm the six active assessments and question counts are correct.
- Verify scoring behavior on at least one full run for Holland, Grit, MIPQ, and CED.
- Check install prompt behavior on Android Chrome.
- Check local export and clear-data flows.

## Public pages

- Open `index.html`, `privacy.html`, and `404.html`.
- Confirm the footer links work.
- Confirm `robots.txt` and `sitemap.xml` are reachable after deploy.
- Confirm social preview image is accessible after deploy.

## Hosting

- Run `python scripts/set_public_url.py https://your-real-public-domain/`
- Push to the production repository.
- Confirm GitHub Pages workflow completes successfully.
- Open the deployed site on desktop and mobile.
- Test reload/offline behavior after first successful visit.
- Confirm the current public URL matches the metadata and sitemap after the script runs.

## Content

- Replace any placeholder domain references when the final domain is ready.
- Review public copy and naming one more time before announcement.
- Decide the launch message and the official sharing channels.

## Privacy and trust

- Review `privacy.html` with the team before launch.
- Confirm the app does not claim server-side sync unless it really exists.
- Confirm local-data controls are easy to find in the footer.

## Post-launch

- Watch early user feedback for confusing questions or scoring explanations.
- Decide whether the next release should add Stitch-based sync and accounts.
