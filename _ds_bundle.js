/* @ds-bundle: {"format":4,"namespace":"SondrDesignsDesignSystem_41b26a","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Divider","sourcePath":"components/core/Divider.jsx"},{"name":"Field","sourcePath":"components/core/Field.jsx"},{"name":"NavItem","sourcePath":"components/navigation/NavItem.jsx"},{"name":"SondrIcon","sourcePath":"components/navigation/SondrIcon.jsx"},{"name":"DottedGrid","sourcePath":"components/scrapbook/DottedGrid.jsx"},{"name":"FlipPolaroid","sourcePath":"components/scrapbook/FlipPolaroid.jsx"},{"name":"PolaroidCard","sourcePath":"components/scrapbook/PolaroidCard.jsx"},{"name":"StickyNote","sourcePath":"components/scrapbook/StickyNote.jsx"},{"name":"Tape","sourcePath":"components/scrapbook/Tape.jsx"},{"name":"Heading","sourcePath":"components/typography/Heading.jsx"},{"name":"MonoText","sourcePath":"components/typography/MonoText.jsx"}],"sourceHashes":{"components/core/Button.jsx":"c0934b060bd1","components/core/Card.jsx":"38b798c01970","components/core/Divider.jsx":"0f13b562724f","components/core/Field.jsx":"5424b845268e","components/navigation/NavItem.jsx":"7c6dd66ae759","components/navigation/SondrIcon.jsx":"60d728f3adba","components/scrapbook/DottedGrid.jsx":"37f559f93490","components/scrapbook/FlipPolaroid.jsx":"13131828bbed","components/scrapbook/PolaroidCard.jsx":"88276b466dc7","components/scrapbook/StickyNote.jsx":"ec3b66c623c7","components/scrapbook/Tape.jsx":"2771b26318d7","components/typography/Heading.jsx":"6fab256c8d40","components/typography/MonoText.jsx":"d6bacf663276","ui_kits/sondr-site/BlogScreen.jsx":"c1cf723d854a","ui_kits/sondr-site/ContactScreen.jsx":"c9602e25e333","ui_kits/sondr-site/HomeScreen.jsx":"baf546c3e870","ui_kits/sondr-site/InteriorScreen.jsx":"7f9a59fe49ca","ui_kits/sondr-site/StudioScreen.jsx":"1390b821435a","ui_kits/sondr-site/WorksScreen.jsx":"4b294b3a7be0","ui_kits/sondr-site/data.js":"1490216ec4ff"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SondrDesignsDesignSystem_41b26a = window.SondrDesignsDesignSystem_41b26a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — Sondr's outlined "ballot box" button. A hairline black
 * rectangle on paper, mono label, wide tracking. Sharp corners.
 */
function Button({
  children,
  variant = 'outline',
  size = 'md',
  as = 'button',
  href,
  onClick,
  disabled = false,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '10px 20px',
      fontSize: '13px'
    },
    md: {
      padding: '15px 34px',
      fontSize: '15px'
    },
    lg: {
      padding: '20px 44px',
      fontSize: '20px'
    }
  };
  const variants = {
    outline: {
      background: 'transparent',
      color: 'var(--ink)',
      boxShadow: 'inset 0 0 0 1px var(--ink)'
    },
    solid: {
      background: 'var(--ink)',
      color: 'var(--paper)',
      boxShadow: 'none'
    },
    sticky: {
      background: 'var(--sticky-yellow)',
      color: 'var(--ink)',
      boxShadow: 'var(--shadow-sticky)'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-mono)',
    fontWeight: 500,
    letterSpacing: 'var(--tracking-wide)',
    lineHeight: 1,
    textTransform: 'lowercase',
    textDecoration: 'none',
    border: 'none',
    borderRadius: 'var(--radius-none)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'transform 120ms ease, background 120ms ease, color 120ms ease',
    ...sizes[size],
    ...variants[variant],
    ...style
  };
  const Tag = as === 'a' || href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    onClick: disabled ? undefined : onClick,
    disabled: Tag === 'button' ? disabled : undefined,
    style: base,
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'translateY(1px)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'translateY(0)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'translateY(0)';
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — a clean white sheet with a hairline black inset border, matching
 * the source's Rectangle (405×146, inset 0 0 0 1px black). Sharp corners.
 * The neutral container for content that isn't taped/pinned.
 */
function Card({
  children,
  padded = true,
  lift = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      background: 'var(--paper-white)',
      boxShadow: lift ? 'inset 0 0 0 1px var(--ink), var(--shadow-lift)' : 'inset 0 0 0 1px var(--ink)',
      borderRadius: 'var(--radius-none)',
      padding: padded ? 'var(--space-3)' : 0,
      boxSizing: 'border-box',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Divider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Divider — a thin ruled line, like a pencil stroke across the page.
 * Horizontal by default; supports a faint "hand-drawn" wobble variant.
 */
function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  color = 'var(--rule-color)',
  length = '100%',
  style = {},
  ...rest
}) {
  const horizontal = orientation === 'horizontal';
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "separator",
    "aria-orientation": orientation,
    style: {
      display: 'block',
      width: horizontal ? length : 0,
      height: horizontal ? 0 : length,
      borderTop: horizontal ? `1.5px ${variant === 'dashed' ? 'dashed' : 'solid'} ${color}` : 'none',
      borderLeft: horizontal ? 'none' : `1.5px ${variant === 'dashed' ? 'dashed' : 'solid'} ${color}`,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Divider.jsx", error: String((e && e.message) || e) }); }

// components/core/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Field — a text input / textarea styled as a hairline paper box with a
 * mono label above it. Matches the Card's border treatment.
 */
function Field({
  label,
  placeholder,
  multiline = false,
  rows = 4,
  value,
  onChange,
  type = 'text',
  style = {},
  ...rest
}) {
  const control = {
    width: '100%',
    boxSizing: 'border-box',
    background: 'var(--paper-white)',
    border: 'none',
    boxShadow: 'inset 0 0 0 1px var(--ink)',
    borderRadius: 'var(--radius-none)',
    padding: '14px 16px',
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-body)',
    letterSpacing: 'var(--tracking-wide)',
    color: 'var(--ink)',
    outline: 'none',
    resize: multiline ? 'vertical' : 'none'
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginBottom: 8,
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-small)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'lowercase',
      color: 'var(--text-muted)'
    }
  }, label), multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    style: control
  }, rest)) : /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    style: control
  }, rest)));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Field.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * NavItem — a single navigation entry. Lowercase mono; the "current"
 * state gets a hand-underline. Lives in the left margin on desktop.
 */
function NavItem({
  children,
  href = '#',
  current = false,
  onClick,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onClick: onClick,
    "aria-current": current ? 'page' : undefined,
    style: {
      display: 'inline-block',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-lead)',
      letterSpacing: 'var(--tracking-wide)',
      color: 'var(--ink)',
      textDecoration: 'none',
      paddingBottom: 2,
      borderBottom: current ? '2px solid var(--ink)' : '2px solid transparent',
      opacity: current ? 1 : 0.72,
      transition: 'opacity 120ms ease, border-color 120ms ease',
      ...style
    },
    onMouseEnter: e => {
      e.currentTarget.style.opacity = 1;
    },
    onMouseLeave: e => {
      e.currentTarget.style.opacity = current ? 1 : 0.72;
    }
  }, rest), children);
}
Object.assign(__ds_scope, { NavItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavItem.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SondrIcon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

const CSS = `
@keyframes sondr-scribble { to { stroke-dashoffset:0 } }
@keyframes sondr-flow { to { stroke-dashoffset:-16 } }
@keyframes sondr-roll { from { transform:rotateX(35deg) rotateY(20deg) } to { transform:rotateX(395deg) rotateY(20deg) } }
.sondr-icon svg { display:block; overflow:visible }
/* works: real CSS 3D cube */
.sondr-ic-works-wrap { display:flex; align-items:center; justify-content:center; perspective:55px }
.sondr-ic-works { width:12px; height:12px; position:relative; transform-style:preserve-3d }
.sondr-ic-works-face { position:absolute; width:12px; height:12px; border:0.5px solid rgba(255,255,255,0.12) }
.sondr-ic-works .f-front  { background:rgb(0,72,238);  transform:translateZ(6px) }
.sondr-ic-works .f-back   { background:rgb(0,28,110);  transform:rotateY(180deg) translateZ(6px) }
.sondr-ic-works .f-top    { background:rgb(0,81,255);  transform:rotateX(-90deg) translateZ(6px) }
.sondr-ic-works .f-bottom { background:rgb(0,20,80);   transform:rotateX(90deg)  translateZ(6px) }
.sondr-ic-works .f-left   { background:rgb(0,48,185);  transform:rotateY(-90deg) translateZ(6px) }
.sondr-ic-works .f-right  { background:rgb(0,62,205);  transform:rotateY(90deg)  translateZ(6px) }
.sondr-ic-works { animation:sondr-roll 3s linear infinite }
/* blog: pen scribble */
.sondr-ic-blog .scribble { stroke-dasharray:60; stroke-dashoffset:60 }
.sondr-icon:hover .sondr-ic-blog .scribble { animation:sondr-scribble .7s ease forwards }
.sondr-ic-blog .pen { transition:transform .35s ease }
.sondr-icon:hover .sondr-ic-blog .pen { transform:translate(2px,-2px) rotate(-8deg) }
/* contact: envelope flap */
.sondr-ic-contact .flap { transform-origin:12px 8px; transform:rotateX(0deg); transition:transform .4s ease }
.sondr-icon:hover .sondr-ic-contact .flap { transform:rotateX(155deg) }
.sondr-ic-contact .letter { transform:translateY(3px); opacity:0; transition:transform .4s ease .1s, opacity .3s ease .1s }
.sondr-icon:hover .sondr-ic-contact .letter { transform:translateY(-3px); opacity:1 }
/* studio: fingerprint flow */
.sondr-ic-studio path { stroke-dasharray:8 4; transition:stroke-dashoffset .3s }
.sondr-icon:hover .sondr-ic-studio path { animation:sondr-flow 1.1s linear infinite }
/* interior: lamp glow */
.sondr-ic-interior .glow { fill:var(--sticky-yellow); opacity:0; transition:opacity .3s ease }
.sondr-ic-interior .bulb { transition:fill .3s ease; fill:transparent }
.sondr-icon:hover .sondr-ic-interior .glow { opacity:.85 }
.sondr-icon:hover .sondr-ic-interior .bulb { fill:var(--sticky-yellow) }
`;
let injected = false;
function useIconCSS() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.setAttribute('data-sondr-icons', '');
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}
function SondrIcon({
  name,
  size = 22,
  stroke = 'var(--ink)',
  style = {},
  ...rest
}) {
  useIconCSS();
  /* works: proper CSS 3D cube — return a div, not an svg */
  if (name === 'works') {
    return /*#__PURE__*/React.createElement('div', {
      className: 'sondr-ic-works-wrap',
      style: { width: size, height: size, ...style },
      ...rest
    },
      /*#__PURE__*/React.createElement('div', { className: 'sondr-ic-works' },
        /*#__PURE__*/React.createElement('div', { className: 'sondr-ic-works-face f-top' }),
        /*#__PURE__*/React.createElement('div', { className: 'sondr-ic-works-face f-front' }),
        /*#__PURE__*/React.createElement('div', { className: 'sondr-ic-works-face f-back' }),
        /*#__PURE__*/React.createElement('div', { className: 'sondr-ic-works-face f-left' }),
        /*#__PURE__*/React.createElement('div', { className: 'sondr-ic-works-face f-right' }),
        /*#__PURE__*/React.createElement('div', { className: 'sondr-ic-works-face f-bottom' })
      )
    );
  }
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke,
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };
  let inner = null;
  if (name === 'blog') {
    inner = /*#__PURE__*/React.createElement("g", { className: "sondr-ic-blog" },
      /*#__PURE__*/React.createElement("path", { className: "scribble", d: "M3 19c3-1 4-3 6-2s3 3 6 1", stroke: "var(--tape-blue)" }),
      /*#__PURE__*/React.createElement("g", { className: "pen" },
        /*#__PURE__*/React.createElement("path", { d: "M15 4l5 5-9 9-5 1 1-5z" }),
        /*#__PURE__*/React.createElement("path", { d: "M14 5l5 5" })
      )
    );
  } else if (name === 'contact') {
    inner = /*#__PURE__*/React.createElement("g", { className: "sondr-ic-contact" },
      /*#__PURE__*/React.createElement("rect", { x: "3", y: "6", width: "18", height: "13", rx: "1" }),
      /*#__PURE__*/React.createElement("rect", { className: "letter", x: "7", y: "4", width: "10", height: "9", rx: "1", fill: "var(--tape-blue)", stroke: "var(--tape-blue)" }),
      /*#__PURE__*/React.createElement("path", { className: "flap", d: "M3 7l9 6 9-6" })
    );
  } else if (name === 'studio') {
    inner = /*#__PURE__*/React.createElement("g", { className: "sondr-ic-studio" },
      /*#__PURE__*/React.createElement("path", { d: "M3 20 C3 8 8 3 12 3 C16 3 21 8 21 20" }),
      /*#__PURE__*/React.createElement("path", { d: "M5.5 20 C5.5 10 9 5.5 12 5.5 C15 5.5 18.5 10 18.5 20" }),
      /*#__PURE__*/React.createElement("path", { d: "M8 20 C8 12 10 8 12 8 C14 8 16 12 16 20" }),
      /*#__PURE__*/React.createElement("path", { d: "M10 20 C10 14 11 11.5 12 11.5 C13 11.5 14 14 14 20" }),
      /*#__PURE__*/React.createElement("path", { d: "M11.5 20 C11.5 16.5 12 15.5 12 15.5" })
    );
  } else if (name === 'interior') {
    inner = /*#__PURE__*/React.createElement("g", { className: "sondr-ic-interior" },
      /*#__PURE__*/React.createElement("ellipse", { className: "glow", cx: "12", cy: "19.5", rx: "9", ry: "2.4", stroke: "none" }),
      /*#__PURE__*/React.createElement("path", { className: "bulb", d: "M8 3h8l3 8H5z" }),
      /*#__PURE__*/React.createElement("path", { d: "M8 3h8l3 8H5z" }),
      /*#__PURE__*/React.createElement("path", { d: "M10 11v4a2 2 0 0 0 4 0v-4" }),
      /*#__PURE__*/React.createElement("path", { d: "M12 19v2" })
    );
  }
  return /*#__PURE__*/React.createElement("svg", _extends({}, common, { style: { display: 'block', ...style } }, rest), inner);
}
Object.assign(__ds_scope, { SondrIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SondrIcon.jsx", error: String((e && e.message) || e) }); }

// components/scrapbook/DottedGrid.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DottedGrid — the notebook dotted-grid surface. Wrap any section in it
 * to get the signature paper background. Optional left margin rule.
 */
function DottedGrid({
  children,
  margin = false,
  paper = 'var(--paper)',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      backgroundColor: paper,
      backgroundImage: 'radial-gradient(var(--dot) var(--dot-size), transparent var(--dot-size))',
      backgroundSize: 'var(--grid-pitch) var(--grid-pitch)',
      ...style
    }
  }, rest), margin && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 'var(--margin-rule-x)',
      width: 0,
      borderLeft: '1.5px solid var(--rule-color)'
    }
  }), children);
}
Object.assign(__ds_scope, { DottedGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/scrapbook/DottedGrid.jsx", error: String((e && e.message) || e) }); }

// components/scrapbook/FlipPolaroid.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FlipPolaroid — a work card that shows a polaroid on the front and, on
 * hover, flips (3D) to reveal handwritten-style project notes on the back,
 * like reading what's scribbled on the back of a photo. Sondr's signature
 * "featured works" interaction.
 */
function FlipPolaroid({
  src,
  caption,
  title,
  meta,
  notes,
  tilt = -2,
  width = 260,
  assetBase = '',
  style = {},
  ...rest
}) {
  const frame = `${assetBase}assets/polaroid-frame.png`;
  const height = width * (951 / 731) + 8;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "sondr-flip",
    style: {
      width,
      height,
      perspective: 800,
      transform: `rotate(${tilt}deg)`,
      cursor: 'pointer',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "sondr-flip-inner",
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      transition: 'transform 520ms cubic-bezier(0.37,0,0.63,1)',
      transformStyle: 'preserve-3d'
    }
  }, /*#__PURE__*/React.createElement("figure", {
    style: {
      position: 'absolute',
      inset: 0,
      margin: 0,
      backfaceVisibility: 'hidden',
      filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.20))'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: '731 / 951'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '5.5%',
      left: '9%',
      right: '9%',
      bottom: '17%',
      background: 'var(--paper-edge)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: src ? `url(${src})` : 'none'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: frame,
    alt: "",
    "aria-hidden": "true",
    draggable: false,
    style: {
      position: 'relative',
      display: 'block',
      width: '100%',
      height: 'auto',
      pointerEvents: 'none'
    }
  })), caption != null && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      position: 'absolute',
      left: '9%',
      right: '9%',
      bottom: '8%',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      letterSpacing: 'var(--tracking-wide)',
      color: 'var(--ink)',
      textAlign: 'center'
    }
  }, caption)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backfaceVisibility: 'hidden',
      transform: 'rotateY(180deg)',
      background: 'var(--paper-white)',
      boxShadow: 'inset 0 0 0 1px var(--ink), 0 6px 14px rgba(0,0,0,0.20)',
      padding: '26px 22px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: 'repeating-linear-gradient(transparent 0 27px, rgba(0,81,255,0.12) 27px 28px)'
    }
  }, title && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-wide)',
      fontWeight: 500,
      fontSize: 20,
      lineHeight: 1.1,
      color: 'var(--ink)'
    }
  }, title), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: 'var(--tracking-wide)',
      color: 'var(--ink-soft)',
      marginTop: 6
    }
  }, meta), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13.5,
      lineHeight: '28px',
      letterSpacing: 'var(--tracking-wide)',
      color: 'var(--ink)',
      marginTop: 14
    }
  }, notes), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      marginTop: 'auto',
      fontFamily: 'var(--font-mono)',
      fontSize: 22,
      color: 'var(--tape-blue)'
    }
  }, "\u21A9"))), /*#__PURE__*/React.createElement("style", null, `
        .sondr-flip:hover .sondr-flip-inner,
        .sondr-flip:focus-within .sondr-flip-inner { transform: rotate3d(0.06, 1, 0.04, 180deg); }
      `));
}
Object.assign(__ds_scope, { FlipPolaroid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/scrapbook/FlipPolaroid.jsx", error: String((e && e.message) || e) }); }

// components/scrapbook/PolaroidCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PolaroidCard — an instax/polaroid frame (real bitmap) with a photo
 * window and a caption on the bottom lip. Use for featured works / a
 * gallery. Slight tilt sells the pinned-to-a-board feel.
 */
function PolaroidCard({
  src,
  caption,
  tilt = -2,
  width = 260,
  assetBase = '',
  onClick,
  style = {},
  ...rest
}) {
  const frame = `${assetBase}assets/polaroid-frame.png`;
  return /*#__PURE__*/React.createElement("figure", _extends({
    onClick: onClick,
    style: {
      position: 'relative',
      width,
      margin: 0,
      transform: `rotate(${tilt}deg)`,
      cursor: onClick ? 'pointer' : 'default',
      filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.20))',
      transition: 'transform 160ms ease',
      ...style
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = `rotate(${tilt}deg) translateY(-4px)`;
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = `rotate(${tilt}deg) translateY(0)`;
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: '731 / 951'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '5.5%',
      left: '9%',
      right: '9%',
      bottom: '17%',
      background: 'var(--paper-edge)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: src ? `url(${src})` : 'none'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: frame,
    alt: "",
    "aria-hidden": "true",
    draggable: false,
    style: {
      position: 'relative',
      display: 'block',
      width: '100%',
      height: 'auto',
      pointerEvents: 'none'
    }
  })), caption != null && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      position: 'absolute',
      left: '9%',
      right: '9%',
      bottom: '4%',
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      letterSpacing: 'var(--tracking-wide)',
      color: 'var(--ink)',
      textAlign: 'center'
    }
  }, caption));
}
Object.assign(__ds_scope, { PolaroidCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/scrapbook/PolaroidCard.jsx", error: String((e && e.message) || e) }); }

// components/scrapbook/StickyNote.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StickyNote — a yellow post-it. Slightly tilted, adhesive-lift shadow,
 * one nicked corner. Drop short handwritten-feeling notes inside.
 */
function StickyNote({
  children,
  tilt = -3,
  color = 'var(--sticky-yellow)',
  size = 220,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      width: size,
      minHeight: size * 0.9,
      padding: '22px 20px',
      background: color,
      boxShadow: 'var(--shadow-sticky)',
      transform: `rotate(${tilt}deg)`,
      borderRadius: 'var(--radius-note)',
      fontFamily: 'var(--font-mono)',
      fontSize: '15px',
      lineHeight: 1.5,
      letterSpacing: 'var(--tracking-wide)',
      color: 'var(--ink)',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: 26,
      height: 26,
      background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.12) 50%)'
    }
  }), children);
}
Object.assign(__ds_scope, { StickyNote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/scrapbook/StickyNote.jsx", error: String((e && e.message) || e) }); }

// components/scrapbook/Tape.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tape — a strip of torn adhesive tape, using the real bitmaps from the
 * source. Use to "attach" cards/notes to the page, or as a decorative
 * accent. Absolutely position it over the corner of an element.
 */
const TAPES = {
  blue: 'tape-blue.png',
  cream: 'tape-cream.png'
};
function Tape({
  color = 'cream',
  width = 180,
  tilt = -6,
  assetBase = '',
  style = {},
  ...rest
}) {
  const file = TAPES[color] || TAPES.cream;
  const src = `${assetBase}assets/${file}`;
  // native aspect ratios differ; cream is wide, blue is wide
  const ratio = color === 'blue' ? 0.4 : 0.36;
  return /*#__PURE__*/React.createElement("img", _extends({
    src: src,
    alt: "",
    "aria-hidden": "true",
    draggable: false,
    style: {
      display: 'block',
      width,
      height: 'auto',
      transform: `rotate(${tilt}deg)`,
      filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.28))',
      pointerEvents: 'none',
      userSelect: 'none',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Tape });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/scrapbook/Tape.jsx", error: String((e && e.message) || e) }); }

// components/typography/Heading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Heading — Sondr's display type. Inter, medium, UPPERCASE, tracked wide,
 * tight leading. Levels map to the type scale (display / title / heading).
 */
const LEVELS = {
  display: {
    fontSize: 'var(--text-display)',
    lineHeight: 'var(--text-display-lh)'
  },
  title: {
    fontSize: 'var(--text-title)',
    lineHeight: 1
  },
  heading: {
    fontSize: 'var(--text-heading)',
    lineHeight: 1.05
  }
};
function Heading({
  children,
  level = 'display',
  as,
  color = 'var(--ink)',
  style = {},
  ...rest
}) {
  const Tag = as || (level === 'display' ? 'h1' : level === 'title' ? 'h2' : 'h3');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-medium)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-wide)',
      color,
      ...LEVELS[level],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Heading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/typography/Heading.jsx", error: String((e && e.message) || e) }); }

// components/typography/MonoText.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MonoText — body/label copy in Intel One Mono with wide tracking.
 * The counterpart to Heading; carries all running text, captions, labels.
 */
function MonoText({
  children,
  as = 'p',
  size = 'body',
  muted = false,
  style = {},
  ...rest
}) {
  const sizes = {
    lead: 'var(--text-lead)',
    body: 'var(--text-body)',
    small: 'var(--text-small)'
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      margin: 0,
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-regular)',
      fontSize: sizes[size],
      lineHeight: 'var(--body-lh)',
      letterSpacing: 'var(--tracking-wide)',
      color: muted ? 'var(--text-muted)' : 'var(--ink)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { MonoText });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/typography/MonoText.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sondr-site/BlogScreen.jsx
try { (() => {
/* global React */
// BlogScreen — an honest "in progress" / coming-soon notebook page.
const {
  Heading,
  MonoText,
  Button,
  StickyNote,
  Tape
} = window.SondrDesignsDesignSystem_41b26a;
function BlogScreen() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '90px 80px 120px',
      position: 'relative',
      minHeight: 560
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/tape-cream.png",
    alt: "",
    style: {
      position: 'absolute',
      width: 260,
      top: 40,
      right: 160,
      transform: 'rotate(-9deg)',
      filter: 'drop-shadow(2px 3px 4px rgba(0,0,0,.22))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement(MonoText, {
    muted: true,
    style: {
      marginBottom: 20
    }
  }, "the notebook \u2014 journal"), /*#__PURE__*/React.createElement(Heading, {
    style: {
      fontSize: 80
    }
  }, "currently", /*#__PURE__*/React.createElement("br", null), "scribbling"), /*#__PURE__*/React.createElement(MonoText, {
    style: {
      marginTop: 32,
      maxWidth: 560,
      lineHeight: 1.8
    }
  }, "our journal is still in draft. we're filling the margins with notes on process, type, and the little decisions that make a site feel like a person. first entries land soon."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      marginTop: 40,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "your email",
    style: {
      background: 'var(--paper-white)',
      border: 'none',
      boxShadow: 'inset 0 0 0 1px var(--ink)',
      padding: '16px 18px',
      width: 300,
      fontFamily: 'var(--font-mono)',
      fontSize: 15,
      letterSpacing: '.1em',
      outline: 'none'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "solid",
    size: "lg"
  }, "tell me when it's live"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 90,
      bottom: 90
    }
  }, /*#__PURE__*/React.createElement(StickyNote, {
    tilt: 5,
    size: 190
  }, "draft: \"why we start on paper\""), /*#__PURE__*/React.createElement(StickyNote, {
    tilt: -7,
    size: 170,
    color: "#c9e5ff",
    style: {
      position: 'absolute',
      top: -40,
      right: 120
    }
  }, "draft: \"type as texture\"")));
}
window.BlogScreen = BlogScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sondr-site/BlogScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sondr-site/ContactScreen.jsx
try { (() => {
/* global React */
// ContactScreen — centralized contact info + email capture form.
const {
  Heading,
  MonoText,
  Field,
  Button,
  Card,
  StickyNote,
  SondrIcon
} = window.SondrDesignsDesignSystem_41b26a;
function ContactScreen() {
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '58px 80px 110px'
    }
  }, /*#__PURE__*/React.createElement(Heading, {
    level: "title"
  }, "say hello"), /*#__PURE__*/React.createElement(MonoText, {
    muted: true,
    style: {
      marginTop: 14,
      maxWidth: 520
    }
  }, "one place for everything. drop a note, or reach us however you like."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 80,
      marginTop: 56,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 300,
      display: 'flex',
      flexDirection: 'column',
      gap: 0
    }
  }, CONTACTS.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.label,
    style: {
      display: 'flex',
      gap: 18,
      alignItems: 'center',
      padding: '20px 0',
      borderTop: '1.5px solid var(--rule-color)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "sondr-icon"
  }, /*#__PURE__*/React.createElement(SondrIcon, {
    name: c.icon,
    size: 26
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MonoText, {
    muted: true,
    size: "small"
  }, c.label), /*#__PURE__*/React.createElement(MonoText, {
    style: {
      marginTop: 4
    }
  }, c.value)))), /*#__PURE__*/React.createElement(StickyNote, {
    tilt: -5,
    size: 210,
    style: {
      marginTop: 40
    }
  }, "studio hours \u2014 mon to thu, 10\u20136. we reply to every note.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 460
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/tape-blue.png",
    alt: "",
    style: {
      position: 'absolute',
      width: 210,
      top: -26,
      left: 130,
      zIndex: 2,
      transform: 'rotate(3deg)',
      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,.4))'
    }
  }), /*#__PURE__*/React.createElement(Card, {
    lift: true,
    style: {
      padding: 36
    }
  }, sent ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Heading, {
    level: "heading",
    style: {
      fontSize: 26
    }
  }, "note received"), /*#__PURE__*/React.createElement(MonoText, {
    style: {
      marginTop: 14
    }
  }, "thanks \u2014 we'll be in touch within a day or two.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "your name",
    placeholder: "jane doe"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "email",
    type: "email",
    placeholder: "jane@studio.com"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "project",
    multiline: true,
    rows: 4,
    placeholder: "tell us about it"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "solid",
    size: "lg",
    onClick: () => setSent(true)
  }, "send it"))))));
}
const CONTACTS = [{
  label: 'email',
  value: 'hello@sondr.designs',
  icon: 'contact'
}, {
  label: 'studio',
  value: 'no. 14, paper mill lane',
  icon: 'interior'
}, {
  label: 'new work',
  value: 'projects@sondr.designs',
  icon: 'works'
}];
window.ContactScreen = ContactScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sondr-site/ContactScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sondr-site/HomeScreen.jsx
try { (() => {
/* global React */
// HomeScreen — hero · featured works (scroll pans sideways) · services/mission · blue CTA · footer
const {
  Heading,
  MonoText,
  Button,
  StickyNote,
  FlipPolaroid,
  Divider
} = window.SondrDesignsDesignSystem_41b26a;

// Featured works: a scroll-pinned section. Scrolling down through it pans
// the polaroids horizontally, like flipping sideways through a notebook.
function FeaturedWorks({
  go
}) {
  const {
    swatch,
    WORKS
  } = window.SondrData;
  const pinRef = React.useRef(null);
  const stickyRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const [mobile, setMobile] = React.useState(false);
  React.useEffect(() => {
    const pin = pinRef.current,
      sticky = stickyRef.current,
      track = trackRef.current;
    if (!pin || !sticky || !track) return;
    let maxTranslate = 0;
    let isMobile = window.innerWidth < 820;
    const measure = () => {
      isMobile = window.innerWidth < 820;
      setMobile(isMobile);
      if (isMobile) {
        pin.style.height = 'auto';
        track.style.transform = 'none';
        maxTranslate = 0;
        sticky.style.backgroundPosition = '';
        return;
      }
      maxTranslate = Math.max(0, track.scrollWidth - sticky.clientWidth);
      pin.style.height = window.innerHeight + maxTranslate + 'px';
      const pitch = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-pitch')) || 24;
      sticky._bgX = -((sticky.getBoundingClientRect().left + window.scrollX) % pitch);
      sticky._bgY = -(sticky.offsetTop % pitch);
      update();
    };
    const update = () => {
      if (isMobile || maxTranslate <= 0) return;
      const rect = pin.getBoundingClientRect();
      const span = pin.offsetHeight - window.innerHeight;
      const progress = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      const tx = progress * maxTranslate;
      track.style.transform = 'translateX(' + (-tx) + 'px)';
      sticky.style.backgroundPosition = (sticky._bgX || 0) + 'px ' + ((sticky._bgY || 0) + tx / 60) + 'px';
    };
    measure();
    window.addEventListener('scroll', update, {
      passive: true
    });
    window.addEventListener('resize', measure);
    const t1 = setTimeout(measure, 300);
    const t2 = setTimeout(measure, 900); // after webfont settles
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', measure);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  const cards = WORKS.map((w, i) => /*#__PURE__*/React.createElement(FlipPolaroid, {
    key: w.title,
    width: 290,
    tilt: [-3, 2, -2, 3, -1, 2][i % 6],
    assetBase: "../../",
    src: swatch(w.tint),
    caption: `${w.title} · ${w.year}`,
    title: w.title,
    meta: `${w.year} · ${w.role}`,
    notes: w.notes,
    style: {
      flex: '0 0 auto'
    }
  }));
  return /*#__PURE__*/React.createElement("section", {
    ref: pinRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: stickyRef,
    style: {
      position: mobile ? 'static' : 'sticky',
      top: 0,
      height: mobile ? 'auto' : '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: 'var(--paper)',
      backgroundImage: 'radial-gradient(var(--dot) var(--dot-size), transparent var(--dot-size))',
      backgroundSize: 'var(--grid-pitch) var(--grid-pitch)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 70px',
      marginBottom: 34,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/tape-blue.png",
    alt: "",
    style: {
      position: 'absolute',
      width: 320,
      top: -20,
      left: 52,
      transform: 'rotate(-2deg)',
      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,.4))'
    }
  }), /*#__PURE__*/React.createElement(Heading, {
    level: "title",
    style: {
      position: 'relative'
    }
  }, "featured works"), /*#__PURE__*/React.createElement(MonoText, {
    muted: true,
    style: {
      marginTop: 12,
      maxWidth: 520
    }
  }, "keep scrolling — the works run sideways, like flipping through a notebook. hover a photo to read the back.")), /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 60,
      padding: mobile ? '10px 70px 30px' : '10px 70px',
      overflowX: mobile ? 'auto' : 'visible',
      willChange: 'transform'
    }
  }, cards, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      paddingLeft: 20,
      paddingRight: 40
    }
  }, /*#__PURE__*/React.createElement(MonoText, {
    muted: true,
    style: {
      maxWidth: 200
    }
  }, "that's the reel. want the full library?"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => go('works')
  }, "see all works →")))));
}
function HomeScreen({
  go
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      padding: '30px 70px 66px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 60,
      top: 20
    }
  }, /*#__PURE__*/React.createElement(StickyNote, {
    tilt: 4,
    size: 196,
    style: {
      position: 'absolute',
      top: 0,
      right: 0
    }
  }, "since 2024 — we build sites with a soul."), /*#__PURE__*/React.createElement(StickyNote, {
    tilt: -6,
    size: 172,
    color: "#c9e5ff",
    style: {
      position: 'absolute',
      top: 150,
      right: 74
    }
  }, "raw · organic · personal")), /*#__PURE__*/React.createElement(MonoText, {
    muted: true,
    style: {
      marginBottom: 22
    }
  }, "a design studio — web, brand & interiors"), /*#__PURE__*/React.createElement(Heading, {
    style: {
      maxWidth: 820,
      fontSize: 88
    }
  }, "crafting elevated ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--tape-blue)'
    }
  }, "digital"), " experiences"), /*#__PURE__*/React.createElement(MonoText, {
    style: {
      maxWidth: 600,
      marginTop: 32,
      lineHeight: 1.7
    }
  }, "we help businesses grow by crafting powerful digital platforms that drive conversion and define your identity in the online space."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 38,
      display: 'flex',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go('works')
  }, "view works"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "solid",
    onClick: () => go('contact')
  }, "get in touch")), /*#__PURE__*/React.createElement(MonoText, {
    muted: true,
    size: "small",
    style: {
      marginTop: 54,
      letterSpacing: '.2em'
    }
  }, "↓ scroll")), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(FeaturedWorks, {
    go: go
  }), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '70px 70px 84px',
      display: 'flex',
      gap: 90,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 420
    }
  }, /*#__PURE__*/React.createElement(Heading, {
    level: "heading"
  }, "what we do"), /*#__PURE__*/React.createElement(MonoText, {
    style: {
      marginTop: 22,
      lineHeight: 1.8
    }
  }, "we treat every project like a page in a notebook — open, a little messy, entirely yours. no templates, no house style pressed onto you. just careful, hand-built work.")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 320
    }
  }, SERVICES.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.n,
    style: {
      display: 'flex',
      gap: 26,
      padding: '22px 0',
      borderTop: '1.5px solid var(--rule-color)'
    }
  }, /*#__PURE__*/React.createElement(MonoText, {
    muted: true,
    style: {
      width: 40
    }
  }, s.n), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Heading, {
    level: "heading",
    as: "h4",
    style: {
      fontSize: 24
    }
  }, s.title), /*#__PURE__*/React.createElement(MonoText, {
    muted: true,
    size: "small",
    style: {
      marginTop: 8
    }
  }, s.desc)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--tape-blue)',
      padding: '92px 70px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/tape-cream.png",
    alt: "",
    style: {
      position: 'absolute',
      width: 240,
      top: -20,
      right: 120,
      transform: 'rotate(8deg)',
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement(MonoText, {
    style: {
      color: '#fff',
      letterSpacing: '.14em',
      marginBottom: 20
    }
  }, "got something in mind?"), /*#__PURE__*/React.createElement(Heading, {
    style: {
      color: '#fff',
      fontSize: 72,
      maxWidth: 900
    }
  }, "let's make something unrepeatable"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go('contact'),
    style: {
      background: '#fff',
      color: 'var(--tape-blue)',
      boxShadow: 'none'
    }
  }, "start a project"))), /*#__PURE__*/React.createElement(Footer, {
    go: go
  }));
}
const SERVICES = [{
  n: '01',
  title: 'web design & build',
  desc: 'bespoke marketing sites, portfolios & shops. designed and coded in-house.'
}, {
  n: '02',
  title: 'brand identity',
  desc: 'marks, type systems and the small details that make a brand feel like a person.'
}, {
  n: '03',
  title: 'interior dept.',
  desc: 'a growing practice — furniture pieces and spatial thinking, same hand.'
}];
function Footer({
  go
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: '60px 70px 70px',
      display: 'flex',
      justifyContent: 'space-between',
      gap: 40,
      flexWrap: 'wrap',
      borderTop: '1.5px solid var(--rule-color)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 24,
      letterSpacing: '.14em'
    }
  }, "sondr designs"), /*#__PURE__*/React.createElement(MonoText, {
    muted: true,
    size: "small",
    style: {
      marginTop: 12
    }
  }, "© 2026 — crafted by hand, on paper first.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 60
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(MonoText, {
    muted: true,
    size: "small"
  }, "pages"), ['works', 'blog', 'studio', 'contact'].map(p => /*#__PURE__*/React.createElement("a", {
    key: p,
    href: "#",
    onClick: e => {
      e.preventDefault();
      go(p);
    },
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 15,
      letterSpacing: '.1em',
      color: 'var(--ink)',
      textDecoration: 'none'
    }
  }, p))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(MonoText, {
    muted: true,
    size: "small"
  }, "elsewhere"), ['instagram', 'read.cv', 'are.na'].map(p => /*#__PURE__*/React.createElement("a", {
    key: p,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 15,
      letterSpacing: '.1em',
      color: 'var(--ink)',
      textDecoration: 'none'
    }
  }, p)))));
}
window.HomeScreen = HomeScreen;
window.SondrFooter = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sondr-site/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sondr-site/InteriorScreen.jsx
try { (() => {
/* global React */
// InteriorScreen — one white room, black furniture, one warm lamp.
// 3/4 isometric convention: DX=-22, DY=-10 (depth goes upper-left)
// Front face: #1c1c1c | Left face (lamp-lit): #c4a050-#b09040 | Top face: #dedad0

var CATALOG_DATA = {
  seating: {
    label: 'seating',
    items: [{
      name: 'mill sofa',
      price: '£1,840',
      status: 'made to order',
      desc: 'three-seater in natural ash and linen. designed for staying.'
    }, {
      name: 'margin armchair',
      price: '£760',
      status: 'in stock',
      desc: 'a reading chair. upholstered in wool. sits low, stays a long time.'
    }, {
      name: 'note stool',
      price: '£240',
      status: 'in stock',
      desc: 'solid ash, hand-oiled. stacks. lives anywhere.'
    }, {
      name: 'draft bench',
      price: '£560',
      status: 'made to order',
      desc: 'a long bench in oak. dining, hallway, or the foot of a bed.'
    }]
  },
  tables: {
    label: 'tables',
    items: [{
      name: 'field coffee table',
      price: '£620',
      status: 'in stock',
      desc: 'low, wide, clear-oiled ash. a surface to leave things on.'
    }, {
      name: 'margin desk',
      price: '£980',
      status: 'made to order',
      desc: 'a writing desk with a ruled edge and a paper drawer.'
    }, {
      name: 'dot side table',
      price: '£310',
      status: 'in stock',
      desc: 'round, three-legged. next to a chair or a bed.'
    }]
  },
  lighting: {
    label: 'lighting',
    items: [{
      name: 'arc floor lamp',
      price: '£490',
      status: 'made to order',
      desc: 'cast-iron base, brass arm, linen shade. floods a corner.'
    }, {
      name: 'note lamp',
      price: '£310',
      status: 'in stock',
      desc: 'warm task lamp, dimmable, clips to any edge.'
    }, {
      name: 'rule pendant',
      price: '£280',
      status: 'in stock',
      desc: 'spun-steel shade, matte black. hangs from a fabric cord.'
    }]
  },
  storage: {
    label: 'storage',
    items: [{
      name: 'field bookcase',
      price: '£860',
      status: 'made to order',
      desc: 'open shelving in ash, 5 shelves. holds books and everything else.'
    }, {
      name: 'margin sideboard',
      price: '£1,200',
      status: 'made to order',
      desc: 'solid oak, three drawers, two doors. a long, quiet piece.'
    }, {
      name: 'dot shelf',
      price: '£420',
      status: 'made to order',
      desc: 'a pegboard shelf on a 28mm grid. rearrange endlessly.'
    }]
  }
};

// Single living room layout. Pieces cluster naturally around a seating area.
// Z > 0 = closer to viewer (all in front of backwall at translateZ(-380px)).
// Vertical top % is tuned so each piece appears to sit on the same floor.
var ROOM_PIECES = [
// back wall: sofa centre, bookshelf far right
{
  id: 'sofa',
  category: 'seating',
  label: 'sofa',
  left: '28%',
  top: '28%',
  z: 0,
  scale: 1.00
}, {
  id: 'bookshelf',
  category: 'storage',
  label: 'bookshelf',
  left: '62%',
  top: '14%',
  z: 0,
  scale: 0.78
},
// mid zone: armchair left, floor lamp reading corner, side table between them
{
  id: 'floor-lamp',
  category: 'lighting',
  label: 'floor lamp',
  left: '14%',
  top: '8%',
  z: 8,
  scale: 0.82
}, {
  id: 'armchair',
  category: 'seating',
  label: 'armchair',
  left: '13%',
  top: '33%',
  z: 25,
  scale: 0.88
}, {
  id: 'side-table',
  category: 'tables',
  label: 'side table',
  left: '22%',
  top: '47%',
  z: 42,
  scale: 0.74
},
// foreground: coffee table in front of sofa
{
  id: 'coffee-table',
  category: 'tables',
  label: 'coffee table',
  left: '26%',
  top: '57%',
  z: 62,
  scale: 1.02
}];

// ─── SVG silhouettes — true 3/4 isometric, DX=-22 DY=-10 ─────────────────────
// Helper convention:
//   top face of a rect at (x,y,w,h):  M x,y  L x+w,y  L x+w-22,y-10  L x-22,y-10  Z
//   left face of a rect at (x,y,w,h): M x,y  L x-22,y-10  L x-22,y+h-10  L x,y+h  Z

function SofaSVG() {
  // viewBox="0 0 390 250"
  // Three blocks: plinth y=200-228 h=28, seat y=142-200 h=58, backrest y=54-142 h=88
  // Front face x=52..332 (w=280)
  // Armrests: left x=52..74 (w=22), right x=310..332 (w=22), raised from y=104
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 390 250",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    width: "390",
    height: "250"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M52,200 L332,200 L310,190 L30,190 Z",
    fill: "#dedad0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M52,200 L30,190 L30,218 L52,228 Z",
    fill: "#b09040"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "52",
    y: "200",
    width: "280",
    height: "28",
    fill: "#1c1c1c"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M52,142 L332,142 L310,132 L30,132 Z",
    fill: "#dedad0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M52,142 L30,132 L30,190 L52,200 Z",
    fill: "#c4a050"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "52",
    y: "142",
    width: "280",
    height: "58",
    fill: "#1c1c1c"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "145",
    y1: "142",
    x2: "145",
    y2: "200",
    stroke: "#f5f3ee",
    strokeWidth: "1.5",
    opacity: "0.18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "239",
    y1: "142",
    x2: "239",
    y2: "200",
    stroke: "#f5f3ee",
    strokeWidth: "1.5",
    opacity: "0.18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M52,54 L332,54 L310,44 L30,44 Z",
    fill: "#dedad0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M52,54 L30,44 L30,132 L52,142 Z",
    fill: "#c4a050"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "52",
    y: "54",
    width: "280",
    height: "88",
    fill: "#1c1c1c"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "145",
    y1: "54",
    x2: "145",
    y2: "142",
    stroke: "#f5f3ee",
    strokeWidth: "1.5",
    opacity: "0.12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "239",
    y1: "54",
    x2: "239",
    y2: "142",
    stroke: "#f5f3ee",
    strokeWidth: "1.5",
    opacity: "0.12"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M52,104 L74,104 L52,94 L30,94 Z",
    fill: "#dedad0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M52,104 L30,94 L30,190 L52,200 Z",
    fill: "#b09040"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "52",
    y: "104",
    width: "22",
    height: "96",
    fill: "#252525"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M310,104 L332,104 L310,94 L288,94 Z",
    fill: "#dedad0"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "310",
    y: "104",
    width: "22",
    height: "96",
    fill: "#252525"
  }));
}
function ArmchairSVG() {
  // viewBox="0 0 240 250"
  // Three blocks: plinth y=210 h=24, seat y=152 h=58, backrest y=60 h=92
  // Front face x=50..190 (w=140)
  // Armrests: left x=50..70 (w=20), right x=170..190 (w=20), raised from y=110
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 240 250",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    width: "240",
    height: "250"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M50,210 L190,210 L168,200 L28,200 Z",
    fill: "#dedad0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50,210 L28,200 L28,224 L50,234 Z",
    fill: "#b09040"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "50",
    y: "210",
    width: "140",
    height: "24",
    fill: "#1c1c1c"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50,152 L190,152 L168,142 L28,142 Z",
    fill: "#dedad0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50,152 L28,142 L28,200 L50,210 Z",
    fill: "#c4a050"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "50",
    y: "152",
    width: "140",
    height: "58",
    fill: "#1c1c1c"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50,60 L190,60 L168,50 L28,50 Z",
    fill: "#dedad0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50,60 L28,50 L28,142 L50,152 Z",
    fill: "#c4a050"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "50",
    y: "60",
    width: "140",
    height: "92",
    fill: "#1c1c1c"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50,110 L70,110 L48,100 L28,100 Z",
    fill: "#dedad0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50,110 L28,100 L28,200 L50,210 Z",
    fill: "#b09040"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "50",
    y: "110",
    width: "20",
    height: "100",
    fill: "#252525"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M170,110 L190,110 L168,100 L148,100 Z",
    fill: "#dedad0"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "170",
    y: "110",
    width: "20",
    height: "100",
    fill: "#252525"
  }));
}
function CoffeeTableSVG() {
  // viewBox="0 0 380 180"
  // Table top board: x=40..340 at y=60, h=16 front edge
  // Apron: x=40..340, y=76, h=18
  // 4 legs: pairs at x=44,108 and x=260,318, each 16px wide from y=94 to y=172
  // Stretcher at y=148
  // Large top face: M40,60 L340,60 L318,50 L18,50 fill=#dedad0
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 380 180",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    width: "380",
    height: "180"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M40,60 L340,60 L318,50 L18,50 Z",
    fill: "#dedad0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M40,60 L18,50 L18,66 L40,76 Z",
    fill: "#c4a050"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "40",
    y: "60",
    width: "300",
    height: "16",
    fill: "#1c1c1c"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M40,76 L340,76 L318,66 L18,66 Z",
    fill: "#c8b870",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M40,76 L18,66 L18,84 L40,94 Z",
    fill: "#b09040"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "40",
    y: "76",
    width: "300",
    height: "18",
    fill: "#242424"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M44,94 L22,84 L22,162 L44,172 Z",
    fill: "#b09040"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "44",
    y: "94",
    width: "16",
    height: "78",
    fill: "#1c1c1c"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M108,94 L86,84 L86,162 L108,172 Z",
    fill: "#b09040",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "108",
    y: "94",
    width: "16",
    height: "78",
    fill: "#1c1c1c",
    opacity: "0.85"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M260,94 L238,84 L238,162 L260,172 Z",
    fill: "#b09040",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "260",
    y: "94",
    width: "16",
    height: "78",
    fill: "#1c1c1c",
    opacity: "0.85"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M318,94 L296,84 L296,162 L318,172 Z",
    fill: "#b09040",
    opacity: "0.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "318",
    y: "94",
    width: "16",
    height: "78",
    fill: "#1c1c1c"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60,148 L318,148 L296,138 L38,138 Z",
    fill: "#dedad0",
    opacity: "0.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M60,148 L38,138 L38,154 L60,164 Z",
    fill: "#b09040",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "60",
    y: "148",
    width: "258",
    height: "10",
    fill: "#1c1c1c",
    opacity: "0.7"
  }));
}
function SideTableSVG() {
  // viewBox="0 0 160 220" — Saarinen-style round pedestal
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 160 220",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    width: "160",
    height: "220"
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "80",
    cy: "52",
    rx: "80",
    ry: "30",
    fill: "rgba(255,200,60,0.06)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "80",
    cy: "52",
    rx: "60",
    ry: "22",
    fill: "rgba(255,200,60,0.06)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "80",
    cy: "52",
    rx: "68",
    ry: "24",
    fill: "#dedad0"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "80",
    cy: "60",
    rx: "68",
    ry: "24",
    fill: "#c4a050"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "80",
    cy: "52",
    rx: "68",
    ry: "24",
    fill: "#dedad0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12,60 Q12,84 80,84 Q148,84 148,60 L148,52 Q148,76 80,76 Q12,76 12,52 Z",
    fill: "#c4a050"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "80",
    cy: "64",
    rx: "64",
    ry: "20",
    fill: "#1a1a1a"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M68,68 L46,58 L46,166 L68,176 Z",
    fill: "#b09040"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "68",
    y: "68",
    width: "24",
    height: "108",
    fill: "#1a1a1a"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22,190 L122,190 L118,182 L18,182 Z",
    fill: "#a09060"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "72",
    cy: "190",
    rx: "50",
    ry: "16",
    fill: "#1a1a1a"
  }));
}

// Floor lamp — THE light source. Dramatic warm amber.
function FloorLampSVG() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 180 400",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    width: "180",
    height: "400"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M90,72 Q64,200 20,360 L108,360 Q128,200 170,52 Z",
    fill: "rgba(255,160,20,0.06)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "130",
    cy: "28",
    rx: "80",
    ry: "38",
    fill: "rgba(255,180,30,0.06)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "130",
    cy: "28",
    rx: "60",
    ry: "28",
    fill: "rgba(255,180,30,0.10)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "130",
    cy: "28",
    rx: "40",
    ry: "18",
    fill: "rgba(255,180,30,0.18)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "64",
    cy: "380",
    rx: "48",
    ry: "14",
    fill: "#1a1a1a"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "64",
    cy: "374",
    rx: "36",
    ry: "10",
    fill: "#242424"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "64",
    cy: "368",
    rx: "22",
    ry: "7",
    fill: "#1a1a1a"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M42,368 L20,358 L20,374 L42,384 Z",
    fill: "#b09040",
    opacity: "0.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M56,180 L34,170 L34,362 L56,372 Z",
    fill: "#b09040"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "56",
    y: "180",
    width: "10",
    height: "192",
    fill: "#1a1a1a"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M56,180 Q46,90 130,28",
    stroke: "#1a1a1a",
    strokeWidth: "12",
    fill: "none",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M56,180 Q44,88 126,24",
    stroke: "#b09040",
    strokeWidth: "3",
    fill: "none",
    strokeLinecap: "round",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "130",
    cy: "22",
    rx: "40",
    ry: "14",
    fill: "#e8a020"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M90,22 Q86,60 68,72 L192,52 Q190,10 170,18 Z",
    fill: "#d4900a"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "130",
    cy: "22",
    rx: "40",
    ry: "14",
    fill: "rgba(255,220,80,0.22)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "118",
    cy: "66",
    rx: "36",
    ry: "11",
    fill: "#c07800",
    opacity: "0.55"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "130",
    cy: "20",
    rx: "18",
    ry: "6",
    fill: "rgba(255,240,120,0.35)"
  }));
}
function BookshelfSVG() {
  // viewBox="0 0 260 310"
  // Everything offset right by 26px for left depth face room.
  // Panels: left x=26..42, right x=220..236. Full height h=282 from y=22.
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 260 310",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    width: "260",
    height: "310"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M26,22 L4,12 L4,294 L26,304 Z",
    fill: "#c4a050"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M26,22 L236,22 L214,12 L4,12 Z",
    fill: "#dedad0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M26,22 L4,12 L4,34 L26,34 Z",
    fill: "#c4a050"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "26",
    y: "22",
    width: "210",
    height: "12",
    fill: "#1c1c1c"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M26,292 L236,292 L214,282 L4,282 Z",
    fill: "#dedad0",
    opacity: "0.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M26,292 L4,282 L4,304 L26,304 Z",
    fill: "#b09040"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "26",
    y: "292",
    width: "210",
    height: "12",
    fill: "#1c1c1c"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "26",
    y: "22",
    width: "16",
    height: "282",
    fill: "#1c1c1c"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "220",
    y: "22",
    width: "16",
    height: "282",
    fill: "#1c1c1c"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M26,90 L220,90 L198,80 L4,80 Z",
    fill: "#dedad0",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M26,90 L4,80 L4,98 L26,98 Z",
    fill: "#b09040"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "26",
    y: "90",
    width: "194",
    height: "8",
    fill: "#1c1c1c"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M26,140 L220,140 L198,130 L4,130 Z",
    fill: "#dedad0",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M26,140 L4,130 L4,148 L26,148 Z",
    fill: "#b09040"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "26",
    y: "140",
    width: "194",
    height: "8",
    fill: "#1c1c1c"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M26,190 L220,190 L198,180 L4,180 Z",
    fill: "#dedad0",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M26,190 L4,180 L4,198 L26,198 Z",
    fill: "#b09040"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "26",
    y: "190",
    width: "194",
    height: "8",
    fill: "#1c1c1c"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M26,240 L220,240 L198,230 L4,230 Z",
    fill: "#dedad0",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M26,240 L4,230 L4,248 L26,248 Z",
    fill: "#b09040"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "26",
    y: "240",
    width: "194",
    height: "8",
    fill: "#1c1c1c"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "42",
    y: "28",
    width: "11",
    height: "62",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.58"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "55",
    y: "34",
    width: "8",
    height: "56",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.40"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "65",
    y: "26",
    width: "13",
    height: "64",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.64"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "80",
    y: "32",
    width: "8",
    height: "58",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.36"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "90",
    y: "28",
    width: "11",
    height: "62",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.52"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "103",
    y: "30",
    width: "12",
    height: "60",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.46"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "117",
    y: "26",
    width: "9",
    height: "64",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.60"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "128",
    y: "32",
    width: "10",
    height: "58",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.44"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "42",
    y: "98",
    width: "10",
    height: "42",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.48"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "54",
    y: "94",
    width: "13",
    height: "46",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.63"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "69",
    y: "100",
    width: "8",
    height: "40",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.38"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "79",
    y: "96",
    width: "11",
    height: "44",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.54"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "92",
    y: "98",
    width: "9",
    height: "42",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.44"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "103",
    y: "94",
    width: "12",
    height: "46",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.58"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "117",
    y: "100",
    width: "10",
    height: "40",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.40"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "42",
    y: "148",
    width: "12",
    height: "42",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.56"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "56",
    y: "144",
    width: "9",
    height: "46",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.42"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "67",
    y: "148",
    width: "14",
    height: "42",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.61"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "83",
    y: "146",
    width: "8",
    height: "44",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.38"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "93",
    y: "148",
    width: "11",
    height: "42",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.50"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "106",
    y: "144",
    width: "9",
    height: "46",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.45"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "117",
    y: "148",
    width: "13",
    height: "42",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.55"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "42",
    y: "198",
    width: "10",
    height: "42",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.52"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "54",
    y: "194",
    width: "12",
    height: "46",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.46"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "68",
    y: "198",
    width: "9",
    height: "42",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.60"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "79",
    y: "196",
    width: "13",
    height: "44",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.40"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "94",
    y: "198",
    width: "10",
    height: "42",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.54"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "106",
    y: "194",
    width: "8",
    height: "46",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.38"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "116",
    y: "198",
    width: "11",
    height: "42",
    rx: "1",
    fill: "#1a1a1a",
    opacity: "0.48"
  }));
}
var SVG_COMPONENTS = {
  'sofa': SofaSVG,
  'armchair': ArmchairSVG,
  'coffee-table': CoffeeTableSVG,
  'side-table': SideTableSVG,
  'floor-lamp': FloorLampSVG,
  'bookshelf': BookshelfSVG
};

// ─── CSS ─────────────────────────────────────────────────────────────────────

var ROOM_CSS = ['.int-overlay{position:fixed;inset:0;z-index:200;background:#f2f0eb;}', '.int-exit-btn{position:fixed;top:22px;right:28px;z-index:210;font-family:var(--font-mono);font-size:11px;letter-spacing:.18em;color:rgba(0,0,0,0.32);background:none;border:none;cursor:pointer;transition:color .15s;padding:4px 0;}', '.int-exit-btn:hover{color:#111;}', /* room container — perspective from viewer's eye height */
'.int-room{position:absolute;inset:0;perspective:1100px;perspective-origin:50% 36%;overflow:hidden;user-select:none;}', '.int-scene{position:absolute;inset:0;transform-style:preserve-3d;transition:transform .3s ease-out;}', /* room surfaces */
'.int-backwall{position:absolute;inset:0;background:linear-gradient(180deg,#e8e5dd 0%,#f2f0eb 60%,#eeece5 100%);transform:translateZ(-380px);}', /* floor with perspective-correct grid */
'.int-floor{position:absolute;width:360%;height:360%;left:-130%;top:38%;' + 'background-image:' + 'linear-gradient(90deg,rgba(0,0,0,0.10) 1px,transparent 1px),' + 'linear-gradient(0deg,rgba(0,0,0,0.07) 1px,transparent 1px),' + 'linear-gradient(170deg,#dedad0 0%,#e8e5da 40%,#d8d5ca 100%);' + 'background-size:72px 72px,72px 72px,100% 100%;' + 'transform:rotateX(72deg);transform-origin:center top;}', /* large amber pool on floor */
'.int-lamp-glow{position:absolute;left:2%;top:46%;width:500px;height:280px;' + 'background:radial-gradient(ellipse at 28% 25%,' + 'rgba(255,200,60,0.55) 0%,' + 'rgba(255,160,20,0.30) 25%,' + 'rgba(255,130,10,0.14) 50%,' + 'rgba(255,110,0,0.05) 70%,' + 'transparent 85%);' + 'pointer-events:none;transform:translateZ(12px);}', /* wall wash — large warm bloom on left side of backwall */
'.int-lamp-wall-wash{position:absolute;left:0;top:0;width:50%;height:100%;' + 'background:radial-gradient(ellipse 90% 80% at 16% 8%,' + 'rgba(255,180,40,0.22) 0%,' + 'rgba(255,150,20,0.10) 40%,' + 'rgba(255,130,10,0.04) 65%,' + 'transparent 80%);' + 'transform:translateZ(-370px);pointer-events:none;}', /* ceiling warm spot */
'.int-lamp-ceiling{position:absolute;left:0;top:0;width:40%;height:50%;' + 'background:radial-gradient(ellipse 70% 80% at 18% 0%,' + 'rgba(255,200,80,0.16) 0%,' + 'rgba(255,170,40,0.06) 50%,' + 'transparent 75%);' + 'transform:translateZ(-375px);pointer-events:none;}', /* furniture pieces */
'.int-piece{position:absolute;cursor:pointer;display:flex;flex-direction:column;align-items:center;}', '.int-piece-svg{transition:filter .22s ease,transform .22s ease;}', '.int-piece:hover .int-piece-svg{filter:drop-shadow(0 16px 28px rgba(0,0,0,0.22)) drop-shadow(0 0 20px rgba(200,140,40,0.20));transform:translateY(-6px);}', '.int-piece-label{font-family:var(--font-mono);font-size:10px;letter-spacing:.2em;color:rgba(0,0,0,0);margin-top:7px;transition:color .2s;white-space:nowrap;text-transform:lowercase;}', '.int-piece:hover .int-piece-label{color:rgba(0,0,0,0.38);}', '@keyframes int-fadein{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}', /* catalog */
'.int-cat{animation:int-fadein .26s ease;position:fixed;inset:0;z-index:205;background:#f2f0eb;display:flex;flex-direction:column;overflow-y:auto;}', '.int-cat-header{padding:40px 64px 26px;border-bottom:1px solid rgba(0,0,0,0.09);display:flex;align-items:baseline;gap:32px;}', '.int-cat-back{font-family:var(--font-mono);font-size:12px;letter-spacing:.14em;color:rgba(0,0,0,0.35);background:none;border:none;cursor:pointer;padding:0;transition:color .14s;flex-shrink:0;}', '.int-cat-back:hover{color:#111;}', '.int-cat-title{font-family:var(--font-mono);font-size:30px;letter-spacing:.06em;color:#111;}', '.int-cat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1px;background:rgba(0,0,0,0.07);margin:44px 64px 80px;border:1px solid rgba(0,0,0,0.07);}', '.int-cat-item{background:#f2f0eb;padding:36px 32px;cursor:pointer;transition:background .15s;}', '.int-cat-item:hover{background:#e8e5dc;}', '.int-cat-item-name{font-family:var(--font-mono);font-size:20px;letter-spacing:.06em;color:#111;}', '.int-cat-item-price{font-family:var(--font-mono);font-size:14px;letter-spacing:.1em;color:rgba(0,0,0,0.40);margin-top:8px;}', '.int-cat-item-desc{font-family:var(--font-mono);font-size:12px;letter-spacing:.04em;color:rgba(0,0,0,0.48);line-height:1.75;margin-top:14px;}', '.int-cat-item-status{font-family:var(--font-mono);font-size:10px;letter-spacing:.18em;color:rgb(0,81,255);margin-top:16px;}', '.int-enquire-btn{margin-top:18px;font-family:var(--font-mono);font-size:11px;letter-spacing:.16em;color:#111;background:transparent;border:1px solid rgba(0,0,0,0.26);padding:9px 22px;cursor:pointer;transition:border-color .15s,background .15s;}', '.int-enquire-btn:hover{border-color:#111;background:rgba(0,0,0,0.04);}'].join('\n');

// ─── Room view ────────────────────────────────────────────────────────────────

function RoomView({
  onSelectPiece
}) {
  var sceneRef = React.useRef(null);
  function handleMouseMove(e) {
    var rect = e.currentTarget.getBoundingClientRect();
    var x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    var y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    if (sceneRef.current) {
      sceneRef.current.style.transform = 'rotateY(' + x * 4 + 'deg) rotateX(' + -y * 2 + 'deg)';
    }
  }
  function handleMouseLeave() {
    if (sceneRef.current) {
      sceneRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "int-room",
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave
  }, /*#__PURE__*/React.createElement("div", {
    ref: sceneRef,
    className: "int-scene"
  }, /*#__PURE__*/React.createElement("div", {
    className: "int-backwall"
  }), /*#__PURE__*/React.createElement("div", {
    className: "int-floor"
  }), /*#__PURE__*/React.createElement("div", {
    className: "int-lamp-glow"
  }), /*#__PURE__*/React.createElement("div", {
    className: "int-lamp-wall-wash"
  }), /*#__PURE__*/React.createElement("div", {
    className: "int-lamp-ceiling"
  }), ROOM_PIECES.map(function (piece) {
    var Svg = SVG_COMPONENTS[piece.id];
    return /*#__PURE__*/React.createElement("div", {
      key: piece.id,
      className: "int-piece",
      style: {
        left: piece.left,
        top: piece.top,
        transform: 'translateZ(' + piece.z + 'px) scale(' + piece.scale + ')'
      },
      onClick: function () {
        onSelectPiece(piece.category);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "int-piece-svg"
    }, /*#__PURE__*/React.createElement(Svg, null)), /*#__PURE__*/React.createElement("span", {
      className: "int-piece-label"
    }, piece.label));
  })));
}

// ─── Catalog view ─────────────────────────────────────────────────────────────

function CatalogView({
  categoryId,
  onBack
}) {
  var cat = CATALOG_DATA[categoryId];
  if (!cat) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "int-cat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "int-cat-header"
  }, /*#__PURE__*/React.createElement("button", {
    className: "int-cat-back",
    onClick: onBack
  }, "← room"), /*#__PURE__*/React.createElement("span", {
    className: "int-cat-title"
  }, cat.label)), /*#__PURE__*/React.createElement("div", {
    className: "int-cat-grid"
  }, cat.items.map(function (item) {
    return /*#__PURE__*/React.createElement("div", {
      key: item.name,
      className: "int-cat-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "int-cat-item-name"
    }, item.name), /*#__PURE__*/React.createElement("div", {
      className: "int-cat-item-price"
    }, item.price), /*#__PURE__*/React.createElement("div", {
      className: "int-cat-item-desc"
    }, item.desc), /*#__PURE__*/React.createElement("div", {
      className: "int-cat-item-status"
    }, item.status), /*#__PURE__*/React.createElement("button", {
      className: "int-enquire-btn"
    }, "enquire →"));
  })));
}

// ─── Root ─────────────────────────────────────────────────────────────────────

function InteriorScreen({
  go
}) {
  var catState = React.useState(null);
  var activeCat = catState[0];
  var setActiveCat = catState[1];
  return /*#__PURE__*/React.createElement("div", {
    className: "int-overlay"
  }, /*#__PURE__*/React.createElement("style", null, ROOM_CSS), /*#__PURE__*/React.createElement("button", {
    className: "int-exit-btn",
    onClick: function () {
      if (go) go('home');
    }
  }, "exit interior ×"), /*#__PURE__*/React.createElement(RoomView, {
    onSelectPiece: setActiveCat
  }), activeCat && /*#__PURE__*/React.createElement(CatalogView, {
    categoryId: activeCat,
    onBack: function () {
      setActiveCat(null);
    }
  }));
}
window.InteriorScreen = InteriorScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sondr-site/InteriorScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sondr-site/StudioScreen.jsx
try { (() => {
/* global React */
// StudioScreen — the team behind the works.
const {
  Heading,
  MonoText,
  PolaroidCard,
  Tape
} = window.SondrDesignsDesignSystem_41b26a;
function StudioScreen() {
  const {
    swatch
  } = window.SondrData;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '58px 80px 110px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement(Heading, {
    level: "title"
  }, "the studio"), /*#__PURE__*/React.createElement(MonoText, {
    style: {
      marginTop: 24,
      lineHeight: 1.85,
      maxWidth: 620
    }
  }, "sondr is a small studio \u2014 small on purpose. a handful of people who each leave a fingerprint on the work. we sit close, share drafts on paper, and argue about kerning like it matters. it does.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 66,
      marginTop: 66
    }
  }, TEAM.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: m.name,
    style: {
      position: 'relative',
      width: 240
    }
  }, i % 2 === 0 && /*#__PURE__*/React.createElement("img", {
    src: "../../assets/tape-cream.png",
    alt: "",
    style: {
      position: 'absolute',
      width: 120,
      top: -20,
      left: 60,
      zIndex: 3,
      transform: 'rotate(-8deg)',
      filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,.22))'
    }
  }), /*#__PURE__*/React.createElement(PolaroidCard, {
    width: 240,
    tilt: [-3, 2, -2, 3][i % 4],
    assetBase: "../../",
    src: swatch(m.tint),
    caption: m.name
  }), /*#__PURE__*/React.createElement(MonoText, {
    muted: true,
    size: "small",
    style: {
      textAlign: 'center',
      marginTop: 10
    }
  }, m.role)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 60,
      marginTop: 90,
      flexWrap: 'wrap',
      borderTop: '1.5px solid var(--rule-color)',
      paddingTop: 44
    }
  }, ETHOS.map(e => /*#__PURE__*/React.createElement("div", {
    key: e.t,
    style: {
      maxWidth: 300
    }
  }, /*#__PURE__*/React.createElement(Heading, {
    level: "heading",
    as: "h4",
    style: {
      fontSize: 22
    }
  }, e.t), /*#__PURE__*/React.createElement(MonoText, {
    muted: true,
    size: "small",
    style: {
      marginTop: 12,
      lineHeight: 1.7
    }
  }, e.d)))));
}
const TEAM = [{
  name: 'rowan vale',
  role: 'founder · design',
  tint: '#d8d3ea'
}, {
  name: 'imogen park',
  role: 'design · type',
  tint: '#cfe3d0'
}, {
  name: 'theo à beckett',
  role: 'engineering',
  tint: '#f0dcc4'
}, {
  name: 'sana rao',
  role: 'interior dept.',
  tint: '#f3d9d2'
}];
const ETHOS = [{
  t: 'paper first',
  d: 'every project starts as a sketch. screens come later.'
}, {
  t: 'no house style',
  d: 'the work should look like you, not like us.'
}, {
  t: 'built to last',
  d: 'hand-coded, lightweight, made to age gracefully.'
}];
window.StudioScreen = StudioScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sondr-site/StudioScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sondr-site/WorksScreen.jsx
try { (() => {
/* global React */
// WorksScreen — a structured, organized library of all client works.
const {
  Heading,
  MonoText,
  FlipPolaroid,
  Button
} = window.SondrDesignsDesignSystem_41b26a;
function WorksScreen() {
  const {
    swatch,
    WORKS
  } = window.SondrData;
  const [filter, setFilter] = React.useState('all');
  const roles = ['all', ...Array.from(new Set(WORKS.map(w => w.role)))];
  const shown = filter === 'all' ? WORKS : WORKS.filter(w => w.role === filter);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '58px 80px 100px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Heading, {
    level: "title"
  }, "the works library"), /*#__PURE__*/React.createElement(MonoText, {
    muted: true,
    style: {
      marginTop: 14,
      maxWidth: 520
    }
  }, "every site we\u2019ve built, filed by hand. ", WORKS.length, " projects and counting.")), /*#__PURE__*/React.createElement(MonoText, {
    muted: true,
    size: "small"
  }, shown.length, " shown")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 34,
      flexWrap: 'wrap',
      borderBottom: '1.5px solid var(--rule-color)',
      paddingBottom: 22
    }
  }, roles.map(r => /*#__PURE__*/React.createElement("button", {
    key: r,
    onClick: () => setFilter(r),
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      letterSpacing: '.1em',
      cursor: 'pointer',
      padding: '8px 16px',
      border: 'none',
      borderRadius: 0,
      background: filter === r ? 'var(--ink)' : 'transparent',
      color: filter === r ? 'var(--paper)' : 'var(--ink)',
      boxShadow: filter === r ? 'none' : 'inset 0 0 0 1px var(--ink)'
    }
  }, r))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gap: '64px 48px',
      marginTop: 56,
      justifyItems: 'center'
    }
  }, shown.map((w, i) => /*#__PURE__*/React.createElement(FlipPolaroid, {
    key: w.title,
    width: 244,
    tilt: [-2, 2, -1, 3, -3, 1][i % 6],
    assetBase: "../../",
    src: swatch(w.tint),
    caption: `${w.title} · ${w.year}`,
    title: w.title,
    meta: `${w.year} · ${w.role}`,
    notes: w.notes
  }))));
}
window.WorksScreen = WorksScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sondr-site/WorksScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sondr-site/data.js
try { (() => {
/* global React */
// Shared data + helpers for the Sondr site UI kit.
(function () {
  // Flat-color placeholder swatch (honest stand-in for client photography).
  function swatch(hex) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='52'><rect width='40' height='52' fill='${hex}'/></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }
  const WORKS = [{
    title: 'meadow & co',
    year: '2025',
    role: 'brand + web',
    tint: '#cfe3d0',
    notes: 'a slow, seasonal e-commerce build. hand-set type, warm photography, zero templates.'
  }, {
    title: 'atlas studio',
    year: '2025',
    role: 'portfolio',
    tint: '#d8d3ea',
    notes: 'an architect\u2019s portfolio that feels like flipping through a sketchbook of plans.'
  }, {
    title: 'the paper press',
    year: '2024',
    role: 'editorial',
    tint: '#f0dcc4',
    notes: 'independent print house. we let the ink and paper grain do the talking.'
  }, {
    title: 'north bakery',
    year: '2024',
    role: 'brand + web',
    tint: '#f3d9d2',
    notes: 'a neighbourhood bakery. menu that reads like a chalkboard, ordering that just works.'
  }, {
    title: 'field notes',
    year: '2023',
    role: 'blog',
    tint: '#d4e4ee',
    notes: 'a naturalist\u2019s journal online \u2014 margins, marginalia, and a lot of white space.'
  }, {
    title: 'oak & ember',
    year: '2023',
    role: 'restaurant',
    tint: '#e7d6c0',
    notes: 'wood-fire restaurant. dark, warm, tactile. reservations without the friction.'
  }];
  const NAV = [{
    id: 'works',
    label: 'works',
    icon: 'works'
  }, {
    id: 'blog',
    label: 'blog',
    icon: 'blog'
  }, {
    id: 'studio',
    label: 'studio',
    icon: 'studio'
  }, {
    id: 'interior',
    label: 'interior dept.',
    icon: 'interior'
  }, {
    id: 'contact',
    label: 'contact',
    icon: 'contact'
  }];
  window.SondrData = {
    swatch,
    WORKS,
    NAV
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sondr-site/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.NavItem = __ds_scope.NavItem;

__ds_ns.SondrIcon = __ds_scope.SondrIcon;

__ds_ns.DottedGrid = __ds_scope.DottedGrid;

__ds_ns.FlipPolaroid = __ds_scope.FlipPolaroid;

__ds_ns.PolaroidCard = __ds_scope.PolaroidCard;

__ds_ns.StickyNote = __ds_scope.StickyNote;

__ds_ns.Tape = __ds_scope.Tape;

__ds_ns.Heading = __ds_scope.Heading;

__ds_ns.MonoText = __ds_scope.MonoText;

})();
