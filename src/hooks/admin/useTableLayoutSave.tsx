import { useState } from 'react';
import { toast } from 'react-toastify';
import useAdminTableLayout, { TablePositionUpdate } from '@hooks/admin/useAdminTableLayout';
import { API_ERROR_CODES } from '@constants/errorCodes';
import { getApiErrorMessage, getApiFieldErrors, isApiErrorCode } from '@utils/apiError';
import { Table, TablePosition } from '@@types/index';

// 409의 errors[0].index는 요청 positions 배열 인덱스 — 좌표는 서버 value 표기 대신 우리 payload에서 되찾는다
function findConflictedPosition(error: unknown, changes: TablePositionUpdate[]): TablePosition | null {
  if (!isApiErrorCode(error, API_ERROR_CODES.TABLE_POSITION_CONFLICT)) return null;

  const index = getApiFieldErrors(error)[0]?.index;
  if (index === null || index === undefined) return null;

  return changes[index]?.position ?? null;
}

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
