import type { JSX } from 'react';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import RequireUnauthorized from './components/navigation/RequireUnauthorized';
import CompanyPage from './pages/company/CompanyPage';
import AuthPage from './pages/AuthPage';
import RequireCompany from './components/navigation/RequireCompany';
import { useAuth } from './hooks/auth.hook';
import { useEffectOnce, useUpdateEffect } from 'react-use';
import { useLazyGetMyUserQuery } from './stores/users/users.api';
import { useActions } from './hooks/actions.hook';
import RequireAuthorized from './components/navigation/RequireAuthorized';
import ProfilePage from './pages/ProfilePage';
import StoresPage from './pages/company/StoresPage';
import CompanyProductsPage from './pages/company/ProductsPage';
import RoutesPage from './pages/company/RoutesPage';

export default function App(): JSX.Element {
  const [isFullyLoaded, setLoaded] = useState(false);

  const { isAuth } = useAuth();
  const { storeUser } = useActions();

  const [getMyUser] = useLazyGetMyUserQuery();

  useEffectOnce(() => {
    onGetMyUser().then();
  });

  useUpdateEffect(() => {
    if (!isAuth) return;
    onGetMyUser().then();
  }, [isAuth]);

  async function onGetMyUser(): Promise<void> {
    const { isError, data } = await getMyUser();

    setLoaded(true);
    if (isError || !data) return;

    storeUser(data);
  }

  return (
    <Routes>
      {isFullyLoaded ? (
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductsPage />} />
          <Route
            path="products"
            element={<Navigate to=".." relative="route" />}
          />

          <Route path="products/:id" element={<ProductPage />} />
          <Route path="*" element={<HomePage />} />

          <Route element={<RequireUnauthorized />}>
            <Route path="auth">
              <Route index element={<AuthPage type="login" />} />
              <Route
                path="login"
                element={<Navigate to=".." relative="route" />}
              />

              <Route path="register" element={<AuthPage type="register" />} />
              <Route path="*" element={<AuthPage type="login" />} />
            </Route>
          </Route>

          <Route element={<RequireAuthorized />}>
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          <Route element={<RequireCompany />}>
            <Route path="company" element={<CompanyPage />}>
              <Route index element={<CompanyProductsPage />} />
              <Route
                path="products"
                element={<Navigate to=".." relative="route" />}
              />

              <Route path="stores" element={<StoresPage />} />
              <Route path="routes" element={<RoutesPage />} />

              <Route path="*" element={<CompanyProductsPage />} />
            </Route>
          </Route>
        </Route>
      ) : (
        <Route path="*" element={<></>} />
      )}
    </Routes>
  );
}
