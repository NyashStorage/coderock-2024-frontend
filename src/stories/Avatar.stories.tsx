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

export const Filled = Template.bind({});
Filled.args = {
  image: 'https://random.imagecdn.app/128/128',
};

export const FilledRounded = Template.bind({});
FilledRounded.args = {
  image: 'https://random.imagecdn.app/128/128',
  rounded: true,
};

export const Hoverable = Template.bind({});
Hoverable.args = {
  image: 'https://random.imagecdn.app/128/128',
  rounded: true,
  onClick: (): void => {},
};
