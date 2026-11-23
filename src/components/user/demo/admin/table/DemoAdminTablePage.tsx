import styled from '@emotion/styled';
import { useAtomValue, useSetAtom } from 'jotai';
import { match } from 'ts-pattern';
import { Table } from '@@types/index';
import { TABLE_CLOCK_TICK_MS, TABLE_DETAIL_COLUMN_PX } from '@constants/layout';
import useTableFilter, { TABLE_FILTER } from '@hooks/admin/useTableFilter';
import useClockTick from '@hooks/common/useClockTick';
import { TABLE_VIEW } from '@jotai/admin/atoms';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { colFlex } from '@styles/flexStyles';
import DemoTableDetailPanel from './DemoTableDetailPanel';
import DemoTableLayoutView from './DemoTableLayoutView';
import DemoTableList from './DemoTableList';
import DemoTableTopBar from './DemoTableTopBar';

const Page = styled.div`
  width: 100%;
  ${colFlex({ justify: 'start', align: 'center' })}
`;

const Container = styled.div`
  width: 95%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr ${TABLE_DETAIL_COLUMN_PX}px;
  gap: 10px;
`;

function DemoAdminTablePage() {
  const { tables, selectedTableNumber, tableViewMode } = useAtomValue(demoStateAtom);
  const dispatch = useSetAtom(demoStateAtom);
  const { filterType, setFilterType, counts, filteredTables } = useTableFilter(tables);
  const visibleTableNumbers = match(filterType === TABLE_FILTER.ALL)
    .with(true, () => null)
    .otherwise(() => new Set(filteredTables.map((table) => table.tableNumber)));
  const selectedTable = tables.find((table) => table.tableNumber === selectedTableNumber);

  useClockTick(TABLE_CLOCK_TICK_MS);

  const selectTable = (tableNumber: number) => dispatch({ type: 'TABLE_SELECT', tableNumber });
  const quickStart = (tableNumber: number) => dispatch({ type: 'TABLE_START', tableNumber, now: Date.now() });

  return (
    <Page data-demo-region>
      <DemoTableTopBar filterType={filterType} filterCounts={counts} onChangeFilter={setFilterType} />
      <Container>
        {match(tableViewMode)
          .with(TABLE_VIEW.LAYOUT, () => (
            <DemoTableLayoutView
              tables={tables}
              visibleTableNumbers={visibleTableNumbers}
              selectedTableNumber={selectedTableNumber}
              onSelectTable={(table: Table) => selectTable(table.tableNumber)}
              onStartEdit={() => dispatch({ type: 'UNSUPPORTED' })}
              onQuickStart={quickStart}
            />
          ))
          .otherwise(() => (
            <DemoTableList tables={filteredTables} selectedTableNumber={selectedTableNumber} onSelect={selectTable} onQuickStart={quickStart} />
          ))}
        {selectedTable && <DemoTableDetailPanel key={selectedTable.tableNumber} table={selectedTable} />}
      </Container>
    </Page>
  );
}

export default DemoAdminTablePage;
