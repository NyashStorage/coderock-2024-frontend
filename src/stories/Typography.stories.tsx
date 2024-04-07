import type { Meta, StoryObj } from '@storybook/react';

import Typography from '../components/Typography';

export default {
  title: 'Typography',
  component: Typography,
} as Meta<typeof Typography>;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  render: () => <Typography>Текст</Typography>,
};

export const Header1: Story = {
  render: () => <Typography variant="h1">Заголовок блока</Typography>,
};

export const Header2: Story = {
  render: () => <Typography variant="h2">Заголовок внутри блока</Typography>,
};

export const Header3: Story = {
  render: () => <Typography variant="h3">Текст элементов</Typography>,
};

export const Body: Story = {
  render: () => (
    <Typography variant="body">Простой текст вне элементов</Typography>
  ),
};
