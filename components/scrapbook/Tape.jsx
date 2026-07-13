import React from 'react';

/**
 * Tape — a strip of torn adhesive tape, using the real bitmaps from the
 * source. Use to "attach" cards/notes to the page, or as a decorative
 * accent. Absolutely position it over the corner of an element.
 */
const TAPES = {
  blue: 'tape-blue.png',
  cream: 'tape-cream.png',
};

export function Tape({
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
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      style={{
        display: 'block',
        width,
        height: 'auto',
        transform: `rotate(${tilt}deg)`,
        filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.28))',
        pointerEvents: 'none',
        userSelect: 'none',
        ...style,
      }}
      {...rest}
    />
  );
}
