import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, createStore } from 'jotai';
import styled from '@emotion/styled';
import { OrderStatus } from '@@types/index';
import PaidOrderCard from './PaidOrderCard';
import { createFixtureOrder } from './realtimeOrderFixtures';

const Frame = styled.div`
  width: 200px;
`;

function withProviders(Story: () => JSX.Element) {
  return (
    <BrowserRouter>
      <Provider store={createStore()}>
        <Frame>
          <Story />
        </Frame>
      </Provider>
    </BrowserRouter>
  );
}

const meta: Meta<typeof PaidOrderCard> = {
  title: 'Components/Admin/OrderRealtime/PaidOrderCard',
  component: PaidOrderCard,
  decorators: [withProviders],
};

export default meta;
type Story = StoryObj<typeof PaidOrderCard>;

export const Fresh: Story = {
  args: {
    order: createFixtureOrder({
      id: 1,
      status: OrderStatus.PAID,
      minutesAgo: 3,
      tableNumber: 7,
      customerName: '이서준',
      products: [
        { productId: 9003, productName: '모둠 감자튀김', quantity: 1 },
        { productId: 9004, productName: '하이볼', quantity: 2 },
      ],
    }),
  },
};

export const Warning: Story = {
  args: {
    order: createFixtureOrder({
      id: 2,
      status: OrderStatus.PAID,
      minutesAgo: 17,
      tableNumber: 12,
      products: [
        { productId: 9002, productName: '김치전', quantity: 1 },
        { productId: 9006, productName: '생수 500ml', quantity: 2 },
      ],
    }),
  },
};

export const Danger: Story = {
  args: {
    order: createFixtureOrder({
      id: 3,
      status: OrderStatus.PAID,
      minutesAgo: 28,
      tableNumber: 3,
      customerName: '박지인',
      products: [{ productId: 9005, productName: '산낙지', quantity: 1 }],
    }),
  },
};

export const PartiallyServed: Story = {
  args: {
    order: createFixtureOrder({
      id: 4,
      status: OrderStatus.PAID,
      minutesAgo: 9,
      tableNumber: 12,
      products: [
        { productId: 9001, productName: '닭꼬치', quantity: 3, servedCount: 1 },
        { productId: 9006, productName: '생수 500ml', quantity: 2, servedCount: 2 },
      ],
    }),
  },
};

export const AboutToWarn: Story = {
  args: {
    order: createFixtureOrder({
      id: 5,
      status: OrderStatus.PAID,
      minutesAgo: 14.85,
      tableNumber: 21,
      products: [{ productId: 9004, productName: '하이볼', quantity: 1 }],
    }),
  },
};
