import type { StoryFn } from '@storybook/react';

import AuthorizationForm from '../components/AuthorizationForm';

export default {
  title: 'LoginForm',
  component: AuthorizationForm,
};

const Template: StoryFn<typeof AuthorizationForm> = (args) => (
  <AuthorizationForm {...args} />
);
export const Register = Template.bind({});

export const Login = Template.bind({});
Login.args = {
  defaultAssignment: 'login',
};
