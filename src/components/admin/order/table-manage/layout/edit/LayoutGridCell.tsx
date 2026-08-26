import styled from '@emotion/styled';
import { useDroppable } from '@dnd-kit/core';
import { Color } from '@resources/colors';

// 편집 모드의 빈 칸은 점선 격자 대신 "소켓" 타일로 그린다 — 놓을 수 있는 자리라는 어포던스가 면으로 보인다.
const Slot = styled.div<{ isOver: boolean; isDragging: boolean; isConflicted: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background-color: ${({ isOver, isDragging, isConflicted }) => {
    if (isConflicted) return Color.LIGHT_RED;
    if (isOver) return Color.KIO_ORANGE_ICON_BG;
    if (isDragging) return Color.KIO_ORANGE_FAINT;
    return Color.WHITE;
  }};
  border: ${({ isConflicted, isOver }) => {
    if (isConflicted) return `2px solid ${Color.RED}`;
    if (isOver) return `2px solid ${Color.KIO_ORANGE}`;
    return '2px solid transparent';
  }};
  box-sizing: border-box;
  transition: background-color 0.12s ease-in-out, border-color 0.12s ease-in-out;
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
