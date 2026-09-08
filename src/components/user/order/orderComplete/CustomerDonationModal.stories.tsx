import type { Meta, StoryObj } from '@storybook/react';
import { screen, userEvent } from '@storybook/test';
import CustomerDonationModal from './CustomerDonationModal';

const MODAL_ROOT_ID = 'kioschool-modal-root';

function ensureModalRoot() {
  if (!document.getElementById(MODAL_ROOT_ID)) {
    const root = document.createElement('div');
    root.id = MODAL_ROOT_ID;
    document.body.appendChild(root);
  }
}

const meta: Meta<typeof CustomerDonationModal> = {
  title: 'user/order/CustomerDonationModal',
  component: CustomerDonationModal,
  parameters: { viewport: { defaultViewport: 'iphone12' } },
  args: { orderId: '1000', workspaceId: '1', eligible: true, initialTodayCount: 12 },
  decorators: [
    (Story) => {
      localStorage.removeItem('customerDonationDismissedAt');
      localStorage.removeItem('customerDonatedAt');
      ensureModalRoot();
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof CustomerDonationModal>;

// 자동으로 열린다. 캐릭터 + 앵커링 문구 + "오늘 12명이 응원해줬어요".
export const 기본: Story = {};

// 오늘 후원자 0명 → DONATION_COUNT_EMPTY_TEXT를 카운터 자리에 노출.
export const 카운터_없음: Story = {
  args: { initialTodayCount: 0 },
};

// 계좌이체 경로: method는 훅 내부 상태라 args로 못 넣는다. play에서 세그먼트를 눌러 도달시킨다.
export const 계좌이체: Story = {
  play: async () => {
    const segment = await screen.findByRole('button', { name: '계좌이체' });
    await userEvent.click(segment);
  },
};

// 후원 이력이 있으면 인라인 트리거가 "고마워요 ✓" 상태로 뜨고 모달은 자동으로 열리지 않는다.
export const 후원_완료_트리거: Story = {
  decorators: [
    (Story) => {
      localStorage.setItem('customerDonatedAt', String(Date.now()));
      return <Story />;
    },
  ],
};

export const NotEligible: Story = {
  args: { eligible: false },
};
