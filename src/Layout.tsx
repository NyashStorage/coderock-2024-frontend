import type { JSX } from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

export default function Layout(): JSX.Element {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
}
