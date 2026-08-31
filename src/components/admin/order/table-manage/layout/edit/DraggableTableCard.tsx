import styled from '@emotion/styled';
import { useDraggable } from '@dnd-kit/core';
import { Table } from '@@types/index';
import TableLayoutCard from '@components/admin/order/table-manage/layout/TableLayoutCard';

const DRAGGING_OPACITY = 0.4;

const Wrapper = styled.div<{ isDragging: boolean }>`
  width: 100%;
  height: 100%;
  opacity: ${({ isDragging }) => (isDragging ? DRAGGING_OPACITY : 1)};
  cursor: grab;
  /* touch-action: none이면 카드 위에서 캔버스 스크롤이 막힌다 — 홀드 중 텍스트 선택만 막는다 */
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;

  &:active {
    cursor: grabbing;
  }
`;

interface DraggableTableCardProps {
  table: Table;
}

function DraggableTableCard({ table }: DraggableTableCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `table-${table.id}` });

  return (
    <Wrapper ref={setNodeRef} isDragging={isDragging} aria-label={`${table.tableNumber}번 테이블 이동`} {...attributes} {...listeners}>
      <TableLayoutCard table={table} showHandle />
    </Wrapper>
  );
}

export default DraggableTableCard;
