import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OrderStickyNavBar from '@components/user/order/OrderStickyNavBar';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userWorkspaceAtom } from '@jotai/user/atoms';
import OrderAccountInfo from '@components/user/order/orderWait/OrderAccountInfo';
import OrderWaitTipBanner from '@components/user/order/orderWait/OrderWaitTipBanner';
import OrderWaitStepGuide from '@components/user/order/orderWait/OrderWaitStepGuide';
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
import { BANK_TRANSFER_TIPS, TOSS_TIPS } from '@constants/data/orderWaitData';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 50px;
`;

const SubContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px 20px 80px 20px;
  gap: 24px;
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

const PriceLabel = styled(Label)`
  font-size: 18px;
  font-weight: 700;
  color: ${Color.KIO_ORANGE};
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

  const tips = isTossPay ? TOSS_TIPS : BANK_TRANSFER_TIPS;

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
      search: createSearchParams(searchParams).toString(),
    });
  };

  useEffect(() => {
    if (currentOrderStatus && currentOrderStatus !== OrderStatus.NOT_PAID) {
      navigateToComplete();
    }
  }, [currentOrderStatus]);

  const handleTossRetry = () => {
    openTossPopupSync({
      tossAccountUrl,
      amount: totalPrice,
      closeDelay: 5000,
    });
  };

  return (
    <Container className={'order-wait-container'}>
      <OrderWaitTipBanner tips={tips} />
      <OrderStickyNavBar useLeftArrow={false} showNavBar={true} workspaceName={workspace.name} tableNo={tableNo} useShareButton={false} />
      <SubContainer className={'order-wait-sub-container'}>
        <ContentsContainer>
          <OrderAccountInfo />
          <HorizontalDivider />
          <OrderInfoContainer>
            <Label>송금하실 금액</Label>
            <PriceLabel>{totalPrice.toLocaleString()}원</PriceLabel>
          </OrderInfoContainer>
          <HorizontalDivider />
          <OrderWaitStepGuide isTossPay={isTossPay} onTossRetry={handleTossRetry} />
        </ContentsContainer>
      </SubContainer>
      <PollingStatusContainer>
        입금 내역을 확인하고 있습니다 <Dot className="dots" />
      </PollingStatusContainer>
    </Container>
  );
}

export default OrderWait;
