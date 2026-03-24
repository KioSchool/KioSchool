import { useState } from 'react';
import styled from '@emotion/styled';
import { match, P } from 'ts-pattern';
import { PopularProducts, PopularProductItem } from '@@types/index';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { getRankBackgroundColor } from '@styles/dashboardStyles';
import DashboardCard from '@components/admin/workspace/dashboard/DashboardCard';

type TabKey = 'byQuantity' | 'byReorderRate' | 'byRevenue';

const TabContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
  padding-bottom: 12px;
  box-sizing: border-box;
`;

const Tab = styled.div<{ isSelected: boolean }>`
  padding: 10px;
  border-bottom: 3px solid ${({ isSelected }) => (isSelected ? '#464a4d' : 'transparent')};
  font-weight: ${({ isSelected }) => (isSelected ? 600 : 400)};
  font-size: 14px;
  color: #464a4d;
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}
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

const EmptyText = styled.div`
  color: #939393;
  font-size: 12px;
`;

const tabConfig: { key: TabKey; label: string; unit: string }[] = [
  { key: 'byQuantity', label: '판매량순', unit: '개' },
  { key: 'byReorderRate', label: '재주문율순', unit: '%' },
  { key: 'byRevenue', label: '매출순', unit: '원' },
];

const formatValue = (value: number, unit: string) => {
  if (unit === '원') return `${value.toLocaleString()}${unit}`;
  return `${value}${unit}`;
};

interface PopularProductsSectionProps {
  popularProducts: PopularProducts;
}

function PopularProductsSection({ popularProducts }: PopularProductsSectionProps) {
  const [selectedTab, setSelectedTab] = useState<TabKey>('byQuantity');

  const currentConfig = tabConfig.find((tab) => tab.key === selectedTab)!;
  const items: PopularProductItem[] = popularProducts[selectedTab];

  return (
    <DashboardCard title="인기 상품" showDivider={false}>
      <TabContainer>
        {tabConfig.map((tab) => (
          <Tab key={tab.key} isSelected={selectedTab === tab.key} onClick={() => setSelectedTab(tab.key)}>
            {tab.label}
          </Tab>
        ))}
      </TabContainer>
      <ListWrapper>
        {match(items)
          .with([], () => <EmptyText>데이터가 없습니다.</EmptyText>)
          .with(P.array(P._), (products) =>
            products.map((item, index) => (
              <ItemWrapper key={item.productId}>
                <RankInfo>
                  <RankCircle rank={index + 1}>{index + 1}</RankCircle>
                  <ProductName>{item.name}</ProductName>
                </RankInfo>
                <ValueText>{formatValue(item.value, currentConfig.unit)}</ValueText>
              </ItemWrapper>
            )),
          )
          .otherwise(() => null)}
      </ListWrapper>
    </DashboardCard>
  );
}

export default PopularProductsSection;
