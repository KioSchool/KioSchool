import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import styled from '@emotion/styled';
import OrderButton from '@components/user/order/OrderButton';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { colFlex } from '@styles/flexStyles';
import useOrder from '@hooks/user/useOrder';
import OrderStickyNavBar from '@components/user/order/OrderStickyNavBar';
import OrderPayRadio from '@components/user/order/OrderPayRadio';
import OrderPayDescription from '@components/user/order/OrderPayDescription';
import { HttpStatusCode } from 'axios';
import { userOrderBasketAtom, userWorkspaceAtom } from 'src/jotai/user/atoms';
import { useAtom, useAtomValue } from 'jotai';
import NewAppInput from '@components/common/input/NewAppInput';
import { Color } from '@resources/colors';
import HorizontalDivider from '@components/common/divider/HorizontalDivider';
import usePreventRefresh from '@hooks/usePreventRefresh';
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

const InputContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
  gap: 10px;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const InputLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${Color.BLACK};
`;

function OrderPay() {
  const workspace = useAtomValue(userWorkspaceAtom);
  const [orderBasket, setOrderBasket] = useAtom(userOrderBasketAtom);
  const productsMap = _.keyBy(workspace.products, 'id');
  const totalAmount = orderBasket.reduce((acc, cur) => {
    return acc + productsMap[cur.productId].price * cur.quantity;
  }, 0);

  const navigate = useNavigate();
  const { createOrder } = useOrder();
  const { openTossPopupWithPromise } = useTossPopup();
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');

  const account = workspace.owner.account;
  const tossAccountUrl = account?.tossAccountUrl;
  const isTossAvailable = !!tossAccountUrl;

  const [isTossPay, setIsTossPay] = useState<boolean>(isTossAvailable);
  const customerNameRef = useRef<HTMLInputElement>(null);

  const errorHandler = (error: any) => {
    if (error.response?.status === HttpStatusCode.NotAcceptable) {
      alert('품절된 상품이 있습니다. 주문 화면으로 돌아갑니다.');
      setOrderBasket([]);
      navigate(-2);
      return;
    }

    if (error.response?.status === HttpStatusCode.NotFound) {
      alert('존재하지 않는 상품이 있습니다. 주문 화면으로 돌아갑니다.');
      setOrderBasket([]);
      navigate(-2);
      return;
    }

    if (error.response?.status === HttpStatusCode.BadRequest) {
      alert(error.response?.data?.message || '알 수 없는 오류가 발생했습니다.');
      return;
    }
  };
  usePreventRefresh();

  useEffect(() => {
    customerNameRef.current?.focus();
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
      promise: createOrder(workspaceId, tableNo, orderBasket, customerName),
      onSuccess: (res) => {
        navigate({
          pathname: '/order-wait',
          search: createSearchParams({
            orderId: res.data.id.toString(),
            workspaceId: workspaceId || '',
            tableNo: tableNo || '',
            tossPay: 'true',
          }).toString(),
        });
      },
      onError: errorHandler,
    });
  };

  const createOrderAndNavigateToComplete = (customerName: string) => {
    createOrder(workspaceId, tableNo, orderBasket, customerName)
      .then((res) => {
        navigate({
          pathname: '/order-wait',
          search: createSearchParams({
            orderId: res.data.id.toString(),
            workspaceId: workspaceId || '',
            tableNo: tableNo || '',
          }).toString(),
        });
      })
      .catch(errorHandler);
  };

  const payOrder = () => {
    const customerName = customerNameRef.current?.value;

    if (!customerName) {
      alert('입금자명을 입력해주세요.');
      return;
    }

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
          <InputContainer>
            <InputLabel>입금자명</InputLabel>
            <NewAppInput ref={customerNameRef} placeholder={'입금자명을 입력해주세요.'} width={'100%'} height={33} />
          </InputContainer>
          <HorizontalDivider />
          <OrderPayRadio isTossAvailable={isTossAvailable} isTossPay={isTossPay} setIsTossPay={setIsTossPay} />
          <HorizontalDivider />
          <OrderPayDescription />
        </ContentsContainer>
      </SubContainer>
      <OrderButton
        showButton={orderBasket.length > 0}
        buttonLabel={`${totalAmount.toLocaleString()}원 · ${isTossPay ? 'Toss로' : '계좌로'} 결제하기`}
        onClick={payOrder}
      />
    </Container>
  );
}

export default OrderPay;
