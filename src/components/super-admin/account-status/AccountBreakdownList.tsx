import styled from '@emotion/styled';
import { AccountConnectionStatus } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { formatNumber } from '@utils/formatNumber';

type BreakdownKey = 'with' | 'without' | 'total';

const BREAKDOWN_DOT_COLOR: Record<BreakdownKey, string> = {
  with: Color.HEAVY_GREY,
  without: Color.KIO_ORANGE,
  total: Color.GREY,
};

const Card = styled.div`
  background: ${Color.WHITE};
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 12px;
  padding: 18px;
  gap: 12px;
  ${colFlex()}

  ${mobileMediaQuery} {
    padding: 14px;
    gap: 10px;
    border-radius: 10px;
  }
`;

const Row = styled.div`
  width: 100%;
  gap: 10px;
  ${rowFlex({ align: 'center' })}
`;

const Dot = styled.div<{ tone: BreakdownKey }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ tone }) => BREAKDOWN_DOT_COLOR[tone]};
  flex-shrink: 0;
`;

const RowLabel = styled.div`
  font-size: 13px;
  color: ${Color.GREY};
  flex: 1;
`;

const RowCount = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${Color.BLACK};
`;

interface AccountBreakdownListProps {
  status: AccountConnectionStatus;
}

function AccountBreakdownList({ status }: AccountBreakdownListProps) {
  return (
    <Card>
      <Row>
        <Dot tone="with" />
        <RowLabel>계좌 연동 완료</RowLabel>
        <RowCount>{formatNumber(status.usersWithAccount)}명</RowCount>
      </Row>
      <Row>
        <Dot tone="without" />
        <RowLabel>계좌 미연동</RowLabel>
        <RowCount>{formatNumber(status.usersWithoutAccount)}명</RowCount>
      </Row>
      <Row>
        <Dot tone="total" />
        <RowLabel>전체 유저</RowLabel>
        <RowCount>{formatNumber(status.totalUsers)}명</RowCount>
      </Row>
    </Card>
  );
}

export default AccountBreakdownList;
