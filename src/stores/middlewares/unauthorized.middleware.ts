import type { ApiMiddleware } from '../../helpers/api.helpers';
import { authActions } from '../auth/auth.slice';
import { userActions } from '../users/users.slice';

export const unauthorizedMiddleware: ApiMiddleware = async (result) => {
  if (result.error?.status !== 401) return;

  const { store } = await import('../store');
  store.dispatch(authActions.clearToken());
  store.dispatch(userActions.clearUser());
};
