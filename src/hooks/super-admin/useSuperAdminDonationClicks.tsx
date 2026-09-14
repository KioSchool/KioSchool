import { useCallback } from 'react';
import { CustomerDonationClickStats, DonationClickItem } from '@@types/donationClick';
import useApi from '@hooks/useApi';

function useSuperAdminDonationClicks() {
  const { superAdminApi } = useApi();

  const fetchClickStats = useCallback(
    (startDate: string, endDate: string): Promise<CustomerDonationClickStats | null> => {
      return superAdminApi
        .get<CustomerDonationClickStats>('/donations/customer-clicks', { params: { startDate, endDate } })
        .then((res) => res.data)
        .catch((error) => {
          console.error(error);
          return null;
        });
    },
    [superAdminApi],
  );

  const fetchClickItems = useCallback(
    (date: string): Promise<DonationClickItem[] | null> => {
      return superAdminApi
        .get<DonationClickItem[]>('/donations/customer-clicks/items', { params: { date } })
        .then((res) => res.data)
        .catch((error) => {
          console.error(error);
          return null;
        });
    },
    [superAdminApi],
  );

  // 저장·취소 실패는 호출한 행에서 메시지를 보여줘야 하므로 에러를 삼키지 않는다.
  const confirmDeposit = useCallback(
    (clickId: number, amount: number, memo: string): Promise<DonationClickItem> => {
      return superAdminApi.put<DonationClickItem>(`/donations/customer-clicks/${clickId}/deposit`, { amount, memo }).then((res) => res.data);
    },
    [superAdminApi],
  );

  const cancelDeposit = useCallback(
    (clickId: number): Promise<DonationClickItem> => {
      return superAdminApi.delete<DonationClickItem>(`/donations/customer-clicks/${clickId}/deposit`).then((res) => res.data);
    },
    [superAdminApi],
  );

  return { fetchClickStats, fetchClickItems, confirmDeposit, cancelDeposit };
}

export default useSuperAdminDonationClicks;
