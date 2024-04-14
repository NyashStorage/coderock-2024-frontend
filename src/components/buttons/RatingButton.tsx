import type { JSX } from 'react';
import { useState } from 'react';
import Block from '../layout/Block';
import { faStar as EmptyStarIcon } from '@fortawesome/free-regular-svg-icons';
import { faStar as FilledStarIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { orUndefined } from '../../helpers/сondition.helpers';

export interface RatingButtonProps {
  defaultRating?: number;
  size?: 'big' | 'small';
  disabled?: boolean;
  onChange?: (rating: number) => void;
}

export default function RatingButton({
  defaultRating = 4,
  size = 'big',
  disabled = false,
  onChange,
}: RatingButtonProps): JSX.Element {
  const [rating, setRating] = useState(defaultRating);

  function getStarStyles(): string {
    const styles = ['rating-button__star', `rating-button__star--${size}`];
    if (!disabled) styles.push('cursor-pointer');

    return styles.join(' ');
  }

  function getStars(): JSX.Element {
    const stars: JSX.Element[] = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          className={getStarStyles()}
          icon={i > rating ? EmptyStarIcon : FilledStarIcon}
          onClick={orUndefined(!disabled, (): void => changeRating(i))}
          onMouseEnter={orUndefined(!disabled, (): void => setRating(i))}
        />,
      );
    }

    return <>{...stars}</>;
  }

  function changeRating(rating: number): void {
    setRating(rating);
    onChange?.(rating);
  }

  return <Block>{getStars()}</Block>;
}
