import { useMemo } from 'react';
import styled from '@emotion/styled';
import { Table } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { TABLE_CROP_MARGIN_CELLS, TABLE_GRID_SIZE, TABLE_VIEW_HEIGHT_PX } from '@constants/layout';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { getSessionOrderStats, SessionOrderStats } from '@hooks/admin/useTableOrderStats';
import TableLayoutCanvas, { GridCropBounds } from './TableLayoutCanvas';
import TableLayoutCard from './TableLayoutCard';
import UnplacedTableStrip from './UnplacedTableStrip';

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

const EmptyState = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 16px;
  gap: 8px;
  color: ${Color.GREY};
  font-size: 16px;
  font-weight: 700;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const EmptyStateHint = styled.div`
  margin-bottom: 14px;
  font-size: 13px;
  color: ${Color.MUTED_GREY};
`;

function getCropBounds(placedTables: Table[]): GridCropBounds {
  const xs = placedTables.map((table) => table.position!.x);
  const ys = placedTables.map((table) => table.position!.y);
  const maxIndex = TABLE_GRID_SIZE - 1;

  return {
    minX: Math.max(0, Math.min(...xs) - TABLE_CROP_MARGIN_CELLS),
    maxX: Math.min(maxIndex, Math.max(...xs) + TABLE_CROP_MARGIN_CELLS),
    minY: Math.max(0, Math.min(...ys) - TABLE_CROP_MARGIN_CELLS),
    maxY: Math.min(maxIndex, Math.max(...ys) + TABLE_CROP_MARGIN_CELLS),
  };
}

interface TableLayoutViewProps {
  tables: Table[];
  orderStatsBySessionId: Map<number, SessionOrderStats>;
  visibleTableNumbers: Set<number> | null;
  selectedTableNumber: number | null;
  onSelectTable: (table: Table) => void;
  onStartEdit: () => void;
}

function TableLayoutView({ tables, orderStatsBySessionId, visibleTableNumbers, selectedTableNumber, onSelectTable, onStartEdit }: TableLayoutViewProps) {
  const placedTables = useMemo(() => tables.filter((table) => table.position != null), [tables]);
  const unplacedTables = useMemo(() => tables.filter((table) => table.position == null), [tables]);

  const tableByCell = new Map(placedTables.map((table) => [`${table.position!.x}-${table.position!.y}`, table]));

  // 방금 상태를 바꾼(=선택된) 테이블까지 흐려지면 오류로 보인다 — 선택 테이블은 필터 dim에서 제외
  const isDimmedByFilter = (table: Table) => {
    if (visibleTableNumbers === null) return false;
    if (table.tableNumber === selectedTableNumber) return false;
    return !visibleTableNumbers.has(table.tableNumber);
  };

  const renderCard = (table: Table) => (
    <TableLayoutCard
      table={table}
      orderCount={getSessionOrderStats(table, orderStatsBySessionId)?.count ?? 0}
      isSelected={table.tableNumber === selectedTableNumber}
      isDimmed={isDimmedByFilter(table)}
      onSelect={onSelectTable}
    />
  );

  const renderCell = (x: number, y: number) => {
    const table = tableByCell.get(`${x}-${y}`);
    if (!table) return null;

    return renderCard(table);
  };

  return (
    <Container>
      <UnplacedTableStrip tables={unplacedTables} selectedTableNumber={selectedTableNumber} renderCard={renderCard} />
      <CanvasArea>
        {placedTables.length === 0 ? (
          <EmptyState>
            아직 배치된 테이블이 없습니다
            <EmptyStateHint>실제 주점 테이블 배치대로 놓아두면 테이블 위치를 바로 찾을 수 있어요</EmptyStateHint>
            <NewCommonButton size="sm" onClick={onStartEdit}>
              배치 편집
            </NewCommonButton>
          </EmptyState>
        ) : (
          <TableLayoutCanvas cropBounds={getCropBounds(placedTables)} renderCell={renderCell} />
        )}
      </CanvasArea>
    </Container>
  );
}

export default TableLayoutView;
