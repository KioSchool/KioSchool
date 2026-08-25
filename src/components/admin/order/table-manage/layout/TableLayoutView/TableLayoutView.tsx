import { useMemo } from 'react';
import styled from '@emotion/styled';
import { Table } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { TABLE_CROP_MARGIN_CELLS, TABLE_GRID_SIZE, TABLE_VIEW_HEIGHT_PX } from '@constants/layout';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { getSessionOrderStats, SessionOrderStats } from '@hooks/admin/useTableOrderStats';
import TableLayoutCanvas, { GridCropBounds } from '../TableLayoutCanvas/TableLayoutCanvas';
import TableLayoutCard from '../TableLayoutCard/TableLayoutCard';

const Container = styled.div`
  width: 100%;
  min-width: 0;
  height: ${TABLE_VIEW_HEIGHT_PX}px;
  position: relative;
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

// 운영 모드는 배치 영역 + 여유 1칸만 그린다. 빈 격자를 볼 이유가 운영 중에는 없고, 홀 전체가 스크롤 없이 한눈에 들어와야 위치로 찾는다는 목적이 산다.
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
  flashingTableNumbers: Set<number>;
  onSelectTable: (table: Table) => void;
  onStartEdit: () => void;
}

function TableLayoutView({
  tables,
  orderStatsBySessionId,
  visibleTableNumbers,
  selectedTableNumber,
  flashingTableNumbers,
  onSelectTable,
  onStartEdit,
}: TableLayoutViewProps) {
  const placedTables = useMemo(() => tables.filter((table) => table.position != null), [tables]);

  if (placedTables.length === 0) {
    return (
      <Container>
        <EmptyState>
          아직 배치된 테이블이 없습니다
          <EmptyStateHint>실제 홀 모양대로 놓아두면 몇 번 테이블이 어디인지 바로 찾을 수 있어요</EmptyStateHint>
          <NewCommonButton size="sm" onClick={onStartEdit}>
            배치 편집
          </NewCommonButton>
        </EmptyState>
      </Container>
    );
  }

  const cropBounds = getCropBounds(placedTables);

  const tableAt = (x: number, y: number) => placedTables.find((table) => table.position?.x === x && table.position?.y === y);

  const renderCell = (x: number, y: number) => {
    const table = tableAt(x, y);
    if (!table) return null;

    return (
      <TableLayoutCard
        table={table}
        orderCount={getSessionOrderStats(table, orderStatsBySessionId)?.count ?? 0}
        isSelected={table.tableNumber === selectedTableNumber}
        isDimmed={visibleTableNumbers !== null && !visibleTableNumbers.has(table.tableNumber)}
        isFlashing={flashingTableNumbers.has(table.tableNumber)}
        onSelect={onSelectTable}
      />
    );
  };

  return (
    <Container>
      <TableLayoutCanvas cropBounds={cropBounds} renderCell={renderCell} />
    </Container>
  );
}

export default TableLayoutView;
