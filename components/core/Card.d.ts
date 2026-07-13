import React from 'react';

export interface CardProps {
  children?: React.ReactNode;
  /** Apply default padding. Default true. */
  padded?: boolean;
  /** Add a drop shadow so it floats off the page. */
  lift?: boolean;
  style?: React.CSSProperties;
}

/**
 * A clean white sheet with a hairline black inset border (sharp corners).
 * The neutral container for panels and content blocks.
 * @startingPoint section="Core" subtitle="Hairline white sheet panel" viewport="700x220"
 */
export function Card(props: CardProps): JSX.Element;
