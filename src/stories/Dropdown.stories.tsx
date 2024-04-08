import Dropdown from '../components/dropdown/Dropdown';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Dropdown',
  component: Dropdown,
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'title',
  content: ['1', '2', '3'],
};
