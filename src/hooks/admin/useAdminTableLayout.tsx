import useApi from '@hooks/useApi';
import { Table, TablePosition } from '@@types/index';

export interface TablePositionUpdate {
  tableId: number;
  position: TablePosition | null;
}

/**
 * 409 응답의 errors[0].field 에서 요청 배열의 인덱스만 꺼낸다.
 * value 문자열("(3, 1)")은 파싱하지 않는다 — 서버가 표기를 바꾸면 조용히 깨진다.
 * 좌표는 우리가 보낸 payload에서 되찾는다.
 */
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
