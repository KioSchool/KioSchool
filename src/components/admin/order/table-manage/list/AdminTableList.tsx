import { useState } from 'react';
import styled from '@emotion/styled';
import { RiExpandUpDownFill, RiArrowDropDownFill, RiArrowDropUpFill } from '@remixicon/react';

import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { getTableStatus, STATUS_ORDER, TABLE_STATUS } from '@utils/tableStatus';
import { Table } from '@@types/index';

import TableListItem from './TableListItem';

const ListContainer = styled.div`
  height: 600px;
  gap: 10px;

  ${colFlex()};
`;

const FilterBar = styled.div`
  background-color: ${Color.LIGHT_GREY};
  border-radius: 10px;
  padding: 4px;
  height: 48px;
  flex-shrink: 0;

  ${rowFlex()};
`;

const TabButton = styled.button<{ active: boolean; isWarning?: boolean }>`
  flex: 1;
  border: none;
  border-radius: 8px;
  background-color: ${({ active }) => (active ? Color.WHITE : 'transparent')};
  color: ${({ active, isWarning }) => (active ? (isWarning ? Color.RED : Color.KIO_ORANGE) : Color.GREY)};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  box-shadow: ${({ active }) => (active ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none')};
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  gap: 4px;

  ${rowFlex({ justify: 'center', align: 'center' })};

  &:hover {
    background-color: ${({ active }) => (active ? Color.WHITE : Color.HEAVY_GREY)};
  }
`;

const TabCount = styled.span<{ active: boolean; isWarning?: boolean }>`
  font-size: 14px;
  color: ${({ active, isWarning }) => (active ? (isWarning ? Color.RED : Color.KIO_ORANGE) : Color.GREY)};
`;

const ListWrapper = styled.div`
  border: 1px solid #ececec;
  border-radius: 10px;
  overflow: hidden;
  flex: 1;

  ${colFlex()};
`;

const Header = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 44px 40px 1fr 56px;
  padding: 5px 10px;
  font-weight: bold;
  background-color: #f0f5f8;
  text-align: center;
  border-bottom: 1px solid #ececec;
  height: 40px;
`;

const HeaderText = styled.div<{ clickable?: boolean }>`
  font-size: 15px;
  font-weight: 600;
  color: ${Color.GREY};
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  gap: 4px;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    color: ${({ clickable }) => (clickable ? Color.KIO_ORANGE : Color.GREY)};
  }
`;

const ListBody = styled.div`
  overflow-y: auto;
  height: 100%;
  flex: 1;
`;

const ExpandIcon = styled(RiExpandUpDownFill)`
  width: 18px;
  height: 18px;
  padding: 3px;
`;

const DropDownIcon = styled(RiArrowDropDownFill)`
  width: 25px;
  height: 25px;
`;

const DropUpIcon = styled(RiArrowDropUpFill)`
  width: 25px;
  height: 25px;
`;

const SORT_STATUS = 'status' as const;
const SORT_STATUS_REVERSE = 'status-reverse' as const;
const SORT_NUMBER = 'number' as const;

type SortType = typeof SORT_STATUS | typeof SORT_STATUS_REVERSE | typeof SORT_NUMBER;

const SORT_ICONS: Record<SortType, JSX.Element> = {
  [SORT_STATUS]: <DropDownIcon />,
  [SORT_STATUS_REVERSE]: <DropUpIcon />,
  [SORT_NUMBER]: <ExpandIcon />,
};

const NEXT_SORT_STATE: Record<SortType, SortType> = {
  [SORT_STATUS]: SORT_STATUS_REVERSE,
  [SORT_STATUS_REVERSE]: SORT_NUMBER,
  [SORT_NUMBER]: SORT_STATUS,
};

const compareByNumber = (a: Table, b: Table) => a.tableNumber - b.tableNumber;

const compareByStatus = (a: Table, b: Table) => {
  const diff = STATUS_ORDER[getTableStatus(a)] - STATUS_ORDER[getTableStatus(b)];
  return diff !== 0 ? diff : compareByNumber(a, b);
};

const SORT_COMPARATORS: Record<SortType, (a: Table, b: Table) => number> = {
  [SORT_STATUS]: compareByStatus,
  [SORT_STATUS_REVERSE]: (a, b) => -compareByStatus(a, b),
  [SORT_NUMBER]: compareByNumber,
};

interface TableSessionListProps {
  tables: Table[];
}

type FilterType = 'ALL' | 'USING' | 'EMPTY' | 'EXCEEDED';

function AdminTableList({ tables }: TableSessionListProps) {
  const [sortType, setSortType] = useState<SortType>(SORT_STATUS);
  const [filterType, setFilterType] = useState<FilterType>('ALL');

  const statuses = tables.map(getTableStatus);
  const usingCount = statuses.filter((status) => status !== TABLE_STATUS.EMPTY).length;
  const emptyCount = statuses.filter((status) => status === TABLE_STATUS.EMPTY).length;
  const exceededCount = statuses.filter((status) => status === TABLE_STATUS.EXCEEDED).length;

  const matchesFilter = (table: Table, filter: FilterType) => {
    const status = getTableStatus(table);
    if (filter === 'USING') return status !== TABLE_STATUS.EMPTY;
    if (filter === 'EMPTY') return status === TABLE_STATUS.EMPTY;
    if (filter === 'EXCEEDED') return status === TABLE_STATUS.EXCEEDED;
    return true;
  };

  const getSortedTables = () => {
    const copiedTables = tables.filter((table) => matchesFilter(table, filterType));
    return copiedTables.sort(SORT_COMPARATORS[sortType]);
  };

  const sortedTables = getSortedTables();

  const handleStatusClick = () => {
    setSortType((prev) => NEXT_SORT_STATE[prev]);
  };

  return (
    <ListContainer>
      <FilterBar>
        <TabButton active={filterType === 'ALL'} onClick={() => setFilterType('ALL')}>
          전체 <TabCount active={filterType === 'ALL'}>{tables.length}</TabCount>
        </TabButton>
        <TabButton active={filterType === 'USING'} onClick={() => setFilterType('USING')}>
          사용중 <TabCount active={filterType === 'USING'}>{usingCount}</TabCount>
        </TabButton>
        <TabButton active={filterType === 'EMPTY'} onClick={() => setFilterType('EMPTY')}>
          미사용 <TabCount active={filterType === 'EMPTY'}>{emptyCount}</TabCount>
        </TabButton>
        <TabButton isWarning active={filterType === 'EXCEEDED'} onClick={() => setFilterType('EXCEEDED')}>
          초과{' '}
          <TabCount active={filterType === 'EXCEEDED'} isWarning>
            {exceededCount}
          </TabCount>
        </TabButton>
      </FilterBar>
      <ListWrapper>
        <Header>
          <HeaderText>번호</HeaderText>
          <HeaderText />
          <HeaderText>잔여 시간</HeaderText>
          <HeaderText clickable onClick={handleStatusClick}>
            상태
            {SORT_ICONS[sortType]}
          </HeaderText>
        </Header>
        <ListBody>
          {sortedTables.map((table) => {
            const isUsing = table.orderSession !== null;
            const expectedEndAt = table.orderSession?.expectedEndAt;
            return <TableListItem key={table.id} expectedEndAt={expectedEndAt} isUsing={isUsing} table={table} />;
          })}
        </ListBody>
      </ListWrapper>
    </ListContainer>
  );
}

export default AdminTableList;
