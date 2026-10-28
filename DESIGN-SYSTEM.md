# Redline MD: design system

Quick system for the redesign. Every value below is a token in `src/index.css` (`@theme`) and is consumed as a Tailwind class (`bg-navy`, `text-red`, `rounded-ui`). No hex values live in components.

## Color

All colors come from the brand that exists today: the logo red and navy, the site's yellow CTA, its charcoal text and warm grey surface. Green is the only addition, because a redline needs a color for accepted language.

| Token | Hex | Use |
|---|---|---|
| `red` | `#D21A17` | logo bolt, struck clause text, risk tags, eyebrow labels. Never as a background block |
| `red-soft` | `#FDECEC` | background of a risk comment or risk tag |
| `navy` | `#0E2E54` | headings, the emphasized line of a title, dark sections, footer, secondary buttons |
| `navy-soft` | `#1B4373` | hover on navy |
| `yellow` | `#FFD55A` | primary CTA only. One action per screen |
| `yellow-hover` | `#F5C838` | CTA hover |
| `ink` | `#222222` | body text and the base line of a title |
| `muted` | `#4E4E4E` | secondary text (8.6:1 on white) |
| `line` | `#EAEAEA` | rules and borders |
| `surface` | `#FFFFFF` | page and cards |
| `wash` | `#F6F5F4` | alternate section background, preview panels |
| `accept` | `#1F7A4D` | inserted contract language, checks, "encrypted" states |
| `accept-soft` | `#E8F3ED` | background of accepted language |

Contrast checked for text pairs: ink on yellow 13:1, navy on white 13:1, red on white 5.2:1, muted on wash 8:1, white on navy 13:1.

## Type

One family, Hanken Grotesk (variable), self-hosted. IBM Plex Mono only for technical data: file names, clause numbers (`§ 7.3`), counters, column labels. No serif anywhere.

| Role | Size (mobile → desktop) | Weight | Tracking |
|---|---|---|---|
| Display (H1) | 40 → 68px | 600 | -0.035em |
| Section title (H2) | 30 → 40px | 600 | -0.03em |
| Band title (over video) | 32 → 64px | 600 | -0.03em |
| Stat number | 40 → 52px | 600 | -0.04em, tabular |
| Body large | 17 → 19px | 400 | 0 |
| Body | 15 → 16px | 400 | 0 |
| Label / eyebrow | 13px | 600, red | 0 |
| Mono label | 11–12px | 400–500, uppercase for column labels | 0.12em |

Two-tone titles: the base line in `ink`, the stakes in `navy` (H1: "Don't sign your first contract / **blind.**"). One emphasis per title, never italic.

## Shape and depth

- **Radius:** one token, `rounded-ui` = 4px, for buttons, cards, inputs, tags and video. Circles only for avatars and status dots.
- **Shadow:** two steps. `shadow-lg` for anything floating over content (cards in a preview, price card, open accordion item). `shadow-xl` for the upload dialog and the diagram engine.
- **Spacing:** 4px scale. Sections 64px mobile, 96px desktop. Container 1240px with 16/24/40px gutters.

## Components

| Component | File | Notes |
|---|---|---|
| CTA button | `CtaButton.tsx` | yellow, arrow slides 4px on hover, 56px tall (48px `md`) |
| Secondary button | inline | navy outline, fills navy on hover |
| Nav | `Nav.tsx` | transparent at top, white with blur after 40px; EN/PT switch |
| Contract preview | `ContractPreview.tsx` | Word-style track changes: strike in red, insertion in green, risk comment |
| Price card | `Hero.tsx` | $199 flat vs struck $500+ |
| Specialty marquee | `ProofStrip.tsx` | 40s loop, pauses on hover, edge fade |
| Stats strip | `ProofStrip.tsx` | 4 counters, count up once |
| How it works, desktop | `HowSticky.tsx` | left column pinned (`sticky top-0 h-screen`), one panel per step on the right; the step whose card crosses the middle band owns the left text; cards assemble back-then-front when half visible, and replay on return |
| How it works, mobile | `HowItWorks.tsx` | accordion, auto-advances every 6.5s, active rule fills as progress, preview below |
| Checks diagram | `Checks.tsx` | inputs → engine with live counter → findings landing one by one |
| Video band | `Bands.tsx` | full-bleed loop, navy scrim for legibility, statement bottom-left |
| Dark proof section | `Support.tsx` (`Voices`) | navy, white pixel grid, quote cards |
| Upload dialog | `UploadDialog.tsx` | bottom sheet on mobile, dialog on desktop; empty, dragging, uploading, analyzing, done, email-link states |
| Mobile CTA bar | `MobileCtaBar.tsx` | appears once the hero CTA leaves the screen |
| Pixel grid | `PixelGrid.tsx` | navy squares breathing at random speeds, fades from the center |

## Motion

| Pattern | Duration | Easing |
|---|---|---|
| Section reveal | 500ms, 80ms stagger, y 24 → 0 | `cubic-bezier(.22,1,.36,1)` |
| Title line from mask | 700ms, 120ms between lines | same |
| Counters | 1.2s, once | same |
| Accordion step (mobile) | 6.5s, linear progress rule | linear |
| Pinned-scroll step swap (desktop) | text 350ms; back card 600ms, front card +350ms, list rows 350ms apart | same |
| Redline loop | 6s cycle, paused off-screen | — |
| Video | plays only near the viewport, paused off-screen | — |

`prefers-reduced-motion` turns off loops, counters, marquee, pixel pulse and video (poster only); content still shows in its final state.

## Rules

1. One primary action per screen: the yellow button. Everything else is outline or text.
2. Card only when the item is a unit (a finding, a quote, a file). Lists of facts are ruled lists.
3. No icon in a tinted box. Icons sit bare, at text size.
4. No gradient as decoration. The only gradient is the scrim over video, for legibility.
5. Numbers that are not confirmed by the client are marked placeholder.
