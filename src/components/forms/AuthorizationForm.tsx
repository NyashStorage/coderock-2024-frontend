import '../../assets/styles/components/forms/index.scss';
import type { JSX, PropsWithChildren } from 'react';
import { useState } from 'react';
import Block from '../layout/Block';
import Input from '../inputs/Input';
import PasswordInput from '../inputs/PasswordInput';
import Button from '../buttons/Button';
import FormContainer from './FormContainer';
import Card from '../layout/Card';
import {
  useLazyLoginQuery,
  useLazyRegisterQuery,
} from '../../stores/auth/auth.api';
import { useToast } from '../../hooks/toast.hook';
import { useActions } from '../../hooks/actions.hook';
import { getMessages } from '../../helpers/api.helpers';

export interface AuthorizationFormProps extends PropsWithChildren {
  defaultAssignment: 'login' | 'register';
}

export default function AuthorizationForm({
  defaultAssignment,
}: AuthorizationFormProps): JSX.Element {
  const [assignment, setAssignment] = useState(defaultAssignment);

  const { toastError } = useToast();
  const { saveToken } = useActions();

  const [register] = useLazyRegisterQuery();
  const [login] = useLazyLoginQuery();

  async function onSubmit(formData: Record<string, any>): Promise<void> {
    const apiFunction = assignment === 'register' ? register : login;

    if (assignment === 'register' && !formData.companyName)
      delete formData.companyName;

    const { data, isError, error } = await apiFunction(formData as any);
    if (isError || !data)
      return getMessages(error!).forEach((message) => toastError(message));

    saveToken(data.access_token);
  }

  return (
    <Card className="form" direction="column" gap="gap-[20px]">
      <h1>{assignment === 'register' ? 'Регистрация аккаунта' : 'Войти'}</h1>

      <FormContainer className="flex flex-col gap-[22px]" onSuccess={onSubmit}>
        <Block direction="column" gap="gap-[8px]">
          <h3>Данные для входа</h3>

          <Input placeholder="Email" name="email" required />
          <PasswordInput placeholder="Пароль" name="password" required />
        </Block>

        {assignment === 'register' && (
          <>
            <Block direction="column" gap="gap-[8px]">
              <h3>Личные данные</h3>

              <Input placeholder="Имя" name="firstName" required />
              <Input placeholder="Фамилия" name="lastName" required />
            </Block>

            <Block direction="column" gap="gap-[8px]">
              <Block direction="column">
                <h3>Данные о компании</h3>
                <small>* Не обязательны к заполнению.</small>
              </Block>

              <Input placeholder="Название компании" name="companyName" />
            </Block>
          </>
        )}

        <Button>
          {assignment == 'register' ? 'зарегистрироваться' : 'войти'}
        </Button>
      </FormContainer>

      <Block justify="between" alignItems="center">
        {assignment === 'register' ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}

        <Button
          variant="outlined"
          onClick={() =>
            setAssignment(assignment === 'register' ? 'login' : 'register')
          }
        >
          {assignment === 'register' ? 'войти' : 'создать'}
        </Button>
      </Block>
    </Card>
  );
}
