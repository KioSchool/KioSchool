import useApi from '@hooks/useApi';
import { Table, TablePosition } from '@@types/index';

export interface TablePositionUpdate {
  tableId: number;
  position: TablePosition | null;
}

// 409 errors[0].field는 "positions[i]" 형식 — 인덱스만 꺼내고 좌표는 우리 payload에서 되찾는다 (value 표기는 서버가 바꿀 수 있어 쓰지 않음)
export function parseConflictIndex(error: unknown): number | null {
  const field = (error as { response?: { data?: { errors?: Array<{ field?: string }> } } })?.response?.data?.errors?.[0]?.field;
  const matched = field?.match(/positions\[(\d+)\]/);

  return matched ? Number(matched[1]) : null;
}

function useAdminTableLayout(workspaceId: string | undefined) {
  const { adminApi } = useApi();

  const updateTablePositions = (positions: TablePositionUpdate[]) =>
    adminApi.patch<Table[]>('/workspace/table/positions', { workspaceId, positions }).then((res) => res.data);

  return { updateTablePositions };
}

export default useAdminTableLayout;
