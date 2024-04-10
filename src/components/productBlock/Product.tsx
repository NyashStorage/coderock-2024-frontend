import React, { JSX, PropsWithChildren } from 'react';
import '../../assets/styles/components/product/index.scss';
import RatingButton from '../buttons/RatingButton';

export interface ProductProps extends PropsWithChildren {
  img: string;
  name: string;
  company: string;
  price: number;
  rating: number;
  numberOfReviews: number;
}
function Product({
  img,
  name,
  company,
  price,
  rating,
  numberOfReviews,
}: ProductProps): JSX.Element {
  return (
    <div className="product">
      <img src={img} alt="" className="w-full" />
      <div className="p-4">
        <div className="product__name font-bold text-xl">{name}</div>
        <div className="product__company">{company}</div>
        <div className="product__price font-bold">{price}&#8381;</div>
        <hr className="my-4" />
        <div className="flex justify-between items-center">
          <RatingButton defaultRating={rating} disabled={true} />
          <div className="text-sm product__numberOfReviews">
            <span className="font-bold">{numberOfReviews} </span>
            отзывов
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
