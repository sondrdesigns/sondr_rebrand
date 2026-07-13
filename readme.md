# Sondr Designs — Design System

Sondr Designs is a (primarily web) design studio that builds **organic, individualistic** work — giving each client a genuine personal identity online. This design system captures Sondr's house style: **raw and open, like a scrapbook or a dotted-grid notebook**, with accents of **tape and sticky notes** for texture. Nothing here is glossy or corporate; everything feels hand-placed on a page.

## Source

- **Figma:** `Sondr_revmp_fig.fig` (attached, mounted read-only). The file is an early concept/wireframe rather than a formal component library: a homepage "underlay" hero, two wireframe/spec frames, and a "featured works" frame. It defines the *vibe and foundations* (paper, dotted grid, tape, sticky notes, polaroid frames, the two typefaces) — it does **not** contain formal Figma components, variables, or text styles. This design system builds the reusable component + token layer that the file implies.
- **No logo exists in the source.** The Figma shows a `sondr logo here` placeholder on a strip of tape. Until a real mark is supplied, the brand name is set in **type** (Intel One Mono, lowercase, wide tracking) wherever a logo would go. Do not invent a logo.

## Component index

Core — `components/core/`
- **Button** — outlined "ballot-box" action (variants: outline / solid / sticky)
- **Card** — clean white sheet with a hairline ink border
- **Field** — text input / textarea with a mono label
- **Divider** — thin ruled pencil line

Scrapbook — `components/scrapbook/`
- **DottedGrid** — the notebook-paper surface (optional left margin rule)
- **StickyNote** — tilted yellow post-it with a curled corner
- **Tape** — photographic torn-tape strip (cream / blue)
- **PolaroidCard** — polaroid/instax frame with photo window + caption
- **FlipPolaroid** — featured-work polaroid that flips on hover to handwritten notes on the back

Typography — `components/typography/`
- **Heading** — Inter, uppercase, wide-tracked display type (display / title / heading)
- **MonoText** — Intel One Mono body copy (lead / body / small)

Navigation — `components/navigation/`
- **NavItem** — lowercase mono nav link, underlined when current
- **SondrIcon** — animated hand-drawn nav icons (works=pulsing dot, blog=pen scribble, contact=envelope opens, studio=fingerprint flows, interior=lamp turns on)

### Intentional additions
The source has no formal components, so the inventory above is authored from the elements the file draws (outlined button, white bordered box, tape, sticky notes, polaroid frames, dotted grid, margin rule, the two type roles, nav links). `Field` is added for the implied contact page, reusing `Card`'s exact border treatment.

## Also in this project
- `styles.css` — global entry (imports only) → `tokens/{fonts,colors,typography,spacing}.css`
- `guidelines/*.card.html` — foundation specimen cards (Colors, Type, Spacing, Brand)
- `ui_kits/sondr-site/` — interactive scrapbook site with animated nav icons: **home** (hero · featured works with hover-flip polaroids · services/mission · blue-screen CTA · footer), **works** (filterable library), **blog** (in-progress), **studio** (team), **interior dept.** (furniture), **contact** (info + email capture)
- `templates/scrapbook-landing/` — a ready-to-copy landing-page Design Component
- `assets/` — real bitmaps from the Figma: `tape-cream.png`, `tape-blue.png`, `sticky-note-yellow.png`, `polaroid-frame.png`
- `SKILL.md` — Agent-Skill wrapper

---

## CONTENT FUNDAMENTALS

**Voice: warm, plain-spoken, quietly confident — a small studio talking like a person, not a brand.**

- **Casing:** almost everything is **lowercase**. Nav, buttons, labels, sticky notes, captions — all lowercase. The *only* uppercase is display headlines (which are ALL CAPS, e.g. `CRAFTING ELEVATED DIGITAL EXPERIENCES`). Sentence copy stays lowercase and often skips terminal punctuation.
- **Person:** first-person plural "**we**" for the studio, second-person "**you / your**" for the client. From the source: *"we help businesses grow by crafting powerful digital platforms that drive conversion and define your identity in the online space."*
- **Tone:** direct, unhurried, a little handwritten. Short fragments read like margin notes ("note to self", "raw · organic · personal"). Uses the middot `·` as a casual separator.
- **Length:** headlines are 2–4 words per line, stacked. Body copy is one tight sentence or two, never a wall.
- **Emoji:** none. **No emoji anywhere.** Texture comes from physical objects (tape, notes), not glyphs.
- **Vibe words:** raw, organic, individual, personal, hand-built, scrapbook, notebook.

Examples in-house: `works`, `blog`, `mission`, `interior dept.`, `get in touch`, `view works`, `say hello`, `send it`, `featured works`.

---

## VISUAL FOUNDATIONS

**Overall:** a warm off-white notebook page. Every surface carries a faint **dotted grid**; a single **vertical margin rule** sits ~180px from the left like a real notebook margin. Content is composed as if pinned, taped, or stuck to the page — allowed to tilt a few degrees, never perfectly aligned.

- **Background:** `rgb(255,251,240)` warm paper, overlaid with a `radial-gradient` dotted grid — 2px dots on a **28px pitch**. This is the default canvas; use it almost everywhere. White (`rgb(255,255,255)`) is reserved for card/sheet faces.
- **Color:** deliberately spare. Paper + ink (pure black `rgb(0,0,0)`) do 90% of the work. Soft ink `rgb(102,99,99)` for the margin rule and muted text. Accents are **physical supplies**, not UI colors: sticky-yellow `rgb(250,240,137)`, painter's-tape blue `rgb(0,81,255)`, masking-tape cream. Never use accents as flat fills — they arrive as tape strips and notes.
- **Type:** two families only. **Inter**, weight 500, **UPPERCASE**, tracked **0.11em**, tight leading (line-height 0.885) → all display/headlines. **Intel One Mono**, also tracked 0.11em → all body, labels, nav, captions. The wide tracking is the signature — never set text tight. Scale (from Figma): 96 / 50 / 35 / 20 / 15 / 13px.
- **Backgrounds:** dotted-grid paper, full-bleed. No gradients-as-decoration, no hero photos bleeding edge to edge — imagery lives *inside* polaroid frames. Texture is the tape/note bitmaps.
- **Imagery:** photographic and **warm/neutral**, always presented through a **polaroid/instax frame** with a caption on the lip. Real bitmaps only (tape, notes, frames) — never redraw them as SVG.
- **Corners / radii:** mostly **sharp (0px)** — paper has cut edges, cards and buttons are hard rectangles. Sticky notes get a 2px nick; that's the softest thing here.
- **Cards:** white sheet + **1px inset black border** (`inset 0 0 0 1px #000`), sharp corners, no radius. Optional drop shadow to float off the page. This matches the source's Rectangle exactly.
- **Borders:** hairline **1px pure black** for cards/inputs/buttons; **1.5px soft-ink** for ruled lines and the margin.
- **Shadows:** three roles — `shadow-sticky` `6px 4px 4px rgba(0,0,0,.33)` (post-it adhesive lift), `shadow-tape` `2px 2px 4px rgba(0,0,0,.75)` (hard tape shadow), `shadow-lift` soft float for cards. Shadows are **offset and directional**, never a soft even glow.
- **Rotation / placement:** taped and pinned elements tilt **−6° to +6°**. Alternate tilt direction across a row of polaroids. Nothing decorative should be perfectly level.
- **Animation:** minimal and physical. Hover = a small **lift** (`translateY(-4px)`) on polaroids; buttons **press down** (`translateY(1px)`) on mousedown. Easing is a plain `120–160ms ease`. No bounces, no parallax, no infinite loops.
- **Hover states:** nav links go from 0.72 → 1.0 opacity; polaroids lift; buttons don't change color, they move. **Press:** buttons nudge down 1px.
- **Transparency / blur:** essentially none — this is opaque paper, not glass. No backdrop-blur, no frosted panels.
- **Layout rules:** left margin rule at 180px; primary nav stacked vertically in the left margin on desktop. Content column starts right of the rule. Generous whitespace; the base spacing unit is the 28px grid cell.

---

## ICONOGRAPHY

**Sondr barely uses icons — the "iconography" is physical objects, not glyphs.** The source contains **no icon font, no icon SVGs, and no emoji.** Meaning is carried by real photographic props:

- **Tape** (`assets/tape-blue.png`, `assets/tape-cream.png`) — torn strips used to "attach" elements and as accent marks.
- **Sticky notes** (`assets/sticky-note-yellow.png`, and the CSS `StickyNote`) — for asides/callouts.
- **Polaroid frames** (`assets/polaroid-frame.png`) — the container for all imagery.
- **The middot `·`** is the one recurring typographic separator.

If a UI genuinely needs functional icons (e.g. a menu or arrow in an app context), use a **thin, single-weight line set** that reads as hand-drawn/pen — [Lucide](https://lucide.dev) (1.5–2px stroke) is the closest CDN match to the pen-line feel. **Flag any such use** — it is an extension of the brand, not part of the source. Prefer text labels over icons wherever possible; Sondr labels things in words.

---

## Using this system

Link `styles.css` for tokens + fonts, load `_ds_bundle.js`, and pull components from `window.SondrDesignsDesignSystem_41b26a`. See `components/*/*.prompt.md` for per-component usage, the `guidelines/` cards for foundations, and `ui_kits/sondr-site/` for a full composition. To start a new page fast, copy `templates/scrapbook-landing/`.
