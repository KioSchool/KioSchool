import useApi from '@hooks/useApi';
import { useSetRecoilState } from 'recoil';
import { adminWorkspaceAtom, tablePaginationResponseAtom } from '@recoils/atoms';
import { PaginationResponse, Table, Workspace } from '@@types/index';
import { useNavigate, useSearchParams } from 'react-router-dom';

function useAdminWorkspace() {
  const { adminApi } = useApi();
  const [searchParams, setSearchParams] = useSearchParams();
  const setAdminWorkspace = useSetRecoilState(adminWorkspaceAtom);
  const setTablePaginationResponse = useSetRecoilState(tablePaginationResponseAtom);
  const navigate = useNavigate();

  const fetchWorkspace = (workspaceId: string | undefined | null) => {
    if (!workspaceId) return;

    adminApi
      .get<Workspace>('/workspace', { params: { workspaceId } })
      .then((res) => {
        setAdminWorkspace(res.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
        navigate(-1);
      });
  };

  const updateWorkspaceTableCount = (workspaceId: string | undefined | null, tableCount: number) => {
    adminApi
      .post<Workspace>('/workspace/table-count', { workspaceId, tableCount })
      .then((res) => {
        setAdminWorkspace(res.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const fetchWorkspaceTable = (workspaceId: number, tableNumber: number, page: number, size: number) => {
    const params = { workspaceId, tableNumber, page, size };

    adminApi.get<PaginationResponse<Table>>('/orders/table', { params }).then((res) => {
      setTablePaginationResponse(res.data);
      searchParams.set('page', params.page.toString());
      setSearchParams(searchParams);
    });
  };

  return { fetchWorkspace, updateWorkspaceTableCount, fetchWorkspaceTable };
}

export default useAdminWorkspace;
