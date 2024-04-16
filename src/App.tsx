import type { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<h1>home</h1>} />
      </Route>
    </Routes>
  );
}
