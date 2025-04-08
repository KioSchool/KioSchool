import ImageRouteButton from '@components/common/button/ImageRouteButton';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import useCustomNavigate from '@hooks/useCustomNavigate';
import workspaceImage from '@resources/image/super-admin/workspaceImage.png';
import userImage from '@resources/image/super-admin/userImage.png';
import emailImage from '@resources/image/super-admin/emailImage.png';
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
          <ImageRouteButton src={workspaceImage} onClick={() => navigateWithPage('/super-admin/workspace')} buttonText={'워크스페이스 조회'} />
          <ImageRouteButton src={userImage} onClick={() => navigateWithPage('/super-admin/user')} buttonText={'사용자 조회'} />
          <ImageRouteButton src={emailImage} onClick={() => navigateWithPage('/super-admin/email')} buttonText={'이메일 조회'} />
          <ImageRouteButton src={emailImage} onClick={() => navigateWithPage('/super-admin/bank')} buttonText={'은행 조회'} />
        </ButtonContainer>
      </Container>
    </AppContainer>
  );
}

export default SuperAdminManage;
