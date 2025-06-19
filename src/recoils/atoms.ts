import { atom, selector } from 'recoil';
import { Bank, EmailDomain, Order, OrderProductBase, PaginationResponse, User } from '@@types/index';
import { defaultBanksValue, defaultPaginationValue, defaultUserOrderValue, defaultUserValue } from '@@types/defaultValues';

export const adminUserAtom = atom<User>({
  key: 'adminUserAtom',
  default: defaultUserValue,
});

export const adminUserAccountAtomSelector = selector({
  key: 'adminUserAccountAtomSelector',
  get: ({ get }) => {
    const userInfo = get(adminUserAtom);
    const userAccount = userInfo.account;

    if (!userAccount) {
      return {
        bankName: '등록된 계좌가 없습니다.',
        accountNumber: '',
        accountHolder: '',
      };
    }

    const { bank, accountNumber, accountHolder } = userAccount;
    const { name: bankName } = bank;
    return { bankName, accountNumber, accountHolder };
  },
});

export const adminUserTossAccountAtomSelector = selector({
  key: 'adminUserTossAccountAtomSelector',
  get: ({ get }) => {
    const userInfo = get(adminUserAtom);
    const userTossAccountUrl = userInfo.account?.tossAccountUrl;

    if (!userTossAccountUrl) return null;

    const bankRegex = /bank=([^&]+)/;
    const accountNoRegex = /accountNo=([^&]+)/;
    const bankMatch = userTossAccountUrl.match(bankRegex);
    const accountNoMatch = userTossAccountUrl.match(accountNoRegex);

    if (!bankMatch || !accountNoMatch) return null;

    const [, bank] = bankMatch;
    const [, tossAccountNumber] = accountNoMatch;
    const tossBankName = decodeURIComponent(bank);

    return { tossBankName, tossAccountNumber };
  },
});

export const banksAtom = atom<Bank[]>({
  key: 'banksAtom',
  default: defaultBanksValue,
});

export const userOrderAtom = atom<Order>({
  key: 'userOrderAtom',
  default: defaultUserOrderValue,
});

export const orderBasketAtom = atom<OrderProductBase[]>({
  key: 'orderBasketAtom',
  default: [],
});

export const isLoadingAtom = atom<boolean>({
  key: 'isLoadingAtom',
  default: false,
});

export const emailDomainPaginationResponseAtom = atom<PaginationResponse<EmailDomain>>({
  key: 'emailDomainPaginationResponseAtom',
  default: defaultPaginationValue,
});

export const tableOrderPaginationResponseAtom = atom<PaginationResponse<Order>>({
  key: 'tableOrderPaginationResponseAtom',
  default: defaultPaginationValue,
});

export const bankPaginationResponseAtom = atom<PaginationResponse<Bank>>({
  key: 'bankPaginationResponseAtom',
  default: defaultPaginationValue,
});
