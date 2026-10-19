import { Order } from '@@types/index';

const MS_PER_MINUTE = 60_000;

export interface TableWait {
  tableNumber: number;
  remaining: number;
  waitMinutes: number;
  oldestOrderId: number;
}

export interface ProductQueue {
  productId: number;
  productName: string;
  remaining: number;
  tables: TableWait[];
}

function minutesSince(createdAt: string, now: number) {
  return Math.floor((now - new Date(createdAt.replace(' ', 'T')).getTime()) / MS_PER_MINUTE);
}

/**
 * 결제완료 주문을 메뉴별로, 그 안에서 테이블별로 모은다. 같은 테이블이 같은 메뉴를 여러 주문에 나눠 시키면
 * 수량은 합치고 시간과 열 주문은 가장 오래된 주문 기준이다. 메뉴는 가장 오래 기다린 테이블 순, 같으면 남은 개수 순.
 */
export function buildProductQueues(paidOrders: Order[], now: number): ProductQueue[] {
  const queues = new Map<number, ProductQueue>();
  const ordersOldestFirst = [...paidOrders].sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  ordersOldestFirst.forEach((order) => {
    order.orderProducts.forEach((orderProduct) => {
      const remaining = orderProduct.quantity - orderProduct.servedCount;
      if (remaining <= 0) return;

      const queue = queues.get(orderProduct.productId) ?? {
        productId: orderProduct.productId,
        productName: orderProduct.productName,
        remaining: 0,
        tables: [],
      };
      queue.remaining += remaining;

      const tableWait = queue.tables.find((table) => table.tableNumber === order.tableNumber);
      if (tableWait) {
        tableWait.remaining += remaining;
      } else {
        queue.tables.push({ tableNumber: order.tableNumber, remaining, waitMinutes: minutesSince(order.createdAt, now), oldestOrderId: order.id });
      }

      queues.set(orderProduct.productId, queue);
    });
  });

  const longestWait = (queue: ProductQueue) => queue.tables[0].waitMinutes;
  return [...queues.values()].sort((a, b) => longestWait(b) - longestWait(a) || b.remaining - a.remaining);
}
