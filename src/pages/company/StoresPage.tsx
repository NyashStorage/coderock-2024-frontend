import '../../assets/styles/pages/company/stores/index.scss';
import type { JSX } from 'react';
import { useState } from 'react';
import Block from '../../components/layout/Block';
import Button from '../../components/buttons/Button';
import { type2Name } from '../../types/enums/store-type.enum';
import type { StoreResponse } from '../../stores/stores/stores.dto';
import { useEffectOnce } from 'react-use';
import {
  useLazyDeleteStoreQuery,
  useLazyGetStoresQuery,
} from '../../stores/stores/stores.api';
import { getMessages } from '../../helpers/api.helpers';
import { useToast } from '../../hooks/toast.hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan as DeleteIcon } from '@fortawesome/free-solid-svg-icons';
import AddStoreModal from '../../components/modals/AddStoreModal';
import Loader from '../../components/Loader';

export default function StoresPage(): JSX.Element {
  const [stores, setStores] = useState<StoreResponse[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  const { toastError } = useToast();

  const [getStores] = useLazyGetStoresQuery();
  const [deleteStore] = useLazyDeleteStoreQuery();

  useEffectOnce(() => {
    onGetStores().then();
  });

  async function onGetStores(): Promise<void> {
    const { data, isError, error } = await getStores();

    if (isError || !data) {
      setLoading(false);
      return getMessages(error!).forEach((message) => toastError(message));
    }

    setLoading(false);
    setStores(data.items);
  }

  async function onDelete(id: number): Promise<void> {
    const { isError, error } = await deleteStore(id);
    if (isError)
      return getMessages(error!).forEach((message) => toastError(message));

    setStores((stores) => stores.filter((store) => store.id !== id));
  }

  return (
    <Block
      className="page--company__stores"
      direction="column"
      gap="gap-[30px]"
    >
      <Button
        className="page--company__stores__add"
        variant="outlined"
        onClick={() => setModalOpen(true)}
      >
        Добавить
      </Button>

      <AddStoreModal
        setStores={setStores}
        isOpen={isModalOpen}
        setIsOpen={setModalOpen}
      />

      {isLoading && (
        <Block direction="column" alignItems="center">
          <Loader />
        </Block>
      )}

      {!isLoading && !stores.length && (
        <Block direction="column" alignItems="center" element="h2">
          Складов не найдено, начните свой бизнес, добавив первый!
        </Block>
      )}

      {!isLoading && !!stores.length && (
        <Block direction="column">
          {stores.map(({ id, address, type }) => (
            <Block justify="between" alignItems="center" key={id}>
              <span>
                {address} ({type2Name[type]})
              </span>

              <Button variant="empty" onClick={() => onDelete(id)}>
                <FontAwesomeIcon icon={DeleteIcon} size="xl" />
              </Button>
            </Block>
          ))}
        </Block>
      )}
    </Block>
  );
}
