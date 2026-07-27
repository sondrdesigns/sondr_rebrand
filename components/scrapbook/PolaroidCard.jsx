'use client';

import React from 'react';

export function PolaroidCard({
  src,
  tint,
  caption,
  tilt = -2,
  width = 260,
  assetBase = '',
  email,
  comingSoon = false,
  onClick,
  style = {},
  ...rest
}) {
  const frame = `${assetBase}assets/polaroid-frame.png`;
  const height = width * (951 / 731) + 8;

  const front = (
    <>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '731 / 951' }}>
        <div
          style={{
            position: 'absolute',
            top: '5.5%', left: '9%', right: '9%', bottom: '17%',
            backgroundColor: tint || 'var(--paper-edge)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: src ? `url(${src})` : 'none',
          }}
        />
        {comingSoon && (
          <div style={{
            position: 'absolute',
            left: '9%', right: '9%', bottom: '18%',
            background: 'rgba(0,81,255,0.88)',
            color: '#fff',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '.18em',
            padding: '6px 0',
            textAlign: 'center',
            zIndex: 2,
            textTransform: 'lowercase',
          }}>
            coming soon
          </div>
        )}
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
            left: '9%', right: '9%', bottom: '10%',
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
    </>
  );

  if (email) {
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
        <figure
          className="sondr-flip-inner"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            margin: 0,
            transition: 'transform 520ms cubic-bezier(0.37,0,0.63,1)',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
          }}
        >
          {/* FRONT */}
          <div
            style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(0deg) translateZ(0.1px)',
              filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.20))',
            }}
          >
            {front}
          </div>

          {/* BACK */}
          <div
            style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(0.1px)',
              background: 'var(--paper-white)',
              boxShadow: 'inset 0 0 0 1px var(--ink), 0 6px 14px rgba(0,0,0,0.20)',
              padding: '26px 22px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundImage: 'repeating-linear-gradient(transparent 0 27px, rgba(0,81,255,0.12) 27px 28px)',
            }}
          >
            {caption && (
              <span style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', fontWeight: 500, fontSize: 18, lineHeight: 1.1, color: 'var(--ink)' }}>
                {caption}
              </span>
            )}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.16em', color: 'var(--ink-soft)', marginTop: 10 }}>
              email
            </span>
            <a
              href={`mailto:${email}`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                letterSpacing: '.08em',
                color: 'var(--tape-blue)',
                marginTop: 6,
                textDecoration: 'none',
                lineHeight: 1.4,
                wordBreak: 'break-all',
              }}
            >
              {email}
            </a>
            <span aria-hidden="true" style={{ marginTop: 'auto', paddingTop: 20, fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--tape-blue)' }}>↩</span>
          </div>
        </figure>

        <style>{`
          .sondr-flip:hover .sondr-flip-inner,
          .sondr-flip:focus-within .sondr-flip-inner { transform: rotateY(180deg); }
        `}</style>
      </div>
    );
  }

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
      {front}
    </figure>
  );
}
