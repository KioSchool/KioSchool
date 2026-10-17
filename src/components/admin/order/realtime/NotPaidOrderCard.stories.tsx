import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, createStore } from 'jotai';
import { ToastContainer } from 'react-toastify';
import styled from '@emotion/styled';
import { Order, OrderStatus } from '@@types/index';
import { rowFlex } from '@styles/flexStyles';
import NotPaidOrderCard from './NotPaidOrderCard';
import { createFixtureOrder } from './realtimeOrderFixtures';

const Row = styled.div`
  gap: 8px;
  ${rowFlex({ align: 'start' })}
`;

const KIMDUYEON = createFixtureOrder({
  id: 11,
  status: OrderStatus.NOT_PAID,
  minutesAgo: 1,
  tableNumber: 12,
  customerName: '김두연',
  products: [
    { productId: 9002, productName: '김치전', quantity: 2 },
    { productId: 9004, productName: '하이볼', quantity: 2 },
  ],
});

const LEESEOJUN = createFixtureOrder({
  id: 12,
  status: OrderStatus.NOT_PAID,
  minutesAgo: 0,
  tableNumber: 7,
  customerName: '이서준',
  products: [{ productId: 9003, productName: '모둠 감자튀김', quantity: 2 }],
});

const LONG_NAME = createFixtureOrder({
  id: 13,
  status: OrderStatus.NOT_PAID,
  minutesAgo: 2,
  tableNumber: 30,
  customerName: '남궁민수아버지와친구들모임',
  products: [{ productId: 9001, productName: '닭꼬치', quantity: 10 }],
});

function NotPaidOrderCards({ orders }: { orders: Order[] }) {
  return (
    <Row>
      {orders.map((order) => (
        <NotPaidOrderCard key={order.id} order={order} />
      ))}
    </Row>
  );
}

function withProviders(Story: () => JSX.Element) {
  return (
    <BrowserRouter>
      <Provider store={createStore()}>
        <ToastContainer position="top-right" />
        <Story />
      </Provider>
    </BrowserRouter>
  );
}

const meta: Meta<typeof NotPaidOrderCards> = {
  title: 'Components/Admin/OrderRealtime/NotPaidOrderCard',
  component: NotPaidOrderCards,
  decorators: [withProviders],
};

export default meta;
type Story = StoryObj<typeof NotPaidOrderCards>;

export const Default: Story = {
  args: { orders: [KIMDUYEON, LEESEOJUN] },
};

export const LongName: Story = {
  args: { orders: [LONG_NAME] },
};
