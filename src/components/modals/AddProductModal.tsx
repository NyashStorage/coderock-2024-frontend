import '../../assets/styles/components/modal/index.scss';
import '../../assets/styles/components/modal/add-product/index.scss';
import type { Dispatch, JSX, SetStateAction } from 'react';
import { useState } from 'react';
import Button from '../buttons/Button';
import FormContainer from '../forms/FormContainer';
import Card from '../layout/Card';
import { getMessages, toBase64 } from '../../helpers/api.helpers';
import StoreType from '../../types/enums/store-type.enum';
import { useToast } from '../../hooks/toast.hook';
import Block from '../layout/Block';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark as CloseIcon } from '@fortawesome/free-solid-svg-icons';
import type ModalProps from './ModalProps';
import type { MyProductResponse } from '../../stores/products/products.dto';
import { useLazyCreateProductQuery } from '../../stores/products/products.api';
import Input from '../inputs/Input';
import Dropdown from '../inputs/Dropdown';
import { useLazyGetCategoriesQuery } from '../../stores/categories/categories.api';
import type { CategoryResponse } from '../../stores/categories/categories.dto';
import { useEffectOnce } from 'react-use';
import Loader from '../Loader';
import { useLazyGetStoresQuery } from '../../stores/stores/stores.api';
import type { StoreResponse } from '../../stores/stores/stores.dto';
import FileInput from '../inputs/FileInput';

export interface AddProductModalProps extends ModalProps {
  setProducts: Dispatch<SetStateAction<MyProductResponse[]>>;
}

export default function AddProductModal({
  setProducts,
  isOpen,
  setIsOpen,
}: AddProductModalProps): JSX.Element {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [isCategoriesLoading, setCategoriesLoading] = useState(true);

  const [stores, setStores] = useState<StoreResponse[]>([]);
  const [isStoresLoading, setStoresLoading] = useState(true);

  const { toastError } = useToast();

  const [getCategories] = useLazyGetCategoriesQuery();
  const [getStores] = useLazyGetStoresQuery();
  const [createProduct] = useLazyCreateProductQuery();

  useEffectOnce(() => {
    onGetCategories().then();
    onGetStores().then();
  });

  async function onGetCategories(): Promise<void> {
    const { data, isError, error } = await getCategories();

    if (isError || !data) {
      setCategoriesLoading(false);
      return getMessages(error!).forEach((message) => toastError(message));
    }

    setCategoriesLoading(false);
    setCategories(data.items);
  }

  async function onGetStores(): Promise<void> {
    const { data, isError, error } = await getStores();

    if (isError || !data) {
      setStoresLoading(false);
      return getMessages(error!).forEach((message) => toastError(message));
    }

    setStoresLoading(false);
    setStores(data.items.filter((store) => store.type === StoreType.Store));
  }

  async function onSubmit(formData: Record<string, any>): Promise<void> {
    const photo = await toBase64(formData.photo);

    // Конвертируем категорию в ID.
    const category = categories.find(
      ({ title }) => title === formData.category,
    )?.id;

    if (!category)
      return toastError(
        'Выберите конкретную категорию, текущая не найдена в списке.',
      );

    // Конвертируем полученные данные в количество товара на складах.
    const amount: Record<number, number> = {};

    for (const [key, value] of Object.entries(formData)) {
      if (!/store-\d+/.test(key)) continue;

      const storeId = +key.replace('store-', '');
      amount[storeId] = +value;
    }

    // Отправляем запрос.
    const { data, isError, error } = await createProduct({
      title: formData.title,
      description: formData.description,
      photo,
      price: +formData.price * 100,
      weight: +formData.weight,
      length: +formData.length,
      height: +formData.height,
      depth: +formData.depth,
      category,
      amount,
    });

    if (isError || !data)
      return getMessages(error!).forEach((message) => toastError(message));

    setProducts((products) => [data, ...products]);
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <Block className="modal">
          <Card
            className="form modal--add-product"
            direction="column"
            gap="gap-[20px]"
          >
            <Block justify="between" alignItems="center">
              <h1>Добавление товара</h1>

              <FontAwesomeIcon
                className="cursor-pointer"
                icon={CloseIcon}
                size="2xl"
                onClick={() => setIsOpen(false)}
              />
            </Block>

            {(isCategoriesLoading || isStoresLoading) && (
              <Block direction="column" alignItems="center">
                <Loader />
              </Block>
            )}

            {!isCategoriesLoading && !isStoresLoading && (
              <FormContainer
                className="flex flex-col gap-[22px]"
                onSuccess={onSubmit}
              >
                <Block direction="column" gap="gap-[8px]">
                  <h3>Базовая информация</h3>

                  <Input placeholder="Заголовок" name="title" required />
                  <Input placeholder="Описание" name="description" required />

                  <Dropdown
                    placeholder="Категория"
                    name="category"
                    content={categories.map((category) => category.title)}
                  />

                  <Input
                    type="number"
                    placeholder="Цена (в рублях)"
                    name="price"
                    required
                  />
                </Block>

                <Block direction="column" gap="gap-[8px]">
                  <h3>Фотография</h3>

                  <FileInput placeholder="Выбрать файл" name="photo" required />
                </Block>

                <Block direction="column" gap="gap-[8px]">
                  <h3>Дополнительная информация</h3>

                  <Input placeholder="Вес (в граммах)" name="weight" required />

                  <Input
                    placeholder="Длина (в сантиметрах)"
                    name="length"
                    required
                  />

                  <Input
                    placeholder="Ширина (в сантиметрах)"
                    name="depth"
                    required
                  />

                  <Input
                    placeholder="Высота (в сантиметрах)"
                    name="height"
                    required
                  />
                </Block>

                <Block direction="column" gap="gap-[8px]">
                  <h3>Наличие на складах</h3>

                  {stores.map((store) => (
                    <Block
                      direction="column"
                      gap="gap-[4px]"
                      key={`store-${store.id}`}
                    >
                      {store.address}

                      <Input
                        placeholder="Количество"
                        name={`store-${store.id}`}
                        required
                      />
                    </Block>
                  ))}
                </Block>

                <Button variant="outlined">Добавить</Button>
              </FormContainer>
            )}
          </Card>
        </Block>
      )}
    </>
  );
}
