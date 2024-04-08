import '../assets/styles/components/avatar/index.scss';
import type { JSX, PropsWithChildren } from 'react';

export interface AvatarProps extends PropsWithChildren {
  image?: string;
  rounded?: boolean;
  onClick?: () => void;
}

export default function Avatar({
  image,
  rounded = false,
  onClick,
}: AvatarProps): JSX.Element {
  function getStyles(): string {
    const styles = ['avatar'];
    if (rounded) styles.push('avatar--rounded');
    if (onClick) styles.push('avatar--hoverable');
    return styles.join(' ');
  }

  return <img className={getStyles()} src={image} alt="" onClick={onClick} />;
}
