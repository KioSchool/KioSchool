import styled from '@emotion/styled';
import { useDroppable } from '@dnd-kit/core';
import { Color } from '@resources/colors';

const Slot = styled.div<{ isOver: boolean; isDragging: boolean; isConflicted: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: ${({ isOver, isDragging, isConflicted }) => {
    if (isConflicted) return Color.LIGHT_RED;
    if (isOver) return Color.KIO_ORANGE_ICON_BG;
    if (isDragging) return Color.KIO_ORANGE_FAINT;
    return 'transparent';
  }};
  border: ${({ isConflicted }) => (isConflicted ? `2px solid ${Color.RED}` : 'none')};
  transition: background-color 0.12s ease-in-out;
`;

interface LayoutGridCellProps {
  x: number;
  y: number;
  isDragging: boolean;
  isConflicted: boolean;
}

function LayoutGridCell({ x, y, isDragging, isConflicted }: LayoutGridCellProps) {
  const { setNodeRef, isOver } = useDroppable({ id: `cell-${x}-${y}` });

  return <Slot ref={setNodeRef} isOver={isOver} isDragging={isDragging} isConflicted={isConflicted} />;
}

export default LayoutGridCell;
