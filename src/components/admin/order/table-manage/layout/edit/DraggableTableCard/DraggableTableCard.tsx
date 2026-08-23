import styled from '@emotion/styled';
import { useDraggable } from '@dnd-kit/core';
import { Table } from '@@types/index';
import TableLayoutCard from '../../TableLayoutCard/TableLayoutCard';

const DRAGGING_OPACITY = 0.4;

const Wrapper = styled.div<{ isDragging: boolean }>`
  width: 100%;
  height: 100%;
  opacity: ${({ isDragging }) => (isDragging ? DRAGGING_OPACITY : 1)};
  cursor: grab;
  touch-action: manipulation;

  &:active {
    cursor: grabbing;
  }
`;

interface DraggableTableCardProps {
  table: Table;
}

// 카드 전체 면이 드래그 대상이다. 편집 모드에는 탭으로 여는 상세가 없으므로 제스처가 겹치지 않고, 터치에서 28px 핸들을 조준하는 것보다 실패율이 낮다.
function DraggableTableCard({ table }: DraggableTableCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `table-${table.id}` });

  return (
    <Wrapper ref={setNodeRef} isDragging={isDragging} aria-label={`${table.tableNumber}번 테이블 이동`} {...attributes} {...listeners}>
      <TableLayoutCard table={table} showHandle />
    </Wrapper>
  );
}

export default DraggableTableCard;
