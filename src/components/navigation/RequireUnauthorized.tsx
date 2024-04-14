import type { JSX } from 'react';
import { useAuth } from '../../hooks/auth.hook';
import { Navigate, Outlet } from 'react-router-dom';

export default function RequireUnauthorized(): JSX.Element {
  const { isAuth } = useAuth();

  return !isAuth ? <Outlet /> : <Navigate to="/" replace />;
}
