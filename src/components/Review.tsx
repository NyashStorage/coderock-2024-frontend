import type { JSX, PropsWithChildren } from 'react';
import Block from './layout/Block';
import { formatDistance } from 'date-fns';
import { ru } from 'date-fns/locale';
import RatingButton from './buttons/RatingButton';
import Avatar from './Avatar';

export interface ReviewProps extends PropsWithChildren {
  authorName: string;
  authorAvatar: string;
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
      <Avatar image={authorAvatar} rounded />

      <Block direction="column" gap="gap-[10px]">
        <Block justify="between" alignItems="center">
          <Block direction="column">
            <span className="font-bold">{authorName}</span>

            <span>
              {formatDistance(createdAt, new Date(), {
                addSuffix: true,
                locale: ru,
              })}
            </span>
          </Block>

          <RatingButton defaultRating={rating} size="small" disabled />
        </Block>

        <p>{comment}</p>
      </Block>
    </Block>
  );
}
