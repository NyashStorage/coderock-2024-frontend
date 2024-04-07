import '../../assets/styles/components/buttons/rating/index.scss';
import type { Meta, StoryFn } from '@storybook/react';
import RatingButton from '../../components/buttons/RatingButton';

export default {
  title: 'Buttons/RatingButton',
  component: RatingButton,
} as Meta<typeof RatingButton>;

const Template: StoryFn<typeof RatingButton> = (args) => (
  <RatingButton
    {...args}
    onChange={(rating) => alert(`Выбран рейтинг ${rating}★`)}
  />
);

export const Default = Template.bind({});

export const WithDefaultRating = Template.bind({});
WithDefaultRating.args = {
  defaultRating: 3,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
