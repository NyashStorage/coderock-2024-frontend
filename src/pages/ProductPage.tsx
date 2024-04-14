import '../assets/styles/pages/product/index.scss';
import type { JSX } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffectOnce } from 'react-use';
import type { ProductResponse } from '../stores/products/products.dto';
import { useToast } from '../hooks/toast.hook';
import { useLazyGetProductsQuery } from '../stores/products/products.api';
import { getMessages } from '../helpers/api.helpers';
import Block from '../components/layout/Block';
import Loader from '../components/Loader';
import Card from '../components/layout/Card';
import RatingButton from '../components/buttons/RatingButton';
import Button from '../components/buttons/Button';
import Dropdown from '../components/inputs/Dropdown';
import { name2Type } from '../types/enums/route-type.enum';
import type { StoreResponse } from '../stores/stores/stores.dto';
import { useLazyGetStoresQuery } from '../stores/stores/stores.api';
import StoreType from '../types/enums/store-type.enum';
import Review from '../components/Review';
import FormContainer from '../components/forms/FormContainer';

export default function ProductPage(): JSX.Element {
  const [product, setProduct] = useState<ProductResponse>();
  const [isProductLoading, setProductLoading] = useState(true);

  const [deliveryPoints, setDeliveryPoints] = useState<StoreResponse[]>([]);
  const [isStoresLoading, setStoresLoading] = useState(true);

  const [price, setPrice] = useState(0);

  const { id } = useParams();
  const { toastError, toastSuccess } = useToast();

  const [getProducts] = useLazyGetProductsQuery();
  const [getStores] = useLazyGetStoresQuery();

  useEffectOnce(() => {
    onGetProducts().then();
    onGetDeliveryPoints().then();
  });

  async function onGetProducts(): Promise<void> {
    const { data, isError, error } = await getProducts();
    if (isError || !data) {
      setProductLoading(false);
      return getMessages(error!).forEach((message) => toastError(message));
    }

    const product = data.items.find((product) => product.id === +id!)!;

    setProductLoading(false);
    setProduct(product);
    setPrice(product.price);
  }

  async function onGetDeliveryPoints(): Promise<void> {
    const { data, isError, error } = await getStores();
    if (isError || !data) {
      setStoresLoading(false);
      return getMessages(error!).forEach((message) => toastError(message));
    }

    setStoresLoading(false);
    setDeliveryPoints(
      data.items.filter((store) => store.type === StoreType.DeliveryPoint),
    );
  }

  return (
    <Block className="page--product" direction="column" gap="gap-[40px]">
      {(isProductLoading || isStoresLoading) && (
        <Block direction="column" alignItems="center">
          <Loader />
        </Block>
      )}

      {!isProductLoading && !isStoresLoading && (
        <>
          <Block direction="column" alignItems="center">
            <img
              className="w-[25%]"
              src={`data:image/png;base64, ${product?.photo}`}
              alt=""
            />

            <Block direction="column" alignItems="center" gap="gap-[4px]">
              <h1>{product?.title} </h1>
              <RatingButton defaultRating={5} disabled />
            </Block>
          </Block>

          <Block justify="around">
            <Block direction="column" gap="gap-[8px]">
              <Block direction="column">
                <h2>Описание</h2>
                {product?.description}
              </Block>

              <Block direction="column">
                <h2>Вес</h2>
                {product?.properties.weight} г.
              </Block>

              <Block direction="column">
                <h2>Размер</h2>
                {product?.properties.length} x {product?.properties.depth} x{' '}
                {product?.properties.height} см.
              </Block>

              <Block direction="column">
                <h2>Продавец</h2>
                {product?.owner.companyName}
              </Block>
            </Block>

            <FormContainer onSuccess={() => {}}>
              <Card direction="column" gap="gap-[20px]">
                <h2>Оформить заказ</h2>

                <Block direction="column" gap="gap-[8px]">
                  <Dropdown
                    placeholder="Пункт выдачи"
                    content={deliveryPoints.map(
                      (deliveryPoint) => deliveryPoint.address,
                    )}
                  />

                  <Dropdown
                    placeholder="Тип доставки"
                    content={[
                      'самый быстрый',
                      'самый дешёвый',
                      'короткий маршрут',
                    ]}
                  />

                  <Dropdown
                    placeholder="Способ доставки"
                    content={Object.keys(name2Type)}
                  />
                </Block>

                <Block justify="between">
                  <h2>Цена</h2>
                  <h2 className="page--product__price">{price / 100}₽</h2>
                </Block>

                <Button
                  onClick={() =>
                    toastSuccess(
                      `Заказ ${product?.title} за ${price / 100}₽ отправлен в обработку нашим магазином.`,
                    )
                  }
                >
                  Заказать
                </Button>
              </Card>
            </FormContainer>
          </Block>

          <Block className="w-full" direction="column" gap="gap-[40px]">
            <h2>Отзывы</h2>

            <Review
              authorName="Иван Петров"
              authorAvatar="https://photo7.wambacdn.net/19/44/06/1494604491/1494606326_huge.jpg?hash=dHb0Sa97lo3Lw1dx5XtrIg&expires=64060578000&updated=1492429584"
              comment="Превосходно! Обязательно закажу ещё."
              rating={5}
              createdAt={1713001622000}
            />

            <Review
              authorName="Алиса Кукорева"
              authorAvatar="https://pp.userapi.com/c631524/v631524417/43f78/npdDnW7DuiU.jpg"
              comment="Нууу, такооое..."
              rating={3}
              createdAt={1713001447000}
            />

            <Review
              authorName="Геннадий Волков"
              authorAvatar="https://gov.cap.ru/Content2021/news/202201/25/v.jpg"
              comment=""
              rating={4}
              createdAt={1713000427000}
            />
          </Block>
        </>
      )}
    </Block>
  );
}
