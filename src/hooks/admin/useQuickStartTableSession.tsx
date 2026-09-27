import { useState } from 'react';
import useAdminTable from './useAdminTable';
import { GA_EVENT, TABLE_SESSION_ACTION } from '@constants/analytics';
import { TABLE_VIEW, TableView } from '@jotai/admin/atoms';
import { trackEvent } from '@utils/analytics';

const QUICK_START_LOCATION: Record<TableView, string> = {
  [TABLE_VIEW.LIST]: 'list_row',
  [TABLE_VIEW.LAYOUT]: 'layout_card',
};

interface UseQuickStartTableSessionParams {
  workspaceId: string | undefined;
  viewMode: TableView;
  refetchTables: () => void;
}

function useQuickStartTableSession({ workspaceId, viewMode, refetchTables }: UseQuickStartTableSessionParams) {
  const { startTableSession } = useAdminTable(workspaceId);
  const [startingTableNumber, setStartingTableNumber] = useState<number | null>(null);

  const quickStartSession = (tableNumber: number) => {
    if (startingTableNumber !== null) return;

    setStartingTableNumber(tableNumber);

    startTableSession(tableNumber)
      .then((response) => {
        refetchTables();

        // startTableSession은 실패를 삼키고 undefined를 돌려준다. 다른 기기에서 이미 시작한 경우가 흔하므로 목록은 어느 쪽이든 새로 받는다.
        if (!response) {
          alert('테이블 사용을 시작하지 못했습니다. 잠시 후 다시 시도해주세요.');
          return;
        }

        trackEvent(GA_EVENT.TABLE_SESSION_ACTION, {
          session_action: TABLE_SESSION_ACTION.START,
          table_view_mode: viewMode,
          workspace_id: workspaceId,
          table_number: tableNumber,
          location: QUICK_START_LOCATION[viewMode],
        });
      })
      .finally(() => setStartingTableNumber(null));
  };

  return { quickStartSession, startingTableNumber };
}

export default useQuickStartTableSession;
