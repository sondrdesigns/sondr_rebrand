`FlipPolaroid` — a featured-work card that flips on hover to show handwritten notes on the back.

```jsx
<FlipPolaroid
  src="assets/work-1.jpg"
  caption="meadow & co · 2025"
  title="meadow & co"
  meta="2025 · brand + web"
  notes="a slow, seasonal e-commerce build. hand-set type, warm photography, zero templates."
  assetBase="../../"
/>
```

Front is a polaroid (`src`, `caption`); back shows `title`, `meta`, `notes` on a ruled sheet. Flips on hover/focus. Use in a row with alternating `tilt`.
