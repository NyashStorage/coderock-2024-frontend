import '../../assets/styles/components/link/index.scss';
import type { JSX } from 'react';
import type { LinkProps } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function Link({
  to,
  className,
  children,
}: LinkProps): JSX.Element {
  function getStyles(isActive: boolean): string {
    const styles = ['link'];
    if (isActive) styles.push('link--active');
    if (className) styles.push(...className.split(' '));

    return styles.join(' ');
  }

  return (
    <NavLink to={to} end className={({ isActive }) => getStyles(isActive)}>
      {children}
    </NavLink>
  );
}
