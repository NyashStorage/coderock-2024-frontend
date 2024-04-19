import { Meta, Story } from '@storybook/react';
import { createStore } from 'redux';
import rootReducer from '../stores/rootReducer';

import Header from '../components/Header';

// Создаем заглушку для хранилища Redux
const store = createStore(rootReducer);

export default {
  title: 'Header',
  component: Header,
} as Meta;

const Template: Story = ({ parameters }) => <Header />;

export const Default = Template.bind({});

export const AuthUser = Template.bind({});
AuthUser.parameters = {
  changeInitialState: true,
  customInitialState: {
    token: 'abc',
    users: {
      email: '',
      profile: {
        firstName: 'Иван',
        lastName: 'Иванов',
      },
    },
  },
};

export const AuthCompany = Template.bind({});
