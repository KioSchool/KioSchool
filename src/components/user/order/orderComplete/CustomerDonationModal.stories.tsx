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
  decorators: [withStore({ donatedAt: 1_700_000_000_000 })],
};

// 토스로 보낸 직후 감사 화면 (축하 + 임팩트 + N번째).
export const 감사_토스: Story = {
  play: async () => {
    const send = await screen.findByRole('link', { name: /원 보내기$/ });
    await userEvent.click(send);
  },
};

// 계좌번호 복사 직후 감사 화면 (계좌 유지 + 안내, "고마워요!" 아님).
export const 감사_계좌: Story = {
  play: async () => {
    await userEvent.click(await screen.findByRole('button', { name: '계좌이체' }));
    await userEvent.click(await screen.findByRole('button', { name: '계좌번호 복사하기' }));
  },
};

// 이미 후원한 사람이 ✓ 트리거를 눌렀을 때 → 폼이 아니라 recap 감사 화면.
export const 후원_완료_리캡: Story = {
  decorators: [withStore({ donatedAt: 1_700_000_000_000 })],
  play: async () => {
    await userEvent.click(await screen.findByRole('button', { name: '✓ 응원해주셔서 고마워요' }));
  },
};

export const NotEligible: Story = {
  args: { eligible: false },
};
