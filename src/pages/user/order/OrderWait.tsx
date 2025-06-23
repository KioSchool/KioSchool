import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OrderButton from '@components/user/order/OrderButton';
import OrderStickyNavBar from '@components/user/order/OrderStickyNavBar';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userOrderAtom, userWorkspaceAtom } from 'src/jotai/user/atoms';
import OrderAccountInfo from '@components/user/order/OrderAccountInfo';
import HorizontalDivider from '@components/common/divider/HorizontalDivider';
import { Color } from '@resources/colors';
import { useEffect } from 'react';
import useBlockPopState from '@hooks/useBlockPopState';
import { OrderStatus } from '@@types/index';
import useOrder from '@hooks/user/useOrder';

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

const Label = styled.div`
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
  const orderId = searchParams.get('orderId') || null;
  const isTossPay = searchParams.get('tossPay') === 'true';

  const workspace = useAtomValue(userWorkspaceAtom);
  const currentOrder = useAtomValue(userOrderAtom);

  const fetchIntervalTime = 1000;
  const { fetchOrder } = useOrder();

  useBlockPopState();

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchOrder(orderId);
    }, fetchIntervalTime);

    return () => clearInterval(intervalId);
  }, [workspaceId]);

  const currentOrderStatus = currentOrder?.status;
  const totalPrice = currentOrder?.totalPrice ?? 0;

  const navigateToComplete = () => {
    navigate({
      pathname: '/order-complete',
      search: createSearchParams({
        orderId: orderId || '',
        workspaceId: workspaceId || '',
        tableNo: tableNo || '',
      }).toString(),
    });
  };

  useEffect(() => {
    if (currentOrderStatus && currentOrderStatus !== OrderStatus.NOT_PAID) {
      navigateToComplete();
    }
  }, [currentOrderStatus]);

  const waitingText = isTossPay
    ? '현재 결제 확인 중입니다. 토스 앱이 자동으로 열리지 않았다면 재시도 해보시거나, 위 계좌로 직접 송금해주세요. 결제가 확인되면 자동으로 주문 내역 페이지로 이동합니다. 결제 완료까지 최대 3분정도 소요될 수 있습니다.'
    : '위 계좌로 송금을 완료해주세요. 송금 후에는 잠시만 기다려주세요. 결제가 확인되면 자동으로 주문 내역 페이지로 이동합니다. 결제 완료까지 최대 3분정도 소요될 수 있습니다.';

  const orderButtonText = '결제 확인 중 . . .';

  const handleButtonClick = () => {
    if (currentOrderStatus === OrderStatus.NOT_PAID) {
      alert('결제 확인 중입니다. 대기가 길어질 경우 운영진에게 문의해주세요.');
    }
  };

  return (
    <Container className={'order-wait-container'}>
      <OrderStickyNavBar useLeftArrow={false} showNavBar={true} workspaceName={workspace.name} tableNo={tableNo} useShareButton={false} />
      <SubContainer className={'order-wait-sub-container'}>
        <ContentsContainer>
          <OrderAccountInfo />
          <HorizontalDivider />
          <OrderInfoContainer>
            <Label>결제 금액</Label>
            <Label>{totalPrice.toLocaleString()}원</Label>
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
