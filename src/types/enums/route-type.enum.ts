enum RouteType {
  Car = 'car',
  Airplane = 'airplane',
  Ship = 'ship',
}

export default RouteType;

export const type2Name: Record<RouteType, string> = {
  [RouteType.Car]: 'Автомобилем',
  [RouteType.Airplane]: 'Самолётом',
  [RouteType.Ship]: 'Кораблём',
};

export const name2Type: Record<string, RouteType> = {
  ['Автомобилем']: RouteType.Car,
  ['Самолётом']: RouteType.Airplane,
  ['Кораблём']: RouteType.Ship,
};
