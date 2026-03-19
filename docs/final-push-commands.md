# Final Push Commands

Chosen repository:

- GitHub repo: `https://github.com/thuanhuynh247/huong-nghiep-song-an-webapp.git`
- GitHub Pages URL: `https://thuanhuynh247.github.io/huong-nghiep-song-an-webapp/`

## If the GitHub repo does not exist yet

Create an empty repository named `huong-nghiep-song-an-webapp` under the `thuanhuynh247` account first.

Do not add README, `.gitignore`, or license during GitHub repo creation if you want the first push to stay simple.

## Final local commands

```powershell
git push -u origin main
```

## Current local state

- Branch: `main`
- Working tree: clean
- Latest launch commit already exists locally: `32c6979` (`Launch Huong Nghiep Song An webapp`)

## After pushing

1. Open the GitHub repository settings.
2. Confirm GitHub Pages uses GitHub Actions.
3. Wait for `.github/workflows/deploy-pages.yml` to finish.
4. Open the public site and verify:
   - home page loads
   - `privacy.html` loads
   - `robots.txt` loads
   - `sitemap.xml` loads
   - PWA install prompt appears on supported devices
