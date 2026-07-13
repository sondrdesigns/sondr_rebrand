import React from 'react';

/**
 * FlipPolaroid — a work card that shows a polaroid on the front and, on
 * hover, flips (3D) to reveal handwritten-style project notes on the back,
 * like reading what's scribbled on the back of a photo. Sondr's signature
 * "featured works" interaction.
 */
export function FlipPolaroid({
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
  return (
    <div
      className="sondr-flip"
      style={{
        width,
        height,
        perspective: 800,
        transform: `rotate(${tilt}deg)`,
        cursor: 'pointer',
        ...style,
      }}
      {...rest}
    >
      <div
        className="sondr-flip-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 520ms cubic-bezier(0.37,0,0.63,1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* FRONT — polaroid */}
        <figure
          style={{
            position: 'absolute', inset: 0, margin: 0,
            backfaceVisibility: 'hidden',
            filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.20))',
          }}
        >
          <div style={{ position: 'relative', width: '100%', aspectRatio: '731 / 951' }}>
            <div
              style={{
                position: 'absolute', top: '5.5%', left: '9%', right: '9%', bottom: '17%',
                background: 'var(--paper-edge)', backgroundSize: 'cover', backgroundPosition: 'center',
                backgroundImage: src ? `url(${src})` : 'none',
              }}
            />
            <img src={frame} alt="" aria-hidden="true" draggable={false}
              style={{ position: 'relative', display: 'block', width: '100%', height: 'auto', pointerEvents: 'none' }} />
          </div>
          {caption != null && (
            <figcaption style={{
              position: 'absolute', left: '9%', right: '9%', bottom: '8%',
              fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: 'var(--tracking-wide)',
              color: 'var(--ink)', textAlign: 'center',
            }}>{caption}</figcaption>
          )}
        </figure>

        {/* BACK — handwritten notes */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotate3d(0.06, 1, 0.04, 180deg)',
            background: 'var(--paper-white)',
            boxShadow: 'inset 0 0 0 1px var(--ink), 0 6px 14px rgba(0,0,0,0.20)',
            padding: '26px 22px',
            boxSizing: 'border-box',
            display: 'flex', flexDirection: 'column',
            backgroundImage: 'repeating-linear-gradient(transparent 0 27px, rgba(0,81,255,0.12) 27px 28px)',
          }}
        >
          {title && (
            <span style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', fontWeight: 500, fontSize: 20, lineHeight: 1.1, color: 'var(--ink)' }}>{title}</span>
          )}
          {meta && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 'var(--tracking-wide)', color: 'var(--ink-soft)', marginTop: 6 }}>{meta}</span>
          )}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13.5, lineHeight: '28px', letterSpacing: 'var(--tracking-wide)', color: 'var(--ink)', marginTop: 14 }}>{notes}</span>
          <span aria-hidden="true" style={{ marginTop: 'auto', fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--tape-blue)' }}>↩</span>
        </div>
      </div>

      <style>{`
        .sondr-flip:hover .sondr-flip-inner,
        .sondr-flip:focus-within .sondr-flip-inner { transform: rotate3d(0.06, 1, 0.04, 180deg); }
      `}</style>
    </div>
  );
}
