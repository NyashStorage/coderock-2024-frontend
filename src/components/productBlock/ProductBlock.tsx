import React, { JSX, PropsWithChildren } from 'react';
import '../../assets/styles/components/productBlock/index.scss';
import RatingButton from '../buttons/RatingButton';

export interface ProductBlockProps extends PropsWithChildren {
  img: string;
  name: string;
  company: string;
  price: number;
  rating: number;
  numberOfReviews: number;
}
function ProductBlock({
  img,
  name,
  company,
  price,
  rating,
  numberOfReviews,
}: ProductBlockProps): JSX.Element {
  return (
    <div className="productBlock">
      <img src={img} alt="" className="w-full" />
      <div className="p-4">
        <div className="productBlock__name font-bold text-xl">{name}</div>
        <div className="productBlock__company">{company}</div>
        <div className="productBlock__price font-bold">{price}&#8381;</div>
        <hr className="my-4" />
        <div className="flex justify-between items-center">
          <RatingButton defaultRating={rating} disabled={true} />
          <div className="text-sm productBlock__numberOfReviews">
            <span className="font-bold">{numberOfReviews} </span>
            отзывов
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductBlock;
