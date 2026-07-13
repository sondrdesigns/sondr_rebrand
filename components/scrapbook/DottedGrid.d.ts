import React from 'react';

export interface DottedGridProps {
  children?: React.ReactNode;
  /** Draw the left notebook margin rule. Default false. */
  margin?: boolean;
  /** Base paper color. Default warm paper. */
  paper?: string;
  style?: React.CSSProperties;
}

/**
 * The signature dotted-notebook-grid surface. Wrap sections/pages in it
 * for the paper background; enable `margin` for the left ruled line.
 * @startingPoint section="Scrapbook" subtitle="Dotted notebook page surface" viewport="700x300"
 */
export function DottedGrid(props: DottedGridProps): JSX.Element;
