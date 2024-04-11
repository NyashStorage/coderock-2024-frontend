import type { JSX, PropsWithChildren } from 'react';
import '../assets/styles/components/product/index.scss';
import RatingButton from './buttons/RatingButton';
import Block from './layout/Block';

export interface ProductProps extends PropsWithChildren {
  img: string;
  title: string;
  company: string;
  price: number;
  rating: number;
  reviews: number;
  id: number;
  url: string;
}

function Product({
  img,
  title,
  company,
  price,
  rating,
  reviews,
  id,
  url,
}: ProductProps): JSX.Element {
  function formatPrice(): string {
    return (price / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  return (
    <Block
      direction="column"
      className="product"
      onClick={() => (window.location.href = url.replace('%id%', `${id}`))}
    >
      <img src={img} alt="" className="w-full" />

      <div className="p-4">
        <div className="product__name">{title}</div>
        <div className="product__company">{company}</div>
        <div className="product__price">{formatPrice()}&#8381;</div>

        <hr className="my-4" />

        <Block justify="between" alignItems="center">
          <RatingButton defaultRating={rating} disabled={true} />
          <div className="text-sm product__numberOfReviews">
            <span className="font-bold">{reviews} </span>
            отзывов
          </div>
        </Block>
      </div>
    </Block>
  );
}

export default Product;
