import { useState } from 'react';
import styled from '@emotion/styled';
import { RiExpandUpDownFill, RiArrowDropDownFill, RiArrowDropUpFill } from '@remixicon/react';

import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { TABLE_LIST_NUMBER_COL_PX, TABLE_LIST_RING_COL_PX, TABLE_LIST_STATUS_COL_PX } from '@constants/layout';
import { getTableStatus, STATUS_ORDER } from '@utils/tableStatus';
import { Table } from '@@types/index';

import TableListItem from './TableListItem';

const ListContainer = styled.div`
  height: 600px;
  gap: 10px;

  ${colFlex()};
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
  grid-template-columns: ${TABLE_LIST_NUMBER_COL_PX}px ${TABLE_LIST_RING_COL_PX}px 1fr ${TABLE_LIST_STATUS_COL_PX}px;
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

function AdminTableList({ tables }: TableSessionListProps) {
  const [sortType, setSortType] = useState<SortType>(SORT_STATUS);

  const sortedTables = [...tables].sort(SORT_COMPARATORS[sortType]);

  const handleStatusClick = () => {
    setSortType((prev) => NEXT_SORT_STATE[prev]);
  };

  return (
    <ListContainer>
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
