import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useAtomValue, useSetAtom } from 'jotai';
import { Table } from '@@types/index';
import { DEMO_STEP } from '@constants/data/demo/demoSteps';
import { TABLE_CLOCK_TICK_MS, TABLE_GRID_CELL_PX, TABLE_GRID_GAP_PX } from '@constants/layout';
import TableFilterBar from '@components/admin/order/table-manage/TableFilterBar';
import TableLayoutCard from '@components/admin/order/table-manage/layout/TableLayoutCard';
import DemoTableDetailPanel from '@components/user/demo/admin/table/DemoTableDetailPanel';
import useTableFilter, { TABLE_FILTER } from '@hooks/admin/useTableFilter';
import useClockTick from '@hooks/common/useClockTick';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { getDemoTableFocus } from '@utils/demo/demoFocus';

const TABLE_COLUMN_COUNT = 4;
// 아래 창은 기기 화면 높이의 64%까지만 올려 위 테이블 줄을 계속 누를 수 있게 한다
const SHEET_HEIGHT = 'min(380px, 64%)';
const SHEET_OPEN_STEPS: number[] = [DEMO_STEP.EXTEND, DEMO_STEP.END];

const Page = styled.div`
  position: absolute;
  inset: 0;
`;

const Scroll = styled.div`
  height: 100%;
  padding: 12px 16px 24px;
  overflow-y: auto;
  gap: 12px;
  ${colFlex()}
`;

const FilterRow = styled.div`
  flex: none;
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;

  & > * {
    flex-wrap: nowrap;
    width: max-content;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Grid = styled.div`
  flex: none;
  display: grid;
  grid-template-columns: repeat(${TABLE_COLUMN_COUNT}, ${TABLE_GRID_CELL_PX}px);
  grid-auto-rows: ${TABLE_GRID_CELL_PX}px;
  gap: ${TABLE_GRID_GAP_PX}px;
  justify-content: center;
  padding: 16px 0;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 16px;
  background-color: ${Color.LIGHT_GREY};
`;

const CardSlot = styled.div`
  width: 100%;
  height: 100%;
`;

const SheetSpacer = styled.div`
  flex: none;
  height: ${SHEET_HEIGHT};
`;

const Sheet = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  height: ${SHEET_HEIGHT};
  overflow: hidden;
  border-radius: 16px 16px 0 0;
  background: ${Color.WHITE};
  box-shadow: 0 -6px 24px rgba(25, 31, 40, 0.12);
  ${colFlex()}
`;

const SheetHandle = styled.button`
  flex: none;
  width: 100%;
  height: 20px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;

  &::after {
    content: '';
    display: block;
    width: 36px;
    height: 4px;
    margin: 0 auto;
    border-radius: 2px;
    background: #d1d6db;
  }
`;

const SheetBody = styled.div`
  flex: 1;
  min-height: 0;
`;

const byPosition = (a: Table, b: Table) =>
  (a.position?.y ?? 0) - (b.position?.y ?? 0) || (a.position?.x ?? 0) - (b.position?.x ?? 0) || a.tableNumber - b.tableNumber;

function DemoMobileTablePage() {
  const { tables, selectedTableNumber, step } = useAtomValue(demoStateAtom);
  const dispatch = useSetAtom(demoStateAtom);
  const { filterType, setFilterType, counts, filteredTables } = useTableFilter(tables);
  const [isSheetOpen, setIsSheetOpen] = useState(() => SHEET_OPEN_STEPS.includes(step));
  const visibleTableNumbers = new Set(filteredTables.map((table) => table.tableNumber));
  const selectedTable = tables.find((table) => table.tableNumber === selectedTableNumber);
  const sortedTables = [...tables].sort(byPosition);

  useClockTick(TABLE_CLOCK_TICK_MS);

  useEffect(() => {
    setIsSheetOpen(SHEET_OPEN_STEPS.includes(step));
  }, [step]);

  const isDimmed = (table: Table) => {
    if (filterType === TABLE_FILTER.ALL) return false;
    return !visibleTableNumbers.has(table.tableNumber);
  };

  const handleSelect = (table: Table) => {
    dispatch({ type: 'TABLE_SELECT', tableNumber: table.tableNumber });
    setIsSheetOpen(true);
  };

  const handleQuickStart = (tableNumber: number) => dispatch({ type: 'TABLE_START', tableNumber, now: Date.now() });

  return (
    <Page>
      <Scroll>
        <FilterRow>
          <TableFilterBar activeFilter={filterType} counts={counts} onChange={setFilterType} />
        </FilterRow>
        <Grid>
          {sortedTables.map((table) => (
            <CardSlot key={table.tableNumber} data-demo-table={table.tableNumber} data-demo-focus={getDemoTableFocus(table.tableNumber)}>
              <TableLayoutCard
                table={table}
                orderCount={table.orderSession?.orderCount ?? 0}
                isSelected={isSheetOpen && table.tableNumber === selectedTableNumber}
                isDimmed={isDimmed(table)}
                onSelect={handleSelect}
                onQuickStart={handleQuickStart}
              />
            </CardSlot>
          ))}
        </Grid>
        {isSheetOpen && <SheetSpacer />}
      </Scroll>
      {isSheetOpen && selectedTable && (
        <Sheet>
          <SheetHandle type="button" aria-label="테이블 상세 닫기" onClick={() => setIsSheetOpen(false)} />
          <SheetBody>
            <DemoTableDetailPanel key={selectedTable.tableNumber} table={selectedTable} isMobile={true} />
          </SheetBody>
        </Sheet>
      )}
    </Page>
  );
}

export default DemoMobileTablePage;
