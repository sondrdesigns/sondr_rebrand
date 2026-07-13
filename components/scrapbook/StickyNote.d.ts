import React from 'react';

export interface StickyNoteProps {
  children?: React.ReactNode;
  /** Rotation in degrees. Default -3. */
  tilt?: number;
  /** Note body color. Default sticky yellow. */
  color?: string;
  /** Square-ish base size in px. Default 220. */
  size?: number;
  style?: React.CSSProperties;
}

/**
 * A yellow post-it note with a lift shadow, slight tilt and a curled
 * corner. Use for asides, callouts, and short annotations.
 * @startingPoint section="Scrapbook" subtitle="Tilted post-it note" viewport="700x300"
 */
export function StickyNote(props: StickyNoteProps): JSX.Element;
