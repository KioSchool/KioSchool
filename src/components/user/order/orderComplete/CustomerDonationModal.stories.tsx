import type { Meta, StoryObj } from '@storybook/react';
import { screen, userEvent } from '@storybook/test';
import { DONATION_COPY_LIBRARY } from '@constants/data/customerDonationCopy';
import CustomerDonationModal from './CustomerDonationModal';

const COPY_IDS = DONATION_COPY_LIBRARY.map((copy) => copy.id);
const COPY_LABELS = Object.fromEntries(DONATION_COPY_LIBRARY.map((copy) => [copy.id, `${copy.id} · ${copy.headline}`]));

const meta: Meta<typeof CustomerDonationModal> = {
  title: 'user/order/CustomerDonationModal',
  component: CustomerDonationModal,
  parameters: { viewport: { defaultViewport: 'iphone12' } },
  args: { orderId: '1000', workspaceId: '1', eligible: true, initialTodayCount: 12 },
  argTypes: {
    copyId: { control: { type: 'select', labels: COPY_LABELS }, options: COPY_IDS },
    shell: { control: { type: 'inline-radio' }, options: ['center', 'sheet'] },
    visual: { control: { type: 'inline-radio' }, options: ['plain', 'character', 'gauge', 'bubble'] },
  },
  decorators: [
    (Story) => {
      localStorage.removeItem('customerDonationDismissedAt');
      if (!document.getElementById('kioschool-modal-root')) {
        const root = document.createElement('div');
        root.id = 'kioschool-modal-root';
        document.body.appendChild(root);
      }
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof CustomerDonationModal>;

// Controls 패널의 copyId 드롭다운으로 전 문구를 넘겨볼 수 있다. shell/visual도 같이 조절 가능.
export const 문구_전체_비교: Story = {
  args: { shell: 'sheet', visual: 'plain', copyId: 'A' },
};

export const 문구_상호성: Story = {
  args: { shell: 'sheet', visual: 'plain', copyId: 'I' },
};

export const 문구_유머: Story = {
  args: { shell: 'sheet', visual: 'plain', copyId: 'J' },
};

export const 문구_앵커링: Story = {
  args: { shell: 'sheet', visual: 'plain', copyId: 'K' },
};

export const A_바텀시트: Story = {
  args: { shell: 'sheet', visual: 'plain' },
};

export const C_캐릭터: Story = {
  args: { shell: 'center', visual: 'character' },
};

export const D_게이지: Story = {
  args: { shell: 'center', visual: 'gauge' },
};

export const E_말풍선: Story = {
  args: { shell: 'center', visual: 'bubble' },
};

export const 추천_바텀시트_캐릭터: Story = {
  args: { shell: 'sheet', visual: 'character' },
};

export const 기준선_중앙_담백: Story = {
  args: { shell: 'center', visual: 'plain' },
};

export const 게이지_초반_2명: Story = {
  args: { shell: 'center', visual: 'gauge', initialTodayCount: 2 },
};

// 계좌이체 경로: method 상태는 훅 내부라 args로 못 넣는다. play에서 세그먼트를 눌러 도달시킨다.
export const 계좌이체: Story = {
  args: { shell: 'sheet', visual: 'plain' },
  play: async () => {
    const segment = await screen.findByRole('button', { name: '계좌이체' });
    await userEvent.click(segment);
  },
};

export const NotEligible: Story = {
  args: { eligible: false },
};
