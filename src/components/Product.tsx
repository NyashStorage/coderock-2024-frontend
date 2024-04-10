import type { JSX, PropsWithChildren } from 'react';
import '../assets/styles/components/product/index.scss';
import RatingButton from './buttons/RatingButton';
import Block from './layout/Block';

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
    <Block direction="column" className="product">
      <img src={img} alt="" className="w-full" />

      <div className="p-4">
        <div className="product__name">{name}</div>
        <div className="product__company">{company}</div>
        <div className="product__price">{price}&#8381;</div>

        <hr className="my-4" />

        <Block justify="between" alignItems="center">
          <RatingButton defaultRating={rating} disabled={true} />
          <div className="text-sm product__numberOfReviews">
            <span className="font-bold">{numberOfReviews} </span>
            отзывов
          </div>
        </Block>
      </div>
    </Block>
  );
}

export default Product;
