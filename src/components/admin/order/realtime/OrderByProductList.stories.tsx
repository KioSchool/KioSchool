import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, createStore } from 'jotai';
import styled from '@emotion/styled';
import { Order, OrderStatus } from '@@types/index';
import { adminOrdersAtom, adminProductsAtom } from '@jotai/admin/atoms';
import { colFlex } from '@styles/flexStyles';
import OrderByProductList from './OrderByProductList';
import { FIXTURE_PRODUCTS, createFixtureOrder } from './realtimeOrderFixtures';

// 사이드바 300px에서 좌우 패딩 16px씩을 뺀 내용 폭
const Frame = styled.div`
  width: 268px;
  height: 640px;
  ${colFlex()}
`;

const paid = (id: number, minutesAgo: number, tableNumber: number, products: Array<[number, string, number, number?]>) =>
  createFixtureOrder({
    id,
    status: OrderStatus.PAID,
    minutesAgo,
    tableNumber,
    products: products.map(([productId, productName, quantity, servedCount]) => ({ productId, productName, quantity, servedCount })),
  });

function withOrders(orders: Order[]) {
  return function StoreDecorator(Story: () => JSX.Element) {
    const store = createStore();
    store.set(adminOrdersAtom, orders);
    store.set(adminProductsAtom, FIXTURE_PRODUCTS);

    return (
      <BrowserRouter>
        <Provider store={store}>
          <Frame>
            <Story />
          </Frame>
        </Provider>
      </BrowserRouter>
    );
  };
}

const meta: Meta<typeof OrderByProductList> = {
  title: 'Components/Admin/OrderRealtime/OrderByProductList',
  component: OrderByProductList,
};

export default meta;
type Story = StoryObj<typeof OrderByProductList>;

export const Default: Story = {
  decorators: [
    withOrders([
      paid(1, 29, 4, [[9003, '모둠 감자튀김', 2]]),
      paid(2, 27, 14, [
        [9004, '하이볼', 2],
        [9002, '김치전', 2],
      ]),
      paid(3, 22, 22, [[9003, '모둠 감자튀김', 1]]),
      paid(4, 17, 12, [
        [9002, '김치전', 1],
        [9001, '닭꼬치', 2],
      ]),
      paid(5, 6, 9, [[9001, '닭꼬치', 1]]),
      paid(6, 2, 25, [
        [9004, '하이볼', 1],
        [9006, '생수 500ml', 2, 2],
      ]),
      createFixtureOrder({
        id: 7,
        status: OrderStatus.NOT_PAID,
        minutesAgo: 1,
        tableNumber: 30,
        products: [{ productId: 9005, productName: '산낙지', quantity: 1 }],
      }),
    ]),
  ],
};

export const SameTableTwoOrders: Story = {
  decorators: [withOrders([paid(101, 20, 12, [[9002, '김치전', 1]]), paid(102, 5, 12, [[9002, '김치전', 2]]), paid(103, 10, 3, [[9002, '김치전', 1]])])],
};

export const MoreThanThree: Story = {
  decorators: [
    withOrders([
      paid(201, 26, 1, [[9001, '닭꼬치', 1]]),
      paid(202, 18, 2, [[9001, '닭꼬치', 2]]),
      paid(203, 12, 3, [[9001, '닭꼬치', 1]]),
      paid(204, 7, 4, [[9001, '닭꼬치', 1]]),
      paid(205, 1, 5, [[9001, '닭꼬치', 3]]),
    ]),
  ],
};

export const DeletedProduct: Story = {
  decorators: [withOrders([paid(301, 8, 6, [[9999, '삭제된 메뉴', 2]])])],
};
