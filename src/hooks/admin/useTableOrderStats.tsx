import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
 * 세션 종료 시에만 재계산되므로(OrderFacade.stopOrderSession) 활성 세션은 stats가 유일한 소스고,
 * fallback의 서버값은 종료된 세션에서만 의미가 있다. 조회 창이 활성 세션 시작까지 넓혀지므로
 * 활성 세션이 stats에 없다는 것은 실제로 주문이 없다는 뜻이다.
 */
export function getSessionOrderStats(table: Table, statsBySessionId: Map<number, SessionOrderStats>): SessionOrderStats | null {
  const session = table.orderSession;
  if (!session) return null;

  return statsBySessionId.get(session.id) ?? { count: session.orderCount, amount: session.totalOrderPrice };
}

/**
 * 요청 응답(스냅샷)은 요청 시점의 데이터라, 응답 대기 중 WebSocket으로 이미 반영한
 * 더 새로운 주문 상태를 스냅샷으로 되돌리면 안 된다 - updatedAt이 뒤인 항목만 남긴다.
 */
function mergeOrders(previous: Map<number, Order>, incoming: Order[]): Map<number, Order> {
  const next = new Map(previous);

  incoming.forEach((order) => {
    const existing = next.get(order.id);
    if (existing && new Date(existing.updatedAt).getTime() > new Date(order.updatedAt).getTime()) return;
    next.set(order.id, order);
  });

  return next;
}

/**
 * 세션별 실시간 주문 건수·금액 집계.
 * 최초·재연결 시 주문을 불러오고, 이후에는 WebSocket으로 받은 주문을 applyOrder로 반영한다.
 * 취소 주문은 서버의 "유효 주문" 기준과 동일하게 집계에서 제외한다.
 */
function useTableOrderStats(workspaceId: string | undefined, tables: Table[]) {
  const { adminApi } = useApi();
  const [ordersById, setOrdersById] = useState<Map<number, Order>>(new Map());

  // 조회 창 계산은 최신 tables를 봐야 하지만, tables 참조는 폴링마다 바뀌므로 refresh 의존성에 넣지 않는다.
  const tablesRef = useRef(tables);
  tablesRef.current = tables;

  // 주문은 세션 시작 이후에만 생기므로, 가장 오래된 활성 세션 시작까지 창을 넓히면 24시간을 넘긴 세션도 놓치지 않는다.
  const getWindowStartMs = (now: number) => {
    const activeSessionStarts = tablesRef.current
      .filter((table) => table.orderSession != null)
      .map((table) => new Date(table.orderSession!.createdAt).getTime());

    return Math.min(now - STATS_WINDOW_HOURS * MS_PER_HOUR, ...activeSessionStarts);
  };

  const refresh = useCallback(() => {
    const now = Date.now();

    adminApi
      .get<Order[]>('/orders', {
        params: {
          workspaceId,
          startDate: dateConverter(new Date(getWindowStartMs(now))),
          endDate: dateConverter(new Date(now)),
        },
      })
      .then((response) => setOrdersById((previous) => mergeOrders(previous, response.data)))
      .catch((error) => console.error('주문 집계를 가져오는 중 오류 발생:', error));
  }, [workspaceId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // 최초 refresh 시점에는 tables가 비어 있어 조회 창이 기본 24시간이다. 테이블이 처음 로드되면 세션 기준 창으로 한 번 더 동기화한다.
  const hasRefreshedWithTablesRef = useRef(false);
  useEffect(() => {
    if (tables.length === 0 || hasRefreshedWithTablesRef.current) return;

    hasRefreshedWithTablesRef.current = true;
    refresh();
  }, [tables.length, refresh]);

  const applyOrder = (order: Order) => {
    setOrdersById((previous) => mergeOrders(previous, [order]));
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
