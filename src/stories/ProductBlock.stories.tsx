import type { Meta, StoryFn } from '@storybook/react';
import ProductBlock from '../components/productBlock/ProductBlock';

export default {
  title: 'ProductBlock',
  component: ProductBlock,
} as Meta<typeof ProductBlock>;

const Template: StoryFn<typeof ProductBlock> = (args) => (
  <ProductBlock {...args} />
);

export const Default = Template.bind({});
Default.args = {
  img: 'https://i.pinimg.com/736x/90/bf/6b/90bf6be4825e15296032e93a0d0736eb.jpg',
  name: 'Супер автомат',
  company: 'weapons of the future',
  price: 10000,
  rating: 3,
  numberOfReviews: 65,
};
