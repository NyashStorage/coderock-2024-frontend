import type { Meta, StoryFn } from '@storybook/react';
import Review from '../components/Review';

export default {
  title: 'Review',
  component: Review,
} as Meta<typeof Review>;

const Template: StoryFn<typeof Review> = (args) => <Review {...args} />;

export const Default = Template.bind({});
Default.args = {
  authorName: 'Виталий Соляридзе',
  // TODO: Поменять, когда будет реализован компонент аватарки.
  authorAvatar:
    'https://celes.club/uploads/posts/2022-11/1667311553_15-celes-club-p-fon-papicha-vkontakte-15.jpg',
  comment:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  rating: 4,
  createdAt: Date.now() - 5 * 60 * 1000,
};
