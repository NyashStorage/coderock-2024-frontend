import type { JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserState } from '../../stores/users/users.slice';

export default function RequireCompany(): JSX.Element {
  const { profile } = useUserState();

  return profile?.companyName ? <Outlet /> : <Navigate to="/profile" replace />;
}
