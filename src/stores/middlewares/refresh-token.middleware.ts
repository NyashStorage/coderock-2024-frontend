import { authActions, authSlice } from '../auth/auth.slice';
import type { ApiMiddleware } from '../../helpers/api.helpers';

export const refreshTokenMiddleware: ApiMiddleware = async (result) => {
  const headers = result.meta?.response?.headers;
  if (!headers?.has('X-Access-Token')) return;

  const accessToken = headers.get('X-Access-Token') || '';
  const { store } = await import('../store');
  if (store.getState()[authSlice.name].token === accessToken) return;

  store.dispatch(authActions.saveToken(accessToken));
};
