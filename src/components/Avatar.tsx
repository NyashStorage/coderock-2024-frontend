import type { JSX, PropsWithChildren } from 'react';

import '../assets/styles/components/avatar/index.scss';

export interface AvatarProps extends PropsWithChildren {
  image?: string;
  rounded?: boolean;
}

export default function Avatar({
  rounded = false,
  image,
}: AvatarProps): JSX.Element {
  return (
    <div className={rounded ? 'avatar--rounded' : 'avatar'}>
      <img src={image} onError={(e) => (e.target.style.display = 'none')} />
    </div>
  );
}
