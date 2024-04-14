/// <reference types="vite-plugin-svgr/client" />
import '../assets/styles/components/header/index.scss';
import type { JSX } from 'react';
import Logo from '../assets/icons/logo.svg?react';
import Block from './layout/Block';
import Button from './buttons/Button';
import Link from './navigation/Link';
import { useUserState } from '../stores/users/users.slice';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth.hook';
import { useLazyLogoutQuery } from '../stores/auth/auth.api';
import { useActions } from '../hooks/actions.hook';
import { useToast } from '../hooks/toast.hook';
import { getMessages } from '../helpers/api.helpers';

export default function Header(): JSX.Element {
  const { profile } = useUserState();
  const { isAuth } = useAuth();
  const { toastError } = useToast();
  const { clearToken, clearUser } = useActions();

  const [logout] = useLazyLogoutQuery();

  const navigate = useNavigate();

  async function onLogout(): Promise<void> {
    const { isError, error } = await logout({});
    if (isError)
      return getMessages(error!).forEach((message) => toastError(message));

    clearToken();
    clearUser();
  }

  function getLinks(): JSX.Element[] {
    const links: JSX.Element[] = [<Link to="/products">Продукты</Link>];

    if (isAuth) {
      links.push(
        <Link to="/profile">
          {profile?.firstName} {profile?.lastName}
        </Link>,
      );
    }

    if (profile?.companyName) {
      links.push(<Link to="/company">{profile.companyName}</Link>);
    }

    return links;
  }

  return (
    <header>
      <Block justify="between" className="header__content">
        <Logo className="logo" />

        <Block alignItems="center" element="nav">
          {...getLinks()}

          <Button onClick={() => (isAuth ? onLogout() : navigate('/auth'))}>
            {isAuth ? 'Выйти' : 'Авторизоваться'}
          </Button>
        </Block>
      </Block>
    </header>
  );
}
