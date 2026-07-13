import React from 'react';

export interface MonoTextProps {
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  /** Type step. Default "body". */
  size?: 'lead' | 'body' | 'small';
  /** Use the soft ink color. */
  muted?: boolean;
  style?: React.CSSProperties;
}

/**
 * Running text, captions and labels in Intel One Mono with wide tracking.
 * The body counterpart to Heading.
 */
export function MonoText(props: MonoTextProps): JSX.Element;
