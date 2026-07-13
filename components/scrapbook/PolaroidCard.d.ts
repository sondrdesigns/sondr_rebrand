import React from 'react';

export interface PolaroidCardProps {
  /** Photo URL shown in the frame window. */
  src?: string;
  /** Caption on the bottom lip (mono). */
  caption?: React.ReactNode;
  /** Rotation in degrees. Default -2. */
  tilt?: number;
  /** Rendered width in px. Default 260. */
  width?: number;
  /** Path prefix to reach assets/ (e.g. "../../"). */
  assetBase?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/**
 * A polaroid/instax photo frame (real bitmap) with a photo window and a
 * handwritten-style caption. The workhorse for featured works & galleries.
 * @startingPoint section="Scrapbook" subtitle="Polaroid photo frame with caption" viewport="700x420"
 */
export function PolaroidCard(props: PolaroidCardProps): JSX.Element;
