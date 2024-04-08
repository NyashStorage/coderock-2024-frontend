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
  onClick,
  children,
}: ButtonProps): JSX.Element {
  function getStyles(): string {
    const styles = ['button', `button--${variant}`];
    if (active) styles.push('active');

    return styles.join(' ');
  }

  return (
    <button className={getStyles()} onClick={onClick}>
      {children}
    </button>
  );
}
