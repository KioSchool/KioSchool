import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import useQueryParam from '@hooks/common/useQueryParam';
import { dateQueryParamConfig } from '@hooks/common/queryParamConfigs';
import useApi from '@hooks/useApi';
import { DailyStatistics } from '@@types/index';

export const useAdminFetchDailyStatistics = (workspaceId: string | undefined) => {
  const { adminApi } = useApi();

  const { value: selectedDate, setValue: setSelectedDate } = useQueryParam(dateQueryParamConfig);
  const [statistics, setStatistics] = useState<DailyStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!workspaceId) return;
    let isStale = false;

    setIsLoading(true);
    adminApi
      .get<DailyStatistics>('/statistics', {
        params: {
          workspaceId,
          date: format(selectedDate, 'yyyy-MM-dd'),
        },
      })
      .then((res) => {
        if (!isStale) setStatistics(res.data);
      })
      .catch((err) => {
        if (!isStale) console.error(err);
      })
      .finally(() => {
        if (!isStale) setIsLoading(false);
      });

    return () => {
      isStale = true;
    };
  }, [workspaceId, selectedDate]);

  return {
    selectedDate,
    setSelectedDate,
    statistics,
    isLoading,
  };
};
