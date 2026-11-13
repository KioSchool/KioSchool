import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { Account } from '@@types/index';
import AccountRows, { copyAccountInfo } from './AccountRows';
import { WaitCard } from './waitStyles';

const Card = styled(WaitCard)`
  padding: 16px;
`;

const Inner = styled.div`
  padding: 0 4px;
  gap: 10px;
  ${colFlex({ align: 'stretch' })}
`;

const CopyButton = styled.button`
  height: 48px;
  border: none;
  border-radius: 12px;
  background: #ff9142;
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`;

interface BankAccountCardProps {
  account: Account;
}

// 계좌이체 대기 화면: 계좌 정보가 열린 채, 복사 버튼이 주 버튼
function BankAccountCard({ account }: BankAccountCardProps) {
  return (
    <Card>
      <Inner>
        <AccountRows title="아래 계좌로 보내 주세요" account={account} />
        <CopyButton type="button" onClick={() => copyAccountInfo(account)}>
          계좌 정보 복사하기
        </CopyButton>
      </Inner>
    </Card>
  );
}

export default BankAccountCard;
