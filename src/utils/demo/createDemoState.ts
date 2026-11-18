import { DEMO_SEED_ORDERS, DEMO_SEED_SESSIONS, DEMO_TABLE_COUNT } from '@constants/data/demo/demoSeed';
import { DEMO_STEP } from '@constants/data/demo/demoSteps';
import { TABLE_VIEW } from '@jotai/admin/atoms';
import { buildOrder, buildOrderProducts, buildSession, buildTable, minutesBefore, withSessionTotals } from './demoBuilders';
import { DemoState } from './demoTypes';

const FIRST_TABLE_NUMBER = 1;

export function createDemoState(now: number): DemoState {
  const createdAt = minutesBefore(now, 0);
  const sessions = new Map(DEMO_SEED_SESSIONS.map((seed) => [seed.tableNumber, buildSession(seed.tableNumber, minutesBefore(now, seed.startedMinutesAgo))]));
  const tableNumbers = Array.from({ length: DEMO_TABLE_COUNT }, (_, index) => index + 1);
  const tables = tableNumbers.map((tableNumber) => buildTable(tableNumber, sessions.get(tableNumber) ?? null, createdAt));
  const orderedSeeds = [...DEMO_SEED_ORDERS].sort((a, b) => b.minutesAgo - a.minutesAgo);
  const orders = orderedSeeds.map((seed, index) => {
    const orderCreatedAt = minutesBefore(now, seed.minutesAgo);
    return buildOrder({
      id: seed.id,
      orderNumber: index + 1,
      tableNumber: seed.tableNumber,
      customerName: seed.customerName,
      status: seed.status,
      paymentMethod: seed.paymentMethod,
      createdAt: orderCreatedAt,
      orderProducts: buildOrderProducts(seed.id, seed.items, orderCreatedAt),
      orderSession: sessions.get(seed.tableNumber) ?? null,
    });
  });

  return {
    startedAt: now,
    step: DEMO_STEP.START,
    isFinished: false,
    tables: withSessionTotals(tables, orders),
    orders,
    basket: [],
    guestScreen: 'menu',
    guestOrderId: null,
    isPhoneAlertOpen: false,
    adminPage: 'table',
    isSideNavOpen: false,
    selectedTableNumber: FIRST_TABLE_NUMBER,
    tableViewMode: TABLE_VIEW.LAYOUT,
    openedOrderId: null,
    hasExtendedInStep6: false,
    notice: null,
  };
}
