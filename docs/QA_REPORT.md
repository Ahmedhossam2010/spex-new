# QA report

This report is intentionally updated from executed commands rather than claims.

| Check | Status | Evidence |
|---|---|---|
| Baseline dependency install | Passed with explicit compatibility flag | npm peer conflict between Vite 8 and esbuild 0.25; dependencies installed with `npm install --legacy-peer-deps`. |
| TypeScript | Passed | `npm run lint` completed with no diagnostics. |
| Unit tests | Passed with 47 passing and 3 skipped | `npm test`: 50 tests total; the three skipped checks require physical FITS files absent from this upload. |
| Production build | Passed with warning | `npm run build` produced `dist` and bundled `server.js`; Vite emitted an existing `__dirname` config-loader warning. |
| Browser visual inspection | Not run in the uploaded-repository sandbox | Requires a bound Webdev preview/browser. |
| External scientific validation | Not run | No Astropy/WCSLIB validation is claimed. |

The absence of browser inspection is a known delivery limitation, not a passing result.
