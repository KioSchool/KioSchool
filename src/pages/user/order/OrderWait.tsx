import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OrderStickyNavBar from '@components/user/order/OrderStickyNavBar';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userWorkspaceAtom } from 'src/jotai/user/atoms';
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
  gap: 10px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const loadingDots = keyframes`
  0%, 20% {
    content: '.';
  }
  40% {
    content: '..';
  }
  60% {
    content: '...';
  }
  80%, 100% {
    content: '';
  }
`;

const AnimatedButtonContainer = styled.div`
  position: fixed;
  bottom: 50px;
  width: 100vw;
  height: 50px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const AnimatedButtonSubContainer = styled.div`
  padding: 10px;
  border-radius: 20px;
  background: ${Color.WHITE};
  box-shadow: 0 16px 32px 0 rgba(194, 191, 172, 0.6);
`;

const TheActualAnimatedButton = styled.button`
  width: 290px;
  height: 50px;
  background-color: ${Color.KIO_ORANGE};
  color: white;
  border: none;
  border-radius: 15px;
  cursor: default;
  font-size: 18px;
  font-weight: bold;
  ${rowFlex({ justify: 'center', align: 'center' })}

  .dots::after {
    display: inline-block;
    animation: ${loadingDots} 1.5s infinite;
    content: '...';
    text-align: left;
    width: 25px;
  }
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

const Dot = styled.span``;

function OrderWait() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');
  const orderId = searchParams.get('orderId') || null;
  const isTossPay = searchParams.get('tossPay') === 'true';

  const { fetchWorkspace } = useWorkspace();
  const { createTossUrl, createPopup, closePopupWithDelay, isSafariBrowser } = useTossPopup();

  const workspace = useAtomValue(userWorkspaceAtom);
  const [currentOrder, setCurrentOrder] = useState<Order>(defaultUserOrderValue);

  const account = workspace.owner.account;
  const tossAccountUrl = account?.tossAccountUrl;

  const fetchIntervalTime = 5000;
  const { fetchOrder } = useOrder();

  useBlockPopState();

  useEffect(() => {
    const pollOrder = async () => {
      if (!orderId) {
        alert('주문 ID가 없습니다. 초기 화면으로 돌아갑니다.');
        navigate({
          pathname: '/order',
          search: createSearchParams({
            workspaceId: workspaceId || '',
            tableNo: tableNo || '',
          }).toString(),
        });
        return;
      }

      const orderData = await fetchOrder(orderId);
      setCurrentOrder(orderData);
    };

    pollOrder();
    fetchWorkspace(workspaceId);

    const intervalId = setInterval(pollOrder, fetchIntervalTime);

    return () => clearInterval(intervalId);
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
    ? '현재 결제 확인 중입니다. 토스 앱이 자동으로 열리지 않았다면 재시도 해보시거나, 위 계좌로 직접 송금해주세요. 결제가 확인되면 자동으로 주문 내역 페이지로 이동합니다. 결제 확인까지 최대 3분정도 소요될 수 있습니다.'
    : '위 계좌로 송금을 완료해주세요. 송금 후에는 잠시만 기다려주세요. 결제가 확인되면 자동으로 주문 내역 페이지로 이동합니다. 결제 확인까지 최대 3분정도 소요될 수 있습니다.';

  const handleButtonClick = () => {
    if (currentOrderStatus === OrderStatus.NOT_PAID) {
      alert('결제 확인 중입니다. 대기가 길어질 경우 운영진에게 문의해주세요.');
    }
  };

  const handleTossRetry = () => {
    if (!tossAccountUrl) {
      alert('토스 이체 정보를 가져올 수 없습니다.');
      return null;
    }

    const closePopUpDelay = 5000;
    const tossUrl = createTossUrl(tossAccountUrl, totalPrice);
    const isSafari = isSafariBrowser();
    let popup: Window | null = null;

    if (isSafari) {
      popup = createPopup();
      if (popup) {
        popup.location.replace(tossUrl);
      }
    } else {
      popup = createPopup(tossUrl);
    }

    closePopupWithDelay(popup, closePopUpDelay);
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
            {waitingText}
            {isTossPay && <RetryButton onClick={handleTossRetry}>토스 앱 열기</RetryButton>}
          </DescriptionContainer>
        </ContentsContainer>
      </SubContainer>
      <AnimatedButtonContainer>
        <AnimatedButtonSubContainer>
          <TheActualAnimatedButton onClick={handleButtonClick}>
            결제 확인 중 <Dot className="dots" />
          </TheActualAnimatedButton>
        </AnimatedButtonSubContainer>
      </AnimatedButtonContainer>
    </Container>
  );
}

export default OrderWait;
