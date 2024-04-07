import type { JSX, PropsWithChildren } from 'react';
import Block from './layout/Block';
import { formatDistance } from 'date-fns';
import { ru } from 'date-fns/locale';

export interface ReviewProps extends PropsWithChildren {
  authorName: string;
  // TODO: Поменять, когда будет реализован компонент аватарки.
  authorAvatar: JSX.Element;
  comment: string;
  rating: number;
  createdAt: number;
}

export default function Review({
  authorName,
  authorAvatar,
  comment,
  rating,
  createdAt,
}: ReviewProps): JSX.Element {
  return (
    <Block gap="gap-[10px]">
      {authorAvatar}
      <Block direction="column" gap="gap-[10px]">
        <Block justify="between" alignItems="center">
          <Block direction="column">
            <h3>{authorName}</h3>
            <span>
              {formatDistance(createdAt, new Date(), {
                addSuffix: true,
                locale: ru,
              })}
            </span>
          </Block>
          {/* TODO: Поменять на RatingButton, когда компонент будет реализован. */}
          {rating}
        </Block>
        <p>{comment}</p>
      </Block>
    </Block>
  );
}
