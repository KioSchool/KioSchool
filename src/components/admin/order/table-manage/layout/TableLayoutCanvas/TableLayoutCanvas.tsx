import { ReactNode, RefObject } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { TABLE_GRID_CELL_PX, TABLE_GRID_GAP_PX, TABLE_GRID_PADDING_PX, TABLE_GRID_SIZE } from '@constants/layout';

export interface GridCropBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

const FULL_BOUNDS: GridCropBounds = { minX: 0, maxX: TABLE_GRID_SIZE - 1, minY: 0, maxY: TABLE_GRID_SIZE - 1 };

const ScrollArea = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  border: 1px solid #e8eef2;
  border-radius: 16px;
  background-color: ${Color.LIGHT_GREY};
  display: flex;
`;

const Grid = styled.div<{ columnCount: number }>`
  display: grid;
  grid-template-columns: ${({ columnCount }) => `repeat(${columnCount}, ${TABLE_GRID_CELL_PX}px)`};
  grid-auto-rows: ${TABLE_GRID_CELL_PX}px;
  gap: ${TABLE_GRID_GAP_PX}px;
  padding: ${TABLE_GRID_PADDING_PX}px;
  width: max-content;
  height: max-content;
  margin: auto;
`;

const CellSlot = styled.div`
  border-radius: 12px;
`;

interface TableLayoutCanvasProps {
  renderCell: (x: number, y: number) => ReactNode;
  cropBounds?: GridCropBounds;
  scrollRef?: RefObject<HTMLDivElement>;
}

function TableLayoutCanvas({ renderCell, cropBounds, scrollRef }: TableLayoutCanvasProps) {
  const bounds = cropBounds ?? FULL_BOUNDS;
  const columnCount = bounds.maxX - bounds.minX + 1;
  const rowCount = bounds.maxY - bounds.minY + 1;

  const cells = Array.from({ length: columnCount * rowCount }, (_, index) => ({
    x: bounds.minX + (index % columnCount),
    y: bounds.minY + Math.floor(index / columnCount),
  }));

  return (
    <ScrollArea ref={scrollRef}>
      <Grid columnCount={columnCount}>
        {cells.map(({ x, y }) => (
          <CellSlot key={`${x}-${y}`}>{renderCell(x, y)}</CellSlot>
        ))}
      </Grid>
    </ScrollArea>
  );
}

export default TableLayoutCanvas;
