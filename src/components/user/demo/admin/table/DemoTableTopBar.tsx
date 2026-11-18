import styled from '@emotion/styled';
import { RiSettings3Fill } from '@remixicon/react';
import { useSetAtom } from 'jotai';
import TableFilterBar from '@components/admin/order/table-manage/TableFilterBar';
import TableRefreshButton from '@components/admin/order/table-manage/TableRefreshButton';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { TableFilterCounts, TableFilterType } from '@hooks/admin/useTableFilter';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import DemoViewToggle from './DemoViewToggle';

const Container = styled.div`
  width: 95%;
  padding-top: 12px;
  padding-bottom: 24px;
  gap: 12px;
  ${colFlex()};
`;

const Row = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const Actions = styled.div`
  gap: 8px;
  ${rowFlex({ align: 'center' })};
`;

const SettingIcon = styled(RiSettings3Fill)`
  margin-right: 10px;
  color: ${Color.GREY};
`;

interface DemoTableTopBarProps {
  filterType: TableFilterType;
  filterCounts: TableFilterCounts;
  onChangeFilter: (filter: TableFilterType) => void;
}

function DemoTableTopBar({ filterType, filterCounts, onChangeFilter }: DemoTableTopBarProps) {
  const dispatch = useSetAtom(demoStateAtom);

  return (
    <Container>
      <Row>
        <TableFilterBar activeFilter={filterType} counts={filterCounts} onChange={onChangeFilter} />
        <Actions>
          <NewCommonButton size="sm" color="blue_gray" icon={<SettingIcon />} onClick={() => dispatch({ type: 'UNSUPPORTED' })}>
            테이블 설정
          </NewCommonButton>
          <DemoViewToggle />
          <TableRefreshButton onClick={() => undefined} />
        </Actions>
      </Row>
    </Container>
  );
}

export default DemoTableTopBar;
