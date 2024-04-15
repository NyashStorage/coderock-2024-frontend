import type { Meta, StoryFn } from '@storybook/react';

import Checkbox from '../../components/inputs/Checkbox';

export default {
  title: 'Inputs/Checkbox',
  component: Checkbox,
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'выбери меня',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'меня нельзя выбрать',
  disabled: true,
};
