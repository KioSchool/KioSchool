import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import styled from '@emotion/styled';
import AppContainer from '@components/common/container/AppContainer';
import { colFlex, rowFlex } from '@styles/flexStyles';
import PreviewContainer from '@components/common/container/PreviewContainer';
import AppFaqButton from '@components/common/button/AppFaqButton';
import AppPopup from '@components/common/popup/AppPopup';
import { useSetAtom } from 'jotai';
import { adminSideNavIsOpenAtom } from '@jotai/admin/atoms';
import AdminDashboard from '@components/admin/workspace/dashboard/AdminDashboard';

const ContentContainer = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'center', align: 'start' })}
  gap: 40px;
`;

function AdminWorkspace() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchWorkspace } = useAdminWorkspace();
  const setSideNavIsOpen = useSetAtom(adminSideNavIsOpenAtom);

  useEffect(() => {
    fetchWorkspace(workspaceId);
    setSideNavIsOpen(true);
  }, []);

  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })}>
      <>
        <ContentContainer>
          <AdminDashboard />
          <PreviewContainer width={300} height={680} />
        </ContentContainer>
        <AppPopup />
        <AppFaqButton />
      </>
    </AppContainer>
  );
}

export default AdminWorkspace;
