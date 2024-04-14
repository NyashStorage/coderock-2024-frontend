import type { JSX } from 'react';
import { useAuth } from '../../hooks/auth.hook';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function RequireAuthorized(): JSX.Element {
  const { isAuth } = useAuth();
  const location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} />
  );
}
