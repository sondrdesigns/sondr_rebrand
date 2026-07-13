import React from 'react';

export interface ButtonProps {
  children?: React.ReactNode;
  /** Visual treatment. Default "outline" (hairline ballot box). */
  variant?: 'outline' | 'solid' | 'sticky';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'a';
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/**
 * Sondr's primary action control: a hairline outlined rectangle with a
 * lowercase mono label and wide tracking. Sharp corners, no fill.
 * @startingPoint section="Core" subtitle="Outlined ballot-box button" viewport="700x150"
 */
export function Button(props: ButtonProps): JSX.Element;
