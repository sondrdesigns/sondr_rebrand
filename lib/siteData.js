export function swatch(hex) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='52'><rect width='40' height='52' fill='${hex}'/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const WORKS = [
  { title: 'meadow & co', year: '2025', role: 'brand + web', tint: '#cfe3d0',
    notes: 'a slow, seasonal e-commerce build. hand-set type, warm photography, zero templates.' },
  { title: 'atlas studio', year: '2025', role: 'portfolio', tint: '#d8d3ea',
    notes: "an architect's portfolio that feels like flipping through a sketchbook of plans." },
  { title: 'the paper press', year: '2024', role: 'editorial', tint: '#f0dcc4',
    notes: 'independent print house. we let the ink and paper grain do the talking.' },
  { title: 'north bakery', year: '2024', role: 'brand + web', tint: '#f3d9d2',
    notes: 'a neighbourhood bakery. menu that reads like a chalkboard, ordering that just works.' },
  { title: 'field notes', year: '2023', role: 'blog', tint: '#d4e4ee',
    notes: "a naturalist's journal online - margins, marginalia, and a lot of white space." },
  { title: 'oak & ember', year: '2023', role: 'restaurant', tint: '#e7d6c0',
    notes: 'wood-fire restaurant. dark, warm, tactile. reservations without the friction.' },
];

export const NAV = [
  { id: 'works', label: 'works', icon: 'works', href: '/works' },
  { id: 'blog', label: 'blog', icon: 'blog', href: '/blog' },
  { id: 'studio', label: 'studio', icon: 'studio', href: '/studio' },
  { id: 'interior', label: 'interior dept.', icon: 'interior', href: '/interior' },
  { id: 'contact', label: 'contact', icon: 'contact', href: '/contact' },
];
