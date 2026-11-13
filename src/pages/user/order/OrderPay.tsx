import { match } from 'ts-pattern';
import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import styled from '@emotion/styled';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import useOrder from '@hooks/user/useOrder';
import useWorkspace from '@hooks/user/useWorkspace';
import OrderStickyNavBar from '@components/user/order/OrderStickyNavBar';
import OrderPayContent from '@components/user/order/pay/OrderPayContent';
import OrderPayFooter from '@components/user/order/pay/OrderPayFooter';
import { API_ERROR_CODES } from '@constants/errorCodes';
import { getApiErrorMessage, isApiErrorCode } from '@utils/apiError';
import { userOrderBasketAtom, userProductsAtom, userWorkspaceAtom } from '@jotai/user/atoms';
import { useAtom, useAtomValue } from 'jotai';
import usePreventRefresh from '@hooks/usePreventRefresh';
import usePayAppPopup from '@hooks/user/usePayAppPopup';
import useReturnToOrderPage from '@hooks/user/useReturnToOrderPage';
import { Account, PaymentMethod } from '@@types/index';
import { defaultAccountValue } from '@@types/defaultValues';
import { basketToGaItems, calculateBasketTotalAmount, getBasketItemsWithProduct } from '@utils/orderBasket';
import { trackEvent } from '@utils/analytics';
import { GA_CURRENCY, GA_EVENT } from '@constants/analytics';
import { getPayButtonCaption, getPayButtonLabel } from '@constants/data/payMethods';
import { getAvailablePayMethods, getPayAppUrl, isPayApp } from '@utils/payMethods';
import { Color } from '@resources/colors';

// 주문 대상이 사라진 경우. 장바구니를 비우고 주문 화면으로 되돌린다.
const MISSING_ORDER_TARGET_CODES = [API_ERROR_CODES.NOT_FOUND_PRODUCT, API_ERROR_CODES.WORKSPACE_NOT_FOUND, API_ERROR_CODES.WORKSPACE_TABLE_NOT_FOUND] as const;

// 주문을 받을 수 없는 상태. 안내만 하고 화면은 유지한다.
const UNORDERABLE_STATE_CODES = [API_ERROR_CODES.NO_ORDER_SESSION, API_ERROR_CODES.ORDER_SESSION_ALREADY_EXIST, API_ERROR_CODES.TABLE_HASH_IS_NULL] as const;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  padding: 50px 0 150px;
  background: ${Color.WHITE};
`;

const getOrderSummaryText = (firstName: string | undefined, otherCount: number) => {
  if (!firstName) return '';
  if (otherCount <= 0) return firstName;
  return `${firstName} 외 ${otherCount}개`;
};

function OrderPay() {
  const workspace = useAtomValue(userWorkspaceAtom);
  const products = useAtomValue(userProductsAtom);
  const [orderBasket, setOrderBasket] = useAtom(userOrderBasketAtom);
  const productsMap = _.keyBy(products, 'id');
  const basketItems = getBasketItemsWithProduct(orderBasket, productsMap);
  const totalAmount = calculateBasketTotalAmount(orderBasket, productsMap);

  const navigate = useNavigate();
  const { createOrder } = useOrder();
  const { fetchWorkspaceAccount } = useWorkspace();
  const { openPayAppWithPromise } = usePayAppPopup();
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');
  const tableHash = searchParams.get('tableHash');

  const [accountInfo, setAccountInfo] = useState<Account>(defaultAccountValue);
  const [isAccountLoaded, setIsAccountLoaded] = useState(false);
  // 조회가 실패해도 계좌이체로 주문은 받는다(대기 화면이 계좌를 다시 불러온다)
  const [isAccountFetchFailed, setIsAccountFetchFailed] = useState(false);
  const payMethods = match(isAccountFetchFailed)
    .with(true, () => [PaymentMethod.BANK_TRANSFER])
    .otherwise(() => getAvailablePayMethods(accountInfo));
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [firstItem] = basketItems;
  const otherItemCount = basketItems.length - 1;
  const summaryText = getOrderSummaryText(firstItem?.product.name, otherItemCount);
  const customerNameRef = useRef<HTMLInputElement>(null);

  const errorHandler = (error: unknown) => {
    if (isApiErrorCode(error, API_ERROR_CODES.NOT_SELLABLE_PRODUCT)) {
      alert('품절된 상품이 있습니다. 주문 화면으로 돌아갑니다.');
      setOrderBasket([]);
      return;
    }

    if (isApiErrorCode(error, ...MISSING_ORDER_TARGET_CODES)) {
      alert(getApiErrorMessage(error, '주문 대상을 찾을 수 없습니다. 주문 화면으로 돌아갑니다.'));
      setOrderBasket([]);
      return;
    }

    if (isApiErrorCode(error, ...UNORDERABLE_STATE_CODES)) {
      alert(getApiErrorMessage(error, '알 수 없는 오류가 발생했습니다.'));
    }
  };
  usePreventRefresh();

  useReturnToOrderPage(basketItems.length === 0);

  useEffect(() => {
    fetchWorkspaceAccount(workspaceId)
      .then((account) => {
        if (!account) return;
        setAccountInfo(account);
      })
      .catch(() => setIsAccountFetchFailed(true))
      .finally(() => setIsAccountLoaded(true));
  }, []);

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    if (customerNameRef.current?.value) return;
    // iOS는 터치 처리 안에서 focus해야 자판이 올라온다
    customerNameRef.current?.focus();
  };

  const navigateToWait = (orderId: number, method: PaymentMethod) => {
    navigate({
      pathname: '/order-wait',
      search: createSearchParams({
        orderId: orderId.toString(),
        workspaceId: workspaceId || '',
        tableNo: tableNo || '',
        tableHash: tableHash || '',
        method,
      }).toString(),
    });
  };

  /**
   * Safari 브라우저 호환성 이슈 대응
   *
   * 문제점: Safari는 비동기 API 호출 후 window.open() 실행 시 팝업 차단이 발생함
   *
   * 해결책:
   * - Safari 브라우저 감지
   * - 비동기 API 호출 전에 빈 팝업창 미리 생성
   * - API 호출 성공 후 생성된 팝업창의 URL을 이용해 토스·카카오페이 송금 창으로 이동
   */
  const createOrderAndOpenPayApp = (customerName: string, method: PaymentMethod) => {
    openPayAppWithPromise({
      accountUrl: getPayAppUrl(accountInfo, method),
      amount: totalAmount,
      closeDelay: 5000,
      promise: createOrder(workspaceId, tableHash, orderBasket, customerName, method),
      onSuccess: (res) => navigateToWait(res.data.id, method),
      onError: errorHandler,
    })?.finally(() => setIsSubmitting(false));
  };

  const createOrderAndNavigateToWait = (customerName: string) => {
    createOrder(workspaceId, tableHash, orderBasket, customerName, PaymentMethod.BANK_TRANSFER)
      .then((res) => navigateToWait(res.data.id, PaymentMethod.BANK_TRANSFER))
      .catch(errorHandler)
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const payOrder = () => {
    if (isSubmitting || !selectedMethod) return;

    const customerName = customerNameRef.current?.value;

    if (!customerName) {
      alert('송금자명을 입력해주세요.');
      return;
    }

    trackEvent(GA_EVENT.BEGIN_CHECKOUT, { items: basketToGaItems(orderBasket, productsMap), value: totalAmount, currency: GA_CURRENCY });

    setIsSubmitting(true);

    if (isPayApp(selectedMethod)) {
      createOrderAndOpenPayApp(customerName, selectedMethod);
      return;
    }

    createOrderAndNavigateToWait(customerName);
  };

  return (
    <Container className={'order-pay-container'}>
      <OrderStickyNavBar showNavBar={true} workspaceName={workspace.name} tableNo={tableNo} useShareButton={false} />
      <OrderPayContent
        totalAmount={totalAmount}
        summaryText={summaryText}
        methods={payMethods}
        selected={selectedMethod}
        onSelect={handleMethodSelect}
        isLoading={!isAccountLoaded}
        customerNameRef={customerNameRef}
      />
      {basketItems.length > 0 && (
        <OrderPayFooter
          label={match(isSubmitting)
            .with(true, () => '주문 진행 중...')
            .otherwise(() => getPayButtonLabel(selectedMethod, totalAmount, payMethods.length > 0))}
          caption={getPayButtonCaption(selectedMethod)}
          disabled={isSubmitting || !selectedMethod}
          onClick={payOrder}
        />
      )}
    </Container>
  );
}

export default OrderPay;
