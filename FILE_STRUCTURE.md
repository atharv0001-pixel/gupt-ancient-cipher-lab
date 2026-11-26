# Project file structure

GUPT currently runs its interface and calculations in the browser. There is no separate application backend or database. This guide groups the tracked files by responsibility without changing their locations.

## Frontend

Paths in this section are relative to `app/`.

| Files | Responsibility |
| --- | --- |
| `index.html` | HTML entry page |
| `src/main.tsx` | Starts the React application |
| `src/App.tsx` | Application routes |
| `src/layouts/MainLayout.tsx` | Shared page layout |
| `src/components/Navigation.tsx` | Navigation |
| `src/components/Lab.tsx` | Shared panels, frequency display, and alphabet wheel |
| `src/pages/HomePage.tsx` | Overview page |
| `src/pages/CipherLabPage.tsx` | Cipher controls, custom messages, mapping tables, and experiment notebook |
| `src/pages/KatapayadiLabPage.tsx` | Kaṭapayādi conversion interface |
| `src/pages/CipherBreakingPage.tsx` | Cipher analysis, decoding controls, and word-by-word table |
| `src/pages/NotFoundPage.tsx` | Unknown-route page |
| `src/App.css`, `src/index.css`, `src/labs.css` | Styles and layouts |
| `src/lib/ciphers.ts` | Browser-based cipher transformations and text analysis |
| `src/lib/katapayadi.ts` | Browser-based Kaṭapayādi parsing and consonant choices |
| `src/assets/hero.png` | Image asset |
| `src/assets/react.svg`, `src/assets/vite.svg` | Framework logo assets |
| `public/favicon.svg` | Browser-tab icon |
| `public/gupt-seal.jpg`, `public/manuscript-study.jpg`, `public/icons.svg` | Public images and icons |

## Backend

There are no implemented server endpoints or separate backend server files. The functions in `app/src/lib/` run in the browser. Node.js is used for development, builds, and tests; it is not an application server in the current deployment.

## Database and storage

There are no database schemas, migrations, or database connection files. Firebase and Supabase are not connected.

`app/src/pages/CipherLabPage.tsx` saves and restores up to twelve experiments using browser `localStorage`. Entries remain associated with that browser and website origin; this is not cross-device cloud storage.

## Testing and code checks

| Files | Responsibility |
| --- | --- |
| `app/tests/labs.test.ts` | Automated checks for reference examples, round trips, text analysis, and Kaṭapayādi rules |
| `app/.oxlintrc.json` | Code-quality check configuration |
| `app/tsconfig.json` | Main TypeScript configuration |
| `app/tsconfig.app.json` | Application type-checking configuration |
| `app/tsconfig.node.json` | Tooling type-checking configuration |

From `app/`, use `npm test` for automated tests, `npm run lint` for code checks, and `npm run build` for type checking and a production build.

## Deployment and development setup

| Files | Responsibility |
| --- | --- |
| `app/vercel.json` | Vercel settings and page-routing rewrites |
| `app/vite.config.ts` | Development and build configuration |
| `app/package.json` | Dependencies and development, build, test, lint, and preview commands |
| `app/package-lock.json` | Dependency lockfile |
| `app/Open GUPT.cmd` | Windows launcher script |
| `.gitignore`, `app/.gitignore` | Git exclusions |

## Documentation and design references

| Files | Responsibility |
| --- | --- |
| `README.md` | Project introduction and website link |
| `FILE_STRUCTURE.md` | This file classification guide |
| `app/README.md` | Application documentation |
| `ancient_intelligence_digital_future/DESIGN.md` | Design documentation |
| `gupt_ancient_cipher_laboratory_interactive_workbench/code.html`, `gupt_ancient_cipher_laboratory_interactive_workbench/screen.png` | Cipher Lab design reference |
| `gupt_cipher_breaking_studio_cryptanalysis_frequency_lab/code.html`, `gupt_cipher_breaking_studio_cryptanalysis_frequency_lab/screen.png` | Breaking Studio design reference |
| `gupt_katapayadi_laboratory_indian_numerical_encoding/code.html`, `gupt_katapayadi_laboratory_indian_numerical_encoding/screen.png` | Kaṭapayādi Lab design reference |

The reference HTML and screenshots are separate from the running React application.
