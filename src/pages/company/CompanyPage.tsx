import '../../assets/styles/pages/company/index.scss';
import type { JSX } from 'react';
import Block from '../../components/layout/Block';
import Link from '../../components/navigation/Link';
import Card from '../../components/layout/Card';
import { Outlet } from 'react-router-dom';

export default function CompanyPage(): JSX.Element {
  return (
    <Block className="page--company" gap="gap-[60px]">
      <Card
        className="page--company__navigation"
        direction="column"
        gap="gap-[10px]"
      >
        <Link to="stores">Склады</Link>
        <Link to="routes">Маршруты</Link>
        <Link to="products">Товары</Link>
      </Card>

      <Outlet />
    </Block>
  );
}
