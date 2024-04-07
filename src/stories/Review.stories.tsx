import type { Meta, StoryFn } from '@storybook/react';
import Review from '../components/Review';

export default {
  title: 'Review',
  component: Review,
} as Meta<typeof Review>;

const Template: StoryFn<typeof Review> = (args) => <Review {...args} />;

export const Default = Template.bind({});

Default.args = {
  createdAt: '1970/1/1',
  rating: 5,
  reviewAvatar: <p> Тут будет картинка</p>,
  authorName: 'Виталий Соляридзе',
};
