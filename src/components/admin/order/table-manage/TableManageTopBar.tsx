import styled from '@emotion/styled';
import { RiSettings3Fill } from '@remixicon/react';
import OnboardingActionHighlight from '@components/admin/order/table-manage/common/OnboardingActionHighlight';
import NewCommonButton from '@components/common/button/NewCommonButton';
import TableFilterBar from './TableFilterBar';
import TableRefreshButton from './TableRefreshButton';
import ViewToggle, { VIEW_TOGGLE_RADIUS_PX } from './ViewToggle';
import { TableFilterCounts, TableFilterType } from '@hooks/admin/useTableFilter';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

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

const Spacer = styled.div``;

const Actions = styled.div`
  gap: 8px;
  ${rowFlex({ align: 'center' })};
`;

const SettingIcon = styled(RiSettings3Fill)`
  margin-right: 10px;
  color: ${Color.GREY};
`;

interface TableManageTopBarProps {
  showFilters: boolean;
  highlightSettings: boolean;
  highlightLayout: boolean;
  filterType: TableFilterType;
  filterCounts: TableFilterCounts;
  onChangeFilter: (filter: TableFilterType) => void;
  onOpenSettings: () => void;
  onRefresh: () => void;
}

function TableManageTopBar({
  showFilters,
  highlightSettings,
  highlightLayout,
  filterType,
  filterCounts,
  onChangeFilter,
  onOpenSettings,
  onRefresh,
}: TableManageTopBarProps) {
  return (
    <Container>
      <Row>
        {showFilters ? <TableFilterBar activeFilter={filterType} counts={filterCounts} onChange={onChangeFilter} /> : <Spacer />}
        <Actions>
          <OnboardingActionHighlight active={highlightSettings}>
            <NewCommonButton size="sm" color="blue_gray" icon={<SettingIcon />} onClick={onOpenSettings}>
              테이블 설정
            </NewCommonButton>
          </OnboardingActionHighlight>
          {showFilters && (
            <OnboardingActionHighlight active={highlightLayout} borderRadius={VIEW_TOGGLE_RADIUS_PX}>
              <ViewToggle />
            </OnboardingActionHighlight>
          )}
          {showFilters && <TableRefreshButton onClick={onRefresh} />}
        </Actions>
      </Row>
    </Container>
  );
}

export default TableManageTopBar;
