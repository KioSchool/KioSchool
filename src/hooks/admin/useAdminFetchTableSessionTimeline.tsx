import { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { OrderSessionWithOrder } from '@@types/index';
import { getSessionDurationMinutes } from '@utils/sessionUtils';
import { MIN_LONG_SESSION_MINUTES } from '@components/admin/order/timeline/timelineConstants';
import { adminWorkspaceAtom } from '@jotai/admin/atoms';
import { useAtomValue } from 'jotai';

const POLLING_INTERVAL = 5 * 60 * 1000;

interface SessionFilters {
  showLongSessionsOnly: boolean;
  ordersOnly: boolean;
  includeGhost: boolean;
}

interface SummaryStats {
  totalOrderCount: number;
  totalRevenue: number;
  tableTurnoverRate: number;
  averageDurationMinutes: number;
}

export const useAdminFetchTableSessionTimeline = (workspaceId: string | undefined) => {
  const { fetchOrderSessions } = useAdminOrder(workspaceId);
  const workspace = useAtomValue(adminWorkspaceAtom);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [sessions, setSessions] = useState<OrderSessionWithOrder[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<SessionFilters>({
    showLongSessionsOnly: false,
    ordersOnly: false,
    includeGhost: false,
  });

  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    if (!workspaceId) return;
    let isStale = false;

    const fetchData = () => {
      setIsLoading(true);
      fetchOrderSessions({ targetDate: format(selectedDate, 'yyyy-MM-dd'), includeGhost: filters.includeGhost })
        .then((res) => {
          if (!isStale) {
            setSessions(res.data);
            setCurrentTime(new Date());
          }
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
      if (intervalId) clearInterval(intervalId);
    };
  }, [workspaceId, selectedDate, filters.includeGhost, fetchTrigger]);

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      const isShortSession = getSessionDurationMinutes(session, currentTime) < MIN_LONG_SESSION_MINUTES;
      const hasNoOrders = session.orders.length === 0;

      if (filters.showLongSessionsOnly && isShortSession) return false;
      if (filters.ordersOnly && hasNoOrders) return false;
      return true;
    });
  }, [sessions, filters, currentTime]);

  const summaryStats = useMemo((): SummaryStats => {
    const totalOrderCount = filteredSessions.reduce((sum, session) => sum + session.orders.length, 0);
    const totalRevenue = filteredSessions.reduce((sum, session) => sum + session.totalOrderPrice, 0);

    const tableCount = workspace.tableCount || 1;
    const tableTurnoverRate = filteredSessions.length / tableCount;

    const totalDuration = filteredSessions.reduce((sum, session) => sum + getSessionDurationMinutes(session, currentTime), 0);
    const averageDurationMinutes = filteredSessions.length > 0 ? Math.round(totalDuration / filteredSessions.length) : 0;

    return { totalOrderCount, totalRevenue, tableTurnoverRate, averageDurationMinutes };
  }, [filteredSessions, workspace.tableCount, currentTime]);

  const priceRange = useMemo(() => {
    const sessionsWithOrders = filteredSessions.filter((session) => !session.isGhostSession && session.totalOrderPrice > 0);

    if (sessionsWithOrders.length === 0) return { min: 0, max: 0 };

    let min = Infinity;
    let max = -Infinity;
    for (const session of sessionsWithOrders) {
      const price = session.totalOrderPrice;
      if (price < min) min = price;
      if (price > max) max = price;
    }

    return { min, max };
  }, [filteredSessions]);

  const manualRefetch = () => setFetchTrigger((prev) => prev + 1);

  return {
    selectedDate,
    setSelectedDate,
    filters,
    setFilters,
    filteredSessions,
    summaryStats,
    priceRange,
    currentTime,
    isLoading,
    tableCount: workspace.tableCount,
    manualRefetch,
  };
};
