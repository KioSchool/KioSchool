import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

const QrVisual = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  width: 60px;
  height: 60px;
  padding: 6px;
  border: 3px solid ${Color.KIO_ORANGE};
  border-radius: 10px;

  span {
    border-radius: 2px;
    background: ${Color.KIO_ORANGE};
  }

  span:nth-of-type(5) {
    background: transparent;
  }
`;

const DashboardVisual = styled.div`
  width: 200px;
  padding: 12px;
  background: ${Color.WHITE};
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  gap: 6px;
  ${colFlex({})};
`;

const DashboardRow = styled.div<{ active?: boolean }>`
  padding: 8px 10px;
  border-radius: 8px;
  background: ${({ active }) => (active ? 'rgba(255, 145, 66, 0.04)' : '#f8f9fa')};
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const DashboardLabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: #191f28;
`;

const DashboardStatus = styled.span<{ color: string }>`
  font-size: 9px;
  font-weight: 600;
  color: ${({ color }) => color};
`;

const BarChartVisual = styled.div`
  height: 80px;
  padding: 0 8px;
  gap: 10px;
  ${rowFlex({ justify: 'center', align: 'flex-end' })};
`;

const VisualBar = styled.div<{ h: number; active?: boolean }>`
  width: 28px;
  height: ${({ h }) => h}px;
  border-radius: 6px 6px 0 0;
  background: ${({ active }) => (active ? Color.KIO_ORANGE : '#e5e8eb')};
`;

const TableVisual = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  width: 160px;
`;

const TableCell = styled.div<{ active?: boolean }>`
  padding: 8px;
  border-radius: 8px;
  background: ${({ active }) => (active ? 'rgba(255, 145, 66, 0.08)' : Color.WHITE)};
  border: 1.5px solid ${({ active }) => (active ? Color.KIO_ORANGE : '#e5e8eb')};
  text-align: center;
  font-size: 9px;
  font-weight: 600;
  color: ${({ active }) => (active ? Color.KIO_ORANGE : '#8b95a1')};
`;

interface FeatureVisualContentProps {
  number: string;
}

function FeatureVisualContent({ number }: FeatureVisualContentProps) {
  return match(number)
    .with('01', () => (
      <QrVisual>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </QrVisual>
    ))
    .with('02', () => (
      <DashboardVisual>
        <DashboardRow active>
          <DashboardLabel>테이블 3</DashboardLabel>
          <DashboardStatus color={Color.KIO_ORANGE}>신규</DashboardStatus>
        </DashboardRow>
        <DashboardRow active>
          <DashboardLabel>테이블 7</DashboardLabel>
          <DashboardStatus color={Color.KIO_ORANGE}>신규</DashboardStatus>
        </DashboardRow>
        <DashboardRow>
          <DashboardLabel>테이블 1</DashboardLabel>
          <DashboardStatus color={Color.GREEN}>완료</DashboardStatus>
        </DashboardRow>
      </DashboardVisual>
    ))
    .with('03', () => (
      <BarChartVisual>
        <VisualBar h={30} />
        <VisualBar h={48} active />
        <VisualBar h={42} active />
        <VisualBar h={64} active />
        <VisualBar h={56} active />
      </BarChartVisual>
    ))
    .otherwise(() => (
      <TableVisual>
        <TableCell active>T1</TableCell>
        <TableCell active>T2</TableCell>
        <TableCell active>T3</TableCell>
        <TableCell active>T4</TableCell>
        <TableCell>T5</TableCell>
        <TableCell>T6</TableCell>
      </TableVisual>
    ));
}

export default FeatureVisualContent;
