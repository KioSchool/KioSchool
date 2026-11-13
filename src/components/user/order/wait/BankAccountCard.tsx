import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { Account } from '@@types/index';
import { copyAccountInfo } from '@utils/payMethods';
import AccountRows from './AccountRows';
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
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`;

interface BankAccountCardProps {
  account: Account;
}

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
