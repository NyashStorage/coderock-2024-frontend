import type { Meta, StoryFn } from '@storybook/react';
import Product from '../components/productBlock/Product';

export default {
  title: 'ProductBlock',
  component: Product,
} as Meta<typeof Product>;

const Template: StoryFn<typeof Product> = (args) => <Product {...args} />;

export const Default = Template.bind({});
Default.args = {
  img: 'https://i.pinimg.com/736x/90/bf/6b/90bf6be4825e15296032e93a0d0736eb.jpg',
  name: 'Супер автомат',
  company: 'weapons of the future',
  price: 10000,
  rating: 3,
  numberOfReviews: 65,
};
