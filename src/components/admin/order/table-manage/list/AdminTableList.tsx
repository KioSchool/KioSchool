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
    setSortType((prev) => NEXT_SORT_STATE[prev] || STATUS_ASC);
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
