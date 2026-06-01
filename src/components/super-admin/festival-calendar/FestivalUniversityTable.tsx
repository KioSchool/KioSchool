import { Fragment, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';
import styled from '@emotion/styled';
import { FestivalUniversityStats, FestivalWorkspaceRankItem } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatCurrency, formatNumber } from '@utils/formatNumber';
import { getAdminWorkspacePath } from '@constants/routes';

type SortKey = keyof Pick<FestivalUniversityStats, 'universityName' | 'festivalDays' | 'totalOrders' | 'totalRevenue'>;
type SortDir = 'asc' | 'desc';

const Wrapper = styled.div`
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 12px;
  overflow: hidden;
  background: ${Color.WHITE};
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 24px;
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

const Row = styled.div<{ expanded: boolean }>`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 24px;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
  cursor: pointer;
  background: ${({ expanded }) => (expanded ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  transition: background 0.15s;

  &:hover {
    background: ${({ expanded }) => (expanded ? Color.KIO_ORANGE_FAINT : Color.LIGHT_GREY)};
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

const ExpandIcon = styled.span<{ expanded: boolean }>`
  color: ${({ expanded }) => (expanded ? Color.KIO_ORANGE : Color.GREY)};
  transform: rotate(${({ expanded }) => (expanded ? '180deg' : '0deg')});
  transition: transform 0.15s;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const ExpandedPanel = styled.div`
  background: ${Color.KIO_ORANGE_FAINT};
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 8px;
`;

const PanelCaption = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: ${Color.GREY};
  letter-spacing: 0.02em;
  padding: 10px 16px 4px 44px;
`;

const SubRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 24px;
  padding: 8px 16px;
  align-items: center;
`;

const SubNameCell = styled.div`
  min-width: 0;
  padding-left: 28px;
  gap: 6px;
  ${rowFlex({ align: 'center' })}
`;

const SubDot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${Color.KIO_ORANGE};
  flex-shrink: 0;
`;

const WorkspaceLink = styled(Link)`
  font-size: 13px;
  font-weight: 500;
  color: ${Color.BLACK};
  text-decoration: none;
  word-break: keep-all;

  &:hover {
    color: ${Color.KIO_ORANGE};
    text-decoration: underline;
  }
`;

const SubCell = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
  word-break: keep-all;
`;

const SubEmpty = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
  padding: 6px 16px 6px 44px;
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

interface FestivalUniversityTableProps {
  universities: FestivalUniversityStats[];
  workspaces: FestivalWorkspaceRankItem[];
}

function FestivalUniversityTable({ universities, workspaces }: FestivalUniversityTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('totalRevenue');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const workspacesByUniversity = useMemo(() => {
    const grouped = new Map<string, FestivalWorkspaceRankItem[]>();
    workspaces.forEach((workspace) => {
      const group = grouped.get(workspace.universityName) ?? [];
      group.push(workspace);
      grouped.set(workspace.universityName, group);
    });
    grouped.forEach((group) => group.sort((a, b) => b.totalRevenue - a.totalRevenue));
    return grouped;
  }, [workspaces]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const toggleExpanded = (universityName: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(universityName)) {
        next.delete(universityName);
      } else {
        next.add(universityName);
      }
      return next;
    });
  };

  const sorted = [...universities].sort((a, b) => {
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
        <SortableHeaderCell active={sortKey === 'universityName'} onClick={() => handleSort('universityName')}>
          대학교
          <SortArrow col="universityName" sortKey={sortKey} sortDir={sortDir} />
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
      </TableHeader>
      {sorted.length === 0 ? (
        <EmptyRow>이번 달 축제 데이터가 없습니다.</EmptyRow>
      ) : (
        sorted.map((u, idx) => {
          const isExpanded = expanded.has(u.universityName);
          const universityWorkspaces = workspacesByUniversity.get(u.universityName) ?? [];
          return (
            <Fragment key={u.universityName}>
              <Row expanded={isExpanded} onClick={() => toggleExpanded(u.universityName)}>
                <NameCell>
                  <Rank>{idx + 1}</Rank>
                  <span>{u.universityName}</span>
                </NameCell>
                <Cell>{formatNumber(u.festivalDays)}일</Cell>
                <Cell>{formatNumber(u.totalOrders)}건</Cell>
                <Cell>{formatCurrency(u.totalRevenue)}</Cell>
                <ExpandIcon expanded={isExpanded}>
                  <RiArrowDownSLine size={16} />
                </ExpandIcon>
              </Row>
              {isExpanded && (
                <ExpandedPanel>
                  <PanelCaption>운영 주점 {formatNumber(universityWorkspaces.length)}곳</PanelCaption>
                  {universityWorkspaces.length === 0 ? (
                    <SubEmpty>주점 정보가 없습니다.</SubEmpty>
                  ) : (
                    universityWorkspaces.map((w) => (
                      <SubRow key={w.workspaceId}>
                        <SubNameCell>
                          <SubDot />
                          <WorkspaceLink to={getAdminWorkspacePath(w.workspaceId)} target="_blank" rel="noopener noreferrer">
                            {w.workspaceName}
                          </WorkspaceLink>
                        </SubNameCell>
                        <SubCell>{formatNumber(w.festivalDays)}일</SubCell>
                        <SubCell>{formatNumber(w.totalOrders)}건</SubCell>
                        <SubCell>{formatCurrency(w.totalRevenue)}</SubCell>
                      </SubRow>
                    ))
                  )}
                </ExpandedPanel>
              )}
            </Fragment>
          );
        })
      )}
    </Wrapper>
  );
}

export default FestivalUniversityTable;
