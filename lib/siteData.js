export function swatch(hex) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='52'><rect width='40' height='52' fill='${hex}'/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const WORKS = [
  {
    title: 'tennis keiki hawaii',
    role: 'web',
    tint: '#cfe3d0',
    image: '/assets/works/tennis-keiki.svg',
    notes: 'web home for a youth tennis program in hawaii. light, welcoming, made for families on the go.',
    url: 'https://www.tenniskeikihawaii.org',
  },
  {
    title: 'pando surgical',
    role: 'web',
    tint: '#dde8ec',
    image: '/assets/works/pando-surgical.svg',
    notes: 'product launch site for a surgical device. precise, considered, designed to earn trust.',
    url: 'https://pandosurgical.com',
  },
  {
    title: 'lnc food',
    role: 'brand + web',
    tint: '#f0dcc4',
    image: '/assets/works/lnc-food.svg',
    notes: 'food brand that leads with texture and warmth. hand-set, honest, built for the table.',
    url: 'https://lncfood.com',
  },
  {
    title: 'khm tutoring',
    role: 'education + web',
    tint: '#d4e4ee',
    image: '/assets/works/khm-tutoring.svg',
    notes: 'tutoring platform built around clarity. 30% more enquiries in the first month after launch.',
    url: 'https://khmtutoring.com',
  },
  {
    title: 'blend',
    role: 'app + web',
    tint: '#e8ddd4',
    image: '/assets/works/blend.svg',
    notes: 'café discovery app. clean interface, fast search — built for people who take coffee seriously.',
    url: 'https://blend.app',
  },
  {
    title: '4as',
    role: 'brand + web',
    tint: '#d8d3ea',
    image: '/assets/works/4as.svg',
    notes: 'a platform for asian american arts and science. launching soon.',
    comingSoon: true,
  },
  {
    title: 'pai café',
    role: 'web',
    tint: '#f3d9d2',
    image: '/assets/works/pai-cafe.svg',
    notes: 'a neighbourhood café in honolulu. launching soon.',
    comingSoon: true,
  },
];

export const NAV = [
  { id: 'works', label: 'works', icon: 'works', href: '/works' },
  { id: 'blog', label: 'blog', icon: 'blog', href: '/blog' },
  { id: 'studio', label: 'studio', icon: 'studio', href: '/studio' },
  { id: 'interior', label: 'interior dept.', icon: 'interior', href: '/interior' },
  { id: 'contact', label: 'contact', icon: 'contact', href: '/contact' },
];
