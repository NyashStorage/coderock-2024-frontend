import React, { JSX, PropsWithChildren, useState } from 'react';
import '../assets/styles/components/loginForm/index.scss';
import Block from './layout/Block';
import Input from './inputs/Input';
import PasswordInput from './inputs/PasswordInput';
import Button from './buttons/Button';

export interface LoginFormProps extends PropsWithChildren {
  defaultAssignment: 'login' | 'register';
}

function LoginForm({
  defaultAssignment = 'register',
}: LoginFormProps): JSX.Element {
  const [assignment, setAssignment] = useState(defaultAssignment);

  return (
    <Block direction="column" gap="gap-[20px]" className="login-form">
      <div className="login-form__title">
        {assignment == 'register' ? 'Регистрация аккаунта' : 'Войти'}
      </div>
      <form
        action=""
        name={assignment}
        method="post"
        className="flex flex-col gap-2.5"
      >
        {assignment == 'register' && (
          <>
            <Input placeholder="Имя" />
            <Input placeholder="Фамилия" />
            <Input placeholder="Название компании ( можно не указывать )" />
          </>
        )}
        <Input placeholder="Email" />
        <PasswordInput placeholder="Пароль" />
        <Button className="login-form__button-submit">
          {assignment == 'register' ? 'зарегистрироваться' : 'войти'}
        </Button>
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

export default LoginForm;
