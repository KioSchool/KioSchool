import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FestivalWorkspaceRankItem } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { getAdminWorkspacePath } from '@constants/routes';

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

const HeaderCell = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: ${Color.GREY};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const Row = styled.div<{ isEven: boolean }>`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  padding: 10px 16px;
  background: ${({ isEven }) => (isEven ? Color.WHITE : Color.LIGHT_GREY)};
  border-bottom: 1px solid ${Color.HEAVY_GREY};
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

const Cell = styled.div`
  font-size: 13px;
  color: ${Color.BLACK};
  ${rowFlex({ align: 'center' })}
`;

const NameGroup = styled.div`
  gap: 4px;
  ${colFlex({ align: 'flex-start' })}
`;

const WorkspaceName = styled(Link)`
  font-size: 13px;
  font-weight: 600;
  color: ${Color.BLACK};
  text-decoration: none;

  &:hover {
    color: ${Color.KIO_ORANGE};
    text-decoration: underline;
  }
`;

const UniversityLabel = styled.div`
  font-size: 11px;
  color: ${Color.GREY};
`;

const RankBadge = styled.span<{ rank: number }>`
  font-size: 11px;
  font-weight: 700;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
  background: ${({ rank }) => (rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : rank === 3 ? '#CD7F32' : Color.HEAVY_GREY)};
  color: ${({ rank }) => (rank <= 3 ? Color.WHITE : Color.GREY)};
  ${rowFlex({ align: 'center', justify: 'center' })}
`;

const EmptyRow = styled.div`
  padding: 24px;
  text-align: center;
  font-size: 13px;
  color: ${Color.GREY};
  ${colFlex({ align: 'center' })}
`;

interface FestivalWorkspaceRankingTableProps {
  workspaces: FestivalWorkspaceRankItem[];
}

function FestivalWorkspaceRankingTable({ workspaces }: FestivalWorkspaceRankingTableProps) {
  return (
    <Wrapper>
      <TableHeader>
        <HeaderCell>주점</HeaderCell>
        <HeaderCell>축제 일수</HeaderCell>
        <HeaderCell>총 주문</HeaderCell>
        <HeaderCell>총 매출</HeaderCell>
        <HeaderCell>평균 주문금액</HeaderCell>
      </TableHeader>
      {workspaces.length === 0 ? (
        <EmptyRow>이번 달 축제 데이터가 없습니다.</EmptyRow>
      ) : (
        workspaces.map((w, idx) => (
          <Row key={w.workspaceId} isEven={idx % 2 === 0}>
            <Cell>
              <RankBadge rank={idx + 1}>{idx + 1}</RankBadge>
              <NameGroup>
                <WorkspaceName to={getAdminWorkspacePath(w.workspaceId)} target="_blank" rel="noopener noreferrer">
                  {w.workspaceName}
                </WorkspaceName>
                <UniversityLabel>{w.universityName}</UniversityLabel>
              </NameGroup>
            </Cell>
            <Cell>{w.festivalDays}일</Cell>
            <Cell>{w.totalOrders.toLocaleString()}건</Cell>
            <Cell>{w.totalRevenue.toLocaleString()}원</Cell>
            <Cell>{w.averageOrderAmount.toLocaleString()}원</Cell>
          </Row>
        ))
      )}
    </Wrapper>
  );
}

export default FestivalWorkspaceRankingTable;
