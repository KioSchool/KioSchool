import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Account } from '@@types/index';

const Rows = styled.div`
  gap: 10px;
  ${colFlex({ align: 'stretch' })}
`;

const Title = styled.span`
  color: #464a4d;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.45;
`;

const Row = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Key = styled.span`
  color: #697278;
  font-size: 14px;
`;

const Value = styled.span`
  color: #25282b;
  font-size: 15px;
  font-weight: 700;
`;

export const copyAccountInfo = (account: Account) => {
  navigator.clipboard.writeText(`${account.bank?.name ?? ''} ${account.accountNumber}`).then(() => {
    alert('계좌 정보가 복사되었습니다.');
  });
};

interface AccountRowsProps {
  title: string;
  account: Account;
}

// 은행·계좌번호·예금주 세 줄
function AccountRows({ title, account }: AccountRowsProps) {
  return (
    <Rows>
      <Title>{title}</Title>
      <Row>
        <Key>은행</Key>
        <Value>{account.bank?.name}</Value>
      </Row>
      <Row>
        <Key>계좌번호</Key>
        <Value>{account.accountNumber}</Value>
      </Row>
      <Row>
        <Key>예금주</Key>
        <Value>{account.accountHolder}</Value>
      </Row>
    </Rows>
  );
}

export default AccountRows;
