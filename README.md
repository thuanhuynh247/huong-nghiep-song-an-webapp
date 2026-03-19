# Huong Nghiep Song An

Web-first PWA for career assessment and counseling workflows.

This MVP already includes six assessment packages generated from the provided PDF manuals:

- Holland 16-22
- Holland 23+
- Grit Scale
- MIPQ
- CED THPT
- CED DH/CD

## What is in this repo

- `index.html`, `styles.css`, `script.js`: mobile-first assessment app shell
- `assessment-data.js`: generated assessment catalog and question bank
- `scripts/build_assessment_data.py`: PDF-to-JS ingestion pipeline
- `docs/manual-ingestion-summary.md`: generated import summary
- `manifest.webmanifest`, `sw.js`, `app-icon.svg`: PWA assets for the public webapp release
- `docs/webapp-publication.md`: guide to publish the current app as a public webapp
- `docs/official-launch-checklist.md`: preflight checklist for the first official launch
- `docs/official-launch-package.md`: intro copy, repo description, public announcement and final push prep
- `docs/final-push-commands.md`: exact final git commands for the chosen production repo
- `android-twa/`: Android Trusted Web Activity wrapper for Play Store packaging
- `stitch.mcp.example.toml`: safe Stitch MCP template without secrets

## Run locally

Open `index.html` in a browser, or serve the folder with any static server.

For the best PWA behavior, use a local static server instead of opening the file directly.

## Publish as a webapp

The fastest path is GitHub Pages. The repo already includes `.github/workflows/deploy-pages.yml`.
That workflow now publishes only the actual webapp assets instead of the full repo contents.

See `docs/webapp-publication.md` for the publication flow.

## Regenerate assessment data

Run:

```powershell
python scripts/build_assessment_data.py
```

This rebuilds:

- `assessment-data.js`
- `docs/manual-ingestion-summary.md`

## Stitch MCP

See `docs/stitch-mcp-setup.md`.

The repo keeps only a template config. Use `stitch.mcp.local.toml` for the real API key and keep it out of git.

## Release direction

Current release path:

1. Publish the webapp first.
2. Validate question flow, scoring, and counselor feedback.
3. Add Stitch-backed sync, history, and auth when the MCP runtime is available.
4. Package later as TWA or another native wrapper if Play Store distribution is needed.
