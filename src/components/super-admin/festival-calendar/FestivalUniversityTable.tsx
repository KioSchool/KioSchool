import styled from '@emotion/styled';
import { FestivalUniversityStats } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

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

const Row = styled.div<{ isEven: boolean }>`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 10px 16px;
  background: ${({ isEven }) => (isEven ? Color.WHITE : Color.LIGHT_GREY)};
  border-bottom: 1px solid ${Color.HEAVY_GREY};

  &:last-child {
    border-bottom: none;
  }
`;

const Cell = styled.div`
  font-size: 13px;
  color: ${Color.BLACK};
  ${rowFlex({ align: 'center' })}
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
          <Row key={u.universityName} isEven={idx % 2 === 0}>
            <Cell>
              <RankBadge rank={idx + 1}>{idx + 1}</RankBadge>
              {u.universityName}
            </Cell>
            <Cell>{u.festivalDays}일</Cell>
            <Cell>{u.totalOrders.toLocaleString()}건</Cell>
            <Cell>{u.totalRevenue.toLocaleString()}원</Cell>
          </Row>
        ))
      )}
    </Wrapper>
  );
}

export default FestivalUniversityTable;
