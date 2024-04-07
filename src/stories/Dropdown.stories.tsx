import Dropdown from '../components/Dropdown';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Dropdown',
  component: Dropdown,
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = (args) => <Dropdown {...args} />;
export const Default = Template.bind({});
Default.args = {
  title: 'title',
  content: (
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
  ),
};
