import { useAuthState } from '../stores/auth/auth.slice';

interface AuthHook {
  isAuth: boolean;
}

export const useAuth = (): AuthHook => {
  const { token } = useAuthState();

  return {
    isAuth: !!token,
  };
};
