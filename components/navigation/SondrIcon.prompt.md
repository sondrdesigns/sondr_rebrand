`SondrIcon` — Sondr's animated, hand-drawn nav icons.

```jsx
<a className="sondr-icon" href="#works" style={{ display:'flex', gap:8, alignItems:'center' }}>
  <SondrIcon name="works" /> works
</a>
```

`name`: `works` (spinning 3D cube), `blog` (pen scribble), `contact` (envelope opens), `studio` (fingerprint flows), `interior` (lamp turns on). Animations trigger on hover of the nearest `.sondr-icon` ancestor, so wrap the icon **and** its label together in that class.
