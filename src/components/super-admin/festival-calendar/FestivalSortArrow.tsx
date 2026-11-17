import styled from '@emotion/styled';
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';

const ArrowContainer = styled.span``;

interface FestivalSortArrowProps {
  col: string;
  sortKey: string;
  sortDir: 'asc' | 'desc';
}

function FestivalSortArrow({ col, sortKey, sortDir }: FestivalSortArrowProps) {
  const isAscending = sortKey === col && sortDir === 'asc';
  return <ArrowContainer className="sort-arrow">{isAscending ? <RiArrowUpSLine size={12} /> : <RiArrowDownSLine size={12} />}</ArrowContainer>;
}

export default FestivalSortArrow;
