import { useCallback, useEffect, useMemo, useState } from 'react';
import useApi from '@hooks/useApi';
import { dateConverter } from '@utils/formatDate';
import { Order, OrderStatus, Table } from '@@types/index';

export interface SessionOrderStats {
  count: number;
  amount: number;
}

const STATS_WINDOW_HOURS = 24;
const MS_PER_HOUR = 60 * 60 * 1000;

/**
 * 테이블 화면에서 세션 주문 집계를 읽는다. 서버 집계값(orderSession.orderCount 등)은
 * 세션 종료 시에만 재계산되므로(OrderFacade.stopOrderSession), 운영 중에는 stats를 우선한다.
 */
export function getSessionOrderStats(table: Table, statsBySessionId: Map<number, SessionOrderStats>): SessionOrderStats | null {
  const session = table.orderSession;
  if (!session) return null;

  return statsBySessionId.get(session.id) ?? { count: session.orderCount, amount: session.totalOrderPrice };
}

/**
 * 세션별 실시간 주문 건수·금액 집계.
 * 최초에 최근 24시간 주문을 불러오고, 이후에는 WebSocket으로 받은 주문을 applyOrder로 반영한다.
 * 취소 주문은 서버의 "유효 주문" 기준과 동일하게 집계에서 제외한다.
 */
function useTableOrderStats(workspaceId: string | undefined) {
  const { adminApi } = useApi();
  const [ordersById, setOrdersById] = useState<Map<number, Order>>(new Map());

  const refresh = useCallback(() => {
    const now = Date.now();

    adminApi
      .get<Order[]>('/orders', {
        params: {
          workspaceId,
          startDate: dateConverter(new Date(now - STATS_WINDOW_HOURS * MS_PER_HOUR)),
          endDate: dateConverter(new Date(now)),
        },
      })
      .then((response) => setOrdersById(new Map(response.data.map((order) => [order.id, order]))))
      .catch((error) => console.error('주문 집계를 가져오는 중 오류 발생:', error));
  }, [workspaceId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const applyOrder = (order: Order) => {
    setOrdersById((previous) => new Map(previous).set(order.id, order));
  };

  const statsBySessionId = useMemo(() => {
    const stats = new Map<number, SessionOrderStats>();

    ordersById.forEach((order) => {
      const sessionId = order.orderSession?.id;
      if (sessionId == null || order.status === OrderStatus.CANCELLED) return;

      const current = stats.get(sessionId) ?? { count: 0, amount: 0 };
      stats.set(sessionId, { count: current.count + 1, amount: current.amount + order.totalPrice });
    });

    return stats;
  }, [ordersById]);

  return { statsBySessionId, applyOrder, refresh };
}

export default useTableOrderStats;
