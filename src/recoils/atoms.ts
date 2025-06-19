import { atom, selector } from 'recoil';
import { User } from '@@types/index';
import { defaultUserValue } from '@@types/defaultValues';

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
