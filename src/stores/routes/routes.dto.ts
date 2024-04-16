import type RouteType from '../../types/enums/route-type.enum';
import type { StoreResponse } from '../stores/stores.dto';

export interface CreateRouteRequest {
  distance: number;
  time: number;
  price: number;
  type: RouteType;
  from: number;
  to: number;
}

export interface RouteResponse {
  id: number;
  distance: number;
  time: number;
  price: number;
  type: RouteType;
  from: StoreResponse;
  to: StoreResponse;
}

export interface RoutesResponse {
  items: RouteResponse[];
  total: number;
}
