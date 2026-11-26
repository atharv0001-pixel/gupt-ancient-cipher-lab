# GUPT · Ancient Indian Cipher Lab

A local React and TypeScript learning site based on three Stitch laboratory designs.

## Open on Windows

Double-click **Open GUPT.cmd** in this folder. It starts the app on this computer and opens a browser. Keep the terminal open while using the site. Close it to stop the server.

For a fresh copy, install Node.js 24 and run the following in this folder.

```powershell
npm.cmd ci --include=optional
npm.cmd run dev
```

## Laboratories

- **Cipher Laboratory** at `/cipher-lab` supports five reversible methods, live alphabet mappings, frequency counts and a notebook for up to twelve experiments. Its notebook is stored in the current browser for the site's address.
- **Kaṭapayādi Numerical Laboratory** at `/katapayadi-lab` converts Sanskrit Devanagari text using the displayed Kerala convention and explores candidate syllables for a numeric string.
- **Cipher Breaking Studio** at `/cipher-breaking` provides a ciphertext editor, letter counts, repeated groups, coincidence index, all Caesar readings and a manual substitution board.

## Try the laboratories

1. Open **Cipher Lab**, enter `HELLO` and select a Caesar shift of 3. The result is `KHOOR`. **Reverse operation** recovers the original message.
2. Choose **Inspect in Breaking Studio** to carry the ciphertext across. Expand **Compare all 26 shifts** and find the row that reads `HELLO`.
3. Open **Kaṭapayādi** and enter `कवि`. The written digits are `1, 4`. Reading them from right to left gives `41`.

## Production deployment

The production site is [GUPT on Vercel](https://gupt-ancient-cipher-lab.vercel.app). Edit the source in this folder. Deploy from the repository root using the instructions in [deployment/README.md](../deployment/README.md); the Vercel configuration builds `frontend/` and serves `frontend/dist`.

## Local checks

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
npm.cmd run preview
```

The cipher operations are classroom demonstrations. The Kaṭapayādi rules and the historical note link to their sources within the laboratories. The seal and illustrative manuscript image come from the supplied Stitch designs.
