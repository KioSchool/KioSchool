import { useState } from 'react';
import styled from '@emotion/styled';
import { RiExpandUpDownFill, RiArrowDropDownFill, RiArrowDropUpFill } from '@remixicon/react';

import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
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
  grid-template-columns: 1fr 2fr 1fr;
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

const compareById = (table1: Table, table2: Table) => table1.id - table2.id;

/**
 * 테이블 사용 상태를 기준으로 정렬하는 비교 함수
 * @param table1 비교할 첫 번째 테이블
 * @param table2 비교할 두 번째 테이블
 * @param prioritizeUsing true면 사용중 테이블을 앞으로, false면 종료된 테이블을 앞으로
 * @returns 정렬 순서 (-1: table1이 앞, 0: 동일, 1: table2가 앞)
 */
const compareByStatus = (table1: Table, table2: Table, prioritizeUsing: boolean) => {
  const table1Using = table1.orderSession !== null;
  const table2Using = table2.orderSession !== null;

  // 두 테이블의 사용 상태가 같으면 ID로 정렬
  if (table1Using === table2Using) {
    return compareById(table1, table2);
  }

  // 사용중 테이블을 우선하는 경우
  if (prioritizeUsing) {
    return table1Using ? -1 : 1; // table1이 사용중이면 앞으로
  }

  // 종료된 테이블을 우선하는 경우
  return table1Using ? 1 : -1; // table1이 사용중이면 뒤로
};

const DEFAULT = 'default' as const;
const STATUS_ASC = 'status-asc' as const;
const STATUS_DESC = 'status-desc' as const;

type SortType = typeof DEFAULT | typeof STATUS_ASC | typeof STATUS_DESC;

const SORT_ICONS = {
  [DEFAULT]: <ExpandIcon />,
  [STATUS_ASC]: <DropDownIcon />,
  [STATUS_DESC]: <DropUpIcon />,
} as const;

const NEXT_SORT_STATE = {
  [DEFAULT]: STATUS_ASC,
  [STATUS_ASC]: STATUS_DESC,
  [STATUS_DESC]: DEFAULT,
} as const;

interface TableSessionListProps {
  tables: Table[];
}

type FilterType = 'ALL' | 'USING' | 'EMPTY' | 'EXCEEDED';

function AdminTableList({ tables }: TableSessionListProps) {
  const [sortType, setSortType] = useState<SortType>(DEFAULT);
  const [filterType, setFilterType] = useState<FilterType>('ALL');

  const usingCount = tables.filter((table) => table.orderSession !== null).length;
  const emptyCount = tables.length - usingCount;
  const exceededCount = tables.filter((table) => {
    if (!table.orderSession || !table.orderSession.expectedEndAt) return false;
    return new Date(table.orderSession.expectedEndAt).getTime() <= Date.now();
  }).length;

  const getSortedTables = () => {
    let copiedTables = [...tables];

    if (filterType === 'USING') {
      copiedTables = copiedTables.filter((table) => table.orderSession !== null);
    } else if (filterType === 'EMPTY') {
      copiedTables = copiedTables.filter((table) => table.orderSession === null);
    } else if (filterType === 'EXCEEDED') {
      copiedTables = copiedTables.filter((table) => {
        if (!table.orderSession || !table.orderSession.expectedEndAt) return false;
        return new Date(table.orderSession.expectedEndAt).getTime() <= Date.now();
      });
    }

    switch (sortType) {
      case STATUS_ASC:
        return copiedTables.sort((a, b) => compareByStatus(a, b, true));
      case STATUS_DESC:
        return copiedTables.sort((a, b) => compareByStatus(a, b, false));
      default:
        return copiedTables.sort(compareById);
    }
  };

  const sortedTables = getSortedTables();

  const handleStatusClick = () => {
    setSortType((prev) => NEXT_SORT_STATE[prev] || STATUS_ASC);
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
          <HeaderText>테이블</HeaderText>
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
