import styled from '@emotion/styled';
import { useDroppable } from '@dnd-kit/core';
import { Table } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { TRAY_DROPPABLE_ID } from '@constants/layout';
import DraggableTableCard from '../DraggableTableCard/DraggableTableCard';

const TRAY_CARD_PX = 84;

const Container = styled.div<{ isOver: boolean }>`
  height: 100%;
  border: 1px solid ${({ isOver }) => (isOver ? Color.KIO_ORANGE : '#ececec')};
  border-radius: 10px;
  background-color: ${({ isOver }) => (isOver ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  padding: 12px;
  gap: 10px;
  overflow-y: auto;

  ${colFlex()};
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${Color.GREY};
`;

const CardList = styled.div`
  gap: 8px;
  flex-wrap: wrap;

  ${rowFlex()};
`;

const CardSlot = styled.div`
  width: ${TRAY_CARD_PX}px;
  height: ${TRAY_CARD_PX}px;
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
      <Title>미배치 {tables.length}</Title>
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
