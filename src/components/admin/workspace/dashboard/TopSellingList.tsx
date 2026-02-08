import { match } from 'ts-pattern';
import { TopSellingProduct } from '@@types/index';
import styled from '@emotion/styled';
import DashboardCard from './DashboardCard';
import { rowFlex, colFlex } from '@styles/flexStyles';
import { useState, useMemo } from 'react';
import { formatProductValue, getSortedTopSellingProducts, TopSellingSortType } from '@utils/dashboard';
import { getRankBackgroundColor } from '@styles/dashboardStyles';

const ActionButton = styled.button<{ disabled?: boolean }>`
  font-size: 10px;
  text-decoration: underline;
  color: ${({ disabled }) => (disabled ? '#939393' : '#464a4d')};
  background: none;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  padding: 0;
`;

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

const ProductName = styled.div`
  font-size: 14px;
  color: #5b5e65;
`;

const ValueText = styled.div`
  font-size: 14px;
  color: #5b5e65;
  text-align: right;
`;

interface TopSellingListProps {
  products: TopSellingProduct[];
}

function TopSellingList({ products }: TopSellingListProps) {
  const [sortType, setSortType] = useState<TopSellingSortType>('QUANTITY');

  const sortedProducts = useMemo(() => getSortedTopSellingProducts(products, sortType), [products, sortType]);

  const toggleSort = () => {
    if (products.length === 0) return;
    setSortType((prev) => (prev === 'QUANTITY' ? 'REVENUE' : 'QUANTITY'));
  };

  const rightAction = (
    <ActionButton onClick={toggleSort} disabled={products.length === 0}>
      {match(sortType)
        .with('QUANTITY', () => '매출로 보기')
        .with('REVENUE', () => '수량으로 보기')
        .exhaustive()}
    </ActionButton>
  );

  return (
    <DashboardCard title="인기 순위 TOP5" width={302} height={272} showDivider={false} rightAction={rightAction}>
      <ListWrapper>
        {sortedProducts.map((item, index) => (
          <ItemWrapper key={item.product.id}>
            <RankInfo>
              <RankCircle rank={index + 1}>{index + 1}</RankCircle>
              <ProductName>{item.product.name}</ProductName>
            </RankInfo>
            <ValueText>{formatProductValue(item, sortType)}</ValueText>
          </ItemWrapper>
        ))}
        {products.length === 0 && <ProductName>데이터가 없습니다.</ProductName>}
      </ListWrapper>
    </DashboardCard>
  );
}

export default TopSellingList;
