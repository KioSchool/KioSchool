import { Account } from '@@types/index';
import { defaultAccountValue } from '@@types/defaultValues';

const base: Account = {
  ...defaultAccountValue,
  bank: { ...defaultAccountValue.bank, name: '신한은행', code: '088' },
  accountNumber: '110123456789',
  accountHolder: '홍길동',
};

const TOSS_URL = 'supertoss://send?bankCode=088&accountNo=110123456789&origin=qr';
const KAKAOPAY_URL = 'https://link.kakaopay.com/t/money/to/bank?bank_code=088&bank_account_number=110123456789';
const OLD_TOSS_QR_URL = 'supertoss://send?bank=%EC%8B%A0%ED%95%9C%EC%9D%80%ED%96%89&accountNo=110123456789&origin=qr';

export const STORY_ACCOUNTS = {
  ALL_ON: { ...base, tossAccountUrl: TOSS_URL, kakaoPayAccountUrl: KAKAOPAY_URL },
  BOTH_OFF: { ...base, tossAccountUrl: null, kakaoPayAccountUrl: null },
  OLD_TOSS_QR_ONLY: { ...base, tossAccountUrl: OLD_TOSS_QR_URL, kakaoPayAccountUrl: undefined },
} as const;
