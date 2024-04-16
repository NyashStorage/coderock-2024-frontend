import { createApi } from '@reduxjs/toolkit/query/react';
import { configureBackendBaseQuery } from '../../helpers/api.helpers';
import { unauthorizedMiddleware } from '../middlewares/unauthorized.middleware';
import { refreshTokenMiddleware } from '../middlewares/refresh-token.middleware';
import type {
  CreateProductRequest,
  EditProductRequest,
  MyProductResponse,
  MyProductsResponse,
  ProductsResponse,
} from './products.dto';

export const productsApi = createApi({
  reducerPath: 'products/api',
  baseQuery: configureBackendBaseQuery('products', [
    refreshTokenMiddleware,
    unauthorizedMiddleware,
  ]),
  endpoints: (build) => ({
    createProduct: build.query<MyProductResponse, CreateProductRequest>({
      query: (data: CreateProductRequest) => ({
        url: '',
        method: 'POST',
        body: data,
      }),
    }),
    getProducts: build.query<ProductsResponse, void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
    }),
    getMyProducts: build.query<MyProductsResponse, void>({
      query: () => ({
        url: 'my',
        method: 'GET',
      }),
    }),
    editProduct: build.query<MyProductResponse, EditProductRequest>({
      query: ({ id, ...data }: EditProductRequest) => ({
        url: id.toString(),
        method: 'PUT',
        body: data,
      }),
    }),
    deleteProduct: build.query<void, number>({
      query: (id) => ({
        url: id.toString(),
        method: 'DELETE',
        body: {},
      }),
    }),
  }),
});

export const {
  useLazyCreateProductQuery,
  useLazyGetProductsQuery,
  useLazyGetMyProductsQuery,
  useLazyEditProductQuery,
  useLazyDeleteProductQuery,
} = productsApi;
