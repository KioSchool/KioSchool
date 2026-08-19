import styled from '@emotion/styled';
import { useDraggable } from '@dnd-kit/core';
import { Table } from '@@types/index';
import TableLayoutCard from '../../TableLayoutCard/TableLayoutCard';

const DRAGGING_OPACITY = 0.4;

const Wrapper = styled.div<{ isDragging: boolean }>`
  width: 100%;
  height: 100%;
  opacity: ${({ isDragging }) => (isDragging ? DRAGGING_OPACITY : 1)};
`;

interface DraggableTableCardProps {
  table: Table;
}

function DraggableTableCard({ table }: DraggableTableCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `table-${table.id}` });

  return (
    <Wrapper ref={setNodeRef} isDragging={isDragging}>
      <TableLayoutCard table={table} showHandle dragHandleProps={{ ...attributes, ...listeners }} />
    </Wrapper>
  );
}

export default DraggableTableCard;
