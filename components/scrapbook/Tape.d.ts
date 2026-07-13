import React from 'react';

export interface TapeProps {
  /** Which tape bitmap. Default "cream". */
  color?: 'blue' | 'cream';
  /** Rendered width in px. Default 180. */
  width?: number;
  /** Rotation in degrees. Default -6. */
  tilt?: number;
  /** Prefix to reach the assets/ folder from the page (e.g. "../../"). */
  assetBase?: string;
  style?: React.CSSProperties;
}

/**
 * A torn strip of masking/painter's tape (real photographic bitmap).
 * Position it absolutely over the corner of a card or note to "attach" it.
 */
export function Tape(props: TapeProps): JSX.Element;
