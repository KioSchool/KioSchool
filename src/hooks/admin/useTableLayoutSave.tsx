import { useState } from 'react';
import { toast } from 'react-toastify';
import useAdminTableLayout, { parseConflictIndex, TablePositionUpdate } from '@hooks/admin/useAdminTableLayout';
import { getApiErrorMessage } from '@utils/apiError';
import { Table, TablePosition } from '@@types/index';

function findConflictedPosition(error: unknown, changes: TablePositionUpdate[]): TablePosition | null {
  const index = parseConflictIndex(error);
  if (index === null) return null;

  return changes[index]?.position ?? null;
}

/**
 * 배치 편집의 저장 플로우 캡슐화 — 벌크 저장 요청과 409 충돌 좌표 상태를 소유한다.
 * 편집 모드 종료 여부는 호출부 판단이므로 성공 여부만 반환한다.
 */
function useTableLayoutSave(workspaceId: string | undefined, onSaved: (tables: Table[]) => void) {
  const { updateTablePositions } = useAdminTableLayout(workspaceId);
  const [isSaving, setIsSaving] = useState(false);
  const [conflictedPosition, setConflictedPosition] = useState<TablePosition | null>(null);

  const clearConflict = () => setConflictedPosition(null);

  const save = async (changes: TablePositionUpdate[]): Promise<boolean> => {
    setIsSaving(true);
    try {
      onSaved(await updateTablePositions(changes));
      setConflictedPosition(null);
      toast.success('배치를 저장했습니다.');
      return true;
    } catch (error) {
      const conflicted = findConflictedPosition(error, changes);
      setConflictedPosition(conflicted);

      const fallback = conflicted ? '이미 다른 테이블이 있는 자리입니다.' : '배치 저장에 실패했어요. 잠시 후 다시 시도해주세요.';
      toast.error(getApiErrorMessage(error, fallback));
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return { isSaving, conflictedPosition, clearConflict, save };
}

export default useTableLayoutSave;
