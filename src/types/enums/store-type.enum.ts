enum StoreType {
  Store = 'store',
  DeliveryPoint = 'delivery_point',
}

export const type2Name: Record<StoreType, string> = {
  [StoreType.Store]: 'Склад',
  [StoreType.DeliveryPoint]: 'Пункт выдачи',
};

export const name2Type: Record<string, StoreType> = {
  ['Склад']: StoreType.Store,
  ['Пункт выдачи']: StoreType.DeliveryPoint,
};

export default StoreType;
