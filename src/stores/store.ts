import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './auth/auth.api';
import { usersApi } from './users/users.api';
import { storesApi } from './stores/stores.api';
import { productsApi } from './products/products.api';
import { categoriesApi } from './categories/categories.api';
import { routesApi } from './routes/routes.api';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {},
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
