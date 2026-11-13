import { defaultUserOrderValue, defaultWorkspaceValue } from '@@types/defaultValues';
import { Account, Order, OrderProductBase, Product, ProductCategory, Workspace } from '@@types/index';
import { atom } from 'jotai';
import { atomWithReset, atomWithStorage } from 'jotai/utils';

export const userWorkspaceAtom = atom<Workspace>(defaultWorkspaceValue);
export const userOrderAtom = atom<Order>(defaultUserOrderValue);
export const userOrderBasketAtom = atomWithReset<OrderProductBase[]>([]);
export const userCategoriesAtom = atom<ProductCategory[]>([]);
export const userProductsAtom = atom<Product[]>([]);
// 주점 id별 계좌. 키가 없으면 아직 못 받음, null이면 계좌 없음
export const userWorkspaceAccountsAtom = atom<Record<string, Account | null>>({});

// 후원 카드를 마지막으로 닫은 시각(epoch ms). 0이면 이력 없음.
export const donationCardDismissedAtAtom = atomWithStorage<number>('customerDonationDismissedAt', 0, undefined, {
  getOnInit: true,
});

// 후원 버튼을 누른 시각(epoch ms). 0이면 이력 없음. 닫기(dismiss)와 분리 — 후원은 되돌리지 않는다.
export const donationDonatedAtAtom = atomWithStorage<number>('customerDonatedAt', 0, undefined, { getOnInit: true });
