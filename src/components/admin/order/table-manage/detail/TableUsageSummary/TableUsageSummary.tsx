import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { TABLE_STATUS, TableStatus } from '@utils/tableStatus';
import { formatSessionStartLabel, formatSessionTimeLabel, getElapsedPercent } from '@utils/tableTime';
import { OrderSession } from '@@types/index';

const BAR_HEIGHT_PX = 6;

const Container = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex()};
`;

const MainTimeText = styled.div<{ status: TableStatus }>`
  font-size: 26px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: ${({ status }) => (status === TABLE_STATUS.EXCEEDED ? Color.RED : Color.GREY)};
`;

const BarTrack = styled.div`
  width: 100%;
  height: ${BAR_HEIGHT_PX}px;
  border-radius: 999px;
  overflow: hidden;
  background-color: #e8eef2;
`;

const BarFill = styled.div<{ percent: number; status: TableStatus }>`
  width: ${({ percent }) => percent}%;
  height: 100%;
  border-radius: 999px;
  background-color: ${({ status }) => (status === TABLE_STATUS.EXCEEDED ? Color.RED : Color.KIO_ORANGE)};
  transition: width 0.3s ease-in-out;
`;

const MetaText = styled.div`
  font-size: 12px;
  color: #8d959c;
`;

interface TableUsageSummaryProps {
  session: OrderSession;
  status: TableStatus;
}

function TableUsageSummary({ session, status }: TableUsageSummaryProps) {
  return (
    <Container>
      <MainTimeText status={status}>{formatSessionTimeLabel(session)}</MainTimeText>
      <BarTrack>
        <BarFill percent={getElapsedPercent(session)} status={status} />
      </BarTrack>
      <MetaText>{formatSessionStartLabel(session)}</MetaText>
    </Container>
  );
}

export default TableUsageSummary;
