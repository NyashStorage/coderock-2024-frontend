import '../assets/styles/components/loader/index.scss';
import type { JSX } from 'react';
import Block from './layout/Block';
import Logo from '../assets/icons/logo.svg?react';

export default function Loader(): JSX.Element {
  return (
    <Block className="loader">
      <Logo />
    </Block>
  );
}
