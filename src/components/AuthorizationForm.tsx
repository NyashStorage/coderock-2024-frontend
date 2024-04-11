import '../assets/styles/components/authorization-form/index.scss';
import type { JSX, PropsWithChildren } from 'react';
import { useState } from 'react';
import Block from './layout/Block';
import Input from './inputs/Input';
import PasswordInput from './inputs/PasswordInput';
import Button from './buttons/Button';
import FormContainer from './FormContainer';
import Card from './Card';

export interface AuthorizationFormProps extends PropsWithChildren {
  defaultAssignment: 'login' | 'register';
}

function AuthorizationForm({
  defaultAssignment,
}: AuthorizationFormProps): JSX.Element {
  const [assignment, setAssignment] = useState(defaultAssignment);

  function onSubmit(data: Record<string, any>): void {
    // TODO: Закончить, когда будет готова авторизация.
    console.log(data);
  }

  return (
    <Card className="authorization-form" direction="column" gap="gap-[20px]">
      <h1>{assignment === 'register' ? 'Регистрация аккаунта' : 'Войти'}</h1>

      <FormContainer className="flex flex-col gap-[22px]" onSuccess={onSubmit}>
        <Block direction="column" gap="gap-[8px]">
          <h3>Данные для входа</h3>
          <Input placeholder="Email" name="email" />
          <PasswordInput placeholder="Пароль" name="password" />
        </Block>

        {assignment === 'register' && (
          <>
            <Block direction="column" gap="gap-[8px]">
              <h3>Личные данные</h3>
              <Input placeholder="Имя" name="firstName" />
              <Input placeholder="Фамилия" name="lastName" />
            </Block>

            <Block direction="column" gap="gap-[8px]">
              <Block direction="column">
                <h3>Данные о компании</h3>
                <small>* Не обязательны к заполнению.</small>
              </Block>

              <Input placeholder="Название компании" name="company" />
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

export default AuthorizationForm;
