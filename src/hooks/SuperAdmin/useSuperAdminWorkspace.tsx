import useApi from '@hooks/useApi';

function useSuperAdminWorkspace() {
  const { superAdminApi } = useApi();

  const fetchAllWorkspaces = (page: number, size: number) => {
    superAdminApi
      .get<any>('/workspaces', { params: { page: page, size: size } })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.error(error));
  };

  return { fetchAllWorkspaces };
}

export default useSuperAdminWorkspace;
