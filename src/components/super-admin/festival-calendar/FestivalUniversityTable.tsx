import styled from '@emotion/styled';
import { FestivalUniversityStats } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatCurrency, formatNumber } from '@utils/formatNumber';

const Wrapper = styled.div`
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 12px;
  overflow: hidden;
  background: ${Color.WHITE};
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
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
  grid-template-columns: 2fr 1fr 1fr 1fr;
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

const EmptyRow = styled.div`
  padding: 32px 16px;
  text-align: center;
  font-size: 13px;
  color: ${Color.GREY};
  word-break: keep-all;
  ${colFlex({ align: 'center' })}
`;

interface FestivalUniversityTableProps {
  universities: FestivalUniversityStats[];
}

function FestivalUniversityTable({ universities }: FestivalUniversityTableProps) {
  return (
    <Wrapper>
      <TableHeader>
        <HeaderCell>대학교</HeaderCell>
        <HeaderCell>축제 일수</HeaderCell>
        <HeaderCell>총 주문</HeaderCell>
        <HeaderCell>총 매출</HeaderCell>
      </TableHeader>
      {universities.length === 0 ? (
        <EmptyRow>이번 달 축제 데이터가 없습니다.</EmptyRow>
      ) : (
        universities.map((u, idx) => (
          <Row key={u.universityName}>
            <NameCell>
              <Rank>{idx + 1}</Rank>
              <span>{u.universityName}</span>
            </NameCell>
            <Cell>{formatNumber(u.festivalDays)}일</Cell>
            <Cell>{formatNumber(u.totalOrders)}건</Cell>
            <Cell>{formatCurrency(u.totalRevenue)}</Cell>
          </Row>
        ))
      )}
    </Wrapper>
  );
}

export default FestivalUniversityTable;
