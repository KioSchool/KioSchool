import useApi from '@hooks/useApi';

function useTable() {
  const { adminApi } = useApi();

  const fetchTableOrders = async (workspaceId: number | undefined | null, orderSessionId: number) => {
    const params = {
      workspaceId,
      orderSessionId,
    };
    return adminApi
      .get('/order/session', { params })
      .then((res) => res.data)
      .catch((error) => {
        console.error('Error fetching table orders:', error);
        throw error;
      });
  };

  return { fetchTableOrders };
}
export default useTable;
