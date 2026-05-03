import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import useQueryParam from '@hooks/common/useQueryParam';
import { dateQueryParamConfig } from '@hooks/common/queryParamConfigs';
import useApi from '@hooks/useApi';
import { DailyStatistics } from '@@types/index';

const POLLING_INTERVAL = 1 * 60 * 1000;

export const useAdminFetchDailyStatistics = (workspaceId: string | undefined) => {
  const { adminApi } = useApi();

  const { value: selectedDate, setValue: setSelectedDate } = useQueryParam(dateQueryParamConfig);
  const [statistics, setStatistics] = useState<DailyStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    if (!workspaceId) return;
    let isStale = false;

    const fetchData = () => {
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
    };

    fetchData();

    const intervalId = setInterval(fetchData, POLLING_INTERVAL);

    return () => {
      isStale = true;
      clearInterval(intervalId);
    };
  }, [workspaceId, selectedDate, fetchTrigger]);

  const manualRefetch = () => setFetchTrigger((prev) => prev + 1);

  return {
    selectedDate,
    setSelectedDate,
    statistics,
    isLoading,
    manualRefetch,
  };
};
