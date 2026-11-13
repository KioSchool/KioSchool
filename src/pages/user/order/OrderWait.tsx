import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import OrderStickyNavBar from '@components/user/order/OrderStickyNavBar';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userWorkspaceAccountsAtom, userWorkspaceAtom } from '@jotai/user/atoms';
import { useEffect, useState } from 'react';
import useBlockPopState from '@hooks/useBlockPopState';
import { Order, OrderStatus, PaymentMethod } from '@@types/index';
import useOrder from '@hooks/user/useOrder';
import { defaultAccountValue, defaultUserOrderValue } from '@@types/defaultValues';
import useWorkspace from '@hooks/user/useWorkspace';
import usePayAppPopup from '@hooks/user/usePayAppPopup';
import { ORDER_ROUTES } from '@constants/routes';
import { isOverOneDay } from '@utils/formatDate';
import { getCachedWorkspaceAccount, getPayAppUrl, isPayApp } from '@utils/payMethods';
import OrderWaitHeader from '@components/user/order/wait/OrderWaitHeader';
import NotSentYetPanel from '@components/user/order/wait/NotSentYetPanel';
import BankAccountCard from '@components/user/order/wait/BankAccountCard';
import OrderItemsCard from '@components/user/order/wait/OrderItemsCard';
import { Color } from '@resources/colors';

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  padding-top: 50px;
  background: ${Color.WHITE};
`;

const SubContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px 20px 0;
  gap: 14px;
  ${colFlex({ align: 'stretch' })}
`;

const Tip = styled.p`
  margin: 0;
  padding: 12px 0 24px;
  color: #9aa1a6;
  font-size: 12px;
  text-align: center;
`;

const PAYMENT_METHODS = Object.values(PaymentMethod) as string[];

// 배포 전에 열린 옛 대기 주소에는 method 대신 tossPay=true|false만 있다
const getWaitMethod = (searchParams: URLSearchParams): PaymentMethod => {
  const method = searchParams.get('method');
  if (method && PAYMENT_METHODS.includes(method)) return method as PaymentMethod;
  if (searchParams.get('tossPay') === 'true') return PaymentMethod.TOSS;
  return PaymentMethod.BANK_TRANSFER;
};

function OrderWait() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');
  const orderId = searchParams.get('orderId') || null;
  const method = getWaitMethod(searchParams);

  const { fetchWorkspace, fetchWorkspaceAccount } = useWorkspace();
  const { openPayAppSync } = usePayAppPopup();

  const workspace = useAtomValue(userWorkspaceAtom);
  const [currentOrder, setCurrentOrder] = useState<Order>(defaultUserOrderValue);
  const workspaceAccounts = useAtomValue(userWorkspaceAccountsAtom);
  const accountInfo = getCachedWorkspaceAccount(workspaceAccounts, workspaceId) || defaultAccountValue;

  const fetchIntervalTime = 5000;
  const { fetchOrder } = useOrder();

  useBlockPopState();

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    let terminated = false;

    const stopPolling = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const pollOrder = async () => {
      if (!orderId) return;

      const orderData = await fetchOrder(orderId);
      setCurrentOrder(orderData);

      if (isOverOneDay(orderData.createdAt)) {
        terminated = true;
        stopPolling();
      }
    };

    const startPolling = () => {
      if (intervalId || terminated) return;
      intervalId = setInterval(pollOrder, fetchIntervalTime);
    };

    // 백그라운드 탭에서는 모바일 OS가 fetch를 throttle/abort 하므로 폴링 자체를 멈춘다.
    // 송금하러 토스/은행 앱으로 이탈하는 화면이라 특히 자주 발생한다.
    const handleVisibilityChange = () => {
      if (terminated) return;

      if (document.hidden) {
        stopPolling();
      } else {
        pollOrder();
        startPolling();
      }
    };

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

    if (!document.hidden) {
      pollOrder();
      startPolling();
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);

    fetchWorkspace(workspaceId);
    fetchWorkspaceAccount(workspaceId);

    return () => {
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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

  const handleReopenPayApp = () => {
    openPayAppSync({
      accountUrl: getPayAppUrl(accountInfo, method),
      amount: totalPrice,
      closeDelay: 5000,
    });
  };

  return (
    <Container className={'order-wait-container'}>
      <OrderStickyNavBar useLeftArrow={false} showNavBar={true} workspaceName={workspace.name} tableNo={tableNo} useShareButton={false} />
      <SubContainer className={'order-wait-sub-container'}>
        <OrderWaitHeader method={method} amount={totalPrice} />
        {isPayApp(method) && <NotSentYetPanel method={method} account={accountInfo} onReopen={handleReopenPayApp} />}
        {!isPayApp(method) && <BankAccountCard account={accountInfo} />}
        <OrderItemsCard orderProducts={currentOrder?.orderProducts ?? []} totalPrice={totalPrice} />
      </SubContainer>
      <Tip>이 화면을 닫지 말고 기다려 주세요</Tip>
    </Container>
  );
}

export default OrderWait;
