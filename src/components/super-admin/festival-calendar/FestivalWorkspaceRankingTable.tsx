import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';
import styled from '@emotion/styled';
import { FestivalWorkspaceRankItem } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatCurrency, formatNumber } from '@utils/formatNumber';
import { getAdminWorkspacePath } from '@constants/routes';

type SortKey = keyof Pick<FestivalWorkspaceRankItem, 'workspaceName' | 'festivalDays' | 'totalOrders' | 'totalRevenue' | 'averageOrderAmount'>;
type SortDir = 'asc' | 'desc';

const Wrapper = styled.div`
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 12px;
  overflow: hidden;
  background: ${Color.WHITE};
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  padding: 10px 16px;
  background: ${Color.LIGHT_GREY};
  border-bottom: 1px solid ${Color.HEAVY_GREY};
`;

const SortableHeaderCell = styled.button<{ active: boolean }>`
  font-size: 11px;
  font-weight: 600;
  color: ${({ active }) => (active ? Color.KIO_ORANGE : Color.GREY)};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  gap: 2px;
  ${rowFlex({ align: 'center' })}

  .sort-arrow {
    opacity: ${({ active }) => (active ? 1 : 0)};
    transition: opacity 0.15s;
  }

  &:hover {
    color: ${Color.KIO_ORANGE};

    .sort-arrow {
      opacity: 0.5;
    }
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

const Cell = styled.div`
  font-size: 13px;
  color: ${Color.BLACK};
  word-break: keep-all;
`;

const NameCell = styled(Cell)`
  gap: 8px;
  min-width: 0;
  ${rowFlex({ align: 'center' })}
`;

const Rank = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${Color.GREY};
  width: 20px;
  flex-shrink: 0;
`;

const NameGroup = styled.div`
  min-width: 0;
  gap: 2px;
  ${colFlex({ align: 'flex-start' })}
`;

const WorkspaceName = styled(Link)`
  font-size: 13px;
  font-weight: 600;
  color: ${Color.BLACK};
  text-decoration: none;
  word-break: keep-all;

  &:hover {
    color: ${Color.KIO_ORANGE};
    text-decoration: underline;
  }
`;

const UniversityLabel = styled.div`
  font-size: 11px;
  color: ${Color.GREY};
`;

const EmptyRow = styled.div`
  padding: 32px 16px;
  text-align: center;
  font-size: 13px;
  color: ${Color.GREY};
  word-break: keep-all;
  ${colFlex({ align: 'center' })}
`;

interface SortArrowProps {
  col: SortKey;
  sortKey: SortKey;
  sortDir: SortDir;
}

function SortArrow({ col, sortKey, sortDir }: SortArrowProps) {
  return <span className="sort-arrow">{sortKey === col && sortDir === 'asc' ? <RiArrowUpSLine size={12} /> : <RiArrowDownSLine size={12} />}</span>;
}

interface FestivalWorkspaceRankingTableProps {
  workspaces: FestivalWorkspaceRankItem[];
}

function FestivalWorkspaceRankingTable({ workspaces }: FestivalWorkspaceRankingTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('totalRevenue');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const sorted = [...workspaces].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDir === 'desc' ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
    }
    return sortDir === 'desc' ? (bVal as number) - (aVal as number) : (aVal as number) - (bVal as number);
  });

  return (
    <Wrapper>
      <TableHeader>
        <SortableHeaderCell active={sortKey === 'workspaceName'} onClick={() => handleSort('workspaceName')}>
          주점
          <SortArrow col="workspaceName" sortKey={sortKey} sortDir={sortDir} />
        </SortableHeaderCell>
        <SortableHeaderCell active={sortKey === 'festivalDays'} onClick={() => handleSort('festivalDays')}>
          축제 일수
          <SortArrow col="festivalDays" sortKey={sortKey} sortDir={sortDir} />
        </SortableHeaderCell>
        <SortableHeaderCell active={sortKey === 'totalOrders'} onClick={() => handleSort('totalOrders')}>
          총 주문
          <SortArrow col="totalOrders" sortKey={sortKey} sortDir={sortDir} />
        </SortableHeaderCell>
        <SortableHeaderCell active={sortKey === 'totalRevenue'} onClick={() => handleSort('totalRevenue')}>
          총 매출
          <SortArrow col="totalRevenue" sortKey={sortKey} sortDir={sortDir} />
        </SortableHeaderCell>
        <SortableHeaderCell active={sortKey === 'averageOrderAmount'} onClick={() => handleSort('averageOrderAmount')}>
          평균 주문금액
          <SortArrow col="averageOrderAmount" sortKey={sortKey} sortDir={sortDir} />
        </SortableHeaderCell>
      </TableHeader>
      {sorted.length === 0 ? (
        <EmptyRow>이번 달 축제 데이터가 없습니다.</EmptyRow>
      ) : (
        sorted.map((w, idx) => (
          <Row key={w.workspaceId}>
            <NameCell>
              <Rank>{idx + 1}</Rank>
              <NameGroup>
                <WorkspaceName to={getAdminWorkspacePath(w.workspaceId)} target="_blank" rel="noopener noreferrer">
                  {w.workspaceName}
                </WorkspaceName>
                <UniversityLabel>{w.universityName}</UniversityLabel>
              </NameGroup>
            </NameCell>
            <Cell>{formatNumber(w.festivalDays)}일</Cell>
            <Cell>{formatNumber(w.totalOrders)}건</Cell>
            <Cell>{formatCurrency(w.totalRevenue)}</Cell>
            <Cell>{formatCurrency(w.averageOrderAmount)}</Cell>
          </Row>
        ))
      )}
    </Wrapper>
  );
}

export default FestivalWorkspaceRankingTable;
