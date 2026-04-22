import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { getRankBackgroundColor } from '@styles/dashboardStyles';

const ListWrapper = styled.div`
  width: 100%;
  padding-top: 12px;
  gap: 14px;
  ${colFlex()}
`;

const ItemWrapper = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const RankInfo = styled.div`
  gap: 8px;
  ${rowFlex({ align: 'center' })}
`;

const RankCircle = styled.div<{ rank: number }>`
  width: 23px;
  height: 23px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
  color: ${({ rank }) => (rank <= 2 ? '#fff' : '#464a4d')};
  background-color: ${({ rank }) => getRankBackgroundColor(rank)};
  border: ${({ rank }) => (rank > 3 ? '1px solid #eaeaea' : 'none')};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Name = styled.div`
  font-size: 14px;
  color: #5b5e65;
`;

const Value = styled.div`
  font-size: 14px;
  color: #5b5e65;
  text-align: right;
`;

const EmptyText = styled.div`
  width: 100%;
  height: 100%;
  color: #939393;
  font-size: 14px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

export interface RankedItem {
  id: number | string;
  name: string;
  value: number;
  unit: string;
}

interface RankedListProps {
  items: RankedItem[];
  emptyText?: string;
}

const formatRankedValue = (value: number, unit: string) => {
  const formattedNumber = Number.isInteger(value) ? value.toLocaleString() : Number(value.toFixed(2)).toLocaleString();

  return `${formattedNumber}${unit}`;
};

function RankedList({ items, emptyText = '아직 판매 데이터가 없어요' }: RankedListProps) {
  if (items.length === 0) {
    return <EmptyText>{emptyText}</EmptyText>;
  }

  return (
    <ListWrapper>
      {items.map((item, index) => (
        <ItemWrapper key={item.id}>
          <RankInfo>
            <RankCircle rank={index + 1}>{index + 1}</RankCircle>
            <Name>{item.name}</Name>
          </RankInfo>
          <Value>{formatRankedValue(item.value, item.unit)}</Value>
        </ItemWrapper>
      ))}
    </ListWrapper>
  );
}

export default RankedList;
