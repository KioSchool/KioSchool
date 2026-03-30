import ContentCard from '@components/common/card/ContentCard';
import RankedList, { RankedItem } from '@components/common/list/RankedList';
import { useAtomValue } from 'jotai';
import { adminDashboardAtom } from '@jotai/admin/atoms';

function TopSellingList() {
  const { topSellingProducts } = useAtomValue(adminDashboardAtom);

  const items: RankedItem[] = topSellingProducts.map((item) => ({
    id: item.product.id,
    name: item.product.name,
    value: item.totalQuantity,
    unit: '개',
  }));

  return (
    <ContentCard title="인기 순위 TOP5" width={302} height={240} showDivider={false}>
      <RankedList items={items} />
    </ContentCard>
  );
}

export default TopSellingList;
