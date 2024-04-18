import type {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../stores/store';
import { SerializedError } from '@reduxjs/toolkit';
import cities from '../assets/data/cities.json';

const url = 'http://localhost:3000/api/v1';

export type ApiMiddleware = (result: {
  error?: FetchBaseQueryError;
  data?: unknown;
  meta?: FetchBaseQueryMeta;
}) => void | Promise<void>;

export const configureBackendBaseQuery = (
  endpoint: string,
  middlewares: ApiMiddleware[] = [],
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `${url}/${endpoint}`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  });

  return async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: any,
  ) => {
    const result = await baseQuery(args, api, extraOptions);
    for (const middleware of middlewares) await middleware(result);

    return result;
  };
};

export function getMessages(
  error: FetchBaseQueryError | SerializedError,
): string[] {
  const messageData =
    (error as any)?.data?.message || 'Что-то пошло не так, попробуйте снова.';

  return Array.isArray(messageData) ? messageData : [messageData];
}

let cachedCities: string[] = [];
export function getCities(): string[] {
  if (cachedCities.length) return cachedCities;

  cachedCities = cities.map((city) => `${city.name} (${city.subject})`);

  return cachedCities;
}

export function toBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onerror = (error): void => reject(error);
    reader.onload = (): void =>
      resolve((reader.result as string).replace(/.+base64,(.+)/, '$1'));
  });
}
