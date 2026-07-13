import React from 'react';

/**
 * PolaroidCard — an instax/polaroid frame (real bitmap) with a photo
 * window and a caption on the bottom lip. Use for featured works / a
 * gallery. Slight tilt sells the pinned-to-a-board feel.
 */
export function PolaroidCard({
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
  return (
    <figure
      onClick={onClick}
      style={{
        position: 'relative',
        width,
        margin: 0,
        transform: `rotate(${tilt}deg)`,
        cursor: onClick ? 'pointer' : 'default',
        filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.20))',
        transition: 'transform 160ms ease',
        ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = `rotate(${tilt}deg) translateY(-4px)`; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = `rotate(${tilt}deg) translateY(0)`; }}
      {...rest}
    >
      {/* photo window: frame sits on top with transparent center */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '731 / 951' }}>
        <div
          style={{
            position: 'absolute',
            top: '5.5%', left: '9%', right: '9%', bottom: '17%',
            background: 'var(--paper-edge)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: src ? `url(${src})` : 'none',
          }}
        />
        <img
          src={frame}
          alt=""
          aria-hidden="true"
          draggable={false}
          style={{ position: 'relative', display: 'block', width: '100%', height: 'auto', pointerEvents: 'none' }}
        />
      </div>
      {caption != null && (
        <figcaption
          style={{
            position: 'absolute',
            left: '9%', right: '9%', bottom: '4%',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            letterSpacing: 'var(--tracking-wide)',
            color: 'var(--ink)',
            textAlign: 'center',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
