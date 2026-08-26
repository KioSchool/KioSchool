import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { TABLE_FILTER, TableFilterCounts, TableFilterType } from '@hooks/admin/useTableFilter';
import { TABLE_STATUS, TABLE_STATUS_LABEL } from '@utils/tableStatus';

const FILTER_ORDER: TableFilterType[] = [TABLE_FILTER.ALL, TABLE_FILTER.USING, TABLE_FILTER.WARNING, TABLE_FILTER.EXCEEDED, TABLE_FILTER.EMPTY];

const FILTER_LABEL: Record<TableFilterType, string> = {
  [TABLE_FILTER.ALL]: '전체',
  [TABLE_FILTER.USING]: TABLE_STATUS_LABEL[TABLE_STATUS.USING],
  [TABLE_FILTER.WARNING]: TABLE_STATUS_LABEL[TABLE_STATUS.WARNING],
  [TABLE_FILTER.EXCEEDED]: TABLE_STATUS_LABEL[TABLE_STATUS.EXCEEDED],
  [TABLE_FILTER.EMPTY]: TABLE_STATUS_LABEL[TABLE_STATUS.EMPTY],
};

// 필터가 곧 범례다 — 세그먼트의 상태 도트가 카드·목록과 같은 색 언어를 가르친다.
const FILTER_DOT_COLOR: Partial<Record<TableFilterType, string>> = {
  [TABLE_FILTER.USING]: Color.GREEN,
  [TABLE_FILTER.WARNING]: Color.KIO_ORANGE,
  [TABLE_FILTER.EXCEEDED]: Color.RED,
  [TABLE_FILTER.EMPTY]: Color.HEAVY_GREY,
};

const Container = styled.div`
  gap: 6px;

  ${rowFlex({ align: 'center' })};
`;

const Segment = styled.button<{ active: boolean }>`
  height: 36px;
  box-sizing: border-box;
  padding: 0 14px;
  border: 1.5px solid ${({ active }) => (active ? Color.KIO_ORANGE : Color.BORDER_GREY)};
  border-radius: 999px;
  background-color: ${({ active }) => (active ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  color: ${({ active }) => (active ? Color.KIO_ORANGE : Color.GREY)};
  font-size: 13px;
  font-weight: ${({ active }) => (active ? 700 : 500)};
  white-space: nowrap;
  cursor: pointer;
  gap: 6px;
  transition: all 0.2s ease-in-out;

  ${rowFlex({ justify: 'center', align: 'center' })};

  &:hover {
    border-color: ${Color.KIO_ORANGE};
  }
`;

const StatusDot = styled.span<{ color: string }>`
  width: 7px;
  height: 7px;
  border-radius: 999px;
  flex-shrink: 0;
  background-color: ${({ color }) => color};
`;

const Count = styled.span<{ active: boolean }>`
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: ${({ active }) => (active ? Color.KIO_ORANGE : Color.GREY)};
`;

interface TableFilterBarProps {
  activeFilter: TableFilterType;
  counts: TableFilterCounts;
  onChange: (filter: TableFilterType) => void;
}

function TableFilterBar({ activeFilter, counts, onChange }: TableFilterBarProps) {
  return (
    <Container>
      {FILTER_ORDER.map((filter) => {
        const dotColor = FILTER_DOT_COLOR[filter];
        const active = activeFilter === filter;

        return (
          <Segment key={filter} active={active} onClick={() => onChange(filter)}>
            {dotColor && <StatusDot color={dotColor} />}
            {FILTER_LABEL[filter]}
            <Count active={active}>{counts[filter]}</Count>
          </Segment>
        );
      })}
    </Container>
  );
}

export default TableFilterBar;
