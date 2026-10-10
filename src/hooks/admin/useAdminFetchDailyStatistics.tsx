import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import useQueryParam from '@hooks/common/useQueryParam';
import { dateQueryParamConfig } from '@hooks/common/queryParamConfigs';
import useApi from '@hooks/useApi';
import { DailyStatistics, Order, OrderStatus } from '@@types/index';
import { getPaymentMethodStatistics, PaymentMethodStatistics } from '@utils/paymentMethodStatistics';

export const STATISTICS_POLLING_MINUTES = 1;
const SECONDS_PER_MINUTE = 60;
const MILLISECONDS_PER_SECOND = 1000;
const POLLING_INTERVAL = STATISTICS_POLLING_MINUTES * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;
const PAYMENT_ORDER_STATUSES = [OrderStatus.PAID, OrderStatus.SERVED].join(',');

interface FetchState<T> {
  requestKey: string;
  data: T | null;
  isLoading: boolean;
  hasError: boolean;
}

export const useAdminFetchDailyStatistics = (workspaceId: string | undefined) => {
  const { adminApi } = useApi();
  const { value: selectedDate, setValue: setSelectedDate } = useQueryParam(dateQueryParamConfig);
  const [statisticsState, setStatisticsState] = useState<FetchState<DailyStatistics> | null>(null);
  const [paymentState, setPaymentState] = useState<FetchState<PaymentMethodStatistics> | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const date = format(selectedDate, 'yyyy-MM-dd');
  const requestKey = `${workspaceId}:${date}`;

  useEffect(() => {
    if (!workspaceId) return;
    let isStale = false;
    let requestVersion = 0;

    const fetchData = () => {
      requestVersion += 1;
      const currentVersion = requestVersion;
      const isCurrentRequest = () => !isStale && currentVersion === requestVersion;

      setStatisticsState((previous) => ({
        requestKey,
        data: previous?.requestKey === requestKey ? previous.data : null,
        isLoading: true,
        hasError: false,
      }));
      setPaymentState((previous) => ({
        requestKey,
        data: previous?.requestKey === requestKey ? previous.data : null,
        isLoading: true,
        hasError: false,
      }));

      adminApi
        .get<DailyStatistics>('/statistics', { params: { workspaceId, date } })
        .then((res) => {
          if (isCurrentRequest()) setStatisticsState({ requestKey, data: res.data, isLoading: false, hasError: false });
        })
        .catch((err) => {
          if (!isCurrentRequest()) return;
          console.error(err);
          setStatisticsState((previous) => ({ requestKey, data: previous?.data ?? null, isLoading: false, hasError: true }));
        });

      adminApi
        .get<Order[]>('/orders', {
          params: {
            workspaceId,
            startDate: `${date}T00:00:00`,
            endDate: `${date}T23:59:59`,
            statuses: PAYMENT_ORDER_STATUSES,
          },
        })
        .then((res) => {
          if (isCurrentRequest()) {
            setPaymentState({ requestKey, data: getPaymentMethodStatistics(res.data), isLoading: false, hasError: false });
          }
        })
        .catch((err) => {
          if (!isCurrentRequest()) return;
          console.error(err);
          setPaymentState((previous) => ({ requestKey, data: previous?.data ?? null, isLoading: false, hasError: true }));
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, POLLING_INTERVAL);

    return () => {
      isStale = true;
      clearInterval(intervalId);
    };
  }, [adminApi, workspaceId, date, requestKey, fetchTrigger]);

  const currentStatistics = statisticsState?.requestKey === requestKey ? statisticsState : null;
  const currentPayment = paymentState?.requestKey === requestKey ? paymentState : null;
  const isStatisticsLoading = !!workspaceId && (currentStatistics?.isLoading ?? true);
  const isPaymentMethodLoading = !!workspaceId && (currentPayment?.isLoading ?? true);
  const manualRefetch = () => setFetchTrigger((prev) => prev + 1);

  return {
    selectedDate,
    setSelectedDate,
    statistics: currentStatistics?.data ?? null,
    paymentMethodStatistics: currentPayment?.data ?? null,
    isStatisticsLoading,
    isPaymentMethodLoading,
    hasPaymentMethodError: currentPayment?.hasError ?? false,
    isLoading: isStatisticsLoading || isPaymentMethodLoading,
    manualRefetch,
  };
};
