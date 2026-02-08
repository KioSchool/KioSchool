import styled from '@emotion/styled';
import DashboardCard from './DashboardCard';
import { rowFlex, colFlex } from '@styles/flexStyles';
import { getRankBackgroundColor } from '@styles/dashboardStyles';
import { useAtomValue } from 'jotai';
import { adminDashboardAtom } from '@jotai/admin/atoms';

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

function TopSellingList() {
  const { topSellingProducts } = useAtomValue(adminDashboardAtom);

  return (
    <DashboardCard title="인기 순위 TOP5" width={302} height={240} showDivider={false}>
      <ListWrapper>
        {topSellingProducts.map((item, index) => (
          <ItemWrapper key={item.product.id}>
            <RankInfo>
              <RankCircle rank={index + 1}>{index + 1}</RankCircle>
              <ProductName>{item.product.name}</ProductName>
            </RankInfo>
            <ValueText>{`${item.totalQuantity}개`}</ValueText>
          </ItemWrapper>
        ))}
        {topSellingProducts.length === 0 && <ProductName>데이터가 없습니다.</ProductName>}
      </ListWrapper>
    </DashboardCard>
  );
}

export default TopSellingList;
