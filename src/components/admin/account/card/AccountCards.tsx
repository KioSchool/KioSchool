import styled from '@emotion/styled';
import { rowFlex } from '@styles/flexStyles';
import { Account, PaymentMethod } from '@@types/index';
import AccountCard from './AccountCard';
import PayAppCard from './PayAppCard';

const Row = styled.div`
  width: 100%;
  gap: 20px;
  ${rowFlex({ align: 'stretch' })}
`;

interface AccountCardsProps {
  account: Account | null;
}

function AccountCards({ account }: AccountCardsProps) {
  return (
    <Row>
      <AccountCard account={account} />
      <PayAppCard method={PaymentMethod.TOSS} account={account} />
      <PayAppCard method={PaymentMethod.KAKAOPAY} account={account} />
    </Row>
  );
}

export default AccountCards;
