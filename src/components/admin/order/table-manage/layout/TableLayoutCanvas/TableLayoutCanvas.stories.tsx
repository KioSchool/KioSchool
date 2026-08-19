import TableLayoutCanvas from '@components/admin/order/table-manage/layout/TableLayoutCanvas/TableLayoutCanvas';

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

const renderNumberedCell = (x: number, y: number) => (x < 3 && y < 3 ? <div>{`${x},${y}`}</div> : null);

export const OperationMode = { args: { showGrid: false, renderCell: renderNumberedCell } };
export const EditMode = { args: { showGrid: true, renderCell: renderNumberedCell } };
