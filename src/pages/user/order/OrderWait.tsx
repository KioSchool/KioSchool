import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OrderButton from '@components/user/order/OrderButton';
import OrderStickyNavBar from '@components/user/order/OrderStickyNavBar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { adminOrdersAtom } from 'src/jotai/admin/atoms';
import { userWorkspaceAtom } from 'src/jotai/user/atoms';
import OrderAccountInfo from '@components/user/order/OrderAccountInfo';
import HorizontalDivider from '@components/common/divider/HorizontalDivider';
import { Color } from '@resources/colors';
import { useEffect } from 'react';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import useOrdersWebsocket from '@hooks/user/useOrdersWebsocket';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 50px;
`;

const SubContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px 20px 0 20px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const ContentsContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 12px 10px;
  gap: 20px;
  border-radius: 9px;
  border: 0.5px solid #939393;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const OrderInfoContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const StyledLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
`;

const DescriptionContainer = styled.div`
  width: 100%;
`;

const DescriptionText = styled.div`
  box-sizing: border-box;
  border-radius: 10px;
  width: 100%;
  font-size: 13px;
  font-weight: 500;
  color: #898989;
  text-align: center;
  box-sizing: border-box;
  background: ${Color.LIGHT_GREY};
  padding: 20px 30px;
  word-break: keep-all;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

function OrderWait() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');
  const orderId = searchParams.get('orderId');
  const isTossAvailable = searchParams.get('isTossAvailable') === 'true';

  const workspace = useAtomValue(userWorkspaceAtom);
  const adminOrders = useAtomValue(adminOrdersAtom);

  const { fetchTodayOrders } = useAdminOrder(workspaceId || undefined);
  const { subscribeOrders, unsubscribeOrders } = useOrdersWebsocket(workspaceId || undefined);

  useEffect(() => {
    if (workspaceId) {
      fetchTodayOrders();
      subscribeOrders();
    }
    return () => {
      if (workspaceId) {
        unsubscribeOrders();
      }
    };
  }, [workspaceId]);

  const currentOrder = adminOrders.find((order) => order.id === Number(orderId));
  const currentOrderStatus = currentOrder?.status;
  const totalPrice = currentOrder?.totalPrice ?? 0;

  const navigateToComplete = () => {
    navigate(`/order-complete?orderId=${orderId}&workspaceId=${workspaceId}&tableNo=${tableNo}`);
  };

  useEffect(() => {
    if (currentOrderStatus === 'PAID') {
      unsubscribeOrders();
      navigateToComplete();
    }
  }, [currentOrderStatus]);

  const waitingText = isTossAvailable
    ? '현재 결제 확인 중입니다. 토스 앱이 자동으로 열리지 않았다면, 위 계좌로 직접 송금해주세요. 결제가 확인되면 자동으로 주문 내역 페이지로 이동합니다.'
    : '위 계좌로 송금을 완료해주세요. 송금 후에는 잠시만 기다려주세요. 결제가 확인되면 자동으로 주문 내역 페이지로 이동합니다.';

  const orderButtonText = currentOrderStatus === 'NOT_PAID' ? '결제 확인 중 . . .' : '주문 확인 페이지로 이동';

  const handleButtonClick = () => {
    if (currentOrderStatus === 'NOT_PAID') {
      alert('결제 확인 중입니다. 대기가 길어질 경우 운영진에게 문의해주세요.');
    }
  };

  return (
    <Container className={'order-wait-container'}>
      <OrderStickyNavBar showNavBar={true} workspaceName={workspace.name} tableNo={tableNo} useShareButton={false} />
      <SubContainer className={'order-wait-sub-container'}>
        <ContentsContainer>
          <OrderAccountInfo />
          <HorizontalDivider />
          <OrderInfoContainer>
            <StyledLabel>결제 금액</StyledLabel>
            <StyledLabel>{totalPrice.toLocaleString()}원</StyledLabel>
          </OrderInfoContainer>
          <DescriptionContainer>
            <DescriptionText>{waitingText}</DescriptionText>
          </DescriptionContainer>
        </ContentsContainer>
      </SubContainer>
      <OrderButton showButton={true} buttonLabel={orderButtonText} onClick={handleButtonClick} />
    </Container>
  );
}

export default OrderWait;
