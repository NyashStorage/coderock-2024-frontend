import '../../assets/styles/components/buttons/index.scss';
import type { JSX, PropsWithChildren } from 'react';

export interface ButtonProps extends PropsWithChildren {
  variant?: 'filled' | 'outlined' | 'empty';
  active?: boolean;
  onClick?: () => void;
}

export default function Button({
  variant = 'filled',
  active = false,
  onClick = (): void => {},
  children,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`button--${variant} ${active && 'active'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
