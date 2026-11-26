# Testing

`labs.test.ts` checks cipher reference examples, reversible transformations, keyword handling, incomplete transposition rows, letter statistics, repeated groups, and Kaṭapayādi conversion rules.

From the repository root:

```powershell
npm.cmd run setup
npm.cmd test
npm.cmd run lint
npm.cmd run build
```

The dependencies and lockfile are in `frontend/`. Root commands delegate to that package. Tests import the actual calculation functions from `frontend/src/lib/`.

Code-check settings remain beside the application in `frontend/.oxlintrc.json` and `frontend/tsconfig*.json` so the tools can discover them normally.

For a browser smoke check, run `npm.cmd run dev` and check each route, custom ciphertext selection, changing shifts, word-by-word decoding, and Kaṭapayādi input.
