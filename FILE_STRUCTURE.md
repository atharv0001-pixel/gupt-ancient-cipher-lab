# Project file structure

The repository is organised into five responsibility folders. Backend and database folders currently document future scope; the implemented application runs in the browser.

| Folder | Contents |
| --- | --- |
| `frontend/` | React application, browser calculations, styles, assets, and design references |
| `backend/` | Documentation of future backend scope; no server implemented |
| `database/` | Current local storage explanation; no database connected |
| `testing/` | Automated tests and testing instructions |
| `deployment/` | Deployment helper and hosting instructions |

## Frontend

`frontend/src/pages/` contains `HomePage.tsx`, `CipherLabPage.tsx`, `KatapayadiLabPage.tsx`, `CipherBreakingPage.tsx`, and `NotFoundPage.tsx`.

`frontend/src/components/Lab.tsx` supplies shared panels, the frequency display, and alphabet wheel. `Navigation.tsx` supplies navigation. `frontend/src/layouts/MainLayout.tsx` provides the shared layout. `main.tsx` starts React, while `App.tsx` connects routes. `App.css`, `index.css`, and `labs.css` define styling.

`frontend/src/lib/ciphers.ts` performs transformations and text analysis. `katapayadi.ts` handles supported syllables and number representations. These functions run in the browser and are not backend endpoints.

Source assets include `hero.png`, `react.svg`, and `vite.svg`. Public assets include `favicon.svg`, `gupt-seal.jpg`, `manuscript-study.jpg`, and `icons.svg`.

The original four design directories now live under `frontend/design-references/`:

- `ancient_intelligence_digital_future/`
- `gupt_ancient_cipher_laboratory_interactive_workbench/`
- `gupt_cipher_breaking_studio_cryptanalysis_frequency_lab/`
- `gupt_katapayadi_laboratory_indian_numerical_encoding/`

Their design document, HTML, and screenshots are reference material, separate from the running React application.

`frontend/index.html` is the HTML entry point. `package.json` and `package-lock.json` hold dependencies and scripts. `vite.config.ts`, `tsconfig*.json`, and `.oxlintrc.json` remain alongside the application for normal tool discovery. `Open GUPT.cmd` launches the local site on Windows. `frontend/README.md` explains application usage, and `frontend/.gitignore` excludes generated local files.

## Backend and database

No backend server, authentication service, database connection, or migration is implemented. The experiment notebook in `frontend/src/pages/CipherLabPage.tsx` stores up to twelve experiments in browser `localStorage`.

`backend/README.md` and `database/README.md` explain these boundaries and where future work belongs.

## Testing

Tests live in `testing/labs.test.ts` and import the actual functions from `frontend/src/lib/`. Run `npm test` at the repository root. `testing/README.md` documents automated and browser checks.

## Deployment

Deployment instructions and the Windows release helper live in `deployment/README.md` and `deployment/deploy.ps1`. Vercel uses the repository root and discovers `vercel.json` there. It installs dependencies in `frontend/`, builds that package, and publishes `frontend/dist`.

## Root files and generated files

The root `package.json` provides shortcuts that delegate to the frontend package. `vercel.json` stays at the root for hosting discovery. `README.md` introduces the project, `FILE_STRUCTURE.md` explains its layout, and `.gitignore` excludes local files.

The frontend dependency lockfile remains beside its package manifest. Ignored generated files such as `node_modules/`, `dist/`, and `.vercel/` are not committed.
