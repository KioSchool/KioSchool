import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCustomNavigate from '@hooks/useCustomNavigate';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import { useRecoilValue } from 'recoil';
import { userWorkspaceAtom } from '@recoils/atoms';
import styled from '@emotion/styled';
import ImageRouteButton from '@components/common/button/ImageRouteButton';
import AppContainer from '@components/common/container/AppContainer';
import AppFooter from '@components/common/footer/AppFooter';
import orderImage from '@resources/image/orderImage.png';
import orderHistoryImage from '@resources/image/orderHistoryImage.png';
import productImage from '@resources/image/productImage.png';
import orderManageImage from '@resources/image/orderManageImage.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 30px;
`;

function AdminWorkspace() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchWorkspace } = useAdminWorkspace();
  const workspace = useRecoilValue(userWorkspaceAtom);
  const { appendPath } = useCustomNavigate();
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkspace(workspaceId);
  }, []);

  return (
    <AppContainer justifyValue={'center'}>
      <Container>
        <TitleNavBar
          title={workspace.name}
          subTitle={workspace.description}
          onLeftArrowClick={() => {
            navigate('/admin');
          }}
        />
        <ButtonContainer>
          <ImageRouteButton src={orderImage} onClick={() => appendPath('/orders')} buttonText={'실시간 주문 조회'} />
          <ImageRouteButton src={orderHistoryImage} onClick={() => appendPath('/orders-history')} buttonText={'전체 주문 조회'} />
          <ImageRouteButton src={productImage} onClick={() => appendPath('/products')} buttonText={'상품 관리'} />
          <ImageRouteButton src={orderManageImage} onClick={() => appendPath('/orders-manage')} buttonText={'주문 페이지 관리'} />
        </ButtonContainer>
        <AppFooter />
      </Container>
    </AppContainer>
  );
}

export default AdminWorkspace;
