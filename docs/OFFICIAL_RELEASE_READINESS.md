# Official release readiness

The date November 13, 2026 is treated as a project planning date, not a verified external guarantee. QR2 remains `DEVELOPMENT_BENCHMARK`; it is not silently renamed as the official challenge release.

On release day, run the existing release validator against the actual supplied files. Inspect every FITS HDU and verify IMAGE, VARIANCE, FLAGS, WCS, observation identifiers, timestamps, spectral metadata, quality metadata, coverage, missing fields, duplicates, and visit relationships. Confirm the resulting `ReleaseValidationReport` before enabling `OFFICIAL_CHALLENGE_RELEASE` for that data source.

If official ingestion fails or required fields are incompatible, show an explicit incompatible/no-data state. Do not substitute QR2 benchmark files while retaining official-release language. Record the release identifier, checksums, files inspected, and unresolved issues in the release report.
