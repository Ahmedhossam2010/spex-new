# SPEX transformation TODO

## Real science preservation and integrity

- Preserve real FITS ingestion, metadata, WCS transformations, reprojection, difference = epoch 2 − epoch 1, variance propagation, DQ flags, catalog provenance, and release labels.
- Preserve integer candidate peak coordinates while retaining independently calculated subpixel centroids and uncertainty; use the appropriate WCS for the candidate coordinate.
- Do not label a weak stationary residual, dipole, PSF residual, or significant flux change as a moving object without clean, integrated, displacement-consistent evidence.
- Keep `DEVELOPMENT_BENCHMARK` and `OFFICIAL_CHALLENGE_RELEASE` distinct and never silently fall back from official data to benchmark data.

## Product and education

- Make the product understandable within 10–15 seconds with a clear Home, Explore, Learn, Cases, and About journey.
- Implement two complete educational levels, visible synthetic-data labeling, keyboard/touch interaction, feedback, replay, completion summary, and a path into real exploration.
- Keep educational data isolated from the real science pipeline, provenance, and investigation history.

## Quality and documentation

- Support dark and light themes, responsive layouts, focus indicators, accessible labels, and reduced motion.
- Execute available type checks, tests, and production build; distinguish passed, failed, not run, and blocked checks.
- Maintain the architecture, redesign, scientific-integrity, game, QA, and release-readiness documents.
