import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { BrowserRouter } from 'react-router-dom';
import { Product, ProductStatus } from '@@types/index';
import { rowFlex } from '@styles/flexStyles';
import ProductCard from './ProductCard';

const StoryContainer = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: #f0f0f0;
`;

const ProductList = styled.div`
  width: 100%;
  gap: 8px;
  overflow-x: auto;
  ${rowFlex({ justify: 'start', align: 'center' })}
`;

const PRODUCT: Product = {
  name: '감자튀김',
  description: '상품명 표시 확인용 상품',
  price: 10000,
  status: ProductStatus.SELLING,
  imageUrl: '/logo192.png',
  id: 1,
  createdAt: '',
  updatedAt: '',
  productCategory: null,
};

const LONG_KOREAN_NAME = '매콤달콤치즈떡볶이한세트';
const LONG_UNBROKEN_NAME = 'ExtraSpicyCheeseTteokbokkiPartySet';
const EMOJI_NAME = '치즈🧀떡볶이🌶️감자튀김🍟세트';
const PRODUCT_NAMES = [PRODUCT.name, LONG_KOREAN_NAME, LONG_UNBROKEN_NAME, EMOJI_NAME];

const meta: Meta<typeof ProductCard> = {
  title: 'Components/Admin/Product/ProductCard',
  component: ProductCard,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <StoryContainer>
          <Story />
        </StoryContainer>
      </BrowserRouter>
    ),
  ],
  args: {
    product: PRODUCT,
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Unsellable: Story = {
  args: { product: { ...PRODUCT, status: ProductStatus.SOLD_OUT } },
};

export const LongKoreanName: Story = {
  args: { product: { ...PRODUCT, name: LONG_KOREAN_NAME } },
};

export const LongUnbrokenName: Story = {
  args: { product: { ...PRODUCT, name: LONG_UNBROKEN_NAME } },
};

export const EmojiName: Story = {
  args: { product: { ...PRODUCT, name: EMOJI_NAME } },
};

export const DragPreview: Story = {
  args: { product: { ...PRODUCT, name: LONG_KOREAN_NAME }, showStatusSelector: false, onClick: undefined },
};

export const MixedNameLengths: Story = {
  render: function Render(args) {
    return (
      <ProductList>
        {PRODUCT_NAMES.map((name, index) => (
          <ProductCard key={name} {...args} product={{ ...args.product, id: index, name }} />
        ))}
      </ProductList>
    );
  },
};
