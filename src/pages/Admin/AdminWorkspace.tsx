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
          <ImageRouteButton
            src={'https://ojsfile.ohmynews.com/STD_IMG_FILE/2022/1217/IE003091261_STD.jpg'}
            onClick={() => appendPath('/orders')}
            buttonText={'실시간 주문 조회'}
          />
          <ImageRouteButton
            src={'https://ojsfile.ohmynews.com/STD_IMG_FILE/2022/1217/IE003091261_STD.jpg'}
            onClick={() => appendPath('/orders-history')}
            buttonText={'전체 주문 조회'}
          />
          <ImageRouteButton
            src={'https://ojsfile.ohmynews.com/STD_IMG_FILE/2022/1217/IE003091261_STD.jpg'}
            onClick={() => appendPath('/products')}
            buttonText={'상품 조회'}
          />
          <ImageRouteButton
            src={'https://ojsfile.ohmynews.com/STD_IMG_FILE/2022/1217/IE003091261_STD.jpg'}
            onClick={() => appendPath('/orders-manage')}
            buttonText={'주문 페이지 관리'}
          />
        </ButtonContainer>
      </Container>
    </AppContainer>
  );
}

export default AdminWorkspace;
