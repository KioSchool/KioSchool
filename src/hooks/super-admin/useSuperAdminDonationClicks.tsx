import { useCallback } from 'react';
import { CustomerDonationClickStats } from '@@types/donationClick';
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

  return { fetchClickStats };
}

export default useSuperAdminDonationClicks;
