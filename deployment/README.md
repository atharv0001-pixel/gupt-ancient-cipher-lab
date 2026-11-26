# Deployment

Production: https://gupt-ancient-cipher-lab.vercel.app

The application is built from `frontend/`. Vercel must use the **repository root** as its Root Directory. The root [`vercel.json`](../vercel.json) is kept there for Vercel discovery and specifies:

- Install: `npm --prefix frontend ci --include=optional`
- Build: `npm --prefix frontend run build`
- Output: `frontend/dist`
- Page rewrites to `index.html` for client-side navigation

Do not configure `app/` as the root; that folder was renamed to `frontend/`.

## Manual deployment on Windows

Install dependencies first with `npm.cmd run setup` at the repository root. With the Vercel CLI available and signed into the correct workspace, run:

```powershell
.\deployment\deploy.ps1
```

This runs checks and creates a preview deployment. To intentionally publish to production:

```powershell
.\deployment\deploy.ps1 -Production
```

The script verifies the existing local project link before deploying. If the repository is not linked, first use `vercel link` from the repository root and select the existing `gupt-ancient-cipher-lab` project in the `atharvghodke` workspace.

Credentials and `.vercel/` remain excluded from Git. The source remains browser-only; hosting does not add backend endpoints or database storage.
