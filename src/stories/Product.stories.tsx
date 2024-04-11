import type { Meta, StoryFn } from '@storybook/react';
import { withRouter } from '../../.storybook/preview';

import Product from '../components/Product';

export default {
  title: 'Product',
  component: Product,
  decorators: [withRouter],
} as Meta<typeof Product>;

const Template: StoryFn<typeof Product> = (args) => <Product {...args} />;

export const Default = Template.bind({});
Default.args = {
  image:
    'https://i.pinimg.com/originals/41/6e/af/416eafd9188736ddcb4cb2a4016ae746.jpg',
  title: 'Усиленный автомат',
  company: 'Laboratory PZ:30',
  price: 2058000,
  rating: 4,
  reviews: 77,
};
