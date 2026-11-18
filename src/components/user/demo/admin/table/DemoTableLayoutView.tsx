import { useMemo } from 'react';
import styled from '@emotion/styled';
import { Table } from '@@types/index';
import { DEMO_TABLE_NUMBER } from '@constants/data/demo/demoSeed';
import { TABLE_CROP_MARGIN_CELLS, TABLE_GRID_SIZE, TABLE_VIEW_HEIGHT_PX } from '@constants/layout';
import TableLayoutCanvas, { GridCropBounds } from '@components/admin/order/table-manage/layout/TableLayoutCanvas';
import TableLayoutCard from '@components/admin/order/table-manage/layout/TableLayoutCard';
import UnplacedTableStrip from '@components/admin/order/table-manage/layout/UnplacedTableStrip';
import { colFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  min-width: 0;
  height: ${TABLE_VIEW_HEIGHT_PX}px;
  gap: 10px;
  ${colFlex()};
`;

const CanvasArea = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
`;

const CardSlot = styled.div`
  width: 100%;
  height: 100%;
`;

function getCropBounds(placedTables: Table[]): GridCropBounds {
  const xs = placedTables.map((table) => table.position?.x ?? 0);
  const ys = placedTables.map((table) => table.position?.y ?? 0);
  const maxIndex = TABLE_GRID_SIZE - 1;

  return {
    minX: Math.max(0, Math.min(...xs) - TABLE_CROP_MARGIN_CELLS),
    maxX: Math.min(maxIndex, Math.max(...xs) + TABLE_CROP_MARGIN_CELLS),
    minY: Math.max(0, Math.min(...ys) - TABLE_CROP_MARGIN_CELLS),
    maxY: Math.min(maxIndex, Math.max(...ys) + TABLE_CROP_MARGIN_CELLS),
  };
}

const getFocusName = (tableNumber: number) => {
  if (tableNumber !== DEMO_TABLE_NUMBER) return undefined;
  return 'table-7';
};

interface DemoTableLayoutViewProps {
  tables: Table[];
  visibleTableNumbers: Set<number> | null;
  selectedTableNumber: number;
  onSelectTable: (table: Table) => void;
  onStartEdit: () => void;
  onQuickStart: (tableNumber: number) => void;
}

function DemoTableLayoutView({ tables, visibleTableNumbers, selectedTableNumber, onSelectTable, onStartEdit, onQuickStart }: DemoTableLayoutViewProps) {
  const placedTables = useMemo(() => tables.filter((table) => table.position != null), [tables]);
  const unplacedTables = useMemo(() => tables.filter((table) => table.position == null), [tables]);
  const tableByCell = new Map(placedTables.map((table) => [`${table.position?.x}-${table.position?.y}`, table]));

  const isDimmedByFilter = (table: Table) => {
    if (visibleTableNumbers === null) return false;
    if (table.tableNumber === selectedTableNumber) return false;
    return !visibleTableNumbers.has(table.tableNumber);
  };

  const renderCard = (table: Table) => (
    <CardSlot data-demo-table={table.tableNumber} data-demo-focus={getFocusName(table.tableNumber)}>
      <TableLayoutCard
        table={table}
        orderCount={table.orderSession?.orderCount ?? 0}
        isSelected={table.tableNumber === selectedTableNumber}
        isDimmed={isDimmedByFilter(table)}
        onSelect={onSelectTable}
        onQuickStart={onQuickStart}
      />
    </CardSlot>
  );

  const renderCell = (x: number, y: number) => {
    const table = tableByCell.get(`${x}-${y}`);
    if (!table) return null;
    return renderCard(table);
  };

  return (
    <Container>
      <UnplacedTableStrip
        tables={unplacedTables}
        selectedTableNumber={selectedTableNumber}
        showEditButton={placedTables.length > 0}
        highlightEditButton={false}
        onStartEdit={onStartEdit}
        renderCard={renderCard}
      />
      <CanvasArea>
        <TableLayoutCanvas cropBounds={getCropBounds(placedTables)} renderCell={renderCell} />
      </CanvasArea>
    </Container>
  );
}

export default DemoTableLayoutView;
