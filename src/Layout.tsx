import React, { JSX } from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

function Layout(): JSX.Element {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
}

export default Layout;
