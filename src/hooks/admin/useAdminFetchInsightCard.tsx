import { useEffect, useState } from 'react';
import useApi from '@hooks/useApi';
import { InsightCardResponse } from '@@types/index';

export const useAdminFetchInsightCard = (workspaceId: string | undefined) => {
  const { adminApi } = useApi();
  const [card, setCard] = useState<InsightCardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!workspaceId) return;
    let isStale = false;

    setIsLoading(true);
    adminApi
      .get<InsightCardResponse | null>('/insight-card', { params: { workspaceId } })
      .then((res) => {
        if (!isStale) setCard(res.data);
      })
      .catch((err) => {
        if (!isStale) console.error('insight-card fetch error', err);
      })
      .finally(() => {
        if (!isStale) setIsLoading(false);
      });

    return () => {
      isStale = true;
    };
  }, [workspaceId]);

  return { card, isLoading };
};

export default useAdminFetchInsightCard;
