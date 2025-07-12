import useApi from '@hooks/useApi';

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
        console.error('Error updating session end time:', error);
      });
  };

  const finishTableSession = async (orderSessionId: number, tableNumber: number) => {
    return adminApi
      .post('/order/session/end', {
        workspaceId,
        tableNumber,
        orderSessionId,
      })
      .catch((error) => {
        console.error('Error finishing table session:', error);
      });
  };

  const startTableSession = async (tableNumber: number) => {
    return adminApi
      .post('/order/session/start', {
        workspaceId,
        tableNumber,
      })
      .catch((error) => {
        console.error('Error starting table session:', error);
      });
  };

  return { updateSessionEndTime, finishTableSession, startTableSession };
}

export default useAdminTable;
