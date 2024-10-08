import ImageRouteButton from '@components/common/button/ImageRouteButton';
import orderImage from '@resources/image/orderImage.png';
import orderHistoryImage from '@resources/image/orderHistoryImage.png';
import orderManageImage from '@resources/image/orderManageImage.png';
import AppFooter from '@components/common/footer/AppFooter';
import AppContainer from '@components/common/container/AppContainer';
import { colFlex } from '@styles/flexStyles';
import styled from '@emotion/styled';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { ButtonContainer } from '../AdminWorkspace';

const Container = styled.div`
  width: 100%;
  ${colFlex({ align: 'center' })}
`;

function AdminOrderCheck() {
  const { replaceLastPath } = useCustomNavigate();

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      titleNavBarProps={{ title: '주문 조회', subTitle: '주문 조회를 다양하게 관리할 수 있습니다.', onLeftArrowClick: () => replaceLastPath('') }}
    >
      <Container className={'admin-workspace-container'}>
        <ButtonContainer className={'button-container'}>
          <ImageRouteButton src={orderImage} onClick={() => replaceLastPath('/orders')} buttonText={'실시간 주문 조회'} />
          <ImageRouteButton src={orderHistoryImage} onClick={() => replaceLastPath('/orders-history')} buttonText={'전체 주문 조회'} />
          <ImageRouteButton src={orderManageImage} onClick={() => replaceLastPath('/orders-table')} buttonText={'테이블별 주문 조회'} />
        </ButtonContainer>
        <AppFooter />
      </Container>
    </AppContainer>
  );
}

export default AdminOrderCheck;
