import '../../assets/styles/components/buttons/index.scss';
import type { JSX, PropsWithChildren } from 'react';

export interface ButtonProps extends PropsWithChildren {
  variant?: 'filled' | 'outlined' | 'empty';
  active?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  variant = 'filled',
  active = false,
  disabled = false,
  className,
  onClick,
  children,
}: ButtonProps): JSX.Element {
  function getStyles(): string {
    const styles = ['button', `button--${variant}`];
    if (active) styles.push('active');
    if (className) styles.push(...className.split(' '));

    return styles.join(' ');
  }

  return (
    <button className={getStyles()} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
