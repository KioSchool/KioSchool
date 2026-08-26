import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { RiSettings3Fill } from '@remixicon/react';
import NewCommonButton from '@components/common/button/NewCommonButton';
import TableFilterBar from './TableFilterBar';
import TableRefreshButton from './TableRefreshButton';
import ViewToggle from './ViewToggle';
import { TableFilterCounts, TableFilterType } from '@hooks/admin/useTableFilter';
import { Color } from '@resources/colors';
import { colFlex, JustifyType, rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 95%;
  padding-top: 12px;
  padding-bottom: 24px;
  gap: 12px;

  ${colFlex()};
`;

const Row = styled.div<{ justify?: JustifyType }>`
  ${({ justify }) => rowFlex({ justify: justify ?? 'space-between', align: 'center' })};
`;

const Actions = styled.div`
  gap: 8px;

  ${rowFlex({ align: 'center' })};
`;

const SettingIcon = styled(RiSettings3Fill)`
  margin-right: 10px;
  color: ${Color.WHITE};
`;

const buttonPulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 145, 66, 0.45); }
  70% { box-shadow: 0 0 0 10px rgba(255, 145, 66, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 145, 66, 0); }
`;

const ButtonHighlightWrapper = styled.div<{ animate: boolean }>`
  border-radius: 40px;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${buttonPulseAnimation} 1.8s ease-out infinite;
    `}
`;

interface TableManageTopBarProps {
  showEditEntry: boolean;
  showFilters: boolean;
  highlightSettings: boolean;
  filterType: TableFilterType;
  filterCounts: TableFilterCounts;
  onChangeFilter: (filter: TableFilterType) => void;
  onStartEdit: () => void;
  onOpenSettings: () => void;
  onRefresh: () => void;
}

function TableManageTopBar({
  showEditEntry,
  showFilters,
  highlightSettings,
  filterType,
  filterCounts,
  onChangeFilter,
  onStartEdit,
  onOpenSettings,
  onRefresh,
}: TableManageTopBarProps) {
  return (
    <Container>
      <Row justify="flex-end">
        <Actions>
          {showEditEntry && (
            <NewCommonButton size="sm" color="blue_gray" onClick={onStartEdit}>
              배치 편집
            </NewCommonButton>
          )}
          <ButtonHighlightWrapper animate={highlightSettings}>
            <NewCommonButton size="sm" icon={<SettingIcon />} onClick={onOpenSettings}>
              테이블 설정
            </NewCommonButton>
          </ButtonHighlightWrapper>
        </Actions>
      </Row>
      {showFilters && (
        <Row>
          <TableFilterBar activeFilter={filterType} counts={filterCounts} onChange={onChangeFilter} />
          <Actions>
            <ViewToggle />
            <TableRefreshButton onClick={onRefresh} />
          </Actions>
        </Row>
      )}
    </Container>
  );
}

export default TableManageTopBar;
