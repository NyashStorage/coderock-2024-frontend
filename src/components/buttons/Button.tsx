import '../../assets/styles/components/buttons/index.scss';
import type { JSX, PropsWithChildren } from 'react';

export interface ButtonProps extends PropsWithChildren {
  variant?: 'filled' | 'outlined' | 'empty';
  active?: boolean;
  newClass?: string | undefined;
  onClick?: () => void;
}

export default function Button({
  variant = 'filled',
  active = false,
  newClass = undefined,
  onClick = (): void => {},
  children,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`button--${variant} ${active && 'active'} ${newClass && newClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
