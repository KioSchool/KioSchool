import ImageRouteButton from '@components/common/button/ImageRouteButton';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import userImage from '@resources/image/userImage.png';
import workspaceImage from '@resources/image/workspaceImage.png';
import emailImage from '@resources/image/emailImage.png';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  ${colFlex({ align: 'center' })}
`;

const ButtonContainer = styled.div`
  gap: 30px;
  ${rowFlex()}
`;

function SuperAdminManage() {
  const { navigateWithPage } = useCustomNavigate();
  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })} titleNavBarProps={{ title: '관리 페이지' }}>
      <Container>
        <ButtonContainer>
          <ImageRouteButton src={workspaceImage} onClick={() => navigate('/super-admin/workspace')} buttonText={'워크스페이스 조회'} />
          <ImageRouteButton src={userImage} onClick={() => navigate('/super-admin/user')} buttonText={'사용자 조회'} />
          <ImageRouteButton src={emailImage} onClick={() => navigate('/super-admin/email')} buttonText={'이메일 조회'} />
        </ButtonContainer>
      </Container>
    </AppContainer>
  );
}

export default SuperAdminManage;
