import '../../assets/styles/pages/company/stores/index.scss';
import type { JSX } from 'react';
import { useState } from 'react';
import Block from '../../components/layout/Block';
import Button from '../../components/buttons/Button';
import { useEffectOnce } from 'react-use';
import { getMessages } from '../../helpers/api.helpers';
import { useToast } from '../../hooks/toast.hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan as DeleteIcon } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../components/Loader';
import AddRouteModal from '../../components/modals/AddRouteModal';
import type { RouteResponse } from '../../stores/routes/routes.dto';
import {
  useLazyDeleteRouteQuery,
  useLazyGetRoutesQuery,
} from '../../stores/routes/routes.api';
import { type2Name } from '../../types/enums/route-type.enum';

export default function RoutesPage(): JSX.Element {
  const [routes, setRoutes] = useState<RouteResponse[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  const { toastError } = useToast();

  const [getRoutes] = useLazyGetRoutesQuery();
  const [deleteRoute] = useLazyDeleteRouteQuery();

  useEffectOnce(() => {
    onGetRoutes().then();
  });

  async function onGetRoutes(): Promise<void> {
    const { data, isError, error } = await getRoutes();

    if (isError || !data) {
      setLoading(false);
      return getMessages(error!).forEach((message) => toastError(message));
    }

    setLoading(false);
    setRoutes(data.items);
  }

  async function onDelete(id: number): Promise<void> {
    const { isError, error } = await deleteRoute(id);
    if (isError)
      return getMessages(error!).forEach((message) => toastError(message));

    setRoutes((routes) => routes.filter((route) => route.id !== id));
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

      <AddRouteModal
        setRoutes={setRoutes}
        isOpen={isModalOpen}
        setIsOpen={setModalOpen}
      />

      {isLoading && (
        <Block direction="column" alignItems="center">
          <Loader />
        </Block>
      )}

      {!isLoading && !routes.length && (
        <Block direction="column" alignItems="center" element="h2">
          Маршрутов не найдено, начните свой бизнес, добавив первый!
        </Block>
      )}

      {!isLoading && !!routes.length && (
        <Block direction="column">
          {routes.map(({ id, distance, time, price, type, from, to }) => (
            <Block justify="between" alignItems="center" key={`route-${id}`}>
              <span>
                Из {from.address} в {to.address} ({distance} км.){' '}
                {type2Name[type]} за {time} ч. ({price / 100}₽)
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
