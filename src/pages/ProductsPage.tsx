import '../assets/styles/pages/products/index.scss';
import type { JSX } from 'react';
import { useState } from 'react';
import { useToast } from '../hooks/toast.hook';
import { useEffectOnce } from 'react-use';
import { getMessages } from '../helpers/api.helpers';
import Block from '../components/layout/Block';
import Loader from '../components/Loader';
import Product from '../components/Product';
import type { ProductResponse } from '../stores/products/products.dto';
import { useLazyGetProductsQuery } from '../stores/products/products.api';

export default function ProductsPage(): JSX.Element {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [isLoading, setLoading] = useState(true);

  const { toastError } = useToast();

  const [getProducts] = useLazyGetProductsQuery();

  useEffectOnce(() => {
    onGetProducts().then();
  });

  async function onGetProducts(): Promise<void> {
    const { data, isError, error } = await getProducts();
    if (isError || !data) {
      setLoading(false);
      return getMessages(error!).forEach((message) => toastError(message));
    }

    setLoading(false);
    setProducts(data.items);
  }

  return (
    <Block className="page--products" direction="column" gap="gap-[30px]">
      {isLoading && (
        <Block direction="column" alignItems="center">
          <Loader />
        </Block>
      )}

      {!isLoading && !products.length && (
        <Block direction="column" alignItems="center" element="h2">
          Товаров не найдено, начните свой бизнес, добавив первый!
        </Block>
      )}

      {!isLoading && !!products.length && (
        <Block className="page--products__content" justify="center">
          {products.map((product) => (
            <Product
              id={product.id}
              image={product.photo}
              title={product.title}
              company={product.owner.companyName}
              price={product.price}
              rating={5}
              reviews={0}
            />
          ))}
        </Block>
      )}
    </Block>
  );
}
