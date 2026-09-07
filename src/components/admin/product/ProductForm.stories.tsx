import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { Provider } from 'jotai';
import { Product, ProductStatus } from '@@types/index';
import { mobileMediaQuery, tabletMediaQuery } from '@styles/globalStyles';
import ProductForm from './ProductForm';

const StoryContainer = styled.div`
  width: 300px;
  padding: 0 16px;
  box-sizing: border-box;

  ${tabletMediaQuery} {
    width: 280px;
  }

  ${mobileMediaQuery} {
    width: 100%;
  }
`;

const PRODUCT: Product = {
  name: '매콤달콤치즈떡볶이한세트',
  description: '상품명 표시 확인용 상품',
  price: 10000,
  status: ProductStatus.SELLING,
  imageUrl: '/logo192.png',
  id: 1,
  createdAt: '',
  updatedAt: '',
  productCategory: null,
};

const UPDATED_NAME = '바삭한감자튀김';

const meta: Meta<typeof ProductForm> = {
  title: 'Components/Admin/Product/ProductForm',
  component: ProductForm,
  decorators: [
    (Story) => (
      <Provider>
        <StoryContainer>
          <Story />
        </StoryContainer>
      </Provider>
    ),
  ],
  args: {
    mode: 'EDIT',
    workspaceId: 'storybook',
    initialValues: PRODUCT,
    onSubmit: fn().mockResolvedValue(undefined),
    onCancel: fn(),
    onDelete: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LongName: Story = {};

export const LongUnbrokenName: Story = {
  args: { initialValues: { ...PRODUCT, name: 'ExtraSpicyCheeseTteokbokkiPartySet' } },
};

export const EmptyName: Story = {
  args: { initialValues: { ...PRODUCT, name: '' } },
};

export const AddMode: Story = {
  args: { mode: 'ADD', initialValues: undefined },
};

export const NameChange: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nameInput = canvas.getByPlaceholderText('최대 12자까지 가능합니다.');

    await expect(canvas.getByText(`전체 상품명: ${PRODUCT.name}`)).toBeVisible();
    await userEvent.clear(nameInput);
    await expect(canvas.queryByText(/^전체 상품명:/)).not.toBeInTheDocument();
    await userEvent.type(nameInput, UPDATED_NAME);
    await expect(canvas.getByText(`전체 상품명: ${UPDATED_NAME}`)).toBeVisible();
  },
};
