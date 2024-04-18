/// <reference types="vite-plugin-svgr/client" />
import type { JSX } from 'react';
import '../assets/styles/components/header/index.scss';
import Logo from '../assets/icons/logo.svg?react';
import Block from './layout/Block';
import Link from './navigation/Link';
import Button from './buttons/Button';
import { useUserState } from '../stores/users/users.slice';
import { useAuth } from '../hooks/auth.hook';
import { useNavigate } from 'react-router-dom';
import { useLazyLogoutQuery } from '../stores/auth/auth.api';
import { useActions } from '../hooks/actions.hook';
import { getMessages } from '../helpers/api.helpers';
import { useToast } from '../hooks/toast.hook';

function Header(): JSX.Element {
  const { isAuth } = useAuth();
  const { profile } = useUserState();
  const { toastError } = useToast();
  const { clearToken, clearUser } = useActions();

  const navigate = useNavigate();

  const [logout] = useLazyLogoutQuery();

  function getLink(): JSX.Element[] {
    const links: JSX.Element[] = [<Link to="/products">Продукты</Link>];

    if (isAuth) {
      links.push(
        <Link to="/profile">
          {profile?.firstName} {profile?.lastName}
        </Link>,
      );
    }

    if (profile?.companyName) {
      links.push(<Link to="/company">{profile?.companyName}</Link>);
    }

    return links;
  }

  async function onLogout(): Promise<void> {
    const { isError, error } = await logout({});

    if (isError) {
      return getMessages(error).forEach((message) => toastError(message));
    }

    clearToken();
    clearUser();
  }
  return (
    <header className="header">
      <Block justify="between" alignItems="center" className="header__content">
        <Logo className="header__logo" />

        <Block element="nav" gap="gap-[18px]" alignItems="center">
          {...getLink()}

          <Button onClick={() => (isAuth ? onLogout() : navigate('/auth'))}>
            {isAuth ? 'выйти' : 'автоизироватья'}
          </Button>
        </Block>
      </Block>
    </header>
  );
}

export default Header;
