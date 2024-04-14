import '../../assets/styles/components/forms/index.scss';
import type { JSX } from 'react';
import Block from '../layout/Block';
import Input from '../inputs/Input';
import PasswordInput from '../inputs/PasswordInput';
import Button from '../buttons/Button';
import FormContainer from './FormContainer';
import Card from '../layout/Card';
import { useUserState } from '../../stores/users/users.slice';
import { useLazyEditUserQuery } from '../../stores/users/users.api';
import type { EditUserRequest } from '../../stores/users/users.dto';
import { useToast } from '../../hooks/toast.hook';
import { getMessages } from '../../helpers/api.helpers';
import { useActions } from '../../hooks/actions.hook';

export default function EditUserForm(): JSX.Element {
  const user = useUserState();
  const { toastError } = useToast();
  const { storeUser } = useActions();

  const [editUser] = useLazyEditUserQuery();

  async function onSubmit(formData: Record<string, any>): Promise<void> {
    const dto: EditUserRequest = {};

    for (const [key, value] of Object.entries(formData)) {
      if (value === '' && key !== 'companyName') continue;
      dto[key as keyof EditUserRequest] = value || null;
    }

    const { data, isError, error } = await editUser(dto);
    if (isError || !data)
      return getMessages(error!).forEach((message) => toastError(message));

    storeUser(data);
  }

  return (
    <Card className="form" direction="column" gap="gap-[20px]">
      <h1>Редактирование данных пользователя</h1>

      <FormContainer className="flex flex-col gap-[22px]" onSuccess={onSubmit}>
        <Block direction="column" gap="gap-[8px]">
          <h3>Данные для входа</h3>

          <PasswordInput placeholder="Пароль" name="password" />
        </Block>

        <Block direction="column" gap="gap-[8px]">
          <h3>Личные данные</h3>

          <Input
            placeholder="Имя"
            name="firstName"
            defaultValue={user.profile?.firstName}
            required
          />

          <Input
            placeholder="Фамилия"
            name="lastName"
            defaultValue={user.profile?.lastName}
            required
          />
        </Block>

        <Block direction="column" gap="gap-[8px]">
          <h3>Данные о компании</h3>

          <Input
            placeholder="Название компании"
            name="companyName"
            defaultValue={user.profile?.companyName}
          />
        </Block>

        <Button>Сохранить</Button>
      </FormContainer>
    </Card>
  );
}
