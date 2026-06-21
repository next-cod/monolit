# Figma-Inspired Design System

A confident black-and-white editorial frame interrupted by oversized, hand-cut pastel color blocks. The marketing canvas is rigorously monochrome — a single variable sans, pure white surfaces, pure black ink, pill-shaped CTAs — while each story section drops the page into a saturated lime, lavender, cream, mint, or pink panel that reads like a sticky note placed on a clean desk. The result feels both technical and joyful: a tool for serious work, made by people who like color.

This system is a **design language**, not a product clone. It captures the *patterns* of a Figma-style marketing canvas — the monochrome chrome, the color-block rhythm, the pill CTAs — so you can build well-branded, on-system interfaces and assets.

---

## Sources

This system was derived entirely from one editorial design analysis:

- **VoltAgent / awesome-design-md** — `design-md/figma/DESIGN.md` → https://github.com/VoltAgent/awesome-design-md/tree/main/design-md/figma
- The analysis itself references a hosted preview at https://getdesign.md/figma/design-md (dark-mode examples, downloads).

The source is a markdown token spec (colors, type, spacing, components) reverse-engineered from Figma's public marketing pages. **No production code, Figma file, or brand assets (logos, icons, imagery) were available** — pastel hex values are screenshot-derived approximations, and the proprietary typefaces are substituted (see Typography). Explore the repo above to go deeper or refine these tokens against newer captures.

> ⚠️ **Trademark note:** This is an *inspired-by* system for prototyping in this visual language. It does **not** ship Figma's logo, product screenshots, or proprietary fonts. The UI kit uses a generic placeholder wordmark ("Canvas").

---

## Content Fundamentals

How copy is written in this system:

- **Voice:** Confident, plain, product-led. Short declaratives that sound like a capable tool talking, not a brand performing. *"Design together, in real time." · "Build once. Reuse everywhere." · "From design to dev, without the handoff tax."*
- **Person:** Addresses the reader as **you** / **your team**; the product speaks as **we** only in support/sales contexts ("we'll be in touch"). Headlines are usually imperative or declarative with no subject ("Design together", "Plans for every team").
- **Casing:** **Sentence case everywhere** — headlines, buttons, nav. The only uppercase is the mono eyebrow/caption layer (section labels, footer column heads, logo strips), which is *always* uppercase with positive tracking.
- **Headline cadence:** One idea per headline, often a two-beat rhythm with a period. ("Build once. Reuse everywhere.") Periods are used in display headlines as a confident full-stop, not omitted.
- **Body:** Calm and concrete. One supporting sentence under a headline; benefit-first, no hype words. Avoids exclamation marks.
- **Eyebrows are taxonomy, not copy:** `SYSTEMS`, `SHIP PRODUCTS`, `DEVELOPERS`, `PRICING`, `FAQ` — single words or short phrases that label *what kind* of section follows.
- **Emoji:** **None.** The brand never uses emoji in marketing surfaces; color blocks carry the warmth instead.
- **Vibe:** Editorial-meets-engineering. Serious craft, lightened by color. Think a beautifully set spec sheet, not a playful consumer app.

---

## Visual Foundations

**Color.** A monochrome core (`--ink` black, `--canvas` white) carries every CTA, every body line, the footer, and the marquee. Storytelling lives in **oversized pastel color blocks** — lime, lilac, cream, pink, mint, coral, and a single deep navy — that span full content width with `--radius-lg` (24px) corners and `--space-xxl` (48px) interior padding. One accent (`--accent-magenta` `#ff3d8b`) is reserved for a single promo CTA per page. No new accent colors. No mid-gray text — body hierarchy comes from *weight*, never opacity.

**Imagery color vibe.** Flat, bright, high-key. Product UI mocks sit as flat compositions on color blocks; pastels are desaturated-but-cheerful (not neon, not muted). No photography grain, no duotone, no dark moody imagery. Warmth comes from the block palette, not from filters.

**Type.** One variable sans voice (`figmaSans`, substituted with **Inter**) flexed at fine weight increments (320 / 330 / 340 / 480 / 540 / 700) — the system reads as a single voice modulating, not a stepped family. Display sizes are huge (86px / 64px) with tight negative tracking (down to −1.72px); body copy stays near-zero tracking at 18–20px. A mono (`figmaMono`, substituted with **JetBrains Mono**) is reserved for uppercase eyebrows and captions only — never body. **Weight, not size, carries body hierarchy.**

**Spacing.** 8px base unit. The signature rhythm constant is `--space-section` (96px) — the vertical breathing room between major sections, which lets each color block read as deliberate. Color-block interior padding is 48px; card padding 24px.

**Backgrounds.** No gradients. No textures or repeating patterns. No hand-drawn illustration. The page is either **white canvas** or a **flat saturated color block** — the transition between them *is* the section break. The page always returns to white between two blocks; never two blocks visible in one viewport.

**Borders.** 1px hairlines (`--hairline` `#e6e6e6`) on inputs, cards, and table dividers; an even softer `--hairline-soft` for row separators and footer rules. Cards are *stroked, not shadowed*.

**Shadows / elevation.** Deliberately shadow-light — **color blocks substitute for elevation.** Level 1 is a hairline frame; Level 2 (`0 4px 16px rgba(0,0,0,.06)`) is the *rare* floating tile hovering over a color block; Level 3 adds a 60%-black scrim behind lightboxes. A drop shadow is an exception worth noticing, never a default.

**Corner radii.** `--radius-md` (8px) on inputs/image frames; `--radius-lg` (24px) on cards and color blocks; `--radius-xl` (32px) on hero feature panels; `--radius-pill` (50px) on every text CTA; `--radius-full` on circular icon buttons and glyphs. **Pill is the only button shape — never square.**

**Cards.** White surface, 24px radius, 24px padding, 1px hairline border, *no shadow*. Pricing's selected/featured tier gets a 2px black inset ring instead of color.

**Animation.** Restrained. CTAs use a subtle press micro-scale (~0.97) rather than a color change. The customer-logo marquee scrolls linearly and slowly. FigJam sticky-note thumbnails keep a slight off-axis rotation as a brand signal. No bounces, no parallax, no decorative loops on content. Honor `prefers-reduced-motion`.

**Hover / press states.** Hover: slight opacity shift or the secondary's hairline darkening — *not* a fill swap. Focus on inputs: a black ring (`0 0 0 3px rgba(0,0,0,.08)`) + border darken to ink, never a fill change. Press: micro-scale down.

**Transparency & blur.** Used sparingly. Translucent white (`--on-inverse-soft-16`, white @ 16%) for circular icon buttons on dark blocks; black @ 60% scrim behind modals. No glassmorphism, no backdrop blur on the marketing surface.

**Layout rules.** Max content width ~1280px with gutters that scale 48px → 24px. Sticky 56px top nav with the black-primary / white-secondary pill pair anchored right. A thin 36px black marquee strip rides directly under the nav. Below 768px, color blocks lose their corners and bleed full-width for a poster effect.

---

## Iconography

- **No proprietary icon set ships with the source** — the DESIGN.md analysis documents zero icon assets, and Figma's marketing iconography is minimal by design (the color blocks and type do the work).
- **Substitute in use:** [**Lucide**](https://lucide.dev) — a clean, 2px-stroke, rounded-linecap open-source set that matches the system's restrained, editorial feel. The UI kit and component cards use inline Lucide-style SVG paths (arrow, checkmark). **⚠️ This is a substitution; flag it if exact brand icons are required.**
  - Stroke icons: `stroke-width: 2`, `stroke-linecap: round`, `stroke-linejoin: round`, `currentColor` fill so they inherit ink/inverse-ink.
  - The pricing comparison **checkmark** is the one semantic glyph — drawn in `--success` green, `--radius-full`, 16px.
- **No emoji.** Never used as iconography or decoration.
- **No unicode glyph icons** beyond simple typographic marks (· — &middot;).
- **Avatars:** none — Figma's marketing avoids personification, so no avatar circles appear.
- If you have the real brand icon set, drop SVGs into `assets/` and reference them; otherwise Lucide is the safe default.

---

## Index / Manifest

**Root**
- `styles.css` — the single entry point consumers link. `@import`s only.
- `README.md` — this guide.
- `SKILL.md` — Agent-Skill front matter for use in Claude Code.

**`tokens/`** — CSS custom properties (`@import`ed by `styles.css`)
- `fonts.css` · `colors.css` · `typography.css` · `spacing.css`

**`components/`** — reusable React primitives (`.jsx` + `.d.ts` + `.prompt.md` + card)
- `forms/` — **Button**, **IconButton**, **TextInput**, **PillToggle**
- `surfaces/` — **ColorBlock**, **Card**, **PromoBanner**
- `typography/` — **Eyebrow**

**`guidelines/`** — foundation specimen cards (Design System tab)
- Colors (4), Type (3), Spacing/radius/elevation (3), Brand (2)

**`ui_kits/marketing/`** — interactive color-block marketing site
- `index.html` (click-through: Home · Pricing · Contact) + `Chrome.jsx`, `HomeScreen.jsx`, `PricingScreen.jsx`, `ContactScreen.jsx`

**Components** (mount via `const { X } = window.FigmaInspiredDesignSystem_e944ad`):
Button · IconButton · TextInput · PillToggle · ColorBlock · Card · PromoBanner · Eyebrow

---

## Working in this system — quick rules

1. Decide the **color block** for each story section *first*; it's the most consequential choice. One block per section, white canvas between.
2. Keep `--ink` black scarce for genuine primary actions and selected states.
3. Every CTA is a **pill**; every icon button is a **circle**. Never square.
4. Express type hierarchy with **weight** from the documented set, not new sizes or gray text.
5. Mono is **taxonomy only** — eyebrows and captions, always uppercase.
6. `--accent-magenta` is **single-shot**: one promo CTA per page, never two.
7. No drop shadows on color blocks — the color *is* the depth.
