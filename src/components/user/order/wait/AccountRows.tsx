import styled from '@emotion/styled';
import { Color } from '@resources/colors';
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
  color: ${Color.TEXT_STRONG};
  font-size: 15px;
  font-weight: 700;
`;

interface AccountRowsProps {
  title: string;
  account: Account;
}

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
