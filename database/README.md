# Database and storage

There is no connected database, schema, or migration in the current project. Firebase and Supabase are not configured.

The experiment notebook uses browser `localStorage` in [`CipherLabPage.tsx`](../frontend/src/pages/CipherLabPage.tsx) and keeps up to twelve experiments. This data is local to the browser and website origin; clearing browser data can remove it.

Future database schemas and migrations should live here when account-based storage is implemented. This folder currently documents the storage arrangement only.
