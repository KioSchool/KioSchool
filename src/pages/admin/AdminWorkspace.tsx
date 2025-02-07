import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { useRecoilValue } from 'recoil';
import { adminWorkspaceAtom } from '@recoils/atoms';
import styled from '@emotion/styled';
import AppContainer from '@components/common/container/AppContainer';
import { colFlex, rowFlex } from '@styles/flexStyles';
import PreviewContainer from '@components/common/container/PreviewContainer';
import { Color } from '@resources/colors';
import OrderRouteButtons from '@components/admin/workspace/OrderRouteButtons';
import ProductRouteButtons from '@components/admin/workspace/ProductRouteButtons';
import WorkspaceRouteButtons from '@components/admin/workspace/WorkspaceRouteButtons';
import AppFooter from '@components/common/footer/AppFooter';

const ContentContainer = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'center', align: 'center' })}
  gap: 80px;
`;

export const ButtonContainer = styled.div`
  gap: 30px;
  ${rowFlex()}
`;

const PreviewContent = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const RouteContainer = styled.div`
  width: 800px;
  height: 80%;
  border-radius: 10px;
  background-color: ${Color.LIGHT_GREY};
  ${colFlex({ justify: 'space-evenly', align: 'center' })}
`;

function AdminWorkspace() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchWorkspace } = useAdminWorkspace();
  const navigate = useNavigate();
  const workspace = useRecoilValue(adminWorkspaceAtom);
  const baseUrl = `${location.protocol}//${location.host}`;

  useEffect(() => {
    fetchWorkspace(workspaceId);
  }, []);

  return (
    <AppContainer
      useFlex={rowFlex({ justify: 'center', align: 'center' })}
      customWidth={'100vw'}
      titleNavBarProps={{ title: workspace.name, subTitle: workspace.description, onLeftArrowClick: () => navigate('/admin') }}
    >
      <>
        <ContentContainer>
          <PreviewContainer width={300} height={600}>
            <PreviewContent src={`${baseUrl}/order?workspaceId=${workspaceId}&tableNo=1&preview=true`} />
          </PreviewContainer>
          <RouteContainer>
            <OrderRouteButtons />
            <ProductRouteButtons />
            <WorkspaceRouteButtons />
          </RouteContainer>
        </ContentContainer>
        <AppFooter />
      </>
    </AppContainer>
  );
}

export default AdminWorkspace;
