import { useState } from 'react';
import styled from '@emotion/styled';
import { pointerWithin, DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Table, TablePosition } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { DRAG_ACTIVATION_DISTANCE_PX, TABLE_GRID_CELL_PX, TABLE_TRAY_COLUMN_PX, TABLE_VIEW_HEIGHT_PX, TRAY_DROPPABLE_ID } from '@constants/layout';
import useTableLayoutDraft from '@hooks/admin/useTableLayoutDraft';
import { TablePositionUpdate } from '@hooks/admin/useAdminTableLayout';
import TableLayoutCanvas from '../../TableLayoutCanvas/TableLayoutCanvas';
import TableLayoutCard from '../../TableLayoutCard/TableLayoutCard';
import UnplacedTableTray from '../UnplacedTableTray/UnplacedTableTray';
import DraggableTableCard from '../DraggableTableCard/DraggableTableCard';
import LayoutGridCell from '../LayoutGridCell/LayoutGridCell';
import EditorToolbar from '../EditorToolbar/EditorToolbar';

const CONFLICT_OUTLINE_PX = 2;
const CONFLICT_OUTLINE_OFFSET_PX = 2;

const Frame = styled.div`
  width: 100%;

  ${colFlex()};
`;

const Container = styled.div`
  width: 100%;
  height: ${TABLE_VIEW_HEIGHT_PX}px;
  display: grid;
  grid-template-columns: ${TABLE_TRAY_COLUMN_PX}px 1fr;
  gap: 10px;
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

interface TableLayoutEditorProps {
  tables: Table[];
  onExit: () => void;
  onSave: (changes: TablePositionUpdate[]) => void;
  isSaving: boolean;
  conflictedPosition: TablePosition | null;
}

function TableLayoutEditor({ tables, onExit, onSave, isSaving, conflictedPosition }: TableLayoutEditorProps) {
  const { positionOf, place, resetAll, changes, isDirty } = useTableLayoutDraft(tables);
  const [activeTableId, setActiveTableId] = useState<number | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: DRAG_ACTIVATION_DISTANCE_PX } }));

  const placedTables = tables.filter((table) => positionOf(table) !== null);
  const unplacedTables = tables.filter((table) => positionOf(table) === null);
  const activeTable = tables.find((table) => table.id === activeTableId) ?? null;

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
      return;
    }

    const position = parseCellId(over.id);
    if (position) place(tableId, position);
  };

  const handleSave = () => {
    onSave(changes);
  };

  const handleExit = () => {
    if (isDirty && !window.confirm('저장하지 않은 변경이 있습니다. 나가시겠습니까?')) return;
    onExit();
  };

  const renderCell = (x: number, y: number) => {
    const table = placedTables.find((item) => {
      const position = positionOf(item);
      return position?.x === x && position?.y === y;
    });

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
      <EditorToolbar changeCount={changes.length} isSaving={isSaving} onSave={handleSave} onResetAll={resetAll} onExit={handleExit} />
      <DndContext sensors={sensors} collisionDetection={pointerWithin} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Container>
          <UnplacedTableTray tables={unplacedTables} />
          <TableLayoutCanvas showGrid renderCell={renderCell} />
        </Container>
        <DragOverlay>
          {activeTable && (
            <OverlayCard>
              <TableLayoutCard table={activeTable} showHandle />
            </OverlayCard>
          )}
        </DragOverlay>
      </DndContext>
    </Frame>
  );
}

export default TableLayoutEditor;
