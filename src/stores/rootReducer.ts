import { combineReducers } from '@reduxjs/toolkit';
import { authApi } from './auth/auth.api';
import { usersApi } from './users/users.api';
import { storesApi } from './stores/stores.api';
import { categoriesApi } from './categories/categories.api';
import { productsApi } from './products/products.api';
import { routesApi } from './routes/routes.api';
import { authSlice } from './auth/auth.slice';
import { usersSlice } from './users/users.slice';

export default combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [storesApi.reducerPath]: storesApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [routesApi.reducerPath]: routesApi.reducer,
  [authSlice.name]: authSlice.reducer,
  [usersSlice.name]: usersSlice.reducer,
});
