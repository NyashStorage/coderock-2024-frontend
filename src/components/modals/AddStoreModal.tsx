import '../../assets/styles/components/modal/index.scss';
import type { Dispatch, JSX, SetStateAction } from 'react';
import Button from '../buttons/Button';
import FormContainer from '../forms/FormContainer';
import Card from '../layout/Card';
import { getCities, getMessages } from '../../helpers/api.helpers';
import Dropdown from '../inputs/Dropdown';
import { name2Type, type2Name } from '../../types/enums/store-type.enum';
import { useToast } from '../../hooks/toast.hook';
import { useLazyCreateStoreQuery } from '../../stores/stores/stores.api';
import type { StoreResponse } from '../../stores/stores/stores.dto';
import Block from '../layout/Block';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark as CloseIcon } from '@fortawesome/free-solid-svg-icons';
import type ModalProps from './ModalProps';

export interface AddStoreModalProps extends ModalProps {
  setStores: Dispatch<SetStateAction<StoreResponse[]>>;
}

export default function AddStoreModal({
  setStores,
  isOpen,
  setIsOpen,
}: AddStoreModalProps): JSX.Element {
  const { toastError } = useToast();

  const [createStore] = useLazyCreateStoreQuery();

  async function onSubmit(formData: Record<string, any>): Promise<void> {
    const { data, isError, error } = await createStore({
      address: formData.address,
      type: name2Type[formData.type],
    });

    if (isError || !data)
      return getMessages(error!).forEach((message) => toastError(message));

    setStores((stores) => [data, ...stores]);
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <Block className="modal">
          <Card className="form" direction="column" gap="gap-[20px]">
            <Block justify="between" alignItems="center">
              <h1>Добавление точки</h1>

              <FontAwesomeIcon
                className="cursor-pointer"
                icon={CloseIcon}
                size="2xl"
                onClick={() => setIsOpen(false)}
              />
            </Block>

            <FormContainer
              className="flex flex-col gap-[8px]"
              onSuccess={onSubmit}
            >
              <Dropdown
                content={getCities()}
                placeholder="Город"
                name="address"
              />

              <Dropdown
                content={Object.values(type2Name)}
                placeholder="Тип"
                name="type"
              />

              <Button variant="outlined">Добавить</Button>
            </FormContainer>
          </Card>
        </Block>
      )}
    </>
  );
}
