import useApi from '@hooks/useApi';
import { Bank, PaginationResponse } from '@@types/index';
import { bankPaginationResponseAtom } from 'src/jotai/super-admin/atoms';
import { useSetAtom } from 'jotai';

function useSuperAdminBank() {
  const { superAdminApi } = useApi();
  const setBankPaginationResponse = useSetAtom(bankPaginationResponseAtom);

  const fetchAllBank = (page: number, size: number, name?: string) => {
    superAdminApi.get<PaginationResponse<Bank>>('/banks', { params: { page, size, name } }).then((res) => {
      setBankPaginationResponse(res.data);
    });
  };

  const addBank = (name: string, code: string) => {
    const params = { name, code };

    superAdminApi.post('/bank', params).then(() => {
      fetchAllBank(0, 6);
    });
  };

  const deleteBank = (id: number) => {
    superAdminApi.delete('/bank', { data: { id } }).then(() => {
      fetchAllBank(0, 6);
    });
  };

  return { fetchAllBank, addBank, deleteBank };
}

export default useSuperAdminBank;
