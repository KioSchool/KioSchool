import TableLayoutCanvas from './TableLayoutCanvas';
import LayoutGridCell from '@components/admin/order/table-manage/layout/edit/LayoutGridCell';

const meta = {
  title: 'Components/Admin/TableManage/TableLayoutCanvas',
  component: TableLayoutCanvas,
  decorators: [
    (Story: any) => (
      <div style={{ width: 760, height: 520 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const renderFloorCell = (x: number, y: number) => (x < 3 && y < 3 ? <div>{`${x},${y}`}</div> : null);
const renderSocketCell = (x: number, y: number) => <LayoutGridCell x={x} y={y} isDragging={false} isConflicted={false} />;

export const OperationFloor = { args: { renderCell: renderFloorCell } };
export const EditSockets = { args: { renderCell: renderSocketCell } };
