import type { JSX } from 'react';
import { useState } from 'react';
import Block from '../layout/Block';
import { faStar as EmptyStarIcon } from '@fortawesome/free-regular-svg-icons';
import { faStar as FilledStarIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface RatingButtonProps {
  defaultRating?: number;
  disabled?: boolean;
  onChange?: (rating: number) => void;
}

export default function RatingButton({
  defaultRating = 4,
  disabled = false,
  onChange = (): void => {},
}: RatingButtonProps): JSX.Element {
  const [rating, setRating] = useState(defaultRating);

  function getStars(): JSX.Element {
    const stars: JSX.Element[] = [];

    for (let i = 1; i <= 5; i++) {
      const isStarEmpty = i > rating;

      stars.push(
        disabled ? (
          <FontAwesomeIcon
            className="rating-button__star"
            icon={i > rating ? EmptyStarIcon : FilledStarIcon}
          />
        ) : (
          <FontAwesomeIcon
            className="rating-button__star cursor-pointer"
            onClick={() => changeRating(i)}
            onMouseEnter={() => setRating(i)}
            icon={isStarEmpty ? EmptyStarIcon : FilledStarIcon}
          />
        ),
      );
    }

    return <>{...stars}</>;
  }

  function changeRating(rating: number): void {
    setRating(rating);
    onChange(rating);
  }

  return <Block>{getStars()}</Block>;
}
