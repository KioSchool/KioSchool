import { ReactNode, RefObject } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { TABLE_GRID_CELL_PX, TABLE_GRID_GAP_PX, TABLE_GRID_PADDING_PX, TABLE_GRID_SIZE } from '@constants/layout';

const ScrollArea = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  border: 1px solid #ececec;
  border-radius: 10px;
  background-color: ${Color.LIGHT_GREY};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${TABLE_GRID_SIZE}, ${TABLE_GRID_CELL_PX}px);
  grid-auto-rows: ${TABLE_GRID_CELL_PX}px;
  gap: ${TABLE_GRID_GAP_PX}px;
  padding: ${TABLE_GRID_PADDING_PX}px;
  width: max-content;
`;

const CellSlot = styled.div<{ showGrid: boolean }>`
  border-radius: 10px;
  border: ${({ showGrid }) => (showGrid ? `1px dashed ${Color.HEAVY_GREY}` : 'none')};
`;

interface TableLayoutCanvasProps {
  showGrid: boolean;
  renderCell: (x: number, y: number) => ReactNode;
  scrollRef?: RefObject<HTMLDivElement>;
}

function TableLayoutCanvas({ showGrid, renderCell, scrollRef }: TableLayoutCanvasProps) {
  const cells = Array.from({ length: TABLE_GRID_SIZE * TABLE_GRID_SIZE }, (_, index) => ({
    x: index % TABLE_GRID_SIZE,
    y: Math.floor(index / TABLE_GRID_SIZE),
  }));

  return (
    <ScrollArea ref={scrollRef}>
      <Grid>
        {cells.map(({ x, y }) => (
          <CellSlot key={`${x}-${y}`} showGrid={showGrid}>
            {renderCell(x, y)}
          </CellSlot>
        ))}
      </Grid>
    </ScrollArea>
  );
}

export default TableLayoutCanvas;
