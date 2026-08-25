import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { RiDraggable } from '@remixicon/react';
import { Table } from '@@types/index';
import { Color } from '@resources/colors';
import { getTableStatus, TABLE_STATUS, TableStatus } from '@utils/tableStatus';
import { ceilToMinute, formatShortDuration, getElapsedMs, getElapsedPercent, getRemainingMs, hasTimeLimit } from '@utils/tableTime';
import { colFlex, rowFlex } from '@styles/flexStyles';
import ProgressRing from '@components/admin/order/table-manage/common/ProgressRing/ProgressRing';

const SELECTED_OUTLINE_PX = 3;
const SELECTED_OFFSET_PX = 2;
const HANDLE_ICON_PX = 14;
const DIMMED_OPACITY = 0.28;

interface StatusStyle {
  background: string;
  border: string;
  shadow: string;
  number: string;
  time: string;
}

// 상태 언어: 미사용은 바닥에 가라앉고(recessed), 사용중은 떠 있고(raised), 주의는 물들고, 초과는 소리친다.
const STATUS_STYLE: Record<TableStatus, StatusStyle> = {
  [TABLE_STATUS.EMPTY]: { background: '#f4f4f4', border: Color.HEAVY_GREY, shadow: 'none', number: Color.MUTED_GREY, time: Color.MUTED_GREY },
  [TABLE_STATUS.USING]: {
    background: Color.WHITE,
    border: Color.BORDER_GREY,
    shadow: '0 2px 8px rgba(92, 92, 92, 0.12)',
    number: Color.GREY,
    time: Color.GREY,
  },
  [TABLE_STATUS.WARNING]: {
    background: Color.KIO_ORANGE_FAINT,
    border: '#FFD2A8',
    shadow: '0 2px 8px rgba(92, 92, 92, 0.08)',
    number: Color.GREY,
    time: Color.KIO_ORANGE_DARK,
  },
  [TABLE_STATUS.EXCEEDED]: {
    background: Color.RED,
    border: Color.RED,
    shadow: '0 2px 10px rgba(255, 90, 90, 0.35)',
    number: Color.WHITE,
    time: Color.WHITE,
  },
};

const exceededPulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.72; }
  100% { opacity: 1; }
`;

const orderFlash = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 145, 66, 0.75); }
  100% { box-shadow: 0 0 0 12px rgba(255, 145, 66, 0); }
`;

const Container = styled.div<{ status: TableStatus; isSelected: boolean; isDimmed: boolean; isFlashing: boolean; clickable: boolean }>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 8px 9px;
  position: relative;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'inherit')};
  opacity: ${({ isDimmed }) => (isDimmed ? DIMMED_OPACITY : 1)};
  transition: opacity 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-color: ${({ status }) => STATUS_STYLE[status].background};
  border: 1px solid ${({ status }) => STATUS_STYLE[status].border};
  box-shadow: ${({ status }) => STATUS_STYLE[status].shadow};
  outline: ${({ isSelected }) => (isSelected ? `${SELECTED_OUTLINE_PX}px solid ${Color.KIO_ORANGE}` : 'none')};
  outline-offset: ${SELECTED_OFFSET_PX}px;

  ${({ status }) =>
    status === TABLE_STATUS.EXCEEDED &&
    css`
      animation: ${exceededPulse} 2s infinite;
    `}

  ${({ isFlashing }) =>
    isFlashing &&
    css`
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 12px;
        animation: ${orderFlash} 0.8s ease-out 3;
      }
    `}

  ${colFlex()};
`;

const TopRow = styled.div`
  gap: 4px;

  ${rowFlex({ justify: 'space-between', align: 'start' })};
`;

const TableNumber = styled.span<{ status: TableStatus }>`
  font-size: 20px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: ${({ status }) => STATUS_STYLE[status].number};
`;

const OrderCountBadge = styled.span<{ status: TableStatus }>`
  min-width: 18px;
  height: 16px;
  box-sizing: border-box;
  padding: 0 5px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  background-color: ${({ status }) => (status === TABLE_STATUS.EXCEEDED ? Color.WHITE : Color.KIO_ORANGE)};
  color: ${({ status }) => (status === TABLE_STATUS.EXCEEDED ? Color.RED : Color.WHITE)};

  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const HandleIcon = styled(RiDraggable)`
  width: ${HANDLE_ICON_PX}px;
  height: ${HANDLE_ICON_PX}px;
  flex-shrink: 0;
  color: ${Color.MUTED_GREY};
`;

const Bottom = styled.div`
  margin-top: auto;
  gap: 5px;

  ${rowFlex({ align: 'center' })};
`;

const TimeText = styled.span<{ status: TableStatus }>`
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  color: ${({ status }) => STATUS_STYLE[status].time};
`;

function getTimeLabel(table: Table): string {
  const session = table.orderSession;
  if (!session) return '미사용';
  if (!hasTimeLimit(session)) return formatShortDuration(getElapsedMs(session));

  const remaining = getRemainingMs(session);
  if (remaining <= 0) return `+${formatShortDuration(ceilToMinute(-remaining))}`;

  return formatShortDuration(ceilToMinute(remaining));
}

function getRingColors(status: TableStatus): { fill: string; track: string } {
  if (status === TABLE_STATUS.EXCEEDED) return { fill: Color.WHITE, track: 'rgba(255, 255, 255, 0.35)' };
  return { fill: Color.KIO_ORANGE, track: Color.HEAVY_GREY };
}

interface TableLayoutCardProps {
  table: Table;
  orderCount?: number;
  isSelected?: boolean;
  isDimmed?: boolean;
  isFlashing?: boolean;
  showHandle?: boolean;
  onSelect?: (table: Table) => void;
}

function TableLayoutCard({
  table,
  orderCount = 0,
  isSelected = false,
  isDimmed = false,
  isFlashing = false,
  showHandle = false,
  onSelect,
}: TableLayoutCardProps) {
  const status = getTableStatus(table);
  const ringColors = getRingColors(status);

  const handleClick = () => onSelect?.(table);

  return (
    <Container status={status} isSelected={isSelected} isDimmed={isDimmed} isFlashing={isFlashing} clickable={Boolean(onSelect)} onClick={handleClick}>
      <TopRow>
        <TableNumber status={status}>{table.tableNumber}</TableNumber>
        {showHandle && <HandleIcon />}
        {!showHandle && orderCount > 0 && <OrderCountBadge status={status}>{orderCount}</OrderCountBadge>}
      </TopRow>
      <Bottom>
        <ProgressRing
          percent={getElapsedPercent(table.orderSession)}
          fillColor={ringColors.fill}
          trackColor={ringColors.track}
          holeColor={STATUS_STYLE[status].background}
        />
        <TimeText status={status}>{getTimeLabel(table)}</TimeText>
      </Bottom>
    </Container>
  );
}

export default TableLayoutCard;
