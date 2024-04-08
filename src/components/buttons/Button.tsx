import '../../assets/styles/components/buttons/index.scss';
import type { JSX, PropsWithChildren } from 'react';

export interface ButtonProps extends PropsWithChildren {
  variant?: 'filled' | 'outlined' | 'empty';
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  variant = 'filled',
  active = false,
  disabled = false,
  onClick,
  children,
}: ButtonProps): JSX.Element {
  function getStyles(): string {
    const styles = ['button', `button--${variant}`];
    if (active) styles.push('active');

    return styles.join(' ');
  }

  return (
    <button className={getStyles()} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
