import { createApi } from '@reduxjs/toolkit/query/react';
import type { LoginRequest, RegisterRequest, TokenResponse } from './auth.dto';
import { configureBackendBaseQuery } from '../../helpers/api.helpers';

export const authApi = createApi({
  reducerPath: 'auth/api',
  baseQuery: configureBackendBaseQuery('auth'),
  endpoints: (build) => ({
    register: build.query<TokenResponse, RegisterRequest>({
      query: (credentials: RegisterRequest) => ({
        url: 'register',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: build.query<TokenResponse, LoginRequest>({
      query: (credentials: LoginRequest) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: build.query({
      query: () => ({
        url: '',
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useLazyRegisterQuery, useLazyLoginQuery, useLazyLogoutQuery } =
  authApi;
