import type { StoryFn } from '@storybook/react';

import Card from '../components/Card';

export default {
  title: 'Layouts/Card',
  component: Card,
};

const Template: StoryFn<typeof Card> = (args) => (
  <Card {...args}>С возвращением, семпай~</Card>
);

export const Default = Template.bind({});
