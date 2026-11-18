import { match } from 'ts-pattern';
import { OrderStatus, ProductStatus } from '@@types/index';
import { DEMO_NOTICE } from '@constants/data/demo/demoNotices';
import { DEMO_TABLE_NUMBER, DEMO_USER_ORDER_ID } from '@constants/data/demo/demoSeed';
import { DEMO_STEP, DEMO_STEPS, getDemoStep } from '@constants/data/demo/demoSteps';
import { addMinutes, basketToItems, buildOrder, buildOrderProducts, buildSession, findDemoProduct, minutesBefore, withSessionTotals } from './demoBuilders';
import { DemoAction, DemoState } from './demoTypes';

const MAX_TIME_CHANGE_MINUTES = 999;

type Reducer<A extends DemoAction['type']> = (state: DemoState, action: Extract<DemoAction, { type: A }>) => DemoState;

const withNotice = (state: DemoState, message: string): DemoState => ({ ...state, notice: { id: (state.notice?.id ?? 0) + 1, message } });

const getTable = (state: DemoState, tableNumber: number) => state.tables.find((table) => table.tableNumber === tableNumber);

const getUserOrder = (state: DemoState) => state.orders.find((order) => order.id === state.guestOrderId);

const hasDemoSession = (state: DemoState) => Boolean(getTable(state, DEMO_TABLE_NUMBER)?.orderSession);

const isUserOrder = (state: DemoState, orderId: number) => state.guestOrderId !== null && orderId === state.guestOrderId;

const replaceOrder = (state: DemoState, orderId: number, update: (order: DemoState['orders'][number]) => DemoState['orders'][number]): DemoState => {
  const orders = state.orders.map((order) => {
    if (order.id !== orderId) return order;
    return update(order);
  });
  return { ...state, orders, tables: withSessionTotals(state.tables, orders) };
};

const addToBasket: Reducer<'BASKET_ADD'> = (state, { productId }) => {
  const product = findDemoProduct(productId);
  if (!product || product.status !== ProductStatus.SELLING) return state;

  const exists = state.basket.some((entry) => entry.productId === productId);
  if (!exists) return { ...state, basket: [...state.basket, { productId, quantity: 1, productPrice: product.price }] };

  return { ...state, basket: state.basket.map((entry) => ({ ...entry, quantity: entry.quantity + Number(entry.productId === productId) })) };
};

const removeFromBasket: Reducer<'BASKET_REMOVE'> = (state, { productId }) => {
  const basket = state.basket
    .map((entry) => ({ ...entry, quantity: entry.quantity - Number(entry.productId === productId) }))
    .filter((entry) => entry.quantity > 0);
  return { ...state, basket };
};

const deleteFromBasket: Reducer<'BASKET_DELETE'> = (state, { productId }) => ({
  ...state,
  basket: state.basket.filter((entry) => entry.productId !== productId),
});

const goGuestScreen: Reducer<'GUEST_GO'> = (state, { screen }) => {
  const isOrderingScreen = screen === 'menu' || screen === 'basket';
  if (isOrderingScreen && state.guestOrderId !== null) return withNotice(state, DEMO_NOTICE.ONE_ORDER);
  return { ...state, guestScreen: screen };
};

const requestOrder: Reducer<'ORDER_REQUEST'> = (state) => {
  if (state.basket.length === 0) return state;
  if (!hasDemoSession(state)) return { ...state, isPhoneAlertOpen: true };
  return { ...state, guestScreen: 'pay' };
};

const placeOrder: Reducer<'ORDER_PLACE'> = (state, { paymentMethod, customerName, now }) => {
  if (state.guestOrderId !== null) return withNotice(state, DEMO_NOTICE.ONE_ORDER);
  if (state.basket.length === 0) return withNotice(state, DEMO_NOTICE.EMPTY_BASKET);
  if (customerName.trim().length === 0) return state;

  const session = getTable(state, DEMO_TABLE_NUMBER)?.orderSession;
  if (!session) return { ...state, isPhoneAlertOpen: true };

  const createdAt = minutesBefore(now, 0);
  const order = buildOrder({
    id: DEMO_USER_ORDER_ID,
    orderNumber: state.orders.length + 1,
    tableNumber: DEMO_TABLE_NUMBER,
    customerName: customerName.trim(),
    status: OrderStatus.NOT_PAID,
    paymentMethod,
    createdAt,
    orderProducts: buildOrderProducts(DEMO_USER_ORDER_ID, basketToItems(state.basket), createdAt),
    orderSession: session,
  });
  const orders = [...state.orders, order];
  const next: DemoState = { ...state, orders, tables: withSessionTotals(state.tables, orders), basket: [], guestOrderId: order.id, guestScreen: 'wait' };
  return withNotice(next, DEMO_NOTICE.PAY_APP);
};

const changeAdminPage: Reducer<'ADMIN_PAGE'> = (state, { page }) => {
  if (page === 'stats' && state.step < DEMO_STEP.CLOSING) return withNotice(state, DEMO_NOTICE.STATS_LOCKED);
  return { ...state, adminPage: page, openedOrderId: null };
};

const startTable: Reducer<'TABLE_START'> = (state, { tableNumber, now }) => {
  if (tableNumber !== DEMO_TABLE_NUMBER) return withNotice(state, DEMO_NOTICE.ONLY_TABLE_7);
  if (hasDemoSession(state)) return state;
  if (state.guestOrderId !== null || state.step >= DEMO_STEP.CLOSING) return withNotice(state, DEMO_NOTICE.TABLE_7_DONE);

  const session = buildSession(tableNumber, minutesBefore(now, 0));
  const tables = state.tables.map((table) => {
    if (table.tableNumber !== tableNumber) return table;
    return { ...table, orderSession: session };
  });
  return { ...state, tables, isPhoneAlertOpen: false };
};

const extendTable: Reducer<'TABLE_EXTEND'> = (state, { tableNumber, minutes }) => {
  if (tableNumber !== DEMO_TABLE_NUMBER) return withNotice(state, DEMO_NOTICE.ONLY_TABLE_7);
  if (!hasDemoSession(state)) return state;
  if (minutes === 0 || Math.abs(minutes) > MAX_TIME_CHANGE_MINUTES) return withNotice(state, DEMO_NOTICE.INVALID_TIME);

  const tables = state.tables.map((table) => {
    if (table.tableNumber !== tableNumber || !table.orderSession) return table;
    return { ...table, orderSession: { ...table.orderSession, expectedEndAt: addMinutes(table.orderSession.expectedEndAt, minutes) } };
  });
  const hasExtendedInStep6 = state.hasExtendedInStep6 || (state.step === DEMO_STEP.EXTEND && minutes > 0);
  return { ...state, tables, hasExtendedInStep6 };
};

export function getTableEndBlockMessage(state: DemoState, tableNumber: number): string | null {
  if (tableNumber !== DEMO_TABLE_NUMBER) return DEMO_NOTICE.ONLY_TABLE_7;
  if (state.step >= DEMO_STEP.ORDER && state.step < DEMO_STEP.PAYMENT_CHECK) return DEMO_NOTICE.GUEST_ORDERING;
  if (state.step >= DEMO_STEP.PAYMENT_CHECK && state.step < DEMO_STEP.EXTEND) return DEMO_NOTICE.ORDER_PROCESSING;
  if (state.step === DEMO_STEP.EXTEND && !state.hasExtendedInStep6) return DEMO_NOTICE.EXTEND_FIRST;
  return null;
}

const endTable: Reducer<'TABLE_END'> = (state, { tableNumber, now }) => {
  const blockMessage = getTableEndBlockMessage(state, tableNumber);
  if (blockMessage) return withNotice(state, blockMessage);
  if (!hasDemoSession(state)) return state;

  const endAt = minutesBefore(now, 0);
  const tables = state.tables.map((table) => {
    if (table.tableNumber !== tableNumber) return table;
    return { ...table, orderSession: null };
  });
  const orders = state.orders.map((order) => {
    if (order.tableNumber !== tableNumber || !order.orderSession) return order;
    return { ...order, orderSession: { ...order.orderSession, endAt } };
  });
  return { ...state, tables, orders, guestScreen: 'left', isPhoneAlertOpen: false };
};

const checkPayment: Reducer<'PAYMENT_CHECK'> = (state, { orderId }) => {
  if (!isUserOrder(state, orderId)) return withNotice(state, DEMO_NOTICE.ONLY_OWN_ORDER);
  if (getUserOrder(state)?.status !== OrderStatus.NOT_PAID) return state;

  const next = replaceOrder(state, orderId, (order) => ({ ...order, status: OrderStatus.PAID }));
  if (next.guestScreen !== 'wait') return next;
  return { ...next, guestScreen: 'complete' };
};

const undoPayment: Reducer<'PAYMENT_UNDO'> = (state, { orderId }) => {
  if (!isUserOrder(state, orderId)) return withNotice(state, DEMO_NOTICE.ONLY_OWN_ORDER);
  if (getUserOrder(state)?.status !== OrderStatus.PAID) return state;
  if (state.step > DEMO_STEP.SERVE) return withNotice(state, DEMO_NOTICE.PAST_STEP);

  const next = replaceOrder(state, orderId, (order) => ({ ...order, status: OrderStatus.NOT_PAID }));
  const guestScreen = match(next.guestScreen)
    .with('complete', () => 'wait' as const)
    .otherwise((screen) => screen);
  if (next.step !== DEMO_STEP.SERVE) return { ...next, guestScreen };
  return { ...next, guestScreen, step: DEMO_STEP.PAYMENT_CHECK, adminPage: getDemoStep(DEMO_STEP.PAYMENT_CHECK).adminPage };
};

// 메뉴별 서빙 수는 표시만 하고 주문 상태는 '서빙 완료' 버튼(ORDER_SERVE_ALL)으로만 바뀐다
const serveProduct: Reducer<'PRODUCT_SERVE'> = (state, { orderId, orderProductId, delta }) => {
  if (!isUserOrder(state, orderId)) return withNotice(state, DEMO_NOTICE.ONLY_OWN_ORDER);
  if (getUserOrder(state)?.status === OrderStatus.NOT_PAID) return state;

  return replaceOrder(state, orderId, (order) => ({
    ...order,
    orderProducts: order.orderProducts.map((product) => {
      if (product.id !== orderProductId) return product;
      const servedCount = Math.min(product.quantity, Math.max(0, product.servedCount + delta));
      return { ...product, servedCount, isServed: servedCount === product.quantity };
    }),
  }));
};

const serveAll: Reducer<'ORDER_SERVE_ALL'> = (state, { orderId }) => {
  if (!isUserOrder(state, orderId)) return withNotice(state, DEMO_NOTICE.ONLY_OWN_ORDER);
  if (getUserOrder(state)?.status !== OrderStatus.PAID) return state;

  return replaceOrder(state, orderId, (order) => ({
    ...order,
    status: OrderStatus.SERVED,
    orderProducts: order.orderProducts.map((product) => ({ ...product, servedCount: product.quantity, isServed: true })),
  }));
};

const undoServe: Reducer<'SERVE_UNDO'> = (state, { orderId }) => {
  if (!isUserOrder(state, orderId)) return withNotice(state, DEMO_NOTICE.ONLY_OWN_ORDER);
  if (getUserOrder(state)?.status !== OrderStatus.SERVED) return state;
  if (state.step !== DEMO_STEP.EXTEND || state.hasExtendedInStep6) return withNotice(state, DEMO_NOTICE.PAST_STEP);

  const next = replaceOrder(state, orderId, (order) => ({ ...order, status: OrderStatus.PAID }));
  return { ...next, step: DEMO_STEP.SERVE, adminPage: getDemoStep(DEMO_STEP.SERVE).adminPage };
};

const cancelOrder: Reducer<'ORDER_CANCEL'> = (state, { orderId }) => {
  if (!isUserOrder(state, orderId)) return withNotice(state, DEMO_NOTICE.ONLY_OWN_ORDER);
  return withNotice(state, DEMO_NOTICE.CANCEL_BLOCKED);
};

const finish: Reducer<'FINISH'> = (state) => {
  if (state.step !== DEMO_STEP.CLOSING) return state;
  return { ...state, isFinished: true };
};

function applyAction(state: DemoState, action: DemoAction): DemoState {
  return match(action)
    .with({ type: 'BASKET_ADD' }, (a) => addToBasket(state, a))
    .with({ type: 'BASKET_REMOVE' }, (a) => removeFromBasket(state, a))
    .with({ type: 'BASKET_DELETE' }, (a) => deleteFromBasket(state, a))
    .with({ type: 'GUEST_GO' }, (a) => goGuestScreen(state, a))
    .with({ type: 'ORDER_REQUEST' }, (a) => requestOrder(state, a))
    .with({ type: 'PHONE_ALERT_CLOSE' }, () => ({ ...state, isPhoneAlertOpen: false }))
    .with({ type: 'ORDER_PLACE' }, (a) => placeOrder(state, a))
    .with({ type: 'ADMIN_PAGE' }, (a) => changeAdminPage(state, a))
    .with({ type: 'SIDE_NAV_TOGGLE' }, () => ({ ...state, isSideNavOpen: !state.isSideNavOpen }))
    .with({ type: 'SIDE_NAV_BLOCKED' }, () => withNotice(state, DEMO_NOTICE.PAGE_LOCKED))
    .with({ type: 'TABLE_SELECT' }, ({ tableNumber }) => ({ ...state, selectedTableNumber: tableNumber }))
    .with({ type: 'TABLE_VIEW_MODE' }, ({ mode }) => ({ ...state, tableViewMode: mode }))
    .with({ type: 'TABLE_START' }, (a) => startTable(state, a))
    .with({ type: 'TABLE_EXTEND' }, (a) => extendTable(state, a))
    .with({ type: 'TABLE_END' }, (a) => endTable(state, a))
    .with({ type: 'ORDER_OPEN' }, ({ orderId }) => ({ ...state, openedOrderId: orderId }))
    .with({ type: 'PAYMENT_CHECK' }, (a) => checkPayment(state, a))
    .with({ type: 'PAYMENT_UNDO' }, (a) => undoPayment(state, a))
    .with({ type: 'PRODUCT_SERVE' }, (a) => serveProduct(state, a))
    .with({ type: 'ORDER_SERVE_ALL' }, (a) => serveAll(state, a))
    .with({ type: 'SERVE_UNDO' }, (a) => undoServe(state, a))
    .with({ type: 'ORDER_CANCEL' }, (a) => cancelOrder(state, a))
    .with({ type: 'UNSUPPORTED' }, () => withNotice(state, DEMO_NOTICE.UNSUPPORTED))
    .with({ type: 'FINISH' }, (a) => finish(state, a))
    .with({ type: 'RESTART' }, { type: 'DO_FOR_ME' }, () => state)
    .exhaustive();
}

function isGoalMet(state: DemoState): boolean {
  const userOrderStatus = getUserOrder(state)?.status;
  return match(state.step)
    .with(DEMO_STEP.START, () => hasDemoSession(state))
    .with(DEMO_STEP.ORDER, () => state.guestScreen === 'pay')
    .with(DEMO_STEP.PAY, () => state.guestOrderId !== null)
    .with(DEMO_STEP.PAYMENT_CHECK, () => userOrderStatus === OrderStatus.PAID || userOrderStatus === OrderStatus.SERVED)
    .with(DEMO_STEP.SERVE, () => userOrderStatus === OrderStatus.SERVED)
    .with(DEMO_STEP.EXTEND, () => state.hasExtendedInStep6)
    .with(DEMO_STEP.END, () => state.guestOrderId !== null && !hasDemoSession(state))
    .otherwise(() => false);
}

function enterStep(state: DemoState, step: number): DemoState {
  const entered: DemoState = { ...state, step, adminPage: getDemoStep(step).adminPage, openedOrderId: null };
  return match(step)
    .with(DEMO_STEP.EXTEND, () => ({ ...entered, selectedTableNumber: DEMO_TABLE_NUMBER }))
    .with(DEMO_STEP.CLOSING, () => ({ ...entered, tables: entered.tables.map((table) => ({ ...table, orderSession: null })), guestScreen: 'left' as const }))
    .otherwise(() => entered);
}

function advance(state: DemoState): DemoState {
  let current = state;
  while (!current.isFinished && current.step < DEMO_STEPS.length && isGoalMet(current)) {
    current = enterStep(current, current.step + 1);
  }
  return current;
}

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  return advance(applyAction(state, action));
}
