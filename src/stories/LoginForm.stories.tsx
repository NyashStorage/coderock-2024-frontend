import type { StoryFn } from '@storybook/react';

import LoginForm from '../components/LoginForm';

export default {
  title: 'LoginForm',
  component: LoginForm,
};

const Template: StoryFn<typeof LoginForm> = (args) => <LoginForm {...args} />;
export const Register = Template.bind({});

export const Login = Template.bind({});
Login.args = {
  defaultAssignment: 'login',
};
