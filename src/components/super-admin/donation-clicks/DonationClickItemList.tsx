import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';
import styled from '@emotion/styled';
import { DonationClickItem } from '@@types/donationClick';
import SectionTitle from '@components/super-admin/dashboard/SectionTitle';
import useSuperAdminDonationClicks from '@hooks/super-admin/useSuperAdminDonationClicks';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import DonationClickItemRow from './DonationClickItemRow';

const Section = styled.div``;

const Guide = styled.div`
  font-size: 12px;
  color: ${Color.MUTED_GREY};
  line-height: 1.5;
  margin: -4px 0 10px;
  word-break: keep-all;
`;

const List = styled.div`
  gap: 8px;
  ${colFlex()}
`;

const StatusText = styled.div`
  font-size: 13px;
  color: ${Color.GREY};
  text-align: center;
  padding: 16px 0;
`;

type ItemsState = DonationClickItem[] | 'loading' | 'error';

interface DonationClickItemListProps {
  date: string;
  onDepositChange: () => void;
}

function DonationClickItemList({ date, onDepositChange }: DonationClickItemListProps) {
  const [items, setItems] = useState<ItemsState>('loading');
  const { fetchClickItems, confirmDeposit, cancelDeposit } = useSuperAdminDonationClicks();

  useEffect(() => {
    setItems('loading');
    fetchClickItems(date).then((result) => setItems(result ?? 'error'));
  }, [date, fetchClickItems]);

  const replaceItem = (updated: DonationClickItem) => {
    setItems((prev) => {
      if (!Array.isArray(prev)) return prev;
      return prev.map((item) => (item.id === updated.id ? updated : item));
    });
    onDepositChange();
  };

  const handleConfirm = (clickId: number, amount: number, memo: string) => confirmDeposit(clickId, amount, memo).then(replaceItem);

  const handleCancel = (clickId: number) => cancelDeposit(clickId).then(replaceItem);

  return (
    <Section>
      <SectionTitle>클릭 목록 · 입금 확인</SectionTitle>
      <Guide>통장 입금 내역과 시각·금액이 맞는 클릭에 입금 확인을 눌러 주세요. 한 주문에 클릭이 여러 번이면 짝이 맞는 한 건에만 표시합니다.</Guide>
      {match(items)
        .with('loading', () => <StatusText>클릭 목록 불러오는 중...</StatusText>)
        .with('error', () => <StatusText>클릭 목록을 불러오지 못했어요.</StatusText>)
        .otherwise((loaded) => (
          <List>
            {loaded.length === 0 && <StatusText>이 날의 클릭이 없습니다.</StatusText>}
            {loaded.map((item) => (
              <DonationClickItemRow key={item.id} item={item} onConfirm={handleConfirm} onCancel={handleCancel} />
            ))}
          </List>
        ))}
    </Section>
  );
}

export default DonationClickItemList;
