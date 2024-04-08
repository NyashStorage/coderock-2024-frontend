import type { StoryFn } from '@storybook/react';
import Avatar from '../components/Avatar';

export default {
  title: 'Avatar',
  component: Avatar,
};

const Template: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});

export const Rounded = Template.bind({});
Rounded.args = {
  rounded: true,
};
