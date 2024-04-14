import '../../assets/styles/pages/company/products/index.scss';
import type { JSX } from 'react';
import { useState } from 'react';
import Block from '../../components/layout/Block';
import Button from '../../components/buttons/Button';
import { useEffectOnce } from 'react-use';
import { getMessages } from '../../helpers/api.helpers';
import { useToast } from '../../hooks/toast.hook';
import {
  useLazyDeleteProductQuery,
  useLazyGetMyProductsQuery,
} from '../../stores/products/products.api';
import Product from '../../components/Product';
import type { MyProductResponse } from '../../stores/products/products.dto';
import { useUserState } from '../../stores/users/users.slice';
import AddProductModal from '../../components/modals/AddProductModal';
import Loader from '../../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen as EditIcon,
  faTrashCan as DeleteIcon,
} from '@fortawesome/free-solid-svg-icons';
import EditProductModal from '../../components/modals/EditProductModal';

export default function ProductsPage(): JSX.Element {
  const [products, setProducts] = useState<MyProductResponse[]>([]);
  const [isLoading, setLoading] = useState(true);

  const [editedProduct, setEditedProduct] = useState<MyProductResponse>();

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const { profile } = useUserState();
  const { toastError } = useToast();

  const [getProducts] = useLazyGetMyProductsQuery();
  const [deleteProduct] = useLazyDeleteProductQuery();

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

  async function onEdit(product: MyProductResponse): Promise<void> {
    setEditedProduct(product);
    setEditModalOpen(true);
  }

  async function onDelete(id: number): Promise<void> {
    const { isError, error } = await deleteProduct(id);
    if (isError)
      return getMessages(error!).forEach((message) => toastError(message));

    setProducts((products) => products.filter((product) => product.id !== id));
  }

  return (
    <Block
      className="page--company__products"
      direction="column"
      gap="gap-[30px]"
    >
      <Button
        className="page--company__products__add"
        variant="outlined"
        onClick={() => setAddModalOpen(true)}
      >
        Добавить
      </Button>

      <AddProductModal
        setProducts={setProducts}
        isOpen={isAddModalOpen}
        setIsOpen={setAddModalOpen}
      />

      <EditProductModal
        product={editedProduct!}
        setProducts={setProducts}
        isOpen={isEditModalOpen}
        setIsOpen={setEditModalOpen}
      />

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
        <Block className="page--company__products__content" direction="column">
          {products.map((product) => (
            <Block
              direction="column"
              alignItems="center"
              gap="gap-[8px]"
              key={`product-${product.id}`}
            >
              <Product
                id={product.id}
                image={product.photo}
                title={product.title}
                company={profile?.companyName || 'Неизвестная компания'}
                price={product.price}
                rating={5}
                reviews={0}
                disabled
              />

              <Block justify="center">
                <Button variant="empty" onClick={() => onEdit(product)}>
                  <FontAwesomeIcon icon={EditIcon} size="xl" />
                </Button>

                <Button variant="empty" onClick={() => onDelete(product.id)}>
                  <FontAwesomeIcon icon={DeleteIcon} size="xl" />
                </Button>
              </Block>
            </Block>
          ))}
        </Block>
      )}
    </Block>
  );
}
