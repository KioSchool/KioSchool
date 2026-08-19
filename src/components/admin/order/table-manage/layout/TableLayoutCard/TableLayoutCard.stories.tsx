import TableLayoutCard from '@components/admin/order/table-manage/layout/TableLayoutCard/TableLayoutCard';
import { GHOST_TYPE, Table } from '@@types/index';
import { TABLE_GRID_CELL_PX } from '@constants/layout';

const now = Date.now();
const minutesFromNow = (m: number) => new Date(now + m * 60 * 1000).toISOString();

const makeTable = (tableNumber: number, remainingMinutes: number | null): Table => ({
  tableNumber,
  tableHash: `hash-${tableNumber}`,
  position: { x: 0, y: 0 },
  id: tableNumber,
  createdAt: new Date(now - 60 * 60 * 1000).toISOString(),
  updatedAt: '',
  orderSession:
    remainingMinutes === null
      ? null
      : {
          expectedEndAt: minutesFromNow(remainingMinutes),
          endAt: null,
          tableNumber,
          usageTime: 120,
          totalOrderPrice: 32000,
          orderCount: 3,
          ghostType: GHOST_TYPE.NONE,
          id: tableNumber,
          createdAt: new Date(now - 60 * 60 * 1000).toISOString(),
          updatedAt: '',
        },
});

const meta = {
  title: 'Components/Admin/TableManage/TableLayoutCard',
  component: TableLayoutCard,
  decorators: [
    (Story: any) => (
      <div style={{ width: TABLE_GRID_CELL_PX, height: TABLE_GRID_CELL_PX, padding: 20 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Empty = { args: { table: makeTable(1, null) } };
export const Using = { args: { table: makeTable(2, 47) } };
export const Warning = { args: { table: makeTable(3, 7) } };
export const Exceeded = { args: { table: makeTable(4, -12) } };
export const Selected = { args: { table: makeTable(5, 30), isSelected: true } };
export const WithHandle = { args: { table: makeTable(6, 30), showHandle: true } };
