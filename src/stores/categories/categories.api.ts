import { createApi } from '@reduxjs/toolkit/query/react';
import { configureBackendBaseQuery } from '../../helpers/api.helpers';
import type { CategoriesResponse } from './categories.dto';

export const categoriesApi = createApi({
  reducerPath: 'categories/api',
  baseQuery: configureBackendBaseQuery('categories'),
  endpoints: (build) => ({
    getCategories: build.query<CategoriesResponse, void>({
      query: () => '',
    }),
  }),
});

export const { useLazyGetCategoriesQuery } = categoriesApi;
