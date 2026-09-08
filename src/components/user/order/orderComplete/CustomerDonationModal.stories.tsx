import type { Meta, StoryObj } from '@storybook/react';
import { screen, userEvent } from '@storybook/test';
import { Provider, createStore } from 'jotai';
import CustomerDonationModal from './CustomerDonationModal';

const MODAL_ROOT_ID = 'kioschool-modal-root';
const DISMISSED_KEY = 'customerDonationDismissedAt';
const DONATED_KEY = 'customerDonatedAt';

function ensureModalRoot() {
  if (!document.getElementById(MODAL_ROOT_ID)) {
    const root = document.createElement('div');
    root.id = MODAL_ROOT_ID;
    document.body.appendChild(root);
  }
}

// jotai 기본 스토어는 Storybook 세션 내내 살아 있어 스토리 이동 간 atomWithStorage 값이 남는다.
// 스토리마다 localStorage를 세팅한 뒤 새 스토어를 주면 getOnInit이 그 값을 그대로 읽는다.
function storeFrom({ dismissedAt = 0, donatedAt = 0 }: { dismissedAt?: number; donatedAt?: number }) {
  localStorage.setItem(DISMISSED_KEY, String(dismissedAt));
  localStorage.setItem(DONATED_KEY, String(donatedAt));
  ensureModalRoot();
  return createStore();
}

function withStore(state: { dismissedAt?: number; donatedAt?: number }) {
  return function StoreDecorator(Story: () => JSX.Element) {
    return (
      <Provider store={storeFrom(state)}>
        <Story />
      </Provider>
    );
  };
}

const meta: Meta<typeof CustomerDonationModal> = {
  title: 'user/order/CustomerDonationModal',
  component: CustomerDonationModal,
  parameters: { viewport: { defaultViewport: 'iphone12' } },
  args: { orderId: '1000', workspaceId: '1', eligible: true, initialTodayCount: 12 },
  decorators: [withStore({})],
};

export default meta;
type Story = StoryObj<typeof CustomerDonationModal>;

// 자동으로 열린다. orderId % 3 == 2 → 담백 문구. (기본 args의 orderId '1000' 유지)
export const 기본: Story = {};

// pickCopyVariant는 orderId % CUSTOMER_DONATION_COPIES.length로 배정한다.
// 1002%3=0 앵커링 / 1000%3=1 상호성 / 1001%3=2 담백.
export const 문구_앵커링: Story = {
  args: { orderId: '1002' },
};

export const 문구_상호성: Story = {
  args: { orderId: '1000' },
};

export const 문구_담백: Story = {
  args: { orderId: '1001' },
};

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
  decorators: [withStore({ donatedAt: 1_700_000_000_000 })],
};

export const NotEligible: Story = {
  args: { eligible: false },
};
