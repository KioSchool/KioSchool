import { match } from 'ts-pattern';
import { Account, PaymentMethod } from '@@types/index';

const PAY_APPS = [PaymentMethod.TOSS, PaymentMethod.KAKAOPAY] as const;

export const isPayApp = (method: PaymentMethod | null): method is PaymentMethod.TOSS | PaymentMethod.KAKAOPAY =>
  method === PaymentMethod.TOSS || method === PaymentMethod.KAKAOPAY;

export const hasRegisteredAccount = (account: Account | null | undefined) => Boolean(account?.accountNumber);

// 옛 API 응답에는 kakaoPayAccountUrl이 없다(undefined = 꺼짐)
export const getPayAppUrl = (account: Account | null | undefined, method: PaymentMethod): string | null =>
  match(method)
    .with(PaymentMethod.TOSS, () => account?.tossAccountUrl || null)
    .with(PaymentMethod.KAKAOPAY, () => account?.kakaoPayAccountUrl || null)
    .otherwise(() => null);

export const getAvailablePayMethods = (account: Account | null | undefined): PaymentMethod[] => {
  if (!hasRegisteredAccount(account)) return [];

  const apps = PAY_APPS.filter((method) => getPayAppUrl(account, method));
  return [...apps, PaymentMethod.BANK_TRANSFER];
};

export const getDefaultPayMethod = (methods: PaymentMethod[]): PaymentMethod | null => methods[0] ?? null;

export const PAY_APP_STATE = {
  NO_ACCOUNT: 'NO_ACCOUNT',
  ON: 'ON',
  OFF: 'OFF',
} as const;
export type PayAppState = typeof PAY_APP_STATE[keyof typeof PAY_APP_STATE];

export const PAY_APP_STATE_LABEL: Record<PayAppState, string> = {
  [PAY_APP_STATE.NO_ACCOUNT]: '계좌 필요',
  [PAY_APP_STATE.ON]: '켜짐',
  [PAY_APP_STATE.OFF]: '꺼짐',
};

export const getPayAppState = (hasAccount: boolean, enabled: boolean): PayAppState => {
  if (!hasAccount) return PAY_APP_STATE.NO_ACCOUNT;
  if (enabled) return PAY_APP_STATE.ON;
  return PAY_APP_STATE.OFF;
};

export const copyAccountInfo = (account: Account) => {
  navigator.clipboard.writeText(`${account.bank?.name ?? ''} ${account.accountNumber}`).then(() => {
    alert('계좌 정보가 복사되었습니다.');
  });
};
