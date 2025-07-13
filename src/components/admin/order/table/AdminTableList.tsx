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

const sortById = (a: Table, b: Table) => a.id - b.id;
const sortByStatus = (a: Table, b: Table, prioritizeUsing: boolean) => {
  const aUsing = a.orderSession !== null;
  const bUsing = b.orderSession !== null;

  if (aUsing !== bUsing) {
    if (prioritizeUsing) {
      return bUsing ? 1 : -1;
    } else {
      return aUsing ? 1 : -1;
    }
  }
  return sortById(a, b);
};

type SortType = 'default' | 'status-asc' | 'status-desc';

const SORT_ICONS = {
  default: <ExpandIcon />,
  'status-asc': <DropDownIcon />,
  'status-desc': <DropUpIcon />,
} as const;

const SORT_TRANSITIONS = {
  default: 'status-asc',
  'status-asc': 'status-desc',
  'status-desc': 'default',
} as const;

interface TableSessionListProps {
  tables: Table[];
}

function AdminTableList({ tables }: TableSessionListProps) {
  const [sortType, setSortType] = useState<SortType>('default');

  const getSortedTables = () => {
    const copiedTables = [...tables];

    switch (sortType) {
      case 'status-asc':
        return copiedTables.sort((a, b) => sortByStatus(a, b, true));
      case 'status-desc':
        return copiedTables.sort((a, b) => sortByStatus(a, b, false));
      default:
        return copiedTables.sort(sortById);
    }
  };

  const sortedTables = getSortedTables();

  const handleStatusClick = () => {
    setSortType((prev) => SORT_TRANSITIONS[prev] || 'status-asc');
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
