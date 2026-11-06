export const EDUCATIONAL_SYNTHETIC_DATA = 'Educational simulation — not actual SPHEREx observational data.';

export type MissionChoice = {
  id: string;
  label: string;
  explanation: string;
  correct: boolean;
};

export const observerMissions = [
  {
    id: 'spectrum',
    title: 'See beyond visible light',
    eyebrow: 'MISSION 01',
    body: 'Infrared light can reveal information that human eyes cannot see. This illustration is conceptual, not a reproduction of the complete instrument response.',
    bands: [
      { label: 'Visible', range: '0.4–0.7 μm', tone: 'violet' },
      { label: 'Near-infrared', range: '0.75–2.4 μm', tone: 'cyan' },
      { label: 'Thermal context', range: 'illustrative only', tone: 'amber' },
    ],
  },
  {
    id: 'bands',
    title: 'Read the 102 bands',
    eyebrow: 'MISSION 02',
    body: 'A spectral band is a wavelength interval. SPHEREx observes the near-infrared sky through 102 bands so that each source carries more than a single brightness value.',
    bands: Array.from({ length: 12 }, (_, index) => ({
      label: `Band ${String(index + 1).padStart(2, '0')}`,
      range: `${0.75 + index * 0.14} μm`,
      tone: index % 3 === 0 ? 'violet' : index % 3 === 1 ? 'cyan' : 'amber',
    })),
  },
  {
    id: 'survey',
    title: 'Explore the all-sky survey',
    eyebrow: 'MISSION 03',
    body: 'SPHEREx is designed to build an all-sky, time-dependent picture. Repeated coverage helps investigators ask whether a source changed. This scan is a conceptual mission visualization.',
    bands: [
      { label: 'Survey pass 01', range: 'map the sky', tone: 'cyan' },
      { label: 'Survey pass 02', range: 'return later', tone: 'violet' },
      { label: 'Compare', range: 'look for evidence', tone: 'amber' },
    ],
  },
  {
    id: 'pipeline',
    title: 'From observation to image',
    eyebrow: 'MISSION 04',
    body: 'Scientific products are made through a chain of measured steps. The game simplifies the workflow; it does not reproduce every instrument or calibration operation.',
    bands: [
      { label: 'Observation', range: 'photons arrive', tone: 'cyan' },
      { label: 'Detector data', range: 'digital readings', tone: 'violet' },
      { label: 'Calibration', range: 'correct known effects', tone: 'amber' },
      { label: 'Image products', range: 'structured data', tone: 'cyan' },
      { label: 'Analysis', range: 'test what changed', tone: 'violet' },
    ],
  },
];

export const detectiveCases: Array<{
  id: string;
  label: string;
  description: string;
  answer: string;
  choices: MissionChoice[];
}> = [
  {
    id: 'brightening',
    label: 'A source becomes brighter',
    description: 'The later synthetic image contains a stronger, centered source. The source position is consistent across the two frames.',
    answer: 'This is a brightness change, not evidence of motion. More epochs would help determine whether it is transient or variable.',
    choices: [
      { id: 'flux', label: 'Significant flux change', explanation: 'The source stays in place while its measured brightness changes.', correct: true },
      { id: 'motion', label: 'Moving object', explanation: 'A brightness change alone does not establish displacement.', correct: false },
      { id: 'artifact', label: 'Confirmed artifact', explanation: 'No artifact evidence is supplied in this educational case.', correct: false },
    ],
  },
  {
    id: 'dipole',
    label: 'A stationary source leaves a dipole',
    description: 'A positive and negative lobe appear beside a stable source after the images are registered.',
    answer: 'This is insufficient evidence for motion. Registration or PSF mismatch can create a dipole-like residual.',
    choices: [
      { id: 'motion', label: 'Moving object', explanation: 'A dipole alone is not proof of an astrophysical displacement.', correct: false },
      { id: 'artifact', label: 'Registration / PSF artifact', explanation: 'The stable source and adjacent lobes are consistent with an image-processing residual.', correct: true },
      { id: 'flux', label: 'Brightness change', explanation: 'The paired lobes are not enough to infer a net flux change.', correct: false },
    ],
  },
  {
    id: 'unknown',
    label: 'Evidence is incomplete',
    description: 'The images are noisy, the quality flags are unavailable, and only one comparison pair exists.',
    answer: 'The responsible conclusion is insufficient evidence. Do not force a discovery label.',
    choices: [
      { id: 'insufficient', label: 'Insufficient evidence', explanation: 'Missing quality information and limited cadence prevent a reliable conclusion.', correct: true },
      { id: 'motion', label: 'Moving object', explanation: 'No valid displacement evidence is available.', correct: false },
      { id: 'discovery', label: 'Confirmed discovery', explanation: 'A single ambiguous pair cannot confirm a discovery.', correct: false },
    ],
  },
];
