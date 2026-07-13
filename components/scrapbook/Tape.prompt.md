`Tape` — a photographic strip of torn tape used to "attach" elements to the page.

```jsx
<div style={{ position: 'relative' }}>
  <Tape color="blue" width={220} tilt={-4}
        style={{ position: 'absolute', top: -18, left: 40 }} />
  {/* ...card content... */}
</div>
```

Props: `color` (`cream` | `blue`), `width`, `tilt`, `assetBase` (path prefix to reach `assets/`). Purely decorative — always absolutely positioned, `pointer-events: none`.
