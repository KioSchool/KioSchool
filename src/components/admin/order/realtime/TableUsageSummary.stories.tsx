import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, createStore } from 'jotai';
import styled from '@emotion/styled';
import { adminTablesAtom } from '@jotai/admin/atoms';
import { GHOST_TYPE, OrderSession, Table } from '@@types/index';
import TableUsageSummary from './TableUsageSummary';

const TABLE_COUNT = 40;
const TIMESTAMP = '2026-09-14T17:00:00';

const Frame = styled.div`
  width: 900px;
`;

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

function createTables(tablesInUseCount: number): Table[] {
  return Array.from({ length: TABLE_COUNT }, (_, index) => {
    const tableNumber = index + 1;

    return {
      id: tableNumber,
      tableNumber,
      tableHash: `hash-${tableNumber}`,
      orderSession: tableNumber <= tablesInUseCount ? { ...ACTIVE_SESSION, id: tableNumber, tableNumber } : null,
      position: null,
      createdAt: TIMESTAMP,
      updatedAt: TIMESTAMP,
    };
  });
}

function withTables(tables: Table[]) {
  return function StoreDecorator(Story: () => JSX.Element) {
    const store = createStore();
    store.set(adminTablesAtom, tables);

    return (
      <BrowserRouter>
        <Provider store={store}>
          <Frame>
            <Story />
          </Frame>
        </Provider>
      </BrowserRouter>
    );
  };
}

const meta: Meta<typeof TableUsageSummary> = {
  title: 'Components/Admin/OrderRealtime/TableUsageSummary',
  component: TableUsageSummary,
  args: { workspaceId: '1' },
};

export default meta;
type Story = StoryObj<typeof TableUsageSummary>;

export const NoTableInUse: Story = {
  decorators: [withTables(createTables(0))],
};

export const SomeTablesInUse: Story = {
  decorators: [withTables(createTables(12))],
};

export const HiddenWithoutTables: Story = {
  decorators: [withTables([])],
};
