# Product

## Register

brand

## Users

Tech recruiters, engineering managers and CTOs evaluating João Pedro Teixeira for full-stack roles — both Brazilian companies and remote-first international ones (Turing, micro1, IQVIA and similar have been in the pipeline). They arrive from a résumé PDF, a LinkedIn message or a GitHub profile, on a laptop, with a shortlist open in other tabs and roughly ninety seconds of attention.

Secondary: potential freelance clients (the InduxAI-shaped contract) checking whether he can own a delivery end to end.

The job to be done: decide, fast, whether this person ships real production software or just completes tutorials. The page has to settle that question before the fold.

## Product Purpose

A portfolio that functions as the evidence layer behind the résumé. The résumés already list the claims; this site proves them with the texture that a two-page PDF cannot carry — the architecture decisions, the security audit that came back clean, the sync engine, the reason a model is allowed to classify but never to dispatch.

Success: a visitor who lands cold leaves able to describe one specific thing he built, and reaches for the contact link.

## Brand Personality

Engineered, blunt, alive.

Voice is first-person, concrete, and unembellished. It names systems, numbers and tradeoffs instead of adjectives. It admits scope ("deploy contracted, training out of scope") because admitting scope is what a senior engineer does. No superlatives, no growth-copy cadence, no aphorisms.

Emotional goal: the quiet confidence of someone showing you their work, not selling you on it.

## Anti-references

- The dark dev portfolio with a purple gradient hero, a "Hi, I'm X 👋" and three identical skill cards.
- Terminal costume: fake shell windows, matrix rain, ASCII art as decoration, monospace applied to body copy to signal "developer".
- Editorial-magazine drift: display serif italic, drop caps, ruled three-column broadsheet grids. Wrong register for this brief.
- Neon glow and gradient halos. The red signal is a fill and an ink, never a `box-shadow` halo.
- Timeline-of-my-journey scrollytelling. Recruiters do not read journeys.
- Skill bars, percentage-proficiency meters, logo soup.

## Design Principles

1. **Evidence over adjectives.** Every claim on the page carries the artifact behind it: a number, a mechanism, a decision. If a line cannot be backed, it does not ship.
2. **The system is inherited, not invented.** Paper, warm ink and Geist are VYRO's. Using them here makes the portfolio and the company read as one hand.
3. **Depth on demand.** The surface stays scannable in ninety seconds; the detail sits one interaction deeper for the reader who wants it. Never force the long version on the skimmer.
4. **Show the boundary.** The most senior thing in this body of work is knowing where automation stops and a human decides. Give that idea real estate.
5. **Bilingual without a second-class version.** Portuguese and English carry identical substance. Neither is a translation afterthought.

## Accessibility & Inclusion

WCAG 2.2 AA. All text verified against its actual background: ink 17.6:1, ink-2 9.1:1, ink-3 5.2:1 and signal-lite 5.6:1 on the paper base. No information is carried by color alone.

Full keyboard operability with visible focus rings in the red signal. `prefers-reduced-motion` collapses every entrance, reveal, marquee and the hero dissolve to a static state — motion is never load-bearing for meaning. Language toggle sets `lang` on the document so screen readers switch pronunciation.
