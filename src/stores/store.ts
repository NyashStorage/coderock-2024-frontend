import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/auth.slice';
import { usersSlice } from './users/users.slice';
import { authApi } from './auth/auth.api';
import { usersApi } from './users/users.api';
import { storesApi } from './stores/stores.api';
import { productsApi } from './products/products.api';
import { categoriesApi } from './categories/categories.api';
import { routesApi } from './routes/routes.api';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [storesApi.reducerPath]: storesApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [routesApi.reducerPath]: routesApi.reducer,
    [authSlice.name]: authSlice.reducer,
    [usersSlice.name]: usersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      usersApi.middleware,
      storesApi.middleware,
      categoriesApi.middleware,
      productsApi.middleware,
      routesApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
