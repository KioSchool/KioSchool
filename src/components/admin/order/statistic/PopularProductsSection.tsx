import { useState } from 'react';
import styled from '@emotion/styled';
import { PopularProducts } from '@@types/index';
import { colFlex, rowFlex } from '@styles/flexStyles';
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

const Content = styled.div`
  height: 100%;
  ${colFlex()}
`;

// 옆 '시간대별 추이' 카드 높이에 맞춰, 넘치는 순위는 카드 안에서 스크롤한다
const ScrollArea = styled.div<{ isEmpty: boolean }>`
  width: 100%;
  min-height: 0;
  max-height: ${({ isEmpty }) => (isEmpty ? 'none' : '360px')};
  flex: 1;
  padding-right: 8px;
  box-sizing: border-box;
  overflow-y: auto;
  ${colFlex()}
`;

const tabConfig: { key: TabKey; label: string; unit: string }[] = [
  { key: 'byQuantity', label: '판매량', unit: '개' },
  { key: 'byRevenue', label: '판매액', unit: '원' },
  { key: 'byReorderRate', label: '재주문율', unit: '%' },
];

interface PopularProductsSectionProps {
  popularProducts: PopularProducts;
}

function PopularProductsSection({ popularProducts }: PopularProductsSectionProps) {
  const [selectedTab, setSelectedTab] = useState<TabKey>('byQuantity');

  const currentConfig = tabConfig.find((tab) => tab.key === selectedTab)!;
  const items: RankedItem[] = popularProducts[selectedTab].map((item) => ({
    id: item.productId,
    name: item.name,
    value: item.value,
    unit: currentConfig.unit,
  }));

  return (
    <ContentCard title="상품별 순위" showDivider={false}>
      <Content>
        <TabContainer>
          {tabConfig.map((tab) => (
            <Tab key={tab.key} isSelected={selectedTab === tab.key} onClick={() => setSelectedTab(tab.key)}>
              {tab.label}
            </Tab>
          ))}
        </TabContainer>
        <ScrollArea key={selectedTab} isEmpty={items.length === 0}>
          <RankedList items={items} />
        </ScrollArea>
      </Content>
    </ContentCard>
  );
}

export default PopularProductsSection;
