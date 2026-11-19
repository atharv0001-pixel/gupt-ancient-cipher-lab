# GUPT — Ancient Indian Cipher Lab

[Open the live site](https://gupt-ancient-cipher-lab.vercel.app)

GUPT is an Indian Knowledge Systems learning project with three interactive laboratories. Explore five classroom ciphers, convert Sanskrit syllables to numbers with Kaṭapayādi notation, and analyse patterns in encoded messages.

## Run locally

Install Node.js 24 and run these commands from the repository root.

```sh
cd app
npm ci
npm run dev
```

Run `npm test` for the laboratory checks and `npm run build` to create a production build. On Windows, you can also use the launcher in the app folder after installing dependencies. See the [app guide](app/README.md) for details.

## Project files

- [React application, tests and deployment configuration](app/)
- [Stitch design guide](ancient_intelligence_digital_future/DESIGN.md)
- [Original Cipher Laboratory design](gupt_ancient_cipher_laboratory_interactive_workbench/)
- [Original Kaṭapayādi Laboratory design](gupt_katapayadi_laboratory_indian_numerical_encoding/)
- [Original Cipher Breaking Studio design](gupt_cipher_breaking_studio_cryptanalysis_frequency_lab/)

The Vercel project uses `app` as the application folder when deploying from this repository.
