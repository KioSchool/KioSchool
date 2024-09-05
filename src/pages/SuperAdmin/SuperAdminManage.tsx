import ImageRouteButton from '@components/common/button/ImageRouteButton';
import AppContainer from '@components/common/container/AppContainer';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import styled from '@emotion/styled';
import { ButtonContainer } from '@pages/Admin/AdminWorkspace';
import orderImage from '@resources/image/orderImage.png';
import { colFlex } from '@styles/flexStyles';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  ${colFlex({ align: 'center' })}
`;

function SuperAdminManage() {
  const navigate = useNavigate();
  return (
    <AppContainer contentsJustify={'center'}>
      <Container>
        <TitleNavBar title={'관리 페이지'} />
        <ButtonContainer>
          <ImageRouteButton src={orderImage} onClick={() => navigate('/super-admin/workspace')} buttonText={'워크스페이스 조회'} />
          <ImageRouteButton src={orderImage} onClick={() => navigate('/super-admin/user')} buttonText={'사용자 조회'} />
          <ImageRouteButton src={orderImage} onClick={() => navigate('/super-admin/email')} buttonText={'이메일 조회'} />
        </ButtonContainer>
      </Container>
    </AppContainer>
  );
}

export default SuperAdminManage;
