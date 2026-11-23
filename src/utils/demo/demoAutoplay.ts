import { match } from 'ts-pattern';
import { PaymentMethod } from '@@types/index';
import { DEMO_TABLE_NUMBER, DEMO_USER_ORDER_ID } from '@constants/data/demo/demoSeed';
import { DEMO_STEP } from '@constants/data/demo/demoSteps';
import { createDemoState } from './createDemoState';
import { demoReducer } from './demoReducer';
import { DemoAction, DemoState } from './demoTypes';

const DEFAULT_BASKET_PRODUCT_IDS = [4, 5];
const DEFAULT_CUSTOMER_NAME = '서아영';
const DEFAULT_EXTEND_MINUTES = 30;

const runAll = (state: DemoState, actions: DemoAction[]) => actions.reduce((current, action) => demoReducer(current, action), state);

function fillBasketActions(state: DemoState): DemoAction[] {
  if (state.basket.length > 0) return [];
  return DEFAULT_BASKET_PRODUCT_IDS.map((productId): DemoAction => ({ type: 'BASKET_ADD', productId }));
}

export function doForMe(state: DemoState, now: number): DemoState {
  if (state.isFinished) return state;

  const actions = match(state.step)
    .with(DEMO_STEP.START, (): DemoAction[] => [{ type: 'TABLE_START', tableNumber: DEMO_TABLE_NUMBER, now }])
    .with(DEMO_STEP.ORDER, (): DemoAction[] => [...fillBasketActions(state), { type: 'ORDER_REQUEST' }])
    .with(DEMO_STEP.PAY, (): DemoAction[] => [
      ...fillBasketActions(state),
      { type: 'ORDER_PLACE', paymentMethod: PaymentMethod.KAKAOPAY, customerName: DEFAULT_CUSTOMER_NAME, now },
    ])
    .with(DEMO_STEP.PAYMENT_CHECK, (): DemoAction[] => [{ type: 'PAYMENT_CHECK', orderId: DEMO_USER_ORDER_ID }])
    .with(DEMO_STEP.SERVE, (): DemoAction[] => [{ type: 'ORDER_SERVE_ALL', orderId: DEMO_USER_ORDER_ID }])
    .with(DEMO_STEP.EXTEND, (): DemoAction[] => [{ type: 'TABLE_EXTEND', tableNumber: DEMO_TABLE_NUMBER, minutes: DEFAULT_EXTEND_MINUTES }])
    .with(DEMO_STEP.END, (): DemoAction[] => [{ type: 'TABLE_END', tableNumber: DEMO_TABLE_NUMBER, now }])
    .otherwise((): DemoAction[] => [{ type: 'FINISH' }]);

  return runAll({ ...state, isPhoneAlertOpen: false }, actions);
}

export function prepareStateForStep(step: number, now: number): DemoState {
  const initial = createDemoState(now);
  const prepared = Array.from({ length: Math.max(0, step - 1) }).reduce<DemoState>((state) => doForMe(state, now), initial);
  return { ...prepared, notice: null };
}

export function demoRootReducer(state: DemoState, action: DemoAction): DemoState {
  return match(action)
    .with({ type: 'RESTART' }, ({ step, now }) => prepareStateForStep(step, now))
    .with({ type: 'DO_FOR_ME' }, ({ now }) => doForMe(state, now))
    .otherwise((other) => demoReducer(state, other));
}
