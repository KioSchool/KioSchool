import { useState } from 'react';
import styled from '@emotion/styled';
import { PopularProducts } from '@@types/index';
import { rowFlex } from '@styles/flexStyles';
import ContentCard from '@components/common/card/ContentCard';
import RankedList, { RankedItem } from '@components/common/list/RankedList';

type TabKey = 'byQuantity' | 'byRevenue' | 'byReorderRate';

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

const tabConfig: { key: TabKey; label: string; unit: string }[] = [
  { key: 'byQuantity', label: '판매량', unit: '개' },
  { key: 'byRevenue', label: '판매액', unit: '원' },
  { key: 'byReorderRate', label: '재주문율', unit: '%' },
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
  const items: RankedItem[] = popularProducts[selectedTab].map((item) => ({
    id: item.productId,
    name: item.name,
    value: formatValue(item.value, currentConfig.unit),
  }));

  return (
    <ContentCard title="상품별 순위 TOP10" showDivider={false}>
      <TabContainer>
        {tabConfig.map((tab) => (
          <Tab key={tab.key} isSelected={selectedTab === tab.key} onClick={() => setSelectedTab(tab.key)}>
            {tab.label}
          </Tab>
        ))}
      </TabContainer>
      <RankedList items={items} />
    </ContentCard>
  );
}

export default PopularProductsSection;
