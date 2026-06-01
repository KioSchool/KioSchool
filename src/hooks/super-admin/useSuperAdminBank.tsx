import useApi from '@hooks/useApi';
import { Bank, PaginationResponse } from '@@types/index';
import { superAdminBankPaginationResponseAtom } from '@jotai/super-admin/atoms';
import { useSetAtom } from 'jotai';

function useSuperAdminBank() {
  const { superAdminApi } = useApi();
  const setBankPaginationResponse = useSetAtom(superAdminBankPaginationResponseAtom);

  const fetchAllBank = (page: number, size: number, name?: string) => {
    superAdminApi.get<PaginationResponse<Bank>>('/banks', { params: { page, size, name } }).then((res) => {
      setBankPaginationResponse(res.data);
    });
  };

  const addBank = (name: string, code: string) => {
    superAdminApi.post('/bank', { name, code }).then(() => {
      fetchAllBank(0, 6);
    });
  };

  const deleteBank = (id: number) => {
    superAdminApi.delete('/bank', { data: { id } }).then(() => {
      fetchAllBank(0, 6);
    });
  };

  const updateBankTossName = (id: number, tossName: string) => {
    return superAdminApi.put(`/bank/${id}/toss-name`, { tossName });
  };

  const deleteBankTossName = (id: number) => {
    return superAdminApi.delete(`/bank/${id}/toss-name`);
  };

  return { fetchAllBank, addBank, deleteBank, updateBankTossName, deleteBankTossName };
}

export default useSuperAdminBank;
