`NavItem` — a single lowercase mono nav link; underlined when current.

```jsx
<nav style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
  <NavItem current>works</NavItem>
  <NavItem>blog</NavItem>
  <NavItem>mission</NavItem>
  <NavItem>interior dept.</NavItem>
</nav>
```

Props: `href`, `current`, `onClick`. Sondr's nav labels are lowercase and often stacked vertically in the left margin.
