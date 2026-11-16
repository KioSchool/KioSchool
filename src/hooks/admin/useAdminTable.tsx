import useApi from '@hooks/useApi';
import { notifyActionFailure } from '@utils/actionFailure';

function useAdminTable(workspaceId: string | undefined) {
  const { adminApi } = useApi();

  const updateSessionEndTime = async (orderSessionId: number, expectedEndAt: string) => {
    return adminApi
      .patch('/order/session', {
        workspaceId,
        orderSessionId,
        expectedEndAt,
      })
      .catch((error) => {
        notifyActionFailure(error, '사용 시간을 바꾸지 못했습니다. 잠시 후 다시 시도해 주세요.');
      });
  };

  const finishTableSession = async (orderSessionId: number, tableNumber: number, isGhost?: boolean) => {
    return adminApi.post('/order/session/end', {
      workspaceId,
      tableNumber,
      orderSessionId,
      isGhost,
    });
  };

  const startTableSession = async (tableNumber: number) => {
    return adminApi
      .post('/order/session/start', {
        workspaceId,
        tableNumber,
      })
      .catch((error) => {
        notifyActionFailure(error, '테이블 사용을 시작하지 못했습니다. 잠시 후 다시 시도해 주세요.');
      });
  };

  return { updateSessionEndTime, finishTableSession, startTableSession };
}

export default useAdminTable;
