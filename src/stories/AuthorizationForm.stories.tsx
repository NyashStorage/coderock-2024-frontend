import type { StoryFn } from '@storybook/react';

import AuthorizationForm from '../components/forms/AuthorizationForm';

export default {
  title: 'AuthorizationForm',
  component: AuthorizationForm,
};

const Template: StoryFn<typeof AuthorizationForm> = (args) => (
  <AuthorizationForm {...args} />
);

export const Register = Template.bind({});
Register.args = {
  defaultAssignment: 'register',
};

export const Login = Template.bind({});
Login.args = {
  defaultAssignment: 'login',
};
