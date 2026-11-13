import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import { Account } from '@@types/index';
import { defaultAccountValue } from '@@types/defaultValues';
import AccountCards from './AccountCards';
import PayPreviewPanel from './PayPreviewPanel';

const Screen = styled.div`
  box-sizing: border-box;
  width: 1080px;
  padding: 44px 40px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const base: Account = {
  ...defaultAccountValue,
  bank: { ...defaultAccountValue.bank, name: '신한은행', code: '088' },
  accountNumber: '110123456789',
  accountHolder: '홍길동',
};

const TOSS_URL = 'supertoss://send?bankCode=088&accountNo=110123456789&origin=qr';
const KAKAOPAY_URL = 'https://link.kakaopay.com/t/money/to/bank?bank_code=088&bank_account_number=110123456789';
// QR로 등록한 옛 토스 링크(은행 이름 형식)
const OLD_TOSS_QR_URL = 'supertoss://send?bank=%EC%8B%A0%ED%95%9C%EC%9D%80%ED%96%89&accountNo=110123456789&origin=qr';

// 계좌 관리 화면(카드 + 미리보기 판). Figma '카카오페이 송금' 운영진 보드와 나란히 비교하는 용도
function AdminAccountScreen({ account }: { account: Account | null }) {
  return (
    <MemoryRouter>
      <Screen>
        <AccountCards account={account} />
        <PayPreviewPanel account={account} />
      </Screen>
    </MemoryRouter>
  );
}

const meta: Meta<typeof AdminAccountScreen> = {
  title: 'admin/account/AdminAccountScreen',
  component: AdminAccountScreen,
};

export default meta;
type Story = StoryObj<typeof AdminAccountScreen>;

export const AllOn: Story = { args: { account: { ...base, tossAccountUrl: TOSS_URL, kakaoPayAccountUrl: KAKAOPAY_URL } } };
export const BothOff: Story = { args: { account: { ...base, tossAccountUrl: null, kakaoPayAccountUrl: null } } };
export const OldTossQrOnly: Story = { args: { account: { ...base, tossAccountUrl: OLD_TOSS_QR_URL, kakaoPayAccountUrl: undefined } } };
export const NoAccount: Story = { args: { account: null } };
