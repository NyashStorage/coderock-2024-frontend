import { createApi } from '@reduxjs/toolkit/query/react';
import { configureBackendBaseQuery } from '../../helpers/api.helpers';
import type { EditUserRequest, UserResponse } from './users.dto';
import { unauthorizedMiddleware } from '../middlewares/unauthorized.middleware';
import { refreshTokenMiddleware } from '../middlewares/refresh-token.middleware';

export const usersApi = createApi({
  reducerPath: 'users/api',
  baseQuery: configureBackendBaseQuery('users', [
    refreshTokenMiddleware,
    unauthorizedMiddleware,
  ]),
  endpoints: (build) => ({
    getMyUser: build.query<UserResponse, void>({
      query: () => 'me',
    }),
    editUser: build.query<UserResponse, EditUserRequest>({
      query: (data: EditUserRequest) => ({
        url: '',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const { useLazyGetMyUserQuery, useLazyEditUserQuery } = usersApi;
