import { createApi } from '@reduxjs/toolkit/query/react';
import { configureBackendBaseQuery } from '../../helpers/api.helpers';
import { unauthorizedMiddleware } from '../middlewares/unauthorized.middleware';
import { refreshTokenMiddleware } from '../middlewares/refresh-token.middleware';
import type {
  CreateRouteRequest,
  RouteResponse,
  RoutesResponse,
} from './routes.dto';

export const routesApi = createApi({
  reducerPath: 'routes/api',
  baseQuery: configureBackendBaseQuery('routes', [
    refreshTokenMiddleware,
    unauthorizedMiddleware,
  ]),
  endpoints: (build) => ({
    createRoute: build.query<RouteResponse, CreateRouteRequest>({
      query: (data: CreateRouteRequest) => ({
        url: '',
        method: 'POST',
        body: data,
      }),
    }),
    getRoutes: build.query<RoutesResponse, void>({
      query: () => '',
    }),
    deleteRoute: build.query<void, number>({
      query: (id) => ({
        url: id.toString(),
        method: 'DELETE',
        body: {},
      }),
    }),
  }),
});

export const {
  useLazyCreateRouteQuery,
  useLazyGetRoutesQuery,
  useLazyDeleteRouteQuery,
} = routesApi;
