import { Meta, Story } from '@storybook/react';
import Header from '../components/Header';

export default {
  title: 'Header',
  component: Header,
} as Meta;

const Template: Story = ({ parameters }) => <Header />;

export const Default = Template.bind({});

export const AuthUser = Template.bind({});
AuthUser.parameters = {
  customInitialState: {
    auth: {
      token: 'abc',
    },
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
AuthCompany.parameters = {
  customInitialState: {
    auth: {
      token: 'abc',
    },
    users: {
      email: '',
      profile: {
        firstName: 'Иван',
        lastName: 'Иванов',
        companyName: 'Суперское оружие',
      },
    },
  },
};
