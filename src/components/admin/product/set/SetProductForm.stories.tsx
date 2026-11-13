import type { Meta, StoryObj } from '@storybook/react';
import styled from '@emotion/styled';
import { Provider, createStore } from 'jotai';

import { adminCategoriesAtom, adminProductsAtom } from '@jotai/admin/atoms';
import { Color } from '@resources/colors';
import { AdminProduct, ProductStatus, ProductType } from '@@types/index';

import SetProductForm from './SetProductForm';

const StoryContainer = styled.div`
  width: 1024px;
  height: 760px;
  overflow-y: auto;
  padding: 28px;
  box-sizing: border-box;
  background: ${Color.WHITE};
`;

const CATEGORY = {
  id: 1,
  name: '세트 메뉴',
  index: 0,
  createdAt: '',
  updatedAt: '',
};

function createSingleProduct(id: number, name: string): AdminProduct {
  return {
    id,
    name,
    description: `${name} 설명`,
    price: 10000,
    status: ProductStatus.SELLING,
    effectiveStatus: ProductStatus.SELLING,
    type: ProductType.SINGLE,
    originalPrice: null,
    discountPrice: null,
    imageUrl: '',
    productCategory: CATEGORY,
    components: [],
    linkedSets: [],
    createdAt: '',
    updatedAt: '',
  };
}

const SINGLE_PRODUCTS = [createSingleProduct(1, '족발 대'), createSingleProduct(2, '막국수'), createSingleProduct(3, '주먹밥')];

const SET_PRODUCT: AdminProduct = {
  id: 10,
  name: '족발 막국수 세트',
  description: '족발 소와 막국수를 함께',
  price: 25000,
  status: ProductStatus.SELLING,
  effectiveStatus: ProductStatus.SELLING,
  type: ProductType.SET,
  originalPrice: 28000,
  discountPrice: 3000,
  imageUrl: '',
  productCategory: CATEGORY,
  components: [
    { id: 101, name: '족발 소', quantity: 1, displayOrder: 0, conditionProduct: { id: 1, name: '족발 대', status: ProductStatus.SELLING } },
    { id: 102, name: '막국수', quantity: 1, displayOrder: 1, conditionProduct: { id: 2, name: '막국수', status: ProductStatus.SELLING } },
  ],
  linkedSets: [],
  createdAt: '',
  updatedAt: '',
};

const store = createStore();
store.set(adminCategoriesAtom, [CATEGORY]);
store.set(adminProductsAtom, [...SINGLE_PRODUCTS, SET_PRODUCT]);

const meta: Meta<typeof SetProductForm> = {
  title: 'Components/Admin/Product/SetProductForm',
  component: SetProductForm,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <StoryContainer>
          <Story />
        </StoryContainer>
      </Provider>
    ),
  ],
  args: {
    workspaceId: '1',
    onSubmit: async () => undefined,
    onCancel: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Add: Story = {
  args: { mode: 'ADD' },
};

export const Edit: Story = {
  args: { mode: 'EDIT', initialValues: SET_PRODUCT, onDelete: () => undefined },
};
