import { useEffect, useMemo, useRef } from 'react';
import styled from '@emotion/styled';
import { Table } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { TABLE_GRID_CELL_PX, TABLE_GRID_GAP_PX, TABLE_GRID_PADDING_PX } from '@constants/layout';
import NewCommonButton from '@components/common/button/NewCommonButton';
import TableLayoutCanvas from '../TableLayoutCanvas/TableLayoutCanvas';
import TableLayoutCard from '../TableLayoutCard/TableLayoutCard';

const HALF = 2;

const Container = styled.div`
  width: 100%;
  min-width: 0;
  height: 600px;
  position: relative;
`;

const EmptyState = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #ececec;
  border-radius: 10px;
  gap: 12px;
  color: ${Color.GREY};
  font-size: 1.1rem;

  ${colFlex({ justify: 'center', align: 'center' })};
`;

function scrollToPlacedCenter(box: HTMLDivElement | null, placedTables: Table[]) {
  if (!box || placedTables.length === 0) return;

  const xs = placedTables.map((table) => table.position!.x);
  const ys = placedTables.map((table) => table.position!.y);
  const centerX = (Math.min(...xs) + Math.max(...xs) + 1) / HALF;
  const centerY = (Math.min(...ys) + Math.max(...ys) + 1) / HALF;
  const step = TABLE_GRID_CELL_PX + TABLE_GRID_GAP_PX;

  box.scrollLeft = Math.max(0, TABLE_GRID_PADDING_PX + centerX * step - box.clientWidth / HALF);
  box.scrollTop = Math.max(0, TABLE_GRID_PADDING_PX + centerY * step - box.clientHeight / HALF);
}

interface TableLayoutViewProps {
  tables: Table[];
  selectedTableNumber: number | null;
  onSelectTable: (table: Table) => void;
  onStartEdit: () => void;
}

function TableLayoutView({ tables, selectedTableNumber, onSelectTable, onStartEdit }: TableLayoutViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const placedTables = useMemo(() => tables.filter((table) => table.position !== null), [tables]);

  useEffect(() => {
    scrollToPlacedCenter(scrollRef.current, placedTables);
  }, [placedTables.length]);

  if (placedTables.length === 0) {
    return (
      <Container>
        <EmptyState>
          아직 배치된 테이블이 없습니다
          <NewCommonButton size="sm" onClick={onStartEdit}>
            배치 편집
          </NewCommonButton>
        </EmptyState>
      </Container>
    );
  }

  const tableAt = (x: number, y: number) => placedTables.find((table) => table.position?.x === x && table.position?.y === y);

  const renderCell = (x: number, y: number) => {
    const table = tableAt(x, y);
    if (!table) return null;

    return <TableLayoutCard table={table} isSelected={table.tableNumber === selectedTableNumber} onSelect={onSelectTable} />;
  };

  return (
    <Container>
      <TableLayoutCanvas showGrid={false} renderCell={renderCell} scrollRef={scrollRef} />
    </Container>
  );
}

export default TableLayoutView;
