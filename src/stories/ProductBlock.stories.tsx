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
