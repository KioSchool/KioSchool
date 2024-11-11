import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCustomNavigate from '@hooks/useCustomNavigate';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { useRecoilValue } from 'recoil';
import { adminWorkspaceAtom } from '@recoils/atoms';
import styled from '@emotion/styled';
import ImageRouteButton from '@components/common/button/ImageRouteButton';
import AppContainer from '@components/common/container/AppContainer';
import AppFooter from '@components/common/footer/AppFooter';
import orderImage from '@resources/image/orderImage.png';
import productImage from '@resources/image/productImage.png';
import orderManageImage from '@resources/image/orderManageImage.png';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  ${colFlex({ align: 'center' })}
`;

export const ButtonContainer = styled.div`
  gap: 30px;
  ${rowFlex()}
`;

function AdminWorkspace() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchWorkspace } = useAdminWorkspace();
  const navigate = useNavigate();
  const workspace = useRecoilValue(adminWorkspaceAtom);
  const { appendPath } = useCustomNavigate();

  useEffect(() => {
    fetchWorkspace(workspaceId);
  }, []);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      titleNavBarProps={{ title: workspace.name, subTitle: workspace.description, onLeftArrowClick: () => navigate('/admin') }}
    >
      <Container className={'admin-workspace-container'}>
        <ButtonContainer className={'button-container'}>
          <ImageRouteButton src={orderImage} onClick={() => appendPath('/order')} buttonText={'주문 조회'} />
          <ImageRouteButton src={productImage} onClick={() => appendPath('/products')} buttonText={'상품 관리'} />
          <ImageRouteButton src={orderManageImage} onClick={() => appendPath('/table-count')} buttonText={'테이블 개수 관리'} />
        </ButtonContainer>
        <AppFooter />
      </Container>
    </AppContainer>
  );
}

export default AdminWorkspace;
