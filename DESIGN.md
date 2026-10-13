# Design

## Theme

Paper, committed. The page is near-white with a thread of warmth, warm dark ink, and one red signal used sparingly. It is meant to sit next to the VYRO site and read as the same hand: same type family, same restraint, different subject.

One dark slab (the boundary section) inverts the same tokens in scope through `.ink-slab`, instead of carrying a second palette.

## Color

| Token | OKLCH | Role |
|---|---|---|
| `--base` | `oklch(0.988 0.004 85)` | Page paper |
| `--surface` | `oklch(0.966 0.006 85)` | Raised panels, the AI section |
| `--surface-2` | `oklch(0.935 0.008 85)` | Panel on panel |
| `--ink` | `oklch(0.2 0.012 85)` | Headings, emphasis, solid buttons |
| `--ink-2` | `oklch(0.42 0.012 85)` | Body copy |
| `--ink-3` | `oklch(0.53 0.012 85)` | Metadata |
| `--signal` | `oklch(0.6 0.205 31)` | Fills and large type only |
| `--signal-lite` | `oklch(0.54 0.19 30)` | Signal as text (darker on paper) |
| `--line` / `--line-2` | ink at 11% / 22% | Hairlines, outlines |

Contrast on `--base`: ink 17.6:1, ink-2 9.1:1, ink-3 5.2:1, signal-lite 5.6:1.

## Typography

- **Geist** — display and body. Display is weight 600, lowercase, tracking `-0.048em`, line-height 0.95.
- **Geist Mono** — labels, indices, numbers. Uppercase, `0.13em` tracking. Never body copy.

## The hero

The angel is the page's one image. Three sculpture photos are resampled live on Canvas2D and printed as a positive halftone in ink dots (`PRESETS.inkGaze` in `src/lib/ascii.ts`): shadow becomes a large dot, light becomes paper, and the photo's black background becomes paper through a luminance floor. An oval vignette measured on the photo rectangle dissolves its edges. Scrolling cross-fades the three prints in ink space, not RGB, so the transition never turns into a grey mass.

## VYRO

VYRO is the strongest proof on the page, so it gets the section right after the hero: real captures in device and window frames, each on a plate in its own product's colour, linking to each product's own site. The page footer ends on the VYRO wordmark.

## Motion

CSS entrance (`.rise`), scroll reveal (`Reveal`), the hero scroll dissolve, the craft index and the AI panel that swap with scroll. Transform and opacity only. Every one has a `prefers-reduced-motion` path that resolves to the final state.
