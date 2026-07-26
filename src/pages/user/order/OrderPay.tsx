import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import styled from '@emotion/styled';
import OrderButton from '@components/user/order/OrderButton';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { colFlex } from '@styles/flexStyles';
import useOrder from '@hooks/user/useOrder';
import useWorkspace from '@hooks/user/useWorkspace';
import OrderStickyNavBar from '@components/user/order/OrderStickyNavBar';
import OrderPayRadio from '@components/user/order/OrderPayRadio';
import OrderPayDescription from '@components/user/order/OrderPayDescription';
import { API_ERROR_CODES } from '@constants/errorCodes';
import { getApiErrorMessage, isApiErrorCode } from '@utils/apiError';
import { userOrderBasketAtom, userProductsAtom, userWorkspaceAtom } from '@jotai/user/atoms';
import { useAtom, useAtomValue } from 'jotai';
import HorizontalDivider from '@components/common/divider/HorizontalDivider';
import usePreventRefresh from '@hooks/usePreventRefresh';
import useTossPopup from '@hooks/user/useTossPopup';
import { Account } from '@@types/index';
import { defaultAccountValue } from '@@types/defaultValues';

// 주문 대상이 사라진 경우. 장바구니를 비우고 주문 화면으로 되돌린다.
const MISSING_ORDER_TARGET_CODES = [API_ERROR_CODES.NOT_FOUND_PRODUCT, API_ERROR_CODES.WORKSPACE_NOT_FOUND, API_ERROR_CODES.WORKSPACE_TABLE_NOT_FOUND] as const;

// 주문을 받을 수 없는 상태. 안내만 하고 화면은 유지한다.
const UNORDERABLE_STATE_CODES = [API_ERROR_CODES.NO_ORDER_SESSION, API_ERROR_CODES.ORDER_SESSION_ALREADY_EXIST, API_ERROR_CODES.TABLE_HASH_IS_NULL] as const;

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

function OrderPay() {
  const workspace = useAtomValue(userWorkspaceAtom);
  const products = useAtomValue(userProductsAtom);
  const [orderBasket, setOrderBasket] = useAtom(userOrderBasketAtom);
  const productsMap = _.keyBy(products, 'id');
  const totalAmount = orderBasket.reduce((acc, cur) => {
    return acc + productsMap[cur.productId].price * cur.quantity;
  }, 0);

  const navigate = useNavigate();
  const { createOrder } = useOrder();
  const { fetchWorkspaceAccount } = useWorkspace();
  const { openTossPopupWithPromise } = useTossPopup();
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');
  const tableHash = searchParams.get('tableHash');

  const [accountInfo, setAccountInfo] = useState<Account>(defaultAccountValue);
  const tossAccountUrl = accountInfo?.tossAccountUrl;
  const isTossAvailable = !!tossAccountUrl;

  const [isTossPay, setIsTossPay] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const customerNameRef = useRef<HTMLInputElement>(null);

  const errorHandler = (error: unknown) => {
    if (isApiErrorCode(error, API_ERROR_CODES.NOT_SELLABLE_PRODUCT)) {
      alert('품절된 상품이 있습니다. 주문 화면으로 돌아갑니다.');
      setOrderBasket([]);
      navigate(-2);
      return;
    }

    if (isApiErrorCode(error, ...MISSING_ORDER_TARGET_CODES)) {
      alert(getApiErrorMessage(error, '주문 대상을 찾을 수 없습니다. 주문 화면으로 돌아갑니다.'));
      setOrderBasket([]);
      navigate(-2);
      return;
    }

    if (isApiErrorCode(error, ...UNORDERABLE_STATE_CODES)) {
      alert(getApiErrorMessage(error, '알 수 없는 오류가 발생했습니다.'));
    }
  };
  usePreventRefresh();

  useEffect(() => {
    customerNameRef.current?.focus();

    fetchWorkspaceAccount(workspaceId).then((account) => {
      if (account) {
        setAccountInfo(account);
        if (account.tossAccountUrl) {
          setIsTossPay(true);
        }
      }
    });
  }, []);

  /**
   * Safari 브라우저 호환성 이슈 대응
   *
   * 문제점: Safari는 비동기 API 호출 후 window.open() 실행 시 팝업 차단이 발생함
   *
   * 해결책:
   * - Safari 브라우저 감지
   * - 비동기 API 호출 전에 빈 팝업창 미리 생성
   * - API 호출 성공 후 생성된 팝업창의 URL을 이용해 Toss 결제 창으로 이동
   */
  const createOrderAndNavigateToToss = (customerName: string) => {
    openTossPopupWithPromise({
      tossAccountUrl,
      amount: totalAmount,
      closeDelay: 5000,
      promise: createOrder(workspaceId, tableHash, orderBasket, customerName),
      onSuccess: (res) => {
        navigate({
          pathname: '/order-wait',
          search: createSearchParams({
            orderId: res.data.id.toString(),
            workspaceId: workspaceId || '',
            tableNo: tableNo || '',
            tableHash: tableHash || '',
            tossPay: 'true',
          }).toString(),
        });
      },
      onError: errorHandler,
    })?.finally(() => setIsSubmitting(false));
  };

  const createOrderAndNavigateToComplete = (customerName: string) => {
    createOrder(workspaceId, tableHash, orderBasket, customerName)
      .then((res) => {
        navigate({
          pathname: '/order-wait',
          search: createSearchParams({
            orderId: res.data.id.toString(),
            workspaceId: workspaceId || '',
            tableNo: tableNo || '',
            tableHash: tableHash || '',
            tossPay: 'false',
          }).toString(),
        });
      })
      .catch(errorHandler)
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const payOrder = () => {
    if (isSubmitting) return;

    const customerName = customerNameRef.current?.value;

    if (!customerName) {
      alert('송금자명을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    if (isTossPay) {
      createOrderAndNavigateToToss(customerName);
      return;
    }

    createOrderAndNavigateToComplete(customerName);
  };

  return (
    <Container className={'order-pay-container'}>
      <OrderStickyNavBar showNavBar={true} workspaceName={workspace.name} tableNo={tableNo} useShareButton={false} />
      <SubContainer className={'order-pay-sub-container'}>
        <ContentsContainer>
          <OrderPayRadio isTossAvailable={isTossAvailable} isTossPay={isTossPay} setIsTossPay={setIsTossPay} customerNameRef={customerNameRef} />
          <HorizontalDivider />
          <OrderPayDescription />
        </ContentsContainer>
      </SubContainer>
      <OrderButton
        showButton={orderBasket.length > 0}
        disabled={isSubmitting}
        buttonLabel={isSubmitting ? '주문 진행 중...' : `${totalAmount.toLocaleString()}원 · ${isTossPay ? '토스로 송금' : '계좌로 송금'}`}
        onClick={payOrder}
      />
    </Container>
  );
}

export default OrderPay;
