import useApi from '@hooks/useApi';
import { Table, TablePosition } from '@@types/index';

export interface TablePositionUpdate {
  tableId: number;
  position: TablePosition | null;
}

function useAdminTableLayout(workspaceId: string | undefined) {
  const { adminApi } = useApi();

  const updateTablePositions = (positions: TablePositionUpdate[]) =>
    adminApi.patch<Table[]>('/workspace/table/positions', { workspaceId, positions }).then((res) => res.data);

  return { updateTablePositions };
}

export default useAdminTableLayout;
