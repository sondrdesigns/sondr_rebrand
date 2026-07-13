import React from 'react';

export interface NavItemProps {
  children?: React.ReactNode;
  href?: string;
  /** Mark as the current page (underlined, full opacity). */
  current?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/**
 * A single lowercase mono navigation link. Sondr nav stacks these in the
 * left notebook margin; the current item gets an underline.
 */
export function NavItem(props: NavItemProps): JSX.Element;
