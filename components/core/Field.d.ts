import React from 'react';

export interface FieldProps {
  /** Lowercase mono label shown above the control. */
  label?: string;
  placeholder?: string;
  /** Render a textarea instead of a single-line input. */
  multiline?: boolean;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent) => void;
  type?: string;
  style?: React.CSSProperties;
}

/**
 * A text input or textarea styled as a hairline paper box with a mono
 * label. Matches Card's border treatment; use for contact forms.
 */
export function Field(props: FieldProps): JSX.Element;
