import React from 'react';

export interface FlipPolaroidProps {
  /** Front photo URL. */
  src?: string;
  /** Front caption (on the polaroid lip). */
  caption?: React.ReactNode;
  /** Back: project title (uppercase display). */
  title?: React.ReactNode;
  /** Back: small meta line (year · role). */
  meta?: React.ReactNode;
  /** Back: handwritten-style project notes. */
  notes?: React.ReactNode;
  tilt?: number;
  width?: number;
  assetBase?: string;
  style?: React.CSSProperties;
}

/**
 * A featured-work card: polaroid on the front that flips on hover to
 * reveal handwritten project notes on the back. Sondr's signature works
 * interaction.
 * @startingPoint section="Scrapbook" subtitle="Polaroid that flips to notes on hover" viewport="700x460"
 */
export function FlipPolaroid(props: FlipPolaroidProps): JSX.Element;
