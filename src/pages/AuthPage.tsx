import '../assets/styles/pages/auth/index.scss';
import type { JSX } from 'react';
import Block from '../components/layout/Block';
import type { AuthorizationFormProps } from '../components/forms/AuthorizationForm';
import AuthorizationForm from '../components/forms/AuthorizationForm';

export interface AuthPageProps {
  type: AuthorizationFormProps['defaultAssignment'];
}

export default function AuthPage({ type }: AuthPageProps): JSX.Element {
  return (
    <Block className="page--auth" justify="center">
      <AuthorizationForm defaultAssignment={type} />
    </Block>
  );
}
