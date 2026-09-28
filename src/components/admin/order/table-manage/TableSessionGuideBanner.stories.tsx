import { Meta, StoryObj } from '@storybook/react';
import { Provider, createStore } from 'jotai';
import { adminTablesAtom, adminWorkspaceAtom } from '@jotai/admin/atoms';
import { defaultWorkspaceValue } from '@@types/defaultValues';
import { GHOST_TYPE, OrderSession, Table } from '@@types/index';
import TableSessionGuideBanner from './TableSessionGuideBanner';

const TABLE_COUNT = 4;
const TIMESTAMP = '2026-09-14T17:00:00';

const ACTIVE_SESSION: OrderSession = {
  id: 1,
  tableNumber: 1,
  expectedEndAt: '2099-12-31T23:59:59',
  endAt: null,
  usageTime: 0,
  totalOrderPrice: 0,
  orderCount: 0,
  ghostType: GHOST_TYPE.NONE,
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP,
};

function createTables(tableNumbersInUse: number[]): Table[] {
  return Array.from({ length: TABLE_COUNT }, (_, index) => {
    const tableNumber = index + 1;

    return {
      id: tableNumber,
      tableNumber,
      tableHash: `hash-${tableNumber}`,
      orderSession: tableNumbersInUse.includes(tableNumber) ? { ...ACTIVE_SESSION, tableNumber } : null,
      position: null,
      createdAt: TIMESTAMP,
      updatedAt: TIMESTAMP,
    };
  });
}

function withStore({ tables, isOnboarding = false }: { tables: Table[]; isOnboarding?: boolean }) {
  return function StoreDecorator(Story: () => JSX.Element) {
    const store = createStore();
    store.set(adminTablesAtom, tables);
    store.set(adminWorkspaceAtom, { ...defaultWorkspaceValue, isOnboarding });

    return (
      <Provider store={store}>
        <Story />
      </Provider>
    );
  };
}

const meta: Meta<typeof TableSessionGuideBanner> = {
  title: 'Components/Admin/TableManage/TableSessionGuideBanner',
  component: TableSessionGuideBanner,
};

export default meta;
type Story = StoryObj<typeof TableSessionGuideBanner>;

export const NoTableInUse: Story = {
  decorators: [withStore({ tables: createTables([]) })],
};

export const SomeTableInUse: Story = {
  decorators: [withStore({ tables: createTables([1]) })],
};

export const HiddenDuringOnboarding: Story = {
  decorators: [withStore({ tables: createTables([]), isOnboarding: true })],
};

export const HiddenWithoutTables: Story = {
  decorators: [withStore({ tables: [] })],
};
