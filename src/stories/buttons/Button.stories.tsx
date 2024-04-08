import type { Meta, StoryFn } from '@storybook/react';

import Button from '../../components/buttons/Button';

export default {
  title: 'Buttons/Button',
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => (
  <Button {...args}>Нажми на меня, семпай~</Button>
);

export const Default = Template.bind({});

export const Filled = Template.bind({});
Filled.args = {
  variant: 'filled',
};

export const FilledDisabled = Template.bind({});
FilledDisabled.args = {
  variant: 'filled',
  disabled: true,
};

export const FilledActive = Template.bind({});
FilledActive.args = {
  variant: 'filled',
  active: true,
};

export const FilledActiveDisabled = Template.bind({});
FilledActiveDisabled.args = {
  variant: 'filled',
  active: true,
  disabled: true,
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
};

export const OutlinedDisabled = Template.bind({});
OutlinedDisabled.args = {
  variant: 'outlined',
  disabled: true,
};

export const OutlinedActive = Template.bind({});
OutlinedActive.args = {
  variant: 'outlined',
  active: true,
};

export const OutlinedActiveDisabled = Template.bind({});
OutlinedActiveDisabled.args = {
  variant: 'outlined',
  active: true,
  disabled: true,
};

export const Empty = Template.bind({});
Empty.args = {
  variant: 'empty',
};

export const EmptyDisabled = Template.bind({});
EmptyDisabled.args = {
  variant: 'empty',
  disabled: true,
};
