import React from 'react';

/**
 * SondrIcon — Sondr's animated navigation icons, hand-drawn pen-line
 * style. Each animates on hover of its nearest `.sondr-icon` wrapper:
 *   works    — blue dot pulses
 *   blog     — pen scribbles a line
 *   contact  — envelope flap opens
 *   studio   — fingerprint lines flow
 *   interior — lamp turns on (glow)
 * Wrap the icon + its label together in an element with class
 * "sondr-icon" so hovering the label animates the glyph too.
 */

const CSS = `
@keyframes sondr-pulse { 0%,100%{ transform:scale(1); opacity:1 } 50%{ transform:scale(1.55); opacity:.45 } }
@keyframes sondr-scribble { to { stroke-dashoffset:0 } }
@keyframes sondr-flow { to { stroke-dashoffset:-16 } }
.sondr-icon svg { display:block; overflow:visible }
/* works: pulsing dot */
.sondr-ic-works .ring { opacity:0; transform-origin:center; transform:scale(1); transition:opacity .2s }
.sondr-icon:hover .sondr-ic-works .dot { animation:sondr-pulse 1.1s ease-in-out infinite }
.sondr-icon:hover .sondr-ic-works .ring { opacity:1; animation:sondr-pulse 1.1s ease-in-out infinite; animation-delay:.15s }
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

export function SondrIcon({ name, size = 22, stroke = 'var(--ink)', style = {}, ...rest }) {
  useIconCSS();
  const common = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke, strokeWidth: 1.6,
    strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  let inner = null;
  if (name === 'works') {
    inner = (
      <g className="sondr-ic-works">
        <circle className="ring" cx="12" cy="12" r="6" stroke="var(--tape-blue)" fill="none" />
        <circle className="dot" cx="12" cy="12" r="3.4" fill="var(--tape-blue)" stroke="none" />
      </g>
    );
  } else if (name === 'blog') {
    inner = (
      <g className="sondr-ic-blog">
        <path className="scribble" d="M3 19c3-1 4-3 6-2s3 3 6 1" stroke="var(--tape-blue)" />
        <g className="pen">
          <path d="M15 4l5 5-9 9-5 1 1-5z" />
          <path d="M14 5l5 5" />
        </g>
      </g>
    );
  } else if (name === 'contact') {
    inner = (
      <g className="sondr-ic-contact">
        <rect x="3" y="6" width="18" height="13" rx="1" />
        <rect className="letter" x="7" y="4" width="10" height="9" rx="1" stroke="var(--tape-blue)" />
        <path className="flap" d="M3 7l9 6 9-6" />
      </g>
    );
  } else if (name === 'studio') {
    inner = (
      <g className="sondr-ic-studio">
        <path d="M12 5a7 7 0 0 1 7 7" />
        <path d="M12 8a4 4 0 0 1 4 4v3" />
        <path d="M12 11a1 1 0 0 1 1 1v4" />
        <path d="M8 6.5A7 7 0 0 0 5 12v4" />
        <path d="M9 11v5" />
      </g>
    );
  } else if (name === 'interior') {
    inner = (
      <g className="sondr-ic-interior">
        <ellipse className="glow" cx="12" cy="19.5" rx="9" ry="2.4" stroke="none" />
        <path className="bulb" d="M8 3h8l3 8H5z" />
        <path d="M8 3h8l3 8H5z" />
        <path d="M10 11v4a2 2 0 0 0 4 0v-4" />
        <path d="M12 19v2" />
      </g>
    );
  }
  return <svg {...common} style={{ display: 'block', ...style }} {...rest}>{inner}</svg>;
}
