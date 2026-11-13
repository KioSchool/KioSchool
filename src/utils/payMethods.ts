import { match } from 'ts-pattern';
import { Account, PaymentMethod } from '@@types/index';

const PAY_APPS = [PaymentMethod.TOSS, PaymentMethod.KAKAOPAY] as const;

export const isPayApp = (method: PaymentMethod | null): method is PaymentMethod.TOSS | PaymentMethod.KAKAOPAY =>
  method === PaymentMethod.TOSS || method === PaymentMethod.KAKAOPAY;

export const hasRegisteredAccount = (account: Account | null | undefined) => Boolean(account?.accountNumber);

// 링크가 있으면 켜짐. 옛 API 응답에는 kakaoPayAccountUrl이 없을 수 있다(undefined = 꺼짐).
export const getPayAppUrl = (account: Account | null | undefined, method: PaymentMethod): string | null =>
  match(method)
    .with(PaymentMethod.TOSS, () => account?.tossAccountUrl || null)
    .with(PaymentMethod.KAKAOPAY, () => account?.kakaoPayAccountUrl || null)
    .otherwise(() => null);

// 손님에게 보여 줄 송금 방법. 켜진 앱이 먼저, 계좌이체는 계좌가 있으면 늘 끝에. 계좌가 없으면 빈 목록.
export const getAvailablePayMethods = (account: Account | null | undefined): PaymentMethod[] => {
  if (!hasRegisteredAccount(account)) return [];

  const apps = PAY_APPS.filter((method) => getPayAppUrl(account, method));
  return [...apps, PaymentMethod.BANK_TRANSFER];
};

// 처음 골라 둘 방법: 켜진 앱이 있으면 첫 앱, 없으면 계좌이체, 계좌가 없으면 null
export const getDefaultPayMethod = (methods: PaymentMethod[]): PaymentMethod | null => methods[0] ?? null;
