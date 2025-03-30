import AccountInfo from '@components/admin/account/AccountInfo';
import RegisterAccount from '@components/admin/account/RegisterAccount';
import RegisterTossAccount from '@components/admin/account/RegisterTossAccount';
import AppContainer from '@components/common/container/AppContainer';
import { colFlex } from '@styles/flexStyles';
import { useNavigate, useParams } from 'react-router-dom';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { useRecoilValue } from 'recoil';
import { adminWorkspaceAtom } from '@recoils/atoms';
import { useEffect } from 'react';

function AdminAccount() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchWorkspace } = useAdminWorkspace();
  const navigate = useNavigate();
  const workspace = useRecoilValue(adminWorkspaceAtom);

  useEffect(() => {
    fetchWorkspace(workspaceId);
  }, []);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      titleNavBarProps={{ title: workspace.name, subTitle: workspace.description, onLeftArrowClick: () => navigate('/admin/my-info') }}
    >
      <>
        <AccountInfo />
        <RegisterAccount />
        <RegisterTossAccount />
      </>
    </AppContainer>
  );
}

export default AdminAccount;
