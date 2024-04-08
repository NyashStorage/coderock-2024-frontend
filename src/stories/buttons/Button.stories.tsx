import type { Meta, StoryFn } from '@storybook/react';
import Button from '../../components/buttons/Button';

export default {
  title: 'Buttons/Button',
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => (
  <Button {...args}>Click Me</Button>
);

export const Default = Template.bind({});

export const Filled = Template.bind({});
Filled.args = {
  variant: 'filled',
};

export const FilledActive = Template.bind({});
FilledActive.args = {
  variant: 'filled',
  active: true,
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
};

export const OutlinedActive = Template.bind({});
OutlinedActive.args = {
  variant: 'outlined',
  active: true,
};

export const Empty = Template.bind({});
Empty.args = {
  variant: 'empty',
};
