/* global React */
// Shared data + helpers for the Sondr site UI kit.
(function () {

// Flat-color placeholder swatch (honest stand-in for client photography).
function swatch(hex) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='52'><rect width='40' height='52' fill='${hex}'/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const WORKS = [
  { title: 'meadow & co', year: '2025', role: 'brand + web', tint: '#cfe3d0',
    notes: 'a slow, seasonal e-commerce build. hand-set type, warm photography, zero templates.' },
  { title: 'atlas studio', year: '2025', role: 'portfolio', tint: '#d8d3ea',
    notes: 'an architect\u2019s portfolio that feels like flipping through a sketchbook of plans.' },
  { title: 'the paper press', year: '2024', role: 'editorial', tint: '#f0dcc4',
    notes: 'independent print house. we let the ink and paper grain do the talking.' },
  { title: 'north bakery', year: '2024', role: 'brand + web', tint: '#f3d9d2',
    notes: 'a neighbourhood bakery. menu that reads like a chalkboard, ordering that just works.' },
  { title: 'field notes', year: '2023', role: 'blog', tint: '#d4e4ee',
    notes: 'a naturalist\u2019s journal online \u2014 margins, marginalia, and a lot of white space.' },
  { title: 'oak & ember', year: '2023', role: 'restaurant', tint: '#e7d6c0',
    notes: 'wood-fire restaurant. dark, warm, tactile. reservations without the friction.' },
];

const NAV = [
  { id: 'works', label: 'works', icon: 'works' },
  { id: 'blog', label: 'blog', icon: 'blog' },
  { id: 'studio', label: 'studio', icon: 'studio' },
  { id: 'interior', label: 'interior dept.', icon: 'interior' },
  { id: 'contact', label: 'contact', icon: 'contact' },
];

window.SondrData = { swatch, WORKS, NAV };
})();
