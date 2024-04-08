import '../../assets/styles/components/buttons/index.scss';
import type { JSX, PropsWithChildren } from 'react';

export interface ButtonProps extends PropsWithChildren {
  variant?: 'filled' | 'outlined' | 'empty';
  active?: boolean;
  additionalClasses?: string;
  onClick?: () => void;
}

export default function Button({
  variant = 'filled',
  active = false,
  additionalClasses = '',
  onClick = (): void => {},
  children,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`button--${variant} ${active && 'active'} ${additionalClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
