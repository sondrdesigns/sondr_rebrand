import React from 'react';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed';
  color?: string;
  /** Length (CSS value). Default "100%". */
  length?: string;
  style?: React.CSSProperties;
}

/**
 * A thin ruled line, like a pencil stroke. Horizontal or vertical,
 * solid or dashed. Uses the soft-ink rule color by default.
 */
export function Divider(props: DividerProps): JSX.Element;
