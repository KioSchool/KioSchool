import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import useAdminUser from '@hooks/admin/useAdminUser';
import AppContainer from '@components/common/container/AppContainer';
import AddWorkspace from '@components/common/workspace/AddWorkspace';
import WorkspaceContent from '@components/admin/workspace/WorkspaceContent';
import { colFlex } from '@styles/flexStyles';
import { useAtomValue } from 'jotai';
import { adminUserAtom, adminWorkspacesAtom } from '@jotai/admin/atoms';
import AppFaqButton from '@components/common/button/AppFaqButton';
import KioSchoolGuideYoutubeContent, { KIOSCHOOL_GUIDE_YOUTUBE_TOAST_COOKIE } from '@components/admin/home/KioSchoolGuideYoutubeContent';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@constants/routes';
import styled from '@emotion/styled';

const YOUTUBE_TOAST_ID = 'youtube-guide-toast';

const Container = styled.div`
  width: 95%;
  ${colFlex({ align: 'center' })}
`;

function AdminHome() {
  const navigate = useNavigate();
  const { fetchWorkspaces, fetchAdminUser } = useAdminUser();
  const workspaces = useAtomValue(adminWorkspacesAtom);
  const user = useAtomValue(adminUserAtom);
  const addWorkspaceNumber = 3 - workspaces.length;
  const [cookies] = useCookies([KIOSCHOOL_GUIDE_YOUTUBE_TOAST_COOKIE]);

  useEffect(() => {
    fetchWorkspaces();
    fetchAdminUser().then(() => {
      if (!user.account) {
        alert('계좌 정보가 등록되어 있지 않습니다. 계좌 정보를 등록해주세요.');
        navigate(ADMIN_ROUTES.REGISTER_ACCOUNT);
      }
    });
  }, []);

  useEffect(() => {
    if (!cookies[KIOSCHOOL_GUIDE_YOUTUBE_TOAST_COOKIE]) {
      toast(<KioSchoolGuideYoutubeContent onDismiss={() => toast.dismiss(YOUTUBE_TOAST_ID)} />, {
        toastId: YOUTUBE_TOAST_ID,
        position: 'top-right',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        draggable: true,
        closeButton: true,
      });
    }

    return () => {
      toast.dismiss(YOUTUBE_TOAST_ID);
    };
  }, [cookies]);

  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })} customGap={'30px'}>
      <Container>
        <WorkspaceContent workspaces={workspaces}>
          {Array.from({ length: addWorkspaceNumber }).map((_, i) => (
            <AddWorkspace key={i} workspaces={workspaces} />
          ))}
        </WorkspaceContent>
        <AppFaqButton />
      </Container>
    </AppContainer>
  );
}

export default AdminHome;
