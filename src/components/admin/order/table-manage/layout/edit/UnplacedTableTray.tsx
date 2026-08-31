import styled from '@emotion/styled';
import { useDroppable } from '@dnd-kit/core';
import { Table } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { TABLE_GRID_CELL_PX, TRAY_DROPPABLE_ID } from '@constants/layout';
import DraggableTableCard from './DraggableTableCard';

const Container = styled.div<{ isOver: boolean }>`
  height: 100%;
  box-sizing: border-box;
  border: 1px solid ${({ isOver }) => (isOver ? Color.KIO_ORANGE : Color.BORDER_GREY)};
  border-radius: 16px;
  background-color: ${({ isOver }) => (isOver ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  padding: 12px;
  gap: 10px;
  overflow-y: auto;
  transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  ${colFlex()};
`;

const Title = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${Color.MUTED_GREY};
`;

const TitleCount = styled.span`
  color: ${Color.GREY};
  font-weight: 800;
  font-variant-numeric: tabular-nums;
`;

const CardList = styled.div`
  gap: 8px;
  flex-wrap: wrap;
  ${rowFlex()};
`;

const CardSlot = styled.div`
  width: ${TABLE_GRID_CELL_PX}px;
  height: ${TABLE_GRID_CELL_PX}px;
`;

const EmptyText = styled.div`
  font-size: 13px;
  color: ${Color.GREY};
`;

interface UnplacedTableTrayProps {
  tables: Table[];
}

function UnplacedTableTray({ tables }: UnplacedTableTrayProps) {
  const { setNodeRef, isOver } = useDroppable({ id: TRAY_DROPPABLE_ID });

  return (
    <Container ref={setNodeRef} isOver={isOver}>
      <Title>
        미배치 <TitleCount>{tables.length}</TitleCount>
      </Title>
      {tables.length === 0 ? (
        <EmptyText>모든 테이블이 배치되었습니다</EmptyText>
      ) : (
        <CardList>
          {tables.map((table) => (
            <CardSlot key={table.id}>
              <DraggableTableCard table={table} />
            </CardSlot>
          ))}
        </CardList>
      )}
    </Container>
  );
}

export default UnplacedTableTray;
