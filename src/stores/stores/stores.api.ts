import { createApi } from '@reduxjs/toolkit/query/react';
import { configureBackendBaseQuery } from '../../helpers/api.helpers';
import { unauthorizedMiddleware } from '../middlewares/unauthorized.middleware';
import { refreshTokenMiddleware } from '../middlewares/refresh-token.middleware';
import type {
  CreateStoreRequest,
  StoreResponse,
  StoresResponse,
} from './stores.dto';

export const storesApi = createApi({
  reducerPath: 'stores/api',
  baseQuery: configureBackendBaseQuery('stores', [
    refreshTokenMiddleware,
    unauthorizedMiddleware,
  ]),
  endpoints: (build) => ({
    createStore: build.query<StoreResponse, CreateStoreRequest>({
      query: (data: CreateStoreRequest) => ({
        url: '',
        method: 'POST',
        body: data,
      }),
    }),
    getStores: build.query<StoresResponse, void>({
      query: () => '',
    }),
    deleteStore: build.query<void, number>({
      query: (id) => ({
        url: id.toString(),
        method: 'DELETE',
        body: {},
      }),
    }),
  }),
});

export const {
  useLazyCreateStoreQuery,
  useLazyGetStoresQuery,
  useLazyDeleteStoreQuery,
} = storesApi;
