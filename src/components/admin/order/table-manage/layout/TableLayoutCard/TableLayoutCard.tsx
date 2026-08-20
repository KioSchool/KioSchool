import styled from '@emotion/styled';
import { DraggableAttributes } from '@dnd-kit/core';
import { RiDraggable } from '@remixicon/react';
import { Table } from '@@types/index';
import { Color } from '@resources/colors';
import { getTableStatus, TABLE_STATUS, TableStatus } from '@utils/tableStatus';
import { getElapsedPercent, getElapsedMs, formatShortDuration } from '@utils/tableTime';
import { colFlex, rowFlex } from '@styles/flexStyles';
import ProgressRing from './ProgressRing';

const SELECTED_OUTLINE_PX = 3;
const SELECTED_OFFSET_PX = 2;
const HANDLE_HIT_AREA_PX = 28;
const HANDLE_ICON_PX = 16;
const HANDLE_OFFSET_PX = 2;

const STATUS_STYLE: Record<TableStatus, { background: string; border: string; time: string }> = {
  [TABLE_STATUS.EMPTY]: { background: '#f4f4f4', border: Color.HEAVY_GREY, time: Color.GREY },
  [TABLE_STATUS.USING]: { background: Color.WHITE, border: '#e6e6e6', time: Color.BLACK },
  [TABLE_STATUS.WARNING]: { background: Color.KIO_ORANGE_FAINT, border: '#FFD2A8', time: Color.BLACK },
  [TABLE_STATUS.EXCEEDED]: { background: Color.LIGHT_RED, border: '#FFC9C9', time: Color.RED },
};

const Container = styled.div<{ status: TableStatus; isSelected: boolean }>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 9px 10px;
  cursor: pointer;
  position: relative;
  background-color: ${({ status }) => STATUS_STYLE[status].background};
  border: 1px solid ${({ status }) => STATUS_STYLE[status].border};
  outline: ${({ isSelected }) => (isSelected ? `${SELECTED_OUTLINE_PX}px solid ${Color.KIO_ORANGE}` : 'none')};
  outline-offset: ${SELECTED_OFFSET_PX}px;

  ${colFlex()};
`;

const TableNumber = styled.span`
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
`;

const Bottom = styled.div`
  margin-top: auto;
  gap: 6px;

  ${rowFlex({ align: 'center' })};
`;

const TimeText = styled.span<{ status: TableStatus }>`
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  color: ${({ status }) => STATUS_STYLE[status].time};
`;

const DragHandle = styled.button`
  position: absolute;
  top: ${HANDLE_OFFSET_PX}px;
  right: ${HANDLE_OFFSET_PX}px;
  width: ${HANDLE_HIT_AREA_PX}px;
  height: ${HANDLE_HIT_AREA_PX}px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: grab;
  color: ${Color.GREY};
  touch-action: none;

  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const HandleIcon = styled(RiDraggable)`
  width: ${HANDLE_ICON_PX}px;
  height: ${HANDLE_ICON_PX}px;
`;

function getTimeLabel(table: Table): string {
  const session = table.orderSession;
  if (!session) return '미사용';
  if (!session.expectedEndAt) return '사용중';

  return formatShortDuration(getElapsedMs(session));
}

interface TableLayoutCardProps {
  table: Table;
  isSelected?: boolean;
  showHandle?: boolean;
  onSelect?: (table: Table) => void;
  dragHandleProps?: DraggableAttributes & Record<string, unknown>;
}

function TableLayoutCard({ table, isSelected = false, showHandle = false, onSelect, dragHandleProps }: TableLayoutCardProps) {
  const status = getTableStatus(table);
  const ringStyle = STATUS_STYLE[status];

  const handleClick = () => onSelect?.(table);

  return (
    <Container status={status} isSelected={isSelected} onClick={handleClick}>
      <TableNumber>{table.tableNumber}</TableNumber>
      {showHandle && (
        <DragHandle type="button" aria-label={`${table.tableNumber}번 테이블 위치 이동 핸들`} {...dragHandleProps}>
          <HandleIcon />
        </DragHandle>
      )}
      <Bottom>
        <ProgressRing
          percent={getElapsedPercent(table.orderSession)}
          fillColor={status === TABLE_STATUS.EXCEEDED ? Color.RED : Color.KIO_ORANGE}
          holeColor={ringStyle.background}
        />
        <TimeText status={status}>{getTimeLabel(table)}</TimeText>
      </Bottom>
    </Container>
  );
}

export default TableLayoutCard;
