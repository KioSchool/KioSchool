import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OrderStickyNavBar from '@components/user/order/OrderStickyNavBar';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userWorkspaceAtom } from '@jotai/user/atoms';
import OrderAccountInfo from '@components/user/order/OrderAccountInfo';
import HorizontalDivider from '@components/common/divider/HorizontalDivider';
import { Color } from '@resources/colors';
import { useEffect, useState } from 'react';
import useBlockPopState from '@hooks/useBlockPopState';
import { Order, OrderStatus } from '@@types/index';
import useOrder from '@hooks/user/useOrder';
import { defaultUserOrderValue } from '@@types/defaultValues';
import { keyframes } from '@emotion/react';
import useWorkspace from '@hooks/user/useWorkspace';
import useTossPopup from '@hooks/user/useTossPopup';
import { ORDER_ROUTES } from '@constants/routes';
import { isOverOneDay } from '@utils/formatDate';

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
  padding-bottom: 30px;
`;

const HeaderBanner = styled.div`
  width: 100%;
  background-color: #fff3e0;
  padding: 12px 20px;
  box-sizing: border-box;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  word-break: keep-all;
  color: ${Color.KIO_ORANGE};
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
  box-sizing: border-box;
  border-radius: 10px;
  width: 100%;
  font-size: 13px;
  font-weight: 500;
  color: #898989;
  text-align: center;
  box-sizing: border-box;
  background: ${Color.LIGHT_GREY};
  padding: 20px 24px;
  word-break: keep-all;
  white-space: pre-wrap;
  gap: 12px;
  line-height: 1.5;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const RetryButton = styled.button`
  width: 145px;
  height: 30px;
  font-size: 12px;
  background: ${Color.WHITE};
  border: 0.5px solid #939393;
  border-radius: 45px;
  padding: 0 10px;
  color: ${Color.BLACK};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const loadingDots = keyframes`
  0%, 20% { content: '.'; }
  40% { content: '..'; }
  60% { content: '...'; }
  80%, 100% { content: ''; }
`;

const PollingStatusContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: ${Color.WHITE};
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
  font-size: 15px;
  font-weight: 600;
  color: ${Color.BLACK};
  z-index: 10;
  ${rowFlex({ justify: 'center', align: 'center' })}

  .dots::after {
    display: inline-block;
    animation: ${loadingDots} 1.5s infinite;
    content: '...';
    text-align: left;
    width: 20px;
  }
`;

const Dot = styled.span``;

function OrderWait() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');
  const orderId = searchParams.get('orderId') || null;
  const isTossPay = searchParams.get('tossPay') === 'true';

  const { fetchWorkspace } = useWorkspace();
  const { openTossPopupSync } = useTossPopup();

  const workspace = useAtomValue(userWorkspaceAtom);
  const [currentOrder, setCurrentOrder] = useState<Order>(defaultUserOrderValue);

  const account = workspace.owner.account;
  const tossAccountUrl = account?.tossAccountUrl;

  const fetchIntervalTime = 5000;
  const { fetchOrder } = useOrder();

  useBlockPopState();

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const pollOrder = async () => {
      if (!orderId) {
        alert('주문 ID가 없습니다. 초기 화면으로 돌아갑니다.');
        navigate({
          pathname: ORDER_ROUTES.ORDER,
          search: createSearchParams({
            workspaceId: workspaceId || '',
            tableNo: tableNo || '',
          }).toString(),
        });
        return;
      }

      const orderData = await fetchOrder(orderId);
      setCurrentOrder(orderData);

      if (intervalId && isOverOneDay(orderData.createdAt)) {
        clearInterval(intervalId);
      }
    };

    pollOrder();
    fetchWorkspace(workspaceId);

    intervalId = setInterval(pollOrder, fetchIntervalTime);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [orderId]);

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
    ? '현재 결제 확인 중입니다.\n\n토스 앱이 자동으로 열리지 않았다면 재시도 해보시거나, 위 계좌로 직접 송금해주세요. 송금이 완료되면 창을 닫지 말고 잠시만 기다려주세요.\n\n확인이 완료되면 자동으로 주문 내역 페이지로 이동합니다.'
    : '접수된 주문건의 조리가 시작되기 위하여 위 계좌번호로 송금을 완료해주셔야 합니다.\n\n은행 앱을 켜서 계좌를 복사하여 송금을 완료하시고 잠시만 기다려주세요.\n\n입금 확인이 완료되면 자동으로 주문 내역 페이지로 이동합니다.';

  const handleTossRetry = () => {
    openTossPopupSync({
      tossAccountUrl,
      amount: totalPrice,
      closeDelay: 5000,
    });
  };

  return (
    <Container className={'order-wait-container'}>
      <HeaderBanner>운영진이 실시간으로 송금 내역을 직접 확인하고 있습니다</HeaderBanner>
      <OrderStickyNavBar useLeftArrow={false} showNavBar={true} workspaceName={workspace.name} tableNo={tableNo} useShareButton={false} />
      <SubContainer className={'order-wait-sub-container'}>
        <ContentsContainer>
          <OrderAccountInfo />
          <HorizontalDivider />
          <OrderInfoContainer>
            <Label>송금하실 금액</Label>
            <Label style={{ color: Color.KIO_ORANGE }}>{totalPrice.toLocaleString()}원</Label>
          </OrderInfoContainer>
          <HorizontalDivider />
          <DescriptionContainer>
            {waitingText}
            {isTossPay && <RetryButton onClick={handleTossRetry}>토스 앱 다시 열기</RetryButton>}
          </DescriptionContainer>
        </ContentsContainer>
      </SubContainer>
      <PollingStatusContainer>
        입금 내역을 확인하고 있습니다 <Dot className="dots" />
      </PollingStatusContainer>
    </Container>
  );
}

export default OrderWait;
