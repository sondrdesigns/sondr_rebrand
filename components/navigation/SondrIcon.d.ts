import React from 'react';

export interface SondrIconProps {
  /** Which animated glyph to render. */
  name: 'works' | 'blog' | 'contact' | 'studio' | 'interior';
  /** Pixel size (square). Default 22. */
  size?: number;
  /** Stroke color. Default ink. */
  stroke?: string;
  style?: React.CSSProperties;
}

/**
 * Sondr's hand-drawn animated nav icons. Animate on hover of the nearest
 * ancestor with class "sondr-icon": works=spinning 3D cube, blog=pen
 * scribble, contact=envelope opens, studio=fingerprint flows, interior=
 * lamp turns on. Wrap the icon + label in a `.sondr-icon` element.
 */
export function SondrIcon(props: SondrIconProps): JSX.Element;
