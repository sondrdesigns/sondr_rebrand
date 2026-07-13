'use client';

import React from 'react';

/**
 * SondrIcon - animated navigation icons. Animations trigger on hover of
 * the nearest `.sondr-icon` wrapper so labels and glyphs animate together.
 */
export function SondrIcon({ name, size = 22, stroke = 'var(--ink)', style = {}, ...rest }) {
  if (name === 'works') {
    return (
      <div className="sondr-ic-works-wrap" style={{ width: size, height: size, ...style }} {...rest}>
        <div className="sondr-ic-works">
          <div className="sondr-ic-works-face f-top" />
          <div className="sondr-ic-works-face f-front" />
          <div className="sondr-ic-works-face f-back" />
          <div className="sondr-ic-works-face f-left" />
          <div className="sondr-ic-works-face f-right" />
          <div className="sondr-ic-works-face f-bottom" />
        </div>
      </div>
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
    strokeLinejoin: 'round',
  };

  let inner = null;
  if (name === 'blog') {
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
        <rect className="letter" x="7" y="4" width="10" height="9" rx="1" fill="var(--tape-blue)" stroke="var(--tape-blue)" />
        <path className="flap" d="M3 7l9 6 9-6" />
      </g>
    );
  } else if (name === 'studio') {
    inner = (
      <g className="sondr-ic-studio">
        <path d="M3 20 C3 8 8 3 12 3 C16 3 21 8 21 20" />
        <path d="M5.5 20 C5.5 10 9 5.5 12 5.5 C15 5.5 18.5 10 18.5 20" />
        <path d="M8 20 C8 12 10 8 12 8 C14 8 16 12 16 20" />
        <path d="M10 20 C10 14 11 11.5 12 11.5 C13 11.5 14 14 14 20" />
        <path d="M11.5 20 C11.5 16.5 12 15.5 12 15.5" />
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
