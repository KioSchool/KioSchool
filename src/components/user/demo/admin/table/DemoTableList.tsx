import { useState } from 'react';
import styled from '@emotion/styled';
import { RiArrowDropDownFill, RiArrowDropUpFill, RiExpandUpDownFill } from '@remixicon/react';
import { Table } from '@@types/index';
import { TABLE_LIST_GRID_TEMPLATE, TABLE_VIEW_HEIGHT_PX } from '@constants/layout';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { getTableStatus, STATUS_ORDER } from '@utils/tableStatus';
import DemoTableListItem from './DemoTableListItem';

const ListContainer = styled.div`
  height: ${TABLE_VIEW_HEIGHT_PX}px;
  gap: 10px;
  ${colFlex()};
`;

const ListWrapper = styled.div`
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 16px;
  overflow: hidden;
  flex: 1;
  background-color: ${Color.WHITE};
  ${colFlex()};
`;

const Header = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: ${TABLE_LIST_GRID_TEMPLATE};
  padding: 0 12px;
  background-color: ${Color.GREY_FAINT};
  text-align: center;
  border-bottom: 1px solid ${Color.BORDER_GREY};
  height: 38px;
`;

const HeaderText = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${Color.MUTED_GREY};
  gap: 2px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const SortHeaderText = styled(HeaderText)`
  cursor: pointer;

  &:hover {
    color: ${Color.KIO_ORANGE};
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
  if (diff !== 0) return diff;
  return compareByNumber(a, b);
};

const SORT_COMPARATORS: Record<SortType, (a: Table, b: Table) => number> = {
  [SORT_STATUS]: compareByStatus,
  [SORT_STATUS_REVERSE]: (a, b) => -compareByStatus(a, b),
  [SORT_NUMBER]: compareByNumber,
};

interface DemoTableListProps {
  tables: Table[];
  selectedTableNumber: number;
  onSelect: (tableNumber: number) => void;
  onQuickStart: (tableNumber: number) => void;
}

function DemoTableList({ tables, selectedTableNumber, onSelect, onQuickStart }: DemoTableListProps) {
  const [sortType, setSortType] = useState<SortType>(SORT_NUMBER);
  const sortedTables = [...tables].sort(SORT_COMPARATORS[sortType]);

  return (
    <ListContainer>
      <ListWrapper>
        <Header>
          <HeaderText>테이블</HeaderText>
          <HeaderText>진행</HeaderText>
          <HeaderText>사용 시간</HeaderText>
          <HeaderText>주문</HeaderText>
          <HeaderText>금액</HeaderText>
          <SortHeaderText onClick={() => setSortType((prev) => NEXT_SORT_STATE[prev])}>
            상태
            {SORT_ICONS[sortType]}
          </SortHeaderText>
        </Header>
        <ListBody>
          {sortedTables.map((table) => (
            <DemoTableListItem
              key={table.id}
              table={table}
              isSelected={table.tableNumber === selectedTableNumber}
              onSelect={onSelect}
              onQuickStart={onQuickStart}
            />
          ))}
        </ListBody>
      </ListWrapper>
    </ListContainer>
  );
}

export default DemoTableList;
