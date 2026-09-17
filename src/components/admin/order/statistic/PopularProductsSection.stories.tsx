import type { Meta, StoryObj } from '@storybook/react';
import { PopularProductItem } from '@@types/index';
import PopularProductsSection from './PopularProductsSection';

const products = (count: number, value: (index: number) => number): PopularProductItem[] =>
  Array.from({ length: count }, (_, index) => ({ productId: index + 1, name: `메뉴 ${index + 1}`, value: value(index) }));

const meta: Meta<typeof PopularProductsSection> = {
  title: 'Admin/Order/Statistic/PopularProductsSection',
  component: PopularProductsSection,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360, padding: 16, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PopularProductsSection>;

export const ManyProducts: Story = {
  args: {
    popularProducts: {
      byQuantity: products(20, (index) => 200 - index * 9),
      byRevenue: products(20, (index) => 1_000_000 - index * 45_000),
      byReorderRate: products(20, (index) => 80 - index * 3.5),
    },
  },
};

export const FewProducts: Story = {
  args: {
    popularProducts: {
      byQuantity: products(3, (index) => 30 - index * 10),
      byRevenue: products(3, (index) => 300_000 - index * 100_000),
      byReorderRate: products(3, (index) => 50 - index * 10),
    },
  },
};

export const Empty: Story = {
  args: {
    popularProducts: { byQuantity: [], byRevenue: [], byReorderRate: [] },
  },
};
