---
name: sondr-design
description: Use this skill to generate well-branded interfaces and assets for Sondr Designs, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping. Sondr's style is a raw, organic, scrapbook/notebook aesthetic — dotted-grid paper, tape, sticky notes, polaroid frames; Inter uppercase display + Intel One Mono body, both tracked wide.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key facts to internalize before designing:
- **Canvas:** warm paper `rgb(255,251,240)` with a dotted grid (2px dots, 28px pitch) and a left margin rule at 180px. Almost everything sits on this.
- **Type:** Inter 500 UPPERCASE tracked 0.11em for headlines; Intel One Mono tracked 0.11em for everything else. Body/labels/nav are lowercase.
- **Accents are physical supplies, not flat colors:** sticky-yellow, tape-blue, tape-cream — arriving as tape strips and post-it notes, tilted −6°…+6°.
- **No logo** in the source; set the brand name in Intel One Mono where a mark would go. **No emoji, minimal icons** (thin line/Lucide only if truly needed, and flag it).
- **Cards:** white with a 1px inset black border, sharp corners. **Imagery** always lives inside polaroid frames.
- Real bitmaps live in `assets/` (tape, sticky note, polaroid frame) — copy and reference them; never redraw as SVG.
