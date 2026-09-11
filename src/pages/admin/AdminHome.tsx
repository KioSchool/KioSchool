import { useEffect, useState } from 'react';
import useAdminUser from '@hooks/admin/useAdminUser';
import useAcquisitionSurvey from '@hooks/admin/useAcquisitionSurvey';
import AppContainer from '@components/common/container/AppContainer';
import AddWorkspace from '@components/common/workspace/AddWorkspace';
import WorkspaceContent from '@components/admin/workspace/WorkspaceContent';
import HomeOnboarding from '@components/admin/home/HomeOnboarding';
import AcquisitionSurvey from '@components/admin/acquisition/AcquisitionSurvey';
import AppPopup from '@components/common/popup/AppPopup';
import { POPUP_CLOSE_MODE, PopupData } from '@constants/data/popupData';
import { colFlex } from '@styles/flexStyles';
import { useAtomValue } from 'jotai';
import { adminAcquisitionSurveyAtom, adminUserAtom, adminWorkspacesAtom } from '@jotai/admin/atoms';
import AppFaqButton from '@components/common/button/AppFaqButton';
import styled from '@emotion/styled';
import OrderQRNoticePopupContent from '@components/admin/home/OrderQRNoticePopupContent';

const Container = styled.div`
  width: 95%;
  ${colFlex({ align: 'center' })}
`;

const LoadingContainer = styled.div`
  width: 100%;
  min-height: 320px;
  color: #5d6368;
  font-size: 18px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const ADMIN_HOME_POPUP_DATAS: PopupData[] = [
  {
    popupId: 0,
    title: 'Default Popup for prevent flickering',
    expireDate: new Date(1000, 1, 1),
    children: null,
  },
  {
    popupId: 2,
    title: '주문 QR 코드 재다운로드 안내',
    expireDate: new Date(2026, 5, 5),
    children: <OrderQRNoticePopupContent />,
    closeMode: POPUP_CLOSE_MODE.FOREVER,
    closeText: '다시 보지 않기',
  },
];

function AdminHome() {
  const { fetchWorkspaces, fetchAdminUser } = useAdminUser();
  const { fetchIsAnswered } = useAcquisitionSurvey();
  const workspaces = useAtomValue(adminWorkspacesAtom);
  const user = useAtomValue(adminUserAtom);
  const acquisitionSurvey = useAtomValue(adminAcquisitionSurveyAtom);
  const [isAdminUserLoading, setIsAdminUserLoading] = useState(true);
  const addWorkspaceNumber = 3 - workspaces.length;
  const isAccountRegistered = !!user.account?.accountNumber;

  useEffect(() => {
    fetchWorkspaces();
    fetchAdminUser().finally(() => {
      setIsAdminUserLoading(false);
    });
  }, []);

  // 같은 탭에서 계정을 바꾸면 user.id가 바뀐다. 그때 다시 조회해야 앞 사람의 응답 여부를 물려받지 않는다.
  useEffect(() => {
    if (!user.id) return;
    if (acquisitionSurvey?.userId === user.id) return;

    fetchIsAnswered(user.id);
  }, [user.id]);

  // user 조회가 실패하면 user.id가 0으로 남는다. 그때는 설문 게이트를 건너뛴다 —
  // 물어볼 대상을 특정할 수 없는데 로딩 화면에 가둬 두면 홈 자체를 못 쓰게 된다.
  const isSurveyResolved = acquisitionSurvey?.userId === user.id;
  const isSurveyPending = !!user.id && !isSurveyResolved;
  const shouldAskSurvey = !!user.id && isSurveyResolved && !acquisitionSurvey.isAnswered;

  const getPageContent = () => {
    if (isAdminUserLoading || isSurveyPending) {
      return <LoadingContainer>계정 정보를 불러오는 중입니다.</LoadingContainer>;
    }

    if (shouldAskSurvey) return <AcquisitionSurvey />;

    if (!isAccountRegistered) return <HomeOnboarding />;

    return (
      <Container>
        <WorkspaceContent workspaces={workspaces}>
          {Array.from({ length: addWorkspaceNumber }).map((_, i) => (
            <AddWorkspace key={i} workspaces={workspaces} />
          ))}
        </WorkspaceContent>
        <AppFaqButton />
      </Container>
    );
  };

  const pageContent = getPageContent();

  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })} customGap={'30px'}>
      <>
        {pageContent}
        <AppPopup popupDatas={ADMIN_HOME_POPUP_DATAS} />
      </>
    </AppContainer>
  );
}

export default AdminHome;
