import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { pointerWithin, DndContext, DragEndEvent, DragOverlay, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Table, TablePosition } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import {
  DRAG_ACTIVATION_DISTANCE_PX,
  TABLE_GRID_CELL_PX,
  TABLE_GRID_GAP_PX,
  TABLE_GRID_PADDING_PX,
  TABLE_TRAY_COLUMN_PX,
  TABLE_VIEW_HEIGHT_PX,
  TOUCH_DRAG_DELAY_MS,
  TOUCH_DRAG_TOLERANCE_PX,
  TRAY_DROPPABLE_ID,
} from '@constants/layout';
import useConfirm from '@hooks/useConfirm';
import useTableLayoutDraft from '@hooks/admin/useTableLayoutDraft';
import { TablePositionUpdate } from '@hooks/admin/useAdminTableLayout';
import TableLayoutCanvas from '@components/admin/order/table-manage/layout/TableLayoutCanvas/TableLayoutCanvas';
import TableLayoutCard from '@components/admin/order/table-manage/layout/TableLayoutCard/TableLayoutCard';
import UnplacedTableTray from '@components/admin/order/table-manage/layout/edit/UnplacedTableTray/UnplacedTableTray';
import DraggableTableCard from '@components/admin/order/table-manage/layout/edit/DraggableTableCard/DraggableTableCard';
import LayoutGridCell from '@components/admin/order/table-manage/layout/edit/LayoutGridCell/LayoutGridCell';
import EditorToolbar from '@components/admin/order/table-manage/layout/edit/EditorToolbar/EditorToolbar';

const CONFLICT_OUTLINE_PX = 2;
const CONFLICT_OUTLINE_OFFSET_PX = 2;
const HALF = 2;

const Frame = styled.div`
  width: 100%;

  ${colFlex()};
`;

const Container = styled.div`
  width: 100%;
  height: ${TABLE_VIEW_HEIGHT_PX}px;
  display: grid;
  grid-template-columns: ${TABLE_TRAY_COLUMN_PX}px 1fr;
  gap: 12px;
`;

const OverlayCard = styled.div`
  width: ${TABLE_GRID_CELL_PX}px;
  height: ${TABLE_GRID_CELL_PX}px;
`;

const ConflictedCard = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  outline: ${CONFLICT_OUTLINE_PX}px solid ${Color.RED};
  outline-offset: ${CONFLICT_OUTLINE_OFFSET_PX}px;
`;

function parseTableId(id: string | number): number | null {
  const matched = String(id).match(/^table-(\d+)$/);
  return matched ? Number(matched[1]) : null;
}

function parseCellId(id: string | number): TablePosition | null {
  const matched = String(id).match(/^cell-(\d+)-(\d+)$/);
  return matched ? { x: Number(matched[1]), y: Number(matched[2]) } : null;
}

function scrollToPlacedCenter(box: HTMLDivElement | null, positions: TablePosition[]) {
  if (!box || positions.length === 0) return;

  const xs = positions.map((position) => position.x);
  const ys = positions.map((position) => position.y);
  const centerX = (Math.min(...xs) + Math.max(...xs) + 1) / HALF;
  const centerY = (Math.min(...ys) + Math.max(...ys) + 1) / HALF;
  const step = TABLE_GRID_CELL_PX + TABLE_GRID_GAP_PX;

  box.scrollLeft = Math.max(0, TABLE_GRID_PADDING_PX + centerX * step - box.clientWidth / HALF);
  box.scrollTop = Math.max(0, TABLE_GRID_PADDING_PX + centerY * step - box.clientHeight / HALF);
}

interface TableLayoutEditorProps {
  tables: Table[];
  onExit: () => void;
  onSave: (changes: TablePositionUpdate[]) => void;
  onPositionChange: () => void;
  isSaving: boolean;
  conflictedPosition: TablePosition | null;
}

function TableLayoutEditor({ tables, onExit, onSave, onPositionChange, isSaving, conflictedPosition }: TableLayoutEditorProps) {
  const { positionOf, place, resetAll, changes, isDirty } = useTableLayoutDraft(tables);
  const [activeTableId, setActiveTableId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { ConfirmModal: ResetConfirmModal, confirm: confirmReset } = useConfirm({
    title: '전체 초기화',
    description: '모든 테이블의 배치를 취소합니다. 저장해야 반영됩니다.',
    okText: '초기화',
    cancelText: '취소',
  });
  const { ConfirmModal: ExitConfirmModal, confirm: confirmExit } = useConfirm({
    title: '편집 나가기',
    description: '저장하지 않은 변경이 있습니다. 나가시겠습니까?',
    okText: '저장 안 하고 나가기',
    cancelText: '계속 편집',
  });

  // 마우스는 5px 이동으로, 터치는 250ms 홀드로 리프트한다 - 터치에서 즉시 리프트하면 캔버스 스크롤 제스처와 충돌한다.
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: DRAG_ACTIVATION_DISTANCE_PX } }),
    useSensor(TouchSensor, { activationConstraint: { delay: TOUCH_DRAG_DELAY_MS, tolerance: TOUCH_DRAG_TOLERANCE_PX } }),
  );

  // 진입 시 1회, 이미 배치된 무리의 중심으로 스크롤한다 - 편집 중 재중심화하면 드래그하던 위치를 잃는다.
  useEffect(() => {
    const placedPositions = tables.filter((table) => table.position != null).map((table) => table.position!);
    scrollToPlacedCenter(scrollRef.current, placedPositions);
  }, []);

  const placedTables = tables.filter((table) => positionOf(table) !== null);
  const unplacedTables = tables.filter((table) => positionOf(table) === null);
  const activeTable = tables.find((table) => table.id === activeTableId) ?? null;

  const tableByCell = new Map(
    placedTables.map((table) => {
      const position = positionOf(table)!;
      return [`${position.x}-${position.y}`, table];
    }),
  );

  const isConflictedCell = (x: number, y: number) => conflictedPosition !== null && conflictedPosition.x === x && conflictedPosition.y === y;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTableId(parseTableId(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTableId(null);

    const { active, over } = event;
    if (!over) return;

    const tableId = parseTableId(active.id);
    if (tableId === null) return;

    if (over.id === TRAY_DROPPABLE_ID) {
      place(tableId, null);
      onPositionChange();
      return;
    }

    const position = parseCellId(over.id);
    if (!position) return;

    place(tableId, position);
    onPositionChange();
  };

  const handleSave = () => {
    onSave(changes);
  };

  const handleResetAll = async () => {
    if (!(await confirmReset())) return;

    resetAll();
    onPositionChange();
  };

  const handleExit = async () => {
    if (isDirty && !(await confirmExit())) return;
    onExit();
  };

  const renderCell = (x: number, y: number) => {
    const table = tableByCell.get(`${x}-${y}`);

    if (table) {
      if (!isConflictedCell(x, y)) return <DraggableTableCard table={table} />;

      return (
        <ConflictedCard>
          <DraggableTableCard table={table} />
        </ConflictedCard>
      );
    }

    return <LayoutGridCell x={x} y={y} isDragging={activeTableId !== null} isConflicted={isConflictedCell(x, y)} />;
  };

  return (
    <Frame>
      <EditorToolbar changeCount={changes.length} isSaving={isSaving} onSave={handleSave} onResetAll={handleResetAll} onExit={handleExit} />
      <DndContext sensors={sensors} collisionDetection={pointerWithin} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Container>
          <UnplacedTableTray tables={unplacedTables} />
          <TableLayoutCanvas renderCell={renderCell} scrollRef={scrollRef} />
        </Container>
        <DragOverlay>
          {activeTable && (
            <OverlayCard>
              <TableLayoutCard table={activeTable} showHandle />
            </OverlayCard>
          )}
        </DragOverlay>
      </DndContext>
      <ResetConfirmModal />
      <ExitConfirmModal />
    </Frame>
  );
}

export default TableLayoutEditor;
