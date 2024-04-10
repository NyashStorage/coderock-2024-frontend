import React, { JSX, PropsWithChildren, useState } from 'react';
import '../assets/styles/components/authorizationForm/index.scss';
import Block from './layout/Block';
import Input from './inputs/Input';
import PasswordInput from './inputs/PasswordInput';
import Button from './buttons/Button';

export interface AuthorizationFormProps extends PropsWithChildren {
  defaultAssignment: 'login' | 'register';
}

function AuthorizationForm({
  defaultAssignment = 'register',
}: AuthorizationFormProps): JSX.Element {
  const [assignment, setAssignment] = useState(defaultAssignment);

  return (
    <Block direction="column" gap="gap-[20px]" className="login-form">
      <h1 className="login-form__title">
        {assignment == 'register' ? 'Регистрация аккаунта' : 'Войти'}
      </h1>
      <form
        action=""
        name={assignment}
        method="post"
        className="flex flex-col gap-2.5"
      >
        {assignment == 'register' && (
          <>
            <Input placeholder="Имя" name="userName" />
            <Input placeholder="Фамилия" name="surname" />
            <Input
              placeholder="Название компании ( можно не указывать )"
              name="companyName"
            />
          </>
        )}
        <Input placeholder="Email" name="email" />

        <Block direction="column" gap="gap-[24px]">
          <PasswordInput placeholder="Пароль" name="password" />
          <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              e.preventDefault()
            }
          >
            {assignment == 'register' ? 'зарегистрироваться' : 'войти'}
          </Button>
        </Block>
      </form>

      <Block justify="between" alignItems="center">
        <span>
          {assignment == 'register' ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}
        </span>
        <Button
          variant="outlined"
          onClick={() =>
            setAssignment(assignment == 'register' ? 'login' : 'register')
          }
        >
          {assignment == 'register' ? 'войти' : 'создать'}
        </Button>
      </Block>
    </Block>
  );
}

export default AuthorizationForm;
