import { defaultBanksValue, defaultUserValue, defaultWorkspaceValue } from '@@types/defaultValues';
import { Bank, ExternalRightSidebarOptions, Order, Product, ProductCategory, RIGHT_SIDEBAR_ACTION, User, Workspace } from '@@types/index';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const adminOrdersAtom = atom<Order[]>([]);
export const adminWorkspacesAtom = atom<Workspace[]>([]);
export const adminProductsAtom = atom<Product[]>([]);
export const adminCategoriesAtom = atom<ProductCategory[]>([]);
export const adminBanksAtom = atom<Bank[]>(defaultBanksValue);

export const adminWorkspaceAtom = atomWithStorage<Workspace>('adminWorkspace', defaultWorkspaceValue, undefined, {
  getOnInit: true,
});

export const adminUserAtom = atom<User>(defaultUserValue);

export const adminUserAccountAtom = atom((get) => {
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
});

export const adminUserTossAccountAtom = atom((get) => {
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
});

export const adminSideNavIsOpenAtom = atom(false);

export const externalSidebarAtom = atom<ExternalRightSidebarOptions>({
  router: '',
  title: '',
  action: RIGHT_SIDEBAR_ACTION.CLOSE,
  content: null,
});
