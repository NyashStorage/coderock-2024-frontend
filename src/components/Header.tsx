import type { JSX } from 'react';
import Block from './layout/Block';
import Link from './navigation/Link';
import { useAuth } from '../hooks/auth.hook';
import { useUserState } from '../stores/users/users.slice';

function Header(): JSX.Element {
  const { isAuth } = useAuth();
  const { profile } = useUserState();

  function getLink(): JSX.Element[] {
    const links: JSX.Element[] = [<Link to="/products">Продукты</Link>];

    if (isAuth) {
      links.push(
        <Link to="/profile">
          {profile?.firstName} {profile?.lastName}
        </Link>,
      );
    }

    return links;
  }
  return (
    <header>
      <Block justify="between" alignItems="center">
        <Block element="nav">{...getLink()}</Block>
      </Block>
    </header>
  );
}

export default Header;
