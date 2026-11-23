import { Order, OrderProductBase, PaymentMethod, Table } from '@@types/index';
import { DemoAdminPage } from '@constants/data/demo/demoSteps';
import { TableView } from '@jotai/admin/atoms';

export type DemoGuestScreen = 'menu' | 'basket' | 'pay' | 'wait' | 'complete' | 'left';

export interface DemoNotice {
  id: number;
  message: string;
}

export interface DemoState {
  startedAt: number;
  step: number;
  isFinished: boolean;
  tables: Table[];
  orders: Order[];
  basket: OrderProductBase[];
  guestScreen: DemoGuestScreen;
  guestOrderId: number | null;
  isPhoneAlertOpen: boolean;
  adminPage: DemoAdminPage;
  isSideNavOpen: boolean;
  selectedTableNumber: number;
  tableViewMode: TableView;
  openedOrderId: number | null;
  hasExtendedInStep6: boolean;
  notice: DemoNotice | null;
}

export type DemoAction =
  | { type: 'RESTART'; now: number; step: number }
  | { type: 'BASKET_ADD'; productId: number }
  | { type: 'BASKET_REMOVE'; productId: number }
  | { type: 'BASKET_DELETE'; productId: number }
  | { type: 'GUEST_GO'; screen: DemoGuestScreen }
  | { type: 'ORDER_REQUEST' }
  | { type: 'PHONE_ALERT_CLOSE' }
  | { type: 'ORDER_PLACE'; paymentMethod: PaymentMethod; customerName: string; now: number }
  | { type: 'ADMIN_PAGE'; page: DemoAdminPage }
  | { type: 'SIDE_NAV_TOGGLE' }
  | { type: 'SIDE_NAV_BLOCKED' }
  | { type: 'TABLE_SELECT'; tableNumber: number }
  | { type: 'TABLE_VIEW_MODE'; mode: TableView }
  | { type: 'TABLE_START'; tableNumber: number; now: number }
  | { type: 'TABLE_EXTEND'; tableNumber: number; minutes: number }
  | { type: 'TABLE_END'; tableNumber: number; now: number }
  | { type: 'ORDER_OPEN'; orderId: number | null }
  | { type: 'PAYMENT_CHECK'; orderId: number }
  | { type: 'PAYMENT_UNDO'; orderId: number }
  | { type: 'PRODUCT_SERVE'; orderId: number; orderProductId: number; delta: number }
  | { type: 'ORDER_SERVE_ALL'; orderId: number }
  | { type: 'SERVE_UNDO'; orderId: number }
  | { type: 'ORDER_CANCEL'; orderId: number }
  | { type: 'UNSUPPORTED' }
  | { type: 'DO_FOR_ME'; now: number }
  | { type: 'FINISH' };
