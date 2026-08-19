import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { TABLE_FILTER, TableFilterCounts, TableFilterType } from '@hooks/admin/useTableFilter';

const FILTER_ORDER: TableFilterType[] = [TABLE_FILTER.ALL, TABLE_FILTER.USING, TABLE_FILTER.WARNING, TABLE_FILTER.EXCEEDED, TABLE_FILTER.EMPTY];

const FILTER_LABEL: Record<TableFilterType, string> = {
  [TABLE_FILTER.ALL]: '전체',
  [TABLE_FILTER.USING]: '사용중',
  [TABLE_FILTER.WARNING]: '주의',
  [TABLE_FILTER.EXCEEDED]: '초과',
  [TABLE_FILTER.EMPTY]: '미사용',
};

const Container = styled.div`
  gap: 6px;

  ${rowFlex({ align: 'center' })};
`;

const FilterPill = styled.button<{ active: boolean }>`
  flex-shrink: 0;
  border: none;
  border-radius: 999px;
  padding: 8px 14px;
  background-color: ${({ active }) => (active ? Color.BLACK : Color.LIGHT_GREY)};
  color: ${({ active }) => (active ? Color.WHITE : Color.GREY)};
  font-size: 14px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  white-space: nowrap;
  cursor: pointer;
  gap: 4px;
  transition: all 0.2s ease-in-out;

  ${rowFlex({ justify: 'center', align: 'center' })};
`;

interface TableFilterBarProps {
  activeFilter: TableFilterType;
  counts: TableFilterCounts;
  onChange: (filter: TableFilterType) => void;
}

function TableFilterBar({ activeFilter, counts, onChange }: TableFilterBarProps) {
  return (
    <Container>
      {FILTER_ORDER.map((filter) => (
        <FilterPill key={filter} active={activeFilter === filter} onClick={() => onChange(filter)}>
          {counts[filter]} {FILTER_LABEL[filter]}
        </FilterPill>
      ))}
    </Container>
  );
}

export default TableFilterBar;
