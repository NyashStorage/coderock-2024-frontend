import type { Meta, StoryFn } from '@storybook/react';

import Dropdown from '../../components/inputs/Dropdown';

export default {
  title: 'Inputs/Dropdown',
  component: Dropdown,
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = (args) => (
  <Dropdown
    className="w-[50%]"
    onChange={(item, index) =>
      alert(`Выбран элемент "${item}" под индексом ${index}.`)
    }
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {
  content: ['Элемент 1', 'Элемент 2', 'Элемент 3'],
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  placeholder: 'Выбери меня, семпай~',
  content: ['Ужин?', 'Ванну?', 'Может быть... меня? >///<'],
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Выбери меня, семпай~',
  content: ['Элемент 1', 'Элемент 2', 'Элемент 3'],
  disabled: true,
};
