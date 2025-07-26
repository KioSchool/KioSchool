import { Table } from '@@types/index';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import TableListItem from './TableListItem';
import { useState } from 'react';
import { RiExpandUpDownFill, RiArrowDropDownFill, RiArrowDropUpFill } from '@remixicon/react';
import { rowFlex } from '@styles/flexStyles';

const ListContainer = styled.div`
  height: 600px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ececec;
  border-radius: 10px;
  overflow: hidden;
`;

const Header = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding: 5px 10px;
  font-weight: bold;
  background-color: ${Color.LIGHT_GREY};
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
const compareByStatus = (table1: Table, table2: Table, prioritizeUsing: boolean) => {
  const table1Using = table1.orderSession !== null;
  const table2Using = table2.orderSession !== null;

  if (table1Using === table2Using) {
    return compareById(table1, table2);
  }

  if (prioritizeUsing) {
    return table1Using ? -1 : 1;
  }

  return table1Using ? 1 : -1;
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

const SORT_TRANSITIONS = {
  [DEFAULT]: STATUS_ASC,
  [STATUS_ASC]: STATUS_DESC,
  [STATUS_DESC]: DEFAULT,
} as const;

interface TableSessionListProps {
  tables: Table[];
}

function AdminTableList({ tables }: TableSessionListProps) {
  const [sortType, setSortType] = useState<SortType>(DEFAULT);

  const getSortedTables = () => {
    const copiedTables = [...tables];

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
    setSortType((prev) => SORT_TRANSITIONS[prev] || STATUS_ASC);
  };

  return (
    <ListContainer>
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
    </ListContainer>
  );
}

export default AdminTableList;
