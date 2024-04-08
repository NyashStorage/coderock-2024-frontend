import type { Meta, StoryFn } from '@storybook/react';

import Dropdown from '../../components/inputs/Dropdown';

export default {
  title: 'Dropdown',
  component: Dropdown,
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Выбери меня, семпай~',
  content: ['Ужин?', 'Ванну?', 'Может быть... меня? ><'],
};
