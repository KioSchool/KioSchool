import type { Meta, StoryObj } from '@storybook/react';
import { screen, userEvent } from '@storybook/test';
import styled from '@emotion/styled';
import { Order, OrderProduct, OrderStatus } from '@@types/index';
import { defaultOrderProductValue, defaultUserOrderValue } from '@@types/defaultValues';
import SessionOrderList from './SessionOrderList';

const Frame = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
`;

function createProduct(id: number, productName: string, quantity: number, totalPrice: number): OrderProduct {
  return { ...defaultOrderProductValue, id, productName, quantity, totalPrice };
}

function createOrder(id: number, status: OrderStatus, createdAt: string, orderProducts: OrderProduct[]): Order {
  const totalPrice = orderProducts.reduce((sum, product) => sum + product.totalPrice, 0);
  return { ...defaultUserOrderValue, id, orderNumber: id, status, createdAt, orderProducts, totalPrice };
}

const ORDERS = [
  createOrder(7, OrderStatus.SERVED, '2026-11-02T19:32:00', [createProduct(1, '김치전', 1, 12000), createProduct(2, '제육볶음', 1, 12000)]),
  createOrder(9, OrderStatus.CANCELLED, '2026-11-02T19:50:00', [createProduct(3, '오뎅탕', 1, 8000)]),
  createOrder(12, OrderStatus.SERVED, '2026-11-02T20:10:00', [createProduct(4, '소떡소떡', 2, 10000), createProduct(5, '콜라', 2, 8000)]),
  createOrder(15, OrderStatus.PAID, '2026-11-02T20:40:00', [createProduct(6, '감자튀김', 1, 12000)]),
];

const FREE_ORDERS = ORDERS.map((order) => ({
  ...order,
  totalPrice: 0,
  orderProducts: order.orderProducts.map((product) => ({ ...product, totalPrice: 0 })),
}));

const meta: Meta<typeof SessionOrderList> = {
  title: 'user/order/SessionOrderList',
  component: SessionOrderList,
  parameters: { viewport: { defaultViewport: 'iphone12' } },
  args: { orders: ORDERS, currentOrderId: 15 },
  decorators: [
    (Story) => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SessionOrderList>;

// 최신 주문이 위. 취소 주문은 합계에서 빠진다.
export const 기본: Story = {};

export const 상품_펼침: Story = {
  play: async () => {
    const [latestServedCard] = await screen.findAllByText('서빙완료');
    await userEvent.click(latestServedCard);
  },
};

// 같은 테이블의 다른 손님이 이번 주문 뒤에 주문한 경우
export const 이번_주문이_최신이_아님: Story = {
  args: { currentOrderId: 12 },
};

// 메뉴 가격을 0원으로 두는 주점은 합계 줄을 숨긴다
export const 가격_0원_주점: Story = {
  args: { orders: FREE_ORDERS },
};

// 이번 주문 하나뿐이면 섹션을 그리지 않는다
export const 이번_주문만: Story = {
  args: { orders: [ORDERS[3]] },
};
