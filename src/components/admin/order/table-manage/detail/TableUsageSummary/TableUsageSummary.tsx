import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex, colFlex } from '@styles/flexStyles';
import { TABLE_DETAIL_RING_PX } from '@constants/layout';
import ProgressRing from '@components/admin/order/table-manage/layout/TableLayoutCard/ProgressRing';
import { TABLE_STATUS, TableStatus } from '@utils/tableStatus';
import { formatLongDuration, formatStartTime, getElapsedMs, getElapsedPercent, getTotalMs } from '@utils/tableTime';
import { OrderSession } from '@@types/index';

const Container = styled.div`
  width: 100%;
  gap: 12px;
  ${rowFlex({ align: 'center' })};
`;

const TextColumn = styled.div`
  gap: 4px;
  ${colFlex()};
`;

const StartTimeText = styled.div`
  font-size: 13px;
  color: ${Color.GREY};
`;

const ElapsedText = styled.div`
  font-size: 15px;
  font-variant-numeric: tabular-nums;
`;

const ElapsedValue = styled.span`
  font-weight: 700;
  color: ${Color.BLACK};
`;

const TotalValue = styled.span`
  font-weight: 500;
  color: ${Color.GREY};
`;

interface TableUsageSummaryProps {
  session: OrderSession;
  status: TableStatus;
}

function TableUsageSummary({ session, status }: TableUsageSummaryProps) {
  const hasLimit = Boolean(session.expectedEndAt);
  const elapsedLabel = formatLongDuration(getElapsedMs(session));
  const totalLabel = hasLimit ? formatLongDuration(getTotalMs(session)) : null;

  return (
    <Container>
      <ProgressRing
        size={TABLE_DETAIL_RING_PX}
        percent={getElapsedPercent(session)}
        fillColor={status === TABLE_STATUS.EXCEEDED ? Color.RED : Color.KIO_ORANGE}
        holeColor={Color.WHITE}
      />
      <TextColumn>
        <StartTimeText>{formatStartTime(session)}</StartTimeText>
        <ElapsedText>
          <ElapsedValue>{elapsedLabel}</ElapsedValue>
          {totalLabel && <TotalValue> / {totalLabel}</TotalValue>}
        </ElapsedText>
      </TextColumn>
    </Container>
  );
}

export default TableUsageSummary;
