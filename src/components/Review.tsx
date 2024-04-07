import type { PropsWithChildren } from 'react';
import Block from './layout/Block';

export interface ReviewProps extends PropsWithChildren {
  createdAt: string;
  rating: number;
  reviewAvatar: JSX.Element;
  authorName: string;
}

export default function Review({
  createdAt,
  rating,
  reviewAvatar,
  authorName,
}: ReviewProps): JSX.Element {
  return (
    <Block justify="center" gap="14">
      <p>{createdAt}</p>
      <p>{rating}</p>
      <p>{reviewAvatar}</p>
      <p>{authorName}</p>
    </Block>
  );
}
