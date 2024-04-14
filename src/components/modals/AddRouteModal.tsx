import '../../assets/styles/components/modal/index.scss';
import { Dispatch, JSX, SetStateAction, useState } from 'react';
import Button from '../buttons/Button';
import FormContainer from '../forms/FormContainer';
import Card from '../layout/Card';
import { getMessages } from '../../helpers/api.helpers';
import { useToast } from '../../hooks/toast.hook';
import Block from '../layout/Block';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark as CloseIcon } from '@fortawesome/free-solid-svg-icons';
import type ModalProps from './ModalProps';
import { useLazyCreateRouteQuery } from '../../stores/routes/routes.api';
import { name2Type } from '../../types/enums/route-type.enum';
import type { RouteResponse } from '../../stores/routes/routes.dto';
import Input from '../inputs/Input';
import Dropdown from '../inputs/Dropdown';
import StoreType from '../../types/enums/store-type.enum';
import { useEffectOnce } from 'react-use';
import type { StoreResponse } from '../../stores/stores/stores.dto';
import { useLazyGetStoresQuery } from '../../stores/stores/stores.api';
import Loader from '../Loader';

export interface AddRouteModalProps extends ModalProps {
  setRoutes: Dispatch<SetStateAction<RouteResponse[]>>;
}

export default function AddRouteModal({
  setRoutes,
  isOpen,
  setIsOpen,
}: AddRouteModalProps): JSX.Element {
  const [stores, setStores] = useState<StoreResponse[]>([]);
  const [isStoresLoading, setStoresLoading] = useState(true);

  const { toastError } = useToast();

  const [getStores] = useLazyGetStoresQuery();
  const [createRoute] = useLazyCreateRouteQuery();

  useEffectOnce(() => {
    onGetStores().then();
  });

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
    const fromStore = stores.find((store) => store.address === formData.from);
    const toStore = stores.find((store) => store.address === formData.to);

    if (!fromStore || !toStore)
      return toastError('Необходимо выбрать конкретный склад из списка.');

    const { data, isError, error } = await createRoute({
      distance: +formData.distance,
      time: +formData.time,
      price: +formData.price * 100,
      type: name2Type[formData.type],
      from: fromStore.id,
      to: toStore.id,
    });

    if (isError || !data)
      return getMessages(error!).forEach((message) => toastError(message));

    setRoutes((routes) => [data, ...routes]);
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <Block className="modal">
          <Card className="form" direction="column" gap="gap-[20px]">
            <Block justify="between" alignItems="center">
              <h1>Добавление маршрута</h1>

              <FontAwesomeIcon
                className="cursor-pointer"
                icon={CloseIcon}
                size="2xl"
                onClick={() => setIsOpen(false)}
              />
            </Block>

            {isStoresLoading && (
              <Block direction="column" alignItems="center">
                <Loader />
              </Block>
            )}

            {!isStoresLoading && (
              <FormContainer
                className="flex flex-col gap-[8px]"
                onSuccess={onSubmit}
              >
                <Input
                  type="number"
                  placeholder="Дистанция (в километрах)"
                  name="distance"
                  required
                />

                <Input
                  type="number"
                  placeholder="Среднее время доставки (в часах)"
                  name="time"
                  required
                />

                <Input
                  type="number"
                  placeholder="Цена (в рублях)"
                  name="price"
                  required
                />

                <Dropdown
                  placeholder="Средство доставки"
                  name="type"
                  content={Object.keys(name2Type)}
                />

                <Dropdown
                  placeholder="Откуда"
                  name="from"
                  content={stores.map((store) => store.address)}
                />

                <Dropdown
                  placeholder="Куда"
                  name="to"
                  content={stores.map((store) => store.address)}
                />

                <Button variant="outlined">Добавить</Button>
              </FormContainer>
            )}
          </Card>
        </Block>
      )}
    </>
  );
}
