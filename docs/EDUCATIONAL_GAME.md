# Educational game

`MissionGame` is a separate feature module with content in `src/education/missionData.ts`. It has no dependency on the real candidate engine, no backend progress store, no account requirement, and no leaderboard.

Level 1, “Become the observer,” teaches infrared light, conceptual spectral bands, the 102-band idea, all-sky survey cadence, and the observation-to-analysis workflow. Level 2, “Find what changed,” presents synthetic earlier/later sky panels and asks the player to distinguish brightness change, motion, image-processing artifacts, and insufficient evidence. The player receives feedback after each choice and ends with a learning summary and a button into the real Explore workspace.

Every Level 2 screen displays the exact label: “Educational simulation — not actual SPHEREx observational data.” The data module is named `EDUCATIONAL_SYNTHETIC_DATA`; the game does not import `ScientificPipeline`, does not modify investigation history, and cannot create scientific provenance records.
