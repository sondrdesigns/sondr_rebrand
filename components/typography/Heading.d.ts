import React from 'react';

export interface HeadingProps {
  children?: React.ReactNode;
  /** Type-scale step. Default "display". */
  level?: 'display' | 'title' | 'heading';
  /** Override the rendered tag. */
  as?: keyof JSX.IntrinsicElements;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * Sondr display type: Inter, medium, UPPERCASE, wide 0.11em tracking,
 * tight leading. Use for hero headlines and section titles.
 * @startingPoint section="Typography" subtitle="Uppercase display headline" viewport="700x220"
 */
export function Heading(props: HeadingProps): JSX.Element;
