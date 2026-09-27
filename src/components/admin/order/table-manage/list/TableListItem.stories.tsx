import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import { GHOST_TYPE, OrderSession, Table } from '@@types/index';
import TableListItem from './TableListItem';

const TIMESTAMP = '2026-09-14T17:00:00';
const MINUTES_PER_HOUR = 60;
const MS_PER_MINUTE = 60 * 1000;

const Frame = styled.div`
  width: 640px;
`;

function createSession(tableNumber: number): OrderSession {
  const now = Date.now();

  return {
    id: tableNumber,
    tableNumber,
    expectedEndAt: new Date(now + MINUTES_PER_HOUR * MS_PER_MINUTE).toISOString(),
    endAt: null,
    usageTime: 0,
    totalOrderPrice: 0,
    orderCount: 0,
    ghostType: GHOST_TYPE.NONE,
    createdAt: new Date(now - MINUTES_PER_HOUR * MS_PER_MINUTE).toISOString(),
    updatedAt: TIMESTAMP,
  };
}

function createTable(tableNumber: number, isInUse: boolean): Table {
  return {
    id: tableNumber,
    tableNumber,
    tableHash: `hash-${tableNumber}`,
    orderSession: isInUse ? createSession(tableNumber) : null,
    position: null,
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
  };
}

const meta: Meta<typeof TableListItem> = {
  title: 'Components/Admin/TableManage/TableListItem',
  component: TableListItem,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Frame>
          <Story />
        </Frame>
      </BrowserRouter>
    ),
  ],
  argTypes: { onQuickStart: { action: 'quickStart' } },
};

export default meta;
type Story = StoryObj<typeof TableListItem>;

export const EmptyWithQuickStart: Story = {
  args: { table: createTable(12, false), orderStats: null },
};

export const EmptyWhileStarting: Story = {
  args: { table: createTable(12, false), orderStats: null, isStarting: true },
};

export const EmptyWithoutQuickStart: Story = {
  args: { table: createTable(12, false), orderStats: null },
  argTypes: { onQuickStart: { table: { disable: true } } },
  render: ({ table, orderStats }) => <TableListItem table={table} orderStats={orderStats} />,
};

export const InUse: Story = {
  args: { table: createTable(7, true), orderStats: { count: 3, amount: 45000 } },
};
