import { useMemo } from 'react';
import styled from '@emotion/styled';
import { Table } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { TABLE_CROP_MARGIN_CELLS, TABLE_GRID_CELL_PX, TABLE_GRID_SIZE, TABLE_VIEW_HEIGHT_PX } from '@constants/layout';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { getSessionOrderStats, SessionOrderStats } from '@hooks/admin/useTableOrderStats';
import TableLayoutCanvas, { GridCropBounds } from './TableLayoutCanvas';
import TableLayoutCard from './TableLayoutCard';

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

const UnplacedSection = styled.div`
  width: 100%;
  flex-shrink: 0;
  gap: 6px;

  ${colFlex()};
`;

const UnplacedLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${Color.MUTED_GREY};
`;

const UnplacedCount = styled.span`
  color: ${Color.GREY};
  font-weight: 800;
  font-variant-numeric: tabular-nums;
`;

const UNPLACED_LIST_MAX_ROWS = 2;
const UNPLACED_LIST_GAP_PX = 8;

const UnplacedCardList = styled.div`
  width: 100%;
  gap: ${UNPLACED_LIST_GAP_PX}px;
  flex-wrap: wrap;
  max-height: ${UNPLACED_LIST_MAX_ROWS * TABLE_GRID_CELL_PX + (UNPLACED_LIST_MAX_ROWS - 1) * UNPLACED_LIST_GAP_PX}px;
  overflow-y: auto;

  ${rowFlex()};
`;

const UnplacedCardSlot = styled.div`
  width: ${TABLE_GRID_CELL_PX}px;
  height: ${TABLE_GRID_CELL_PX}px;
`;

// 운영 모드는 배치 영역 + 여유 1칸만 그린다. 빈 격자를 볼 이유가 운영 중에는 없고, 홀 전체가 스크린 없이 한눈에 들어와야 위치로 찾는다는 목적이 산다.
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
  flashSeqByTableNumber: Map<number, number>;
  onSelectTable: (table: Table) => void;
  onStartEdit: () => void;
}

function TableLayoutView({
  tables,
  orderStatsBySessionId,
  visibleTableNumbers,
  selectedTableNumber,
  flashSeqByTableNumber,
  onSelectTable,
  onStartEdit,
}: TableLayoutViewProps) {
  const placedTables = useMemo(() => tables.filter((table) => table.position != null), [tables]);
  const unplacedTables = useMemo(() => tables.filter((table) => table.position == null), [tables]);

  const tableByCell = new Map(placedTables.map((table) => [`${table.position!.x}-${table.position!.y}`, table]));

  const renderCard = (table: Table) => (
    <TableLayoutCard
      table={table}
      orderCount={getSessionOrderStats(table, orderStatsBySessionId)?.count ?? 0}
      isSelected={table.tableNumber === selectedTableNumber}
      isDimmed={visibleTableNumbers !== null && !visibleTableNumbers.has(table.tableNumber)}
      flashSeq={flashSeqByTableNumber.get(table.tableNumber) ?? 0}
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
      <CanvasArea>
        {placedTables.length === 0 ? (
          <EmptyState>
            아직 배치된 테이블이 없습니다
            <EmptyStateHint>실제 홀 모양대로 놓아두면 몇 번 테이블이 어디인지 바로 찾을 수 있어요</EmptyStateHint>
            <NewCommonButton size="sm" onClick={onStartEdit}>
              배치 편집
            </NewCommonButton>
          </EmptyState>
        ) : (
          <TableLayoutCanvas cropBounds={getCropBounds(placedTables)} renderCell={renderCell} />
        )}
      </CanvasArea>
      {unplacedTables.length > 0 && (
        <UnplacedSection>
          <UnplacedLabel>
            미배치 <UnplacedCount>{unplacedTables.length}</UnplacedCount>
          </UnplacedLabel>
          <UnplacedCardList>
            {unplacedTables.map((table) => (
              <UnplacedCardSlot key={table.id}>{renderCard(table)}</UnplacedCardSlot>
            ))}
          </UnplacedCardList>
        </UnplacedSection>
      )}
    </Container>
  );
}

export default TableLayoutView;
