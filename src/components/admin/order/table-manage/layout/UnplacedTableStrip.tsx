import { ReactNode, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';
import { Table } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { TABLE_GRID_CELL_PX } from '@constants/layout';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { SELECTED_RING_PX } from './TableLayoutCard';

const LIST_MAX_ROWS = 2;
const LIST_GAP_PX = 8;
const CHEVRON_ICON_PX = 18;

const Container = styled.div`
  width: 100%;
  flex-shrink: 0;
  gap: 6px;
  ${colFlex()};
`;

const HeaderRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const Spacer = styled.div``;

const ToggleButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  font-weight: 600;
  color: ${Color.MUTED_GREY};
  gap: 2px;
  ${rowFlex({ align: 'center' })};
`;

const Count = styled.span`
  color: ${Color.GREY};
  font-weight: 800;
  font-variant-numeric: tabular-nums;
`;

const ExpandIcon = styled(RiArrowDownSLine)`
  width: ${CHEVRON_ICON_PX}px;
  height: ${CHEVRON_ICON_PX}px;
`;

const CollapseIcon = styled(RiArrowUpSLine)`
  width: ${CHEVRON_ICON_PX}px;
  height: ${CHEVRON_ICON_PX}px;
`;

const CardList = styled.div`
  width: calc(100% + ${SELECTED_RING_PX * 2}px);
  margin: -${SELECTED_RING_PX}px;
  padding: ${SELECTED_RING_PX}px;
  gap: ${LIST_GAP_PX}px;
  flex-wrap: wrap;
  max-height: ${LIST_MAX_ROWS * TABLE_GRID_CELL_PX + (LIST_MAX_ROWS - 1) * LIST_GAP_PX}px;
  overflow-y: auto;
  ${rowFlex()};
`;

const CardSlot = styled.div`
  width: ${TABLE_GRID_CELL_PX}px;
  height: ${TABLE_GRID_CELL_PX}px;
`;

interface UnplacedTableStripProps {
  tables: Table[];
  selectedTableNumber: number | null;
  showEditButton: boolean;
  onStartEdit: () => void;
  renderCard: (table: Table) => ReactNode;
}

function UnplacedTableStrip({ tables, selectedTableNumber, showEditButton, onStartEdit, renderCard }: UnplacedTableStripProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasUnplaced = tables.length > 0;
  const isSelectedUnplaced = tables.some((table) => table.tableNumber === selectedTableNumber);

  // 미배치 테이블을 선택하면(토스트 클릭 등) 접힌 스트립을 자동으로 펼쳐 카드를 보여준다
  useEffect(() => {
    if (isSelectedUnplaced) setIsExpanded(true);
  }, [selectedTableNumber, isSelectedUnplaced]);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  if (!hasUnplaced && !showEditButton) return null;

  return (
    <Container>
      <HeaderRow>
        {hasUnplaced ? (
          <ToggleButton type="button" onClick={handleToggleExpand}>
            미배치 <Count>{tables.length}</Count>
            {isExpanded ? <CollapseIcon /> : <ExpandIcon />}
          </ToggleButton>
        ) : (
          <Spacer />
        )}
        {showEditButton && (
          <NewCommonButton size="xs" color="blue_gray" onClick={onStartEdit}>
            배치 편집
          </NewCommonButton>
        )}
      </HeaderRow>
      {hasUnplaced && isExpanded && (
        <CardList>
          {tables.map((table) => (
            <CardSlot key={table.id}>{renderCard(table)}</CardSlot>
          ))}
        </CardList>
      )}
    </Container>
  );
}

export default UnplacedTableStrip;
