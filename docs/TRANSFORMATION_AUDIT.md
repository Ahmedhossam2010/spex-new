# SPEX transformation audit

## Verified architecture

SPEX is a React 19 + TypeScript + Vite client hosted by an Express/tsx server. `src/main.tsx` mounts `src/App.tsx`, which owns navigation, theme, language, API loading, and the current `InvestigationResult`. Existing views are `HomeView`, `ExploreView`, `CasesView`, and `AboutView`; `MissionGame` is now an isolated educational view selected from the shell.

The server exposes curated cases, TAP/coverage/spectral metadata, release validation, SPEX chat, and `/api/spherex/process`. The latter downloads/caches FITS cutouts, parses FITS multi-extension data, invokes `ScientificPipeline.processDifference`, cross-matches candidates, and serializes provenance, dataset source, WCS, difference, significance, and candidate data.

The science engine consists of `fitsReader.ts` (FITS image/variance/flags/WCS parsing), `wcs.ts` (TAN/TAN-SIP transforms and reprojection grids), `pipeline.ts` (compatibility, reprojection, difference = epoch 2 − epoch 1, variance/DQ propagation, photometry, candidate extraction, evidence), `catalogMatcher.ts`, and `dataReleaseAdapter.ts`. The existing test suite is concentrated in `src/science/science.test.ts` and also covers rendering and bilingual translations.

## What works and must be preserved

- Real FITS ingestion and metadata/provenance flow.
- TAN-SIP WCS forward/inverse transforms and pixel-by-pixel reprojection.
- Difference, significance, variance, and DQ calculations.
- Dataset labels `DEVELOPMENT_BENCHMARK` and `OFFICIAL_CHALLENGE_RELEASE` in the result model.
- Existing Explore canvas and candidate-detail workflows.
- Arabic/English direction and theme persistence.
- Existing SPEX mascot assets and assistant behavior.

## Verified risks and limitations

- The QR2 benchmark exposures are documented as one visit; they are not a verified multi-month baseline.
- The server's custom-search release labeling and cache fallback require additional release-day safeguards before custom results are described as official data.
- Missing native variance can be estimated; UI copy must preserve that qualification.
- Significance values and artifact scores are evidence fields, not calibrated probabilities.
- Several existing audit claims refer to FITS files in an ephemeral cache that is not shipped in this repository.

## Safe redesign boundary

The redesign is implemented around the science engine. New education content is isolated under `src/education` and never sent to `/api/spherex/process`. Existing scientific components remain in place and continue to consume real result objects.
