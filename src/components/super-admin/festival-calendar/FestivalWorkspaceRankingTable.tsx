import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FestivalWorkspaceRankItem } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatCurrency, formatNumber } from '@utils/formatNumber';
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
