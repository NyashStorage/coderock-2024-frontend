import type { JSX, PropsWithChildren } from 'react';
import '../assets/styles/components/product/index.scss';
import Block from './layout/Block';
import RatingButton from './buttons/RatingButton';
import { useNavigate } from 'react-router-dom';

export interface ProductProps extends PropsWithChildren {
  id: number;
  url: string;
  image: string;
  title: string;
  company: string;
  price: number;
  rating: number;
  reviews: number;
  disabled?: boolean;
}

function Product({
  id,
  url,
  image,
  title,
  company,
  price,
  rating,
  reviews,
  disabled = false,
}: ProductProps): JSX.Element {
  const navigate = useNavigate();

  function getStyles(): string {
    const styles = ['product'];
    if (disabled) styles.push('product--disabled');

    return styles.join(' ');
  }

  function openProduct(): void {
    navigate(url.replace('%id%', id.toString()));
  }

  return (
    <Block
      className={getStyles()}
      direction="column"
      onClick={!disabled ? openProduct : undefined}
    >
      <div
        className="product__image"
        style={{ backgroundImage: `url("${image}")` }}
      />

      <Block
        className="product__description"
        direction="column"
        gap="gap-[10px]"
      >
        <Block direction="column" gap="gap-[6px]">
          <Block direction="column">
            <h2 className="product__description__title">{title}</h2>
            <div className="product__description__company">{company}</div>
          </Block>

          <div className="product__description__price">
            {(price / 100).toLocaleString('ru-RU')}₽
          </div>
        </Block>

        <hr />

        <Block justify="between" alignItems="center">
          <RatingButton size="small" defaultRating={rating} disabled />

          <div className="product__description__reviews">
            <span className="font-bold">{reviews}</span> отзывов
          </div>
        </Block>
      </Block>
    </Block>
  );
}

export default Product;
