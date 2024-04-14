import '../assets/styles/pages/profile/index.scss';
import type { JSX } from 'react';
import Block from '../components/layout/Block';
import EditUserForm from '../components/forms/EditUserForm';

export default function ProfilePage(): JSX.Element {
  return (
    <Block className="page--profile" direction="column" alignItems="center">
      <EditUserForm />
    </Block>
  );
}
