# Scientific integrity notes

## Candidate coordinates

Candidate detection still preserves the integer local-extremum coordinates `x` and `y` for traceability. It now independently estimates a signed-residual centroid in a 3×3 neighbourhood, stores `centroidX`, `centroidY`, and `centroidUncertaintyPixels`, and evaluates RA/Dec using that centroid with the supplied WCS. If the local weights are unusable, the documented fallback is the integer peak with one-pixel centroid uncertainty.

## Motion classification

An opposite-sign residual is not automatically a moving object. Motion labeling now requires both lobes to be independently classified as clean candidates, have artifact scores below the existing artifact boundary, have integrated aperture significance at least 3.5σ, and have point-like morphology. Weak stationary PSF residuals, flagged lobes, low-aperture detections, and ambiguous morphology remain flux/artifact/insufficient-evidence interpretations.

This is still a candidate interpretation from a difference pair, not a discovery claim. The UI must continue to expose the observation cadence, WCS registration, quality flags, and the need for independent observations.

## Preserved calculations

The existing code path remains responsible for difference = epoch 2 − epoch 1, documented independent-error variance propagation, squared interpolation weights for resampled variance, DQ propagation, real WCS transforms, and FITS metadata/provenance. No synthetic educational value is passed into these functions.
