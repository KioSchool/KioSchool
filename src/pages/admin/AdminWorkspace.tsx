import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import styled from '@emotion/styled';
import AppContainer from '@components/common/container/AppContainer';
import { colFlex, rowFlex } from '@styles/flexStyles';
import PreviewContainer from '@components/common/container/PreviewContainer';
import { Color } from '@resources/colors';
import OrderRouteButtons from '@components/admin/workspace/OrderRouteButtons';
import ProductRouteButtons from '@components/admin/workspace/ProductRouteButtons';
import WorkspaceRouteButtons from '@components/admin/workspace/WorkspaceRouteButtons';
import AppFaqButton from '@components/common/button/AppFaqButton';
import AppPopup from '@components/common/popup/AppPopup';
import { tabletMediaQuery } from '@styles/globalStyles';
import { adminWorkspaceAtom } from 'src/jotai/admin/atoms';
import { useAtomValue } from 'jotai';
import { ADMIN_ROUTES } from '@constants/routes';

const ContentContainer = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'center', align: 'start' })}
  gap: 80px;
`;

const RouteContainer = styled.div`
  width: 800px;
  height: 80%;
  border-radius: 10px;
  background-color: ${Color.LIGHT_GREY};
  ${colFlex({ justify: 'space-evenly', align: 'center' })}

  ${tabletMediaQuery} {
    width: 600px;
  }
`;

function AdminWorkspace() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchWorkspace } = useAdminWorkspace();
  const navigate = useNavigate();
  const workspace = useAtomValue(adminWorkspaceAtom);

  useEffect(() => {
    fetchWorkspace(workspaceId);
  }, []);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center', align: 'center' })}
      customWidth={'100vw'}
      titleNavBarProps={{ title: workspace.name, subTitle: workspace.description, onLeftArrowClick: () => navigate(ADMIN_ROUTES.HOME) }}
    >
      <>
        <ContentContainer>
          <PreviewContainer width={300} height={600} />
          <RouteContainer>
            <OrderRouteButtons />
            <ProductRouteButtons />
            <WorkspaceRouteButtons />
          </RouteContainer>
        </ContentContainer>
        <AppPopup />
        <AppFaqButton />
      </>
    </AppContainer>
  );
}

export default AdminWorkspace;
