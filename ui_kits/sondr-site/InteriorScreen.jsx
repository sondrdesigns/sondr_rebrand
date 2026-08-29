/* global React */
// InteriorScreen — one white room, black furniture, one warm lamp.
// 3/4 isometric convention: DX=-22, DY=-10 (depth goes upper-left)
// Front face: #1c1c1c | Left face (lamp-lit): #c4a050-#b09040 | Top face: #dedad0

// Each item is a full spec sheet — dims in mm, materials, year, inspiration copy,
// ordering block. `bp` maps to which blueprint SVG to render on the catalog tile.
var CATALOG_DATA = {
  seating: {
    label: 'seating',
    items: [
      {
        id: 'mill-sofa', name: 'mill sofa', ref: 'S-01', bp: 'sofa',
        price: '£1,840', status: 'made to order',
        desc: 'three-seater in natural ash and linen. designed for staying.',
        dims: { w: 2200, d: 900, h: 780, unit: 'mm' },
        materials: ['natural ash frame', 'linen (undyed)', 'wool wadding'],
        year: '2024', edition: 'open',
        inspiration: 'a mill in west yorkshire — the linen weft coming off the loom, the ash beams overhead. the seat is meant to feel like the plank bench beside the loom, only kinder.',
        order: '6–8 weeks from order. sample linen sent on request.',
      },
      {
        id: 'margin-armchair', name: 'margin armchair', ref: 'S-02', bp: 'armchair',
        price: '£760', status: 'in stock',
        desc: 'a reading chair. upholstered in wool. sits low, stays a long time.',
        dims: { w: 780, d: 820, h: 720, unit: 'mm' },
        materials: ['oak frame', 'wool bouclé', 'natural rubber webbing'],
        year: '2023', edition: 'open',
        inspiration: 'the margin of a page — the empty column beside the text where you scribble the important things. the arms are the ruled edge; the seat is where the note goes.',
        order: 'ships in 5 working days from the studio in leeds.',
      },
      {
        id: 'note-stool', name: 'note stool', ref: 'S-03', bp: 'stool',
        price: '£240', status: 'in stock',
        desc: 'solid ash, hand-oiled. stacks. lives anywhere.',
        dims: { w: 340, d: 340, h: 450, unit: 'mm' },
        materials: ['solid ash', 'hand-rubbed hardwax oil'],
        year: '2022', edition: 'open',
        inspiration: 'a footnote — small, load-bearing, easy to overlook. three legs so it never wobbles.',
        order: 'ships in 3 working days. stacks four high.',
      },
      {
        id: 'draft-bench', name: 'draft bench', ref: 'S-04', bp: 'bench',
        price: '£560', status: 'made to order',
        desc: 'a long bench in oak. dining, hallway, or the foot of a bed.',
        dims: { w: 1800, d: 320, h: 460, unit: 'mm' },
        materials: ['solid european oak', 'blackened steel bracket'],
        year: '2024', edition: 'open',
        inspiration: 'the first draft — cut long, trimmed later. sized to seat three, but never fills up.',
        order: '4–6 weeks. lengths can be adjusted in 100mm increments.',
      },
    ],
  },
  tables: {
    label: 'tables',
    items: [
      {
        id: 'field-coffee-table', name: 'field coffee table', ref: 'T-01', bp: 'coffee-table',
        price: '£620', status: 'in stock',
        desc: 'low, wide, clear-oiled ash. a surface to leave things on.',
        dims: { w: 1200, d: 700, h: 340, unit: 'mm' },
        materials: ['solid ash', 'hardwax oil'],
        year: '2023', edition: 'open',
        inspiration: 'a field of type — the coffee table is the paragraph you drop things on top of. wide enough for books to spread.',
        order: 'ships in 5 working days.',
      },
      {
        id: 'margin-desk', name: 'margin desk', ref: 'T-02', bp: 'desk',
        price: '£980', status: 'made to order',
        desc: 'a writing desk with a ruled edge and a paper drawer.',
        dims: { w: 1400, d: 620, h: 740, unit: 'mm' },
        materials: ['oak top', 'blackened steel frame', 'linen drawer lining'],
        year: '2024', edition: 'open',
        inspiration: 'the ruled edge on graph paper — a line where the writing starts. drawer sized for a4.',
        order: '4–6 weeks. cable pass-through on request.',
      },
      {
        id: 'dot-side-table', name: 'dot side table', ref: 'T-03', bp: 'side-table',
        price: '£310', status: 'in stock',
        desc: 'round, three-legged. next to a chair or a bed.',
        dims: { d: 380, h: 520, unit: 'mm' },
        materials: ['solid ash', 'brass ferrule'],
        year: '2022', edition: 'open',
        inspiration: 'a full stop — punctuation in the room. small, round, done.',
        order: 'ships in 3 working days.',
      },
    ],
  },
  lighting: {
    label: 'lighting',
    items: [
      {
        id: 'arc-floor-lamp', name: 'arc floor lamp', ref: 'L-01', bp: 'floor-lamp',
        price: '£490', status: 'made to order',
        desc: 'cast-iron base, brass arm, linen shade. floods a corner.',
        dims: { d: 480, h: 1650, reach: 900, unit: 'mm' },
        materials: ['cast-iron base', 'brass arm', 'linen shade'],
        year: '2024', edition: 'open',
        inspiration: 'a reading lamp for a reading chair. the arc is drawn from a compass — a single sweep from the base to the page.',
        order: '4 weeks. supplied with e27 warm-white LED (2700k).',
      },
      {
        id: 'note-lamp', name: 'note lamp', ref: 'L-02', bp: 'note-lamp',
        price: '£310', status: 'in stock',
        desc: 'warm task lamp, dimmable, clips to any edge.',
        dims: { d: 180, h: 380, unit: 'mm' },
        materials: ['spun aluminium head', 'steel clamp', 'fabric flex'],
        year: '2023', edition: 'open',
        inspiration: 'a marginal note — clipped to the edge of a desk, a shelf, a bedhead. always where the light needs to go next.',
        order: 'ships in 3 days. dimmer built into cord.',
      },
      {
        id: 'rule-pendant', name: 'rule pendant', ref: 'L-03', bp: 'pendant',
        price: '£280', status: 'in stock',
        desc: 'spun-steel shade, matte black. hangs from a fabric cord.',
        dims: { d: 300, h: 180, cord: 2000, unit: 'mm' },
        materials: ['spun steel, matte black', 'braided fabric flex', 'ceramic e27'],
        year: '2022', edition: 'open',
        inspiration: 'a horizontal rule — a line drawn across the room at head-height. everything below is a paragraph.',
        order: 'ships in 3 days. cord length adjustable on install.',
      },
    ],
  },
  storage: {
    label: 'storage',
    items: [
      {
        id: 'field-bookcase', name: 'field bookcase', ref: 'X-01', bp: 'bookshelf',
        price: '£860', status: 'made to order',
        desc: 'open shelving in ash, 5 shelves. holds books and everything else.',
        dims: { w: 900, d: 320, h: 1800, unit: 'mm' },
        materials: ['solid ash', 'hardwax oil', 'blackened steel wall bracket'],
        year: '2024', edition: 'open',
        inspiration: 'a field of shelves. no doors, no glass — just the spines showing. sized to a4 lever-arch.',
        order: '5–7 weeks. wall-fixing kit included.',
      },
      {
        id: 'margin-sideboard', name: 'margin sideboard', ref: 'X-02', bp: 'sideboard',
        price: '£1,200', status: 'made to order',
        desc: 'solid oak, three drawers, two doors. a long, quiet piece.',
        dims: { w: 1800, d: 460, h: 780, unit: 'mm' },
        materials: ['solid european oak', 'brass handle', 'linen-lined drawers'],
        year: '2024', edition: 'open',
        inspiration: 'the margin note grown up — long, patient, waiting to be opened. drawers on the left, doors on the right.',
        order: '6–8 weeks. sample oak sent on request.',
      },
      {
        id: 'dot-shelf', name: 'dot shelf', ref: 'X-03', bp: 'dot-shelf',
        price: '£420', status: 'made to order',
        desc: 'a pegboard shelf on a 28mm grid. rearrange endlessly.',
        dims: { w: 900, d: 240, h: 900, pitch: 28, unit: 'mm' },
        materials: ['birch ply, oiled', 'oak pegs', 'brass locators'],
        year: '2023', edition: 'open',
        inspiration: 'graph paper on the wall. rearrange the shelves whenever the room changes its mind.',
        order: '4 weeks. supplied with 12 pegs and 4 shelves.',
      },
    ],
  },
};

// Single living room layout. Pieces cluster naturally around a seating area.
// Z > 0 = closer to viewer (all in front of backwall at translateZ(-380px)).
// Vertical top % is tuned so each piece appears to sit on the same floor.
var ROOM_PIECES = [
  // back wall: sofa centre, bookshelf far right
  { id: 'sofa',         category: 'seating',  label: 'sofa',         left: '28%', top: '28%', z:  0, scale: 1.00 },
  { id: 'bookshelf',    category: 'storage',  label: 'bookshelf',    left: '62%', top: '14%', z:  0, scale: 0.78 },
  // mid zone: armchair left, floor lamp reading corner, side table between them
  { id: 'floor-lamp',   category: 'lighting', label: 'floor lamp',   left: '14%', top:  '8%', z:  8, scale: 0.82 },
  { id: 'armchair',     category: 'seating',  label: 'armchair',     left: '13%', top: '33%', z: 25, scale: 0.88 },
  { id: 'side-table',   category: 'tables',   label: 'side table',   left: '22%', top: '47%', z: 42, scale: 0.74 },
  // foreground: coffee table in front of sofa
  { id: 'coffee-table', category: 'tables',   label: 'coffee table', left: '26%', top: '57%', z: 62, scale: 1.02 },
];

// ─── SVG silhouettes — true 3/4 isometric, DX=-22 DY=-10 ─────────────────────
// Helper convention:
//   top face of a rect at (x,y,w,h):  M x,y  L x+w,y  L x+w-22,y-10  L x-22,y-10  Z
//   left face of a rect at (x,y,w,h): M x,y  L x-22,y-10  L x-22,y+h-10  L x,y+h  Z

function SofaSVG() {
  // viewBox="0 0 390 250"
  // Three blocks: plinth y=200-228 h=28, seat y=142-200 h=58, backrest y=54-142 h=88
  // Front face x=52..332 (w=280)
  // Armrests: left x=52..74 (w=22), right x=310..332 (w=22), raised from y=104
  return (
    <svg viewBox="0 0 390 250" fill="none" xmlns="http://www.w3.org/2000/svg" width="390" height="250">

      {/* ── PLINTH (y=200, h=28) ── */}
      {/* top face */}
      <path d="M52,200 L332,200 L310,190 L30,190 Z" fill="#dedad0"/>
      {/* left face */}
      <path d="M52,200 L30,190 L30,218 L52,228 Z" fill="#b09040"/>
      {/* front face */}
      <rect x="52" y="200" width="280" height="28" fill="#1c1c1c"/>

      {/* ── SEAT (y=142, h=58) ── */}
      {/* top face */}
      <path d="M52,142 L332,142 L310,132 L30,132 Z" fill="#dedad0"/>
      {/* left face */}
      <path d="M52,142 L30,132 L30,190 L52,200 Z" fill="#c4a050"/>
      {/* front face */}
      <rect x="52" y="142" width="280" height="58" fill="#1c1c1c"/>
      {/* cushion dividers on front face */}
      <line x1="145" y1="142" x2="145" y2="200" stroke="#f5f3ee" strokeWidth="1.5" opacity="0.18"/>
      <line x1="239" y1="142" x2="239" y2="200" stroke="#f5f3ee" strokeWidth="1.5" opacity="0.18"/>

      {/* ── BACKREST (y=54, h=88) ── */}
      {/* top face */}
      <path d="M52,54 L332,54 L310,44 L30,44 Z" fill="#dedad0"/>
      {/* left face */}
      <path d="M52,54 L30,44 L30,132 L52,142 Z" fill="#c4a050"/>
      {/* front face */}
      <rect x="52" y="54" width="280" height="88" fill="#1c1c1c"/>
      {/* cushion dividers continued on backrest */}
      <line x1="145" y1="54" x2="145" y2="142" stroke="#f5f3ee" strokeWidth="1.5" opacity="0.12"/>
      <line x1="239" y1="54" x2="239" y2="142" stroke="#f5f3ee" strokeWidth="1.5" opacity="0.12"/>

      {/* ── LEFT ARMREST raised panel (x=52..74, from y=104) ── */}
      {/* top face */}
      <path d="M52,104 L74,104 L52,94 L30,94 Z" fill="#dedad0"/>
      {/* left face */}
      <path d="M52,104 L30,94 L30,190 L52,200 Z" fill="#b09040"/>
      {/* front face */}
      <rect x="52" y="104" width="22" height="96" fill="#252525"/>

      {/* ── RIGHT ARMREST raised panel (x=310..332, from y=104) ── */}
      {/* top face */}
      <path d="M310,104 L332,104 L310,94 L288,94 Z" fill="#dedad0"/>
      {/* front face (right armrest, no left depth face visible) */}
      <rect x="310" y="104" width="22" height="96" fill="#252525"/>

    </svg>
  );
}

function ArmchairSVG() {
  // viewBox="0 0 240 250"
  // Three blocks: plinth y=210 h=24, seat y=152 h=58, backrest y=60 h=92
  // Front face x=50..190 (w=140)
  // Armrests: left x=50..70 (w=20), right x=170..190 (w=20), raised from y=110
  return (
    <svg viewBox="0 0 240 250" fill="none" xmlns="http://www.w3.org/2000/svg" width="240" height="250">

      {/* ── PLINTH (y=210, h=24) ── */}
      <path d="M50,210 L190,210 L168,200 L28,200 Z" fill="#dedad0"/>
      <path d="M50,210 L28,200 L28,224 L50,234 Z" fill="#b09040"/>
      <rect x="50" y="210" width="140" height="24" fill="#1c1c1c"/>

      {/* ── SEAT (y=152, h=58) ── */}
      <path d="M50,152 L190,152 L168,142 L28,142 Z" fill="#dedad0"/>
      <path d="M50,152 L28,142 L28,200 L50,210 Z" fill="#c4a050"/>
      <rect x="50" y="152" width="140" height="58" fill="#1c1c1c"/>

      {/* ── BACKREST (y=60, h=92) ── */}
      <path d="M50,60 L190,60 L168,50 L28,50 Z" fill="#dedad0"/>
      <path d="M50,60 L28,50 L28,142 L50,152 Z" fill="#c4a050"/>
      <rect x="50" y="60" width="140" height="92" fill="#1c1c1c"/>

      {/* ── LEFT ARMREST raised (x=50..70, from y=110) ── */}
      <path d="M50,110 L70,110 L48,100 L28,100 Z" fill="#dedad0"/>
      <path d="M50,110 L28,100 L28,200 L50,210 Z" fill="#b09040"/>
      <rect x="50" y="110" width="20" height="100" fill="#252525"/>

      {/* ── RIGHT ARMREST raised (x=170..190, from y=110) ── */}
      <path d="M170,110 L190,110 L168,100 L148,100 Z" fill="#dedad0"/>
      <rect x="170" y="110" width="20" height="100" fill="#252525"/>

    </svg>
  );
}

function CoffeeTableSVG() {
  // viewBox="0 0 380 180"
  // Table top board: x=40..340 at y=60, h=16 front edge
  // Apron: x=40..340, y=76, h=18
  // 4 legs: pairs at x=44,108 and x=260,318, each 16px wide from y=94 to y=172
  // Stretcher at y=148
  // Large top face: M40,60 L340,60 L318,50 L18,50 fill=#dedad0
  return (
    <svg viewBox="0 0 380 180" fill="none" xmlns="http://www.w3.org/2000/svg" width="380" height="180">

      {/* ── TABLE TOP — EMPHASIZE THE LIT SURFACE ── */}
      {/* large warm top face parallelogram */}
      <path d="M40,60 L340,60 L318,50 L18,50 Z" fill="#dedad0"/>
      {/* left depth face of top board */}
      <path d="M40,60 L18,50 L18,66 L40,76 Z" fill="#c4a050"/>
      {/* front edge of top board */}
      <rect x="40" y="60" width="300" height="16" fill="#1c1c1c"/>

      {/* ── APRON ── */}
      {/* top face of apron */}
      <path d="M40,76 L340,76 L318,66 L18,66 Z" fill="#c8b870" opacity="0.5"/>
      {/* left face of apron */}
      <path d="M40,76 L18,66 L18,84 L40,94 Z" fill="#b09040"/>
      {/* front face of apron */}
      <rect x="40" y="76" width="300" height="18" fill="#242424"/>

      {/* ── LEGS ── */}
      {/* front-left leg */}
      <path d="M44,94 L22,84 L22,162 L44,172 Z" fill="#b09040"/>
      <rect x="44" y="94" width="16" height="78" fill="#1c1c1c"/>
      {/* inner-left leg */}
      <path d="M108,94 L86,84 L86,162 L108,172 Z" fill="#b09040" opacity="0.7"/>
      <rect x="108" y="94" width="16" height="78" fill="#1c1c1c" opacity="0.85"/>

      {/* inner-right leg */}
      <path d="M260,94 L238,84 L238,162 L260,172 Z" fill="#b09040" opacity="0.5"/>
      <rect x="260" y="94" width="16" height="78" fill="#1c1c1c" opacity="0.85"/>
      {/* front-right leg */}
      <path d="M318,94 L296,84 L296,162 L318,172 Z" fill="#b09040" opacity="0.4"/>
      <rect x="318" y="94" width="16" height="78" fill="#1c1c1c"/>

      {/* ── STRETCHER at y=148 ── */}
      {/* top face */}
      <path d="M60,148 L318,148 L296,138 L38,138 Z" fill="#dedad0" opacity="0.6"/>
      {/* left face */}
      <path d="M60,148 L38,138 L38,154 L60,164 Z" fill="#b09040" opacity="0.7"/>
      {/* front face */}
      <rect x="60" y="148" width="258" height="10" fill="#1c1c1c" opacity="0.7"/>

    </svg>
  );
}

function SideTableSVG() {
  // viewBox="0 0 160 220" — Saarinen-style round pedestal
  return (
    <svg viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg" width="160" height="220">

      {/* ── GLOW AURA above/around the table top ── */}
      <ellipse cx="80" cy="52" rx="80" ry="30" fill="rgba(255,200,60,0.06)"/>
      <ellipse cx="80" cy="52" rx="60" ry="22" fill="rgba(255,200,60,0.06)"/>

      {/* ── TABLE TOP (large lit ellipse) ── */}
      <ellipse cx="80" cy="52" rx="68" ry="24" fill="#dedad0"/>
      {/* Rim depth below top — warm amber */}
      <ellipse cx="80" cy="60" rx="68" ry="24" fill="#c4a050"/>
      {/* Mask out top half of lower ellipse so it looks like a rim */}
      <ellipse cx="80" cy="52" rx="68" ry="24" fill="#dedad0"/>
      {/* Visible rim crescent */}
      <path d="M12,60 Q12,84 80,84 Q148,84 148,60 L148,52 Q148,76 80,76 Q12,76 12,52 Z" fill="#c4a050"/>
      {/* Underside disc */}
      <ellipse cx="80" cy="64" rx="64" ry="20" fill="#1a1a1a"/>

      {/* ── COLUMN ── */}
      {/* left face of column */}
      <path d="M68,68 L46,58 L46,166 L68,176 Z" fill="#b09040"/>
      {/* front face of column */}
      <rect x="68" y="68" width="24" height="108" fill="#1a1a1a"/>

      {/* ── BASE DISC ── */}
      {/* top rim parallelogram */}
      <path d="M22,190 L122,190 L118,182 L18,182 Z" fill="#a09060"/>
      {/* base ellipse */}
      <ellipse cx="72" cy="190" rx="50" ry="16" fill="#1a1a1a"/>

    </svg>
  );
}

// Floor lamp — THE light source. Dramatic warm amber.
function FloorLampSVG() {
  return (
    <svg viewBox="0 0 180 400" fill="none" xmlns="http://www.w3.org/2000/svg" width="180" height="400">

      {/* ── LIGHT CONE below shade (very subtle fill) ── */}
      <path d="M90,72 Q64,200 20,360 L108,360 Q128,200 170,52 Z" fill="rgba(255,160,20,0.06)"/>

      {/* ── GLOW AURA around shade ── */}
      <ellipse cx="130" cy="28" rx="80" ry="38" fill="rgba(255,180,30,0.06)"/>
      <ellipse cx="130" cy="28" rx="60" ry="28" fill="rgba(255,180,30,0.10)"/>
      <ellipse cx="130" cy="28" rx="40" ry="18" fill="rgba(255,180,30,0.18)"/>

      {/* ── BASE — layered ellipses ── */}
      <ellipse cx="64" cy="380" rx="48" ry="14" fill="#1a1a1a"/>
      <ellipse cx="64" cy="374" rx="36" ry="10" fill="#242424"/>
      <ellipse cx="64" cy="368" rx="22" ry="7"  fill="#1a1a1a"/>
      {/* base left-face depth */}
      <path d="M42,368 L20,358 L20,374 L42,384 Z" fill="#b09040" opacity="0.6"/>

      {/* ── POLE ── */}
      {/* left face */}
      <path d="M56,180 L34,170 L34,362 L56,372 Z" fill="#b09040"/>
      {/* front face */}
      <rect x="56" y="180" width="10" height="192" fill="#1a1a1a"/>

      {/* ── ARC ARM sweeping from pole top to shade ── */}
      <path d="M56,180 Q46,90 130,28" stroke="#1a1a1a" strokeWidth="12" fill="none" strokeLinecap="round"/>
      {/* arm left-depth highlight */}
      <path d="M56,180 Q44,88 126,24" stroke="#b09040" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5"/>

      {/* ── SHADE — large warm amber ── */}
      {/* shade top ellipse */}
      <ellipse cx="130" cy="22" rx="40" ry="14" fill="#e8a020"/>
      {/* shade cone body */}
      <path d="M90,22 Q86,60 68,72 L192,52 Q190,10 170,18 Z" fill="#d4900a"/>
      {/* shade rim glow */}
      <ellipse cx="130" cy="22" rx="40" ry="14" fill="rgba(255,220,80,0.22)"/>
      {/* shade underside warm glow */}
      <ellipse cx="118" cy="66" rx="36" ry="11" fill="#c07800" opacity="0.55"/>
      {/* hot spot on top of shade */}
      <ellipse cx="130" cy="20" rx="18" ry="6" fill="rgba(255,240,120,0.35)"/>

    </svg>
  );
}

function BookshelfSVG() {
  // viewBox="0 0 260 310"
  // Everything offset right by 26px for left depth face room.
  // Panels: left x=26..42, right x=220..236. Full height h=282 from y=22.
  return (
    <svg viewBox="0 0 260 310" fill="none" xmlns="http://www.w3.org/2000/svg" width="260" height="310">

      {/* ── LEFT DEPTH FACE of whole unit ── */}
      <path d="M26,22 L4,12 L4,294 L26,304 Z" fill="#c4a050"/>

      {/* ── TOP BOARD ── */}
      {/* top face */}
      <path d="M26,22 L236,22 L214,12 L4,12 Z" fill="#dedad0"/>
      {/* left face */}
      <path d="M26,22 L4,12 L4,34 L26,34 Z" fill="#c4a050"/>
      {/* front face */}
      <rect x="26" y="22" width="210" height="12" fill="#1c1c1c"/>

      {/* ── BOTTOM BOARD ── */}
      {/* top face */}
      <path d="M26,292 L236,292 L214,282 L4,282 Z" fill="#dedad0" opacity="0.6"/>
      {/* left face */}
      <path d="M26,292 L4,282 L4,304 L26,304 Z" fill="#b09040"/>
      {/* front face */}
      <rect x="26" y="292" width="210" height="12" fill="#1c1c1c"/>

      {/* ── LEFT PANEL ── */}
      <rect x="26" y="22" width="16" height="282" fill="#1c1c1c"/>

      {/* ── RIGHT PANEL ── */}
      <rect x="220" y="22" width="16" height="282" fill="#1c1c1c"/>

      {/* ── SHELVES at y=90, 140, 190, 240 ── */}
      {/* Shelf at y=90 */}
      <path d="M26,90 L220,90 L198,80 L4,80 Z" fill="#dedad0" opacity="0.7"/>
      <path d="M26,90 L4,80 L4,98 L26,98 Z" fill="#b09040"/>
      <rect x="26" y="90" width="194" height="8" fill="#1c1c1c"/>

      {/* Shelf at y=140 */}
      <path d="M26,140 L220,140 L198,130 L4,130 Z" fill="#dedad0" opacity="0.7"/>
      <path d="M26,140 L4,130 L4,148 L26,148 Z" fill="#b09040"/>
      <rect x="26" y="140" width="194" height="8" fill="#1c1c1c"/>

      {/* Shelf at y=190 */}
      <path d="M26,190 L220,190 L198,180 L4,180 Z" fill="#dedad0" opacity="0.7"/>
      <path d="M26,190 L4,180 L4,198 L26,198 Z" fill="#b09040"/>
      <rect x="26" y="190" width="194" height="8" fill="#1c1c1c"/>

      {/* Shelf at y=240 */}
      <path d="M26,240 L220,240 L198,230 L4,230 Z" fill="#dedad0" opacity="0.7"/>
      <path d="M26,240 L4,230 L4,248 L26,248 Z" fill="#b09040"/>
      <rect x="26" y="240" width="194" height="8" fill="#1c1c1c"/>

      {/* ── BOOKS — shelf 1 (y=22..90) ── */}
      <rect x="42"  y="28" width="11" height="62" rx="1" fill="#1a1a1a" opacity="0.58"/>
      <rect x="55"  y="34" width="8"  height="56" rx="1" fill="#1a1a1a" opacity="0.40"/>
      <rect x="65"  y="26" width="13" height="64" rx="1" fill="#1a1a1a" opacity="0.64"/>
      <rect x="80"  y="32" width="8"  height="58" rx="1" fill="#1a1a1a" opacity="0.36"/>
      <rect x="90"  y="28" width="11" height="62" rx="1" fill="#1a1a1a" opacity="0.52"/>
      <rect x="103" y="30" width="12" height="60" rx="1" fill="#1a1a1a" opacity="0.46"/>
      <rect x="117" y="26" width="9"  height="64" rx="1" fill="#1a1a1a" opacity="0.60"/>
      <rect x="128" y="32" width="10" height="58" rx="1" fill="#1a1a1a" opacity="0.44"/>

      {/* ── BOOKS — shelf 2 (y=90..140) ── */}
      <rect x="42"  y="98"  width="10" height="42" rx="1" fill="#1a1a1a" opacity="0.48"/>
      <rect x="54"  y="94"  width="13" height="46" rx="1" fill="#1a1a1a" opacity="0.63"/>
      <rect x="69"  y="100" width="8"  height="40" rx="1" fill="#1a1a1a" opacity="0.38"/>
      <rect x="79"  y="96"  width="11" height="44" rx="1" fill="#1a1a1a" opacity="0.54"/>
      <rect x="92"  y="98"  width="9"  height="42" rx="1" fill="#1a1a1a" opacity="0.44"/>
      <rect x="103" y="94"  width="12" height="46" rx="1" fill="#1a1a1a" opacity="0.58"/>
      <rect x="117" y="100" width="10" height="40" rx="1" fill="#1a1a1a" opacity="0.40"/>

      {/* ── BOOKS — shelf 3 (y=140..190) ── */}
      <rect x="42"  y="148" width="12" height="42" rx="1" fill="#1a1a1a" opacity="0.56"/>
      <rect x="56"  y="144" width="9"  height="46" rx="1" fill="#1a1a1a" opacity="0.42"/>
      <rect x="67"  y="148" width="14" height="42" rx="1" fill="#1a1a1a" opacity="0.61"/>
      <rect x="83"  y="146" width="8"  height="44" rx="1" fill="#1a1a1a" opacity="0.38"/>
      <rect x="93"  y="148" width="11" height="42" rx="1" fill="#1a1a1a" opacity="0.50"/>
      <rect x="106" y="144" width="9"  height="46" rx="1" fill="#1a1a1a" opacity="0.45"/>
      <rect x="117" y="148" width="13" height="42" rx="1" fill="#1a1a1a" opacity="0.55"/>

      {/* ── BOOKS — shelf 4 (y=190..240) ── */}
      <rect x="42"  y="198" width="10" height="42" rx="1" fill="#1a1a1a" opacity="0.52"/>
      <rect x="54"  y="194" width="12" height="46" rx="1" fill="#1a1a1a" opacity="0.46"/>
      <rect x="68"  y="198" width="9"  height="42" rx="1" fill="#1a1a1a" opacity="0.60"/>
      <rect x="79"  y="196" width="13" height="44" rx="1" fill="#1a1a1a" opacity="0.40"/>
      <rect x="94"  y="198" width="10" height="42" rx="1" fill="#1a1a1a" opacity="0.54"/>
      <rect x="106" y="194" width="8"  height="46" rx="1" fill="#1a1a1a" opacity="0.38"/>
      <rect x="116" y="198" width="11" height="42" rx="1" fill="#1a1a1a" opacity="0.48"/>

    </svg>
  );
}

var SVG_COMPONENTS = {
  'sofa':         SofaSVG,
  'armchair':     ArmchairSVG,
  'coffee-table': CoffeeTableSVG,
  'side-table':   SideTableSVG,
  'floor-lamp':   FloorLampSVG,
  'bookshelf':    BookshelfSVG,
};

// ─── Blueprint line drawings ─────────────────────────────────────────────────
// Stroke-only elevations, drawn in "currentColor" so the parent tile controls
// the ink (pale cyan on blueprint blue). Dashed construction lines and
// dimension callouts reinforce the deconstructed / architectural feel.

function BpSofa() {
  return (
    <svg viewBox="0 0 220 160" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="20" y="60" width="180" height="70" />
      <rect x="20" y="30" width="180" height="30" />
      <rect x="20" y="30" width="18" height="100" />
      <rect x="182" y="30" width="18" height="100" />
      <line x1="80" y1="60" x2="80" y2="130" strokeDasharray="2 3" opacity="0.6" />
      <line x1="140" y1="60" x2="140" y2="130" strokeDasharray="2 3" opacity="0.6" />
      <line x1="34" y1="130" x2="34" y2="146" />
      <line x1="186" y1="130" x2="186" y2="146" />
      <line x1="10" y1="20" x2="10" y2="140" strokeDasharray="1 4" opacity="0.5" />
      <line x1="8" y1="20" x2="12" y2="20" />
      <line x1="8" y1="140" x2="12" y2="140" />
    </svg>
  );
}

function BpArmchair() {
  return (
    <svg viewBox="0 0 160 170" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="30" y="80" width="100" height="55" />
      <rect x="30" y="35" width="100" height="45" />
      <rect x="30" y="45" width="16" height="90" />
      <rect x="114" y="45" width="16" height="90" />
      <line x1="40" y1="135" x2="40" y2="150" />
      <line x1="120" y1="135" x2="120" y2="150" />
      <line x1="20" y1="30" x2="20" y2="150" strokeDasharray="1 4" opacity="0.5" />
      <line x1="18" y1="30" x2="22" y2="30" />
      <line x1="18" y1="150" x2="22" y2="150" />
    </svg>
  );
}

function BpStool() {
  return (
    <svg viewBox="0 0 140 170" fill="none" stroke="currentColor" strokeWidth="1.4">
      <ellipse cx="70" cy="50" rx="46" ry="10" />
      <line x1="30" y1="52" x2="26" y2="150" />
      <line x1="110" y1="52" x2="114" y2="150" />
      <line x1="70" y1="60" x2="70" y2="152" strokeDasharray="2 3" opacity="0.7" />
      <line x1="20" y1="152" x2="120" y2="152" />
      <line x1="24" y1="152" x2="18" y2="158" />
      <line x1="116" y1="152" x2="122" y2="158" />
    </svg>
  );
}

function BpBench() {
  return (
    <svg viewBox="0 0 240 130" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="20" y="40" width="200" height="18" />
      <rect x="30" y="58" width="8" height="55" />
      <rect x="202" y="58" width="8" height="55" />
      <line x1="20" y1="30" x2="220" y2="30" strokeDasharray="1 4" opacity="0.5" />
      <line x1="20" y1="26" x2="20" y2="34" />
      <line x1="220" y1="26" x2="220" y2="34" />
      <line x1="34" y1="113" x2="34" y2="122" />
      <line x1="206" y1="113" x2="206" y2="122" />
    </svg>
  );
}

function BpCoffeeTable() {
  return (
    <svg viewBox="0 0 240 130" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="20" y="40" width="200" height="12" />
      <line x1="20" y1="60" x2="220" y2="60" opacity="0.55" />
      <rect x="30" y="52" width="7" height="60" />
      <rect x="203" y="52" width="7" height="60" />
      <line x1="37" y1="90" x2="203" y2="90" strokeDasharray="2 3" opacity="0.6" />
      <line x1="20" y1="30" x2="220" y2="30" strokeDasharray="1 4" opacity="0.5" />
      <line x1="20" y1="26" x2="20" y2="34" />
      <line x1="220" y1="26" x2="220" y2="34" />
    </svg>
  );
}

function BpDesk() {
  return (
    <svg viewBox="0 0 240 160" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="20" y="40" width="200" height="10" />
      <rect x="20" y="50" width="200" height="24" />
      <line x1="30" y1="60" x2="80" y2="60" opacity="0.6" />
      <circle cx="55" cy="62" r="1.5" fill="currentColor" />
      <line x1="30" y1="74" x2="30" y2="140" />
      <line x1="210" y1="74" x2="210" y2="140" />
      <line x1="20" y1="30" x2="220" y2="30" strokeDasharray="1 4" opacity="0.5" />
      <line x1="20" y1="26" x2="20" y2="34" />
      <line x1="220" y1="26" x2="220" y2="34" />
    </svg>
  );
}

function BpSideTable() {
  return (
    <svg viewBox="0 0 140 170" fill="none" stroke="currentColor" strokeWidth="1.4">
      <ellipse cx="70" cy="40" rx="42" ry="8" />
      <line x1="70" y1="48" x2="70" y2="140" />
      <ellipse cx="70" cy="146" rx="34" ry="6" />
      <line x1="30" y1="146" x2="26" y2="156" strokeDasharray="2 3" opacity="0.5" />
      <line x1="110" y1="146" x2="114" y2="156" strokeDasharray="2 3" opacity="0.5" />
      <line x1="20" y1="30" x2="20" y2="152" strokeDasharray="1 4" opacity="0.5" />
      <line x1="18" y1="30" x2="22" y2="30" />
      <line x1="18" y1="152" x2="22" y2="152" />
    </svg>
  );
}

function BpFloorLamp() {
  return (
    <svg viewBox="0 0 180 240" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M50,210 Q40,110 130,40" />
      <line x1="42" y1="210" x2="58" y2="210" />
      <ellipse cx="60" cy="212" rx="30" ry="6" />
      <path d="M110,32 L150,32 L162,64 L98,64 Z" />
      <line x1="110" y1="32" x2="98" y2="64" opacity="0.5" />
      <line x1="150" y1="32" x2="162" y2="64" opacity="0.5" />
      <line x1="130" y1="16" x2="130" y2="24" strokeDasharray="1 2" opacity="0.6" />
      <line x1="122" y1="20" x2="138" y2="20" strokeDasharray="1 2" opacity="0.6" />
    </svg>
  );
}

function BpNoteLamp() {
  return (
    <svg viewBox="0 0 160 190" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="20" y="150" width="40" height="14" />
      <rect x="26" y="140" width="28" height="10" />
      <line x1="40" y1="140" x2="80" y2="70" />
      <line x1="80" y1="70" x2="120" y2="50" />
      <path d="M110,30 L138,30 L146,60 L106,64 Z" />
      <line x1="20" y1="180" x2="60" y2="180" strokeDasharray="2 3" opacity="0.5" />
    </svg>
  );
}

function BpPendant() {
  return (
    <svg viewBox="0 0 140 200" fill="none" stroke="currentColor" strokeWidth="1.4">
      <line x1="70" y1="10" x2="70" y2="120" />
      <path d="M32,120 L108,120 L92,160 L48,160 Z" />
      <ellipse cx="70" cy="160" rx="22" ry="4" />
      <line x1="60" y1="14" x2="80" y2="14" />
    </svg>
  );
}

function BpBookshelf() {
  return (
    <svg viewBox="0 0 180 240" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="20" y="20" width="140" height="200" />
      <line x1="20" y1="60"  x2="160" y2="60" />
      <line x1="20" y1="100" x2="160" y2="100" />
      <line x1="20" y1="140" x2="160" y2="140" />
      <line x1="20" y1="180" x2="160" y2="180" />
      <line x1="30" y1="26" x2="30" y2="54" opacity="0.55" />
      <line x1="42" y1="26" x2="42" y2="54" opacity="0.55" />
      <line x1="54" y1="26" x2="54" y2="54" opacity="0.55" />
      <line x1="30" y1="66" x2="30" y2="94" opacity="0.55" />
      <line x1="46" y1="66" x2="46" y2="94" opacity="0.55" />
      <line x1="10" y1="20" x2="10" y2="220" strokeDasharray="1 4" opacity="0.5" />
      <line x1="8" y1="20" x2="12" y2="20" />
      <line x1="8" y1="220" x2="12" y2="220" />
    </svg>
  );
}

function BpSideboard() {
  return (
    <svg viewBox="0 0 240 150" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="20" y="30" width="200" height="90" />
      <line x1="20" y1="60" x2="130" y2="60" />
      <line x1="20" y1="90" x2="130" y2="90" />
      <circle cx="75" cy="45" r="2" fill="currentColor" />
      <circle cx="75" cy="75" r="2" fill="currentColor" />
      <circle cx="75" cy="105" r="2" fill="currentColor" />
      <line x1="175" y1="30" x2="175" y2="120" />
      <circle cx="170" cy="75" r="2" fill="currentColor" />
      <circle cx="180" cy="75" r="2" fill="currentColor" />
      <line x1="30" y1="120" x2="30" y2="135" />
      <line x1="210" y1="120" x2="210" y2="135" />
    </svg>
  );
}

function BpDotShelf() {
  var dots = [];
  for (var r = 0; r < 8; r++) {
    for (var c = 0; c < 8; c++) {
      dots.push(<circle key={r + '-' + c} cx={30 + c * 20} cy={20 + r * 20} r="1.2" fill="currentColor" opacity="0.65" />);
    }
  }
  return (
    <svg viewBox="0 0 220 200" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="20" y="10" width="180" height="170" />
      {dots}
      <line x1="30" y1="60" x2="140" y2="60" strokeWidth="2" />
      <line x1="70" y1="120" x2="180" y2="120" strokeWidth="2" />
      <line x1="30" y1="160" x2="110" y2="160" strokeWidth="2" />
    </svg>
  );
}

var BLUEPRINT_SVGS = {
  'sofa':         BpSofa,
  'armchair':     BpArmchair,
  'stool':        BpStool,
  'bench':        BpBench,
  'coffee-table': BpCoffeeTable,
  'desk':         BpDesk,
  'side-table':   BpSideTable,
  'floor-lamp':   BpFloorLamp,
  'note-lamp':    BpNoteLamp,
  'pendant':      BpPendant,
  'bookshelf':    BpBookshelf,
  'sideboard':    BpSideboard,
  'dot-shelf':    BpDotShelf,
};

// ─── CSS ─────────────────────────────────────────────────────────────────────

var ROOM_CSS = [
  '.int-overlay{position:fixed;inset:0;z-index:200;background:#f2f0eb;}',
  '.int-exit-btn{position:fixed;top:22px;right:28px;z-index:210;font-family:var(--font-mono);font-size:11px;letter-spacing:.18em;color:rgba(0,0,0,0.32);background:none;border:none;cursor:pointer;transition:color .15s;padding:4px 0;text-decoration:none;}',
  '.int-exit-btn:hover{color:#111;}',

  /* room container — perspective from viewer's eye height */
  '.int-room{position:absolute;inset:0;perspective:1100px;perspective-origin:50% 36%;overflow:hidden;user-select:none;}',
  '.int-scene{position:absolute;inset:0;transform-style:preserve-3d;transition:transform .3s ease-out;}',

  /* room surfaces */
  '.int-backwall{position:absolute;inset:0;background:linear-gradient(180deg,#e8e5dd 0%,#f2f0eb 60%,#eeece5 100%);transform:translateZ(-380px);}',

  /* floor with perspective-correct grid */
  '.int-floor{position:absolute;width:360%;height:360%;left:-130%;top:38%;' +
  'background-image:' +
  'linear-gradient(90deg,rgba(0,0,0,0.10) 1px,transparent 1px),' +
  'linear-gradient(0deg,rgba(0,0,0,0.07) 1px,transparent 1px),' +
  'linear-gradient(170deg,#dedad0 0%,#e8e5da 40%,#d8d5ca 100%);' +
  'background-size:72px 72px,72px 72px,100% 100%;' +
  'transform:rotateX(72deg);transform-origin:center top;}',

  /* large amber pool on floor */
  '.int-lamp-glow{position:absolute;left:2%;top:46%;width:500px;height:280px;' +
  'background:radial-gradient(ellipse at 28% 25%,' +
  'rgba(255,200,60,0.55) 0%,' +
  'rgba(255,160,20,0.30) 25%,' +
  'rgba(255,130,10,0.14) 50%,' +
  'rgba(255,110,0,0.05) 70%,' +
  'transparent 85%);' +
  'pointer-events:none;transform:translateZ(12px);}',

  /* wall wash — large warm bloom on left side of backwall */
  '.int-lamp-wall-wash{position:absolute;left:0;top:0;width:50%;height:100%;' +
  'background:radial-gradient(ellipse 90% 80% at 16% 8%,' +
  'rgba(255,180,40,0.22) 0%,' +
  'rgba(255,150,20,0.10) 40%,' +
  'rgba(255,130,10,0.04) 65%,' +
  'transparent 80%);' +
  'transform:translateZ(-370px);pointer-events:none;}',

  /* ceiling warm spot */
  '.int-lamp-ceiling{position:absolute;left:0;top:0;width:40%;height:50%;' +
  'background:radial-gradient(ellipse 70% 80% at 18% 0%,' +
  'rgba(255,200,80,0.16) 0%,' +
  'rgba(255,170,40,0.06) 50%,' +
  'transparent 75%);' +
  'transform:translateZ(-375px);pointer-events:none;}',

  /* furniture pieces */
  '.int-piece{position:absolute;cursor:pointer;display:flex;flex-direction:column;align-items:center;}',
  '.int-piece-svg{transition:filter .22s ease,transform .22s ease;}',
  '.int-piece:hover .int-piece-svg{filter:drop-shadow(0 16px 28px rgba(0,0,0,0.22)) drop-shadow(0 0 20px rgba(200,140,40,0.20));transform:translateY(-6px);}',
  '.int-piece-label{font-family:var(--font-mono);font-size:10px;letter-spacing:.2em;color:rgba(0,0,0,0);margin-top:7px;transition:color .2s;white-space:nowrap;text-transform:lowercase;}',
  '.int-piece:hover .int-piece-label{color:rgba(0,0,0,0.38);}',

  '@keyframes int-fadein{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}',

  /* ── blueprint catalog ─────────────────────────────────────────── */
  ':root{--bp-paper:#0e2a4a;--bp-paper-2:#0b2340;--bp-ink:#e6f1fa;--bp-ink-soft:rgba(230,241,250,0.55);--bp-ink-dim:rgba(230,241,250,0.30);--bp-stamp:#ff8a3a;--bp-pixel:"Silkscreen",monospace;--bp-crt:"VT323",monospace;}',

  '.int-cat{animation:int-fadein .26s ease;position:fixed;inset:0;z-index:205;background:var(--bp-paper);color:var(--bp-ink);display:flex;flex-direction:column;overflow-y:auto;' +
  'background-image:' +
  'linear-gradient(rgba(230,241,250,0.06) 1px,transparent 1px),' +
  'linear-gradient(90deg,rgba(230,241,250,0.06) 1px,transparent 1px),' +
  'linear-gradient(rgba(230,241,250,0.10) 1px,transparent 1px),' +
  'linear-gradient(90deg,rgba(230,241,250,0.10) 1px,transparent 1px);' +
  'background-size:24px 24px,24px 24px,120px 120px,120px 120px;}',

  '.int-cat-header{padding:34px 56px 22px;border-bottom:1px dashed rgba(230,241,250,0.22);display:flex;align-items:flex-end;gap:26px;flex-wrap:wrap;}',
  '.int-cat-back{font-family:var(--bp-pixel);font-size:11px;letter-spacing:.16em;color:var(--bp-ink-soft);background:none;border:1px solid rgba(230,241,250,0.28);padding:8px 14px;cursor:pointer;transition:color .14s,border-color .14s,background .14s;text-transform:uppercase;text-decoration:none;}',
  '.int-cat-back:hover{color:var(--bp-ink);border-color:var(--bp-ink);background:rgba(230,241,250,0.05);}',
  '.int-cat-title{font-family:var(--bp-pixel);font-size:26px;letter-spacing:.08em;color:var(--bp-ink);text-transform:uppercase;}',
  '.int-cat-caption{margin-left:auto;font-family:var(--bp-crt);font-size:18px;color:var(--bp-ink-soft);letter-spacing:.06em;}',
  '.int-cat-caption b{color:var(--bp-stamp);font-weight:normal;letter-spacing:.14em;}',

  '.int-cat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:26px;padding:34px 56px 80px;}',

  /* each item card = a blueprint sheet */
  '.bp-tile{position:relative;background:var(--bp-paper-2);border:1px solid rgba(230,241,250,0.24);padding:22px 22px 68px;cursor:pointer;overflow:hidden;transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease;color:var(--bp-ink);}',
  '.bp-tile::before{content:"";position:absolute;inset:0;background-image:' +
  'linear-gradient(rgba(230,241,250,0.05) 1px,transparent 1px),' +
  'linear-gradient(90deg,rgba(230,241,250,0.05) 1px,transparent 1px);' +
  'background-size:16px 16px;pointer-events:none;}',
  '.bp-tile:hover{transform:translateY(-3px);border-color:var(--bp-ink);box-shadow:0 14px 28px rgba(0,0,0,0.35),0 0 0 1px rgba(230,241,250,0.18) inset;}',
  '.bp-tile:hover .bp-stamp{opacity:1;}',

  /* corner registration ticks */
  '.bp-tick{position:absolute;width:10px;height:10px;border:1px solid var(--bp-ink-soft);}',
  '.bp-tick.tl{top:6px;left:6px;border-right:none;border-bottom:none;}',
  '.bp-tick.tr{top:6px;right:6px;border-left:none;border-bottom:none;}',
  '.bp-tick.bl{bottom:6px;left:6px;border-right:none;border-top:none;}',
  '.bp-tick.br{bottom:6px;right:6px;border-left:none;border-top:none;}',

  /* drawing area */
  '.bp-draw{position:relative;height:180px;display:flex;align-items:center;justify-content:center;color:var(--bp-ink);}',
  '.bp-draw svg{max-height:100%;max-width:100%;width:auto;height:auto;filter:drop-shadow(0 0 6px rgba(150,200,255,0.14));}',

  /* callouts around drawing */
  '.bp-callout{position:absolute;font-family:var(--bp-pixel);font-size:8px;letter-spacing:.14em;color:var(--bp-ink-soft);text-transform:uppercase;}',
  '.bp-callout.n{top:4px;left:14px;}',
  '.bp-callout.e{top:4px;right:14px;}',

  /* title block bottom-right of tile (architectural convention) */
  '.bp-title-block{position:absolute;left:22px;right:22px;bottom:18px;display:grid;grid-template-columns:1fr auto;gap:6px 18px;padding-top:12px;border-top:1px dashed rgba(230,241,250,0.28);}',
  '.bp-name{font-family:var(--bp-pixel);font-size:14px;letter-spacing:.08em;color:var(--bp-ink);text-transform:lowercase;grid-column:1 / span 2;}',
  '.bp-meta{font-family:var(--bp-crt);font-size:15px;line-height:1;color:var(--bp-ink-soft);letter-spacing:.04em;}',
  '.bp-meta b{color:var(--bp-ink);font-weight:normal;}',
  '.bp-meta.right{text-align:right;}',

  /* orange stamp badge — sondr designs mark */
  '.bp-stamp{position:absolute;top:14px;right:14px;font-family:var(--bp-pixel);font-size:8px;letter-spacing:.14em;color:var(--bp-stamp);border:1px solid var(--bp-stamp);padding:4px 6px;text-transform:uppercase;opacity:0.55;transition:opacity .18s;}',

  /* ── item detail page ─────────────────────────────────────────── */
  '.int-item{animation:int-fadein .26s ease;position:fixed;inset:0;z-index:206;background:#f2f0eb;color:#111;overflow-y:auto;}',
  '.int-item-header{position:sticky;top:0;z-index:2;background:#f2f0eb;padding:26px 56px 18px;border-bottom:1px solid rgba(0,0,0,0.08);display:flex;align-items:baseline;gap:20px;}',
  '.int-item-back{font-family:var(--bp-pixel);font-size:11px;letter-spacing:.16em;color:rgba(0,0,0,0.55);background:none;border:1px solid rgba(0,0,0,0.22);padding:8px 14px;cursor:pointer;transition:color .14s,border-color .14s;text-transform:uppercase;}',
  '.int-item-back:hover{color:#111;border-color:#111;}',
  '.int-item-ref{font-family:var(--bp-crt);font-size:18px;color:rgba(0,0,0,0.45);letter-spacing:.04em;margin-left:auto;}',

  '.int-item-body{display:grid;grid-template-columns:1.1fr 1fr;gap:56px;padding:44px 56px 80px;max-width:1400px;}',
  '@media (max-width:900px){.int-item-body{grid-template-columns:1fr;gap:32px;padding:28px;}}',

  /* photo column */
  '.int-item-photos{display:grid;grid-template-columns:1fr 1fr;gap:12px;}',
  '.int-item-photo{aspect-ratio:4 / 5;background:linear-gradient(135deg,#e8e5dc 0%,#d8d4c8 100%);position:relative;overflow:hidden;border:1px solid rgba(0,0,0,0.06);}',
  '.int-item-photo.wide{grid-column:1 / -1;aspect-ratio:8 / 5;}',
  '.int-item-photo::after{content:"photo";position:absolute;bottom:12px;left:14px;font-family:var(--bp-pixel);font-size:8px;letter-spacing:.14em;color:rgba(0,0,0,0.32);text-transform:uppercase;}',
  '.int-item-photo .ghost{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(0,0,0,0.14);}',

  /* copy column */
  '.int-item-name{font-family:var(--bp-pixel);font-size:36px;letter-spacing:.05em;color:#111;text-transform:lowercase;line-height:1.1;}',
  '.int-item-price{font-family:var(--font-mono);font-size:16px;letter-spacing:.08em;color:rgba(0,0,0,0.55);margin-top:14px;}',
  '.int-item-status{display:inline-block;font-family:var(--bp-pixel);font-size:9px;letter-spacing:.18em;color:var(--bp-stamp);border:1px solid var(--bp-stamp);padding:5px 8px;margin-top:16px;text-transform:uppercase;}',
  '.int-item-desc{font-family:var(--font-mono);font-size:14px;line-height:1.75;color:rgba(0,0,0,0.72);margin-top:26px;max-width:44ch;}',
  '.int-item-h{font-family:var(--bp-pixel);font-size:10px;letter-spacing:.22em;color:rgba(0,0,0,0.45);text-transform:uppercase;margin:36px 0 10px;}',
  '.int-item-inspiration{font-family:var(--font-mono);font-size:13px;line-height:1.85;color:rgba(0,0,0,0.68);max-width:48ch;font-style:italic;}',
  '.int-item-specs{display:grid;grid-template-columns:auto 1fr;column-gap:22px;row-gap:8px;font-family:var(--font-mono);font-size:12px;color:rgba(0,0,0,0.72);letter-spacing:.04em;}',
  '.int-item-specs dt{color:rgba(0,0,0,0.42);}',
  '.int-item-order{margin-top:32px;padding:22px 24px;border:1px solid rgba(0,0,0,0.14);background:rgba(255,255,255,0.4);}',
  '.int-item-order p{font-family:var(--font-mono);font-size:12px;line-height:1.7;color:rgba(0,0,0,0.7);margin:0 0 16px;}',
  '.int-item-order-btn{font-family:var(--bp-pixel);font-size:11px;letter-spacing:.18em;color:#f2f0eb;background:#111;border:1px solid #111;padding:12px 22px;cursor:pointer;transition:background .15s,color .15s;text-transform:uppercase;}',
  '.int-item-order-btn:hover{background:var(--bp-stamp);border-color:var(--bp-stamp);color:#111;}',

  /* R3F lounge shell */
  '.int-lounge{position:absolute;inset:0;background:#0e1518;}',
  '.int-lounge canvas{display:block;width:100%!important;height:100%!important;}',
  '.int-loading{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#0e1518;color:rgba(255,220,180,0.55);font-family:var(--font-mono);font-size:12px;letter-spacing:.24em;text-transform:lowercase;}',
  '.int-hint{position:absolute;left:0;right:0;bottom:26px;text-align:center;font-family:var(--font-mono);font-size:10px;letter-spacing:.28em;color:rgba(255,220,180,0.32);pointer-events:none;text-transform:lowercase;animation:int-hint-in 1.4s ease .8s both;}',
  '@keyframes int-hint-in{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:none;}}',
  '.int-overlay-dark .int-exit-btn{color:rgba(255,220,180,0.42);}',
  '.int-overlay-dark .int-exit-btn:hover{color:rgba(255,230,200,0.95);}',
  '.int-overlay-dark{background:#0e1518;}',
].join('\n');

// ─── Room view ────────────────────────────────────────────────────────────────

function RoomView({ onSelectPiece }) {
  var sceneRef = React.useRef(null);

  function handleMouseMove(e) {
    var rect = e.currentTarget.getBoundingClientRect();
    var x = (e.clientX - rect.left - rect.width  / 2) / rect.width;
    var y = (e.clientY - rect.top  - rect.height / 2) / rect.height;
    if (sceneRef.current) {
      sceneRef.current.style.transform =
        'rotateY(' + (x * 4) + 'deg) rotateX(' + (-y * 2) + 'deg)';
    }
  }

  function handleMouseLeave() {
    if (sceneRef.current) {
      sceneRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
    }
  }

  return (
    <div className="int-room" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div ref={sceneRef} className="int-scene">
        <div className="int-backwall" />
        <div className="int-floor" />
        {/* warm lamp glow on floor + wall + ceiling — the only colour in the room */}
        <div className="int-lamp-glow" />
        <div className="int-lamp-wall-wash" />
        <div className="int-lamp-ceiling" />
        {ROOM_PIECES.map(function(piece) {
          var Svg = SVG_COMPONENTS[piece.id];
          return (
            <div
              key={piece.id}
              className="int-piece"
              style={{
                left: piece.left,
                top:  piece.top,
                transform: 'translateZ(' + piece.z + 'px) scale(' + piece.scale + ')',
              }}
              onClick={function() { onSelectPiece(piece.category); }}
            >
              <div className="int-piece-svg"><Svg /></div>
              <span className="int-piece-label">{piece.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Catalog view — blueprint sheets ─────────────────────────────────────────

function formatDims(d) {
  if (!d) return '';
  var parts = [];
  if (d.w) parts.push(d.w);
  if (d.d) parts.push(d.d);
  if (d.h) parts.push(d.h);
  return parts.join(' × ') + ' ' + (d.unit || 'mm');
}

function BlueprintTile({ item, onOpen }) {
  var Bp = BLUEPRINT_SVGS[item.bp] || BLUEPRINT_SVGS.stool;
  return (
    <div className="bp-tile" onClick={function () { onOpen(item); }}>
      <div className="bp-tick tl" />
      <div className="bp-tick tr" />
      <div className="bp-tick bl" />
      <div className="bp-tick br" />
      <div className="bp-stamp">sondr/des</div>
      <div className="bp-draw">
        <span className="bp-callout n">elev · 1:20</span>
        <span className="bp-callout e">{item.ref}</span>
        <Bp />
      </div>
      <div className="bp-title-block">
        <div className="bp-name">{item.name}</div>
        <div className="bp-meta">{formatDims(item.dims)}</div>
        <div className="bp-meta right"><b>{item.price}</b></div>
      </div>
    </div>
  );
}

function CatalogView({ categoryId, onBack, onSelectItem }) {
  var cat = CATALOG_DATA[categoryId];
  if (!cat) return null;
  return (
    <div className="int-cat">
      <div className="int-cat-header">
        <button className="int-cat-back" onClick={onBack}>← room</button>
        <span className="int-cat-title">{cat.label}</span>
        <span className="int-cat-caption">sheet <b>{cat.label.slice(0, 3).toUpperCase()}</b> · rev.24 · sondr designs, leeds</span>
      </div>
      <div className="int-cat-grid">
        {cat.items.map(function (item) {
          return <BlueprintTile key={item.id} item={item} onOpen={onSelectItem} />;
        })}
      </div>
    </div>
  );
}

// ─── Item detail view ───────────────────────────────────────────────────────

function ItemView({ item, onBack }) {
  return (
    <div className="int-item">
      <div className="int-item-header">
        <button className="int-item-back" onClick={onBack}>← catalog</button>
        <span className="int-item-ref">ref · {item.ref} · {item.year}</span>
      </div>
      <div className="int-item-body">
        <div className="int-item-photos">
          <div className="int-item-photo wide"><span className="ghost">image · 01</span></div>
          <div className="int-item-photo"><span className="ghost">image · 02</span></div>
          <div className="int-item-photo"><span className="ghost">image · 03</span></div>
        </div>
        <div>
          <h1 className="int-item-name">{item.name}</h1>
          <div className="int-item-price">{item.price}</div>
          <div className="int-item-status">{item.status}</div>
          <p className="int-item-desc">{item.desc}</p>

          <div className="int-item-h">inspiration</div>
          <p className="int-item-inspiration">{item.inspiration}</p>

          <div className="int-item-h">materials</div>
          <p className="int-item-inspiration" style={{ fontStyle: 'normal' }}>
            {(item.materials || []).join(' · ')}
          </p>

          <div className="int-item-h">specification</div>
          <dl className="int-item-specs">
            <dt>dimensions</dt><dd>{formatDims(item.dims)}</dd>
            <dt>edition</dt><dd>{item.edition}</dd>
            <dt>year</dt><dd>{item.year}</dd>
          </dl>

          <div className="int-item-order">
            <p><b>{item.order}</b></p>
            <p>orders are made in the studio in leeds. we send fabric or timber samples on request. delivery in the uk is included; international freight quoted per piece.</p>
            <button className="int-item-order-btn">enquire to order →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

function InteriorScreen({ go }) {
  var catState = React.useState(null);
  var activeCat = catState[0];
  var setActiveCat = catState[1];

  var itemState = React.useState(null);
  var activeItem = itemState[0];
  var setActiveItem = itemState[1];

  return (
    <div className="int-overlay">
      <style>{ROOM_CSS}</style>
      <button className="int-exit-btn" onClick={function() { if (go) go('home'); }}>
        exit interior ×
      </button>
      <RoomView onSelectPiece={setActiveCat} />
      {activeCat && (
        <CatalogView
          categoryId={activeCat}
          onBack={function() { setActiveCat(null); }}
          onSelectItem={setActiveItem}
        />
      )}
      {activeItem && (
        <ItemView
          item={activeItem}
          onBack={function() { setActiveItem(null); }}
        />
      )}
    </div>
  );
}

window.InteriorScreen = InteriorScreen;