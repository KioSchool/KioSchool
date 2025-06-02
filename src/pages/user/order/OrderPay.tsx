import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { orderBasketAtom, userWorkspaceAtom } from '@recoils/atoms';
import _ from 'lodash';
import styled from '@emotion/styled';
import OrderButton from '@components/user/order/OrderButton';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { colFlex } from '@styles/flexStyles';
import useOrder from '@hooks/user/useOrder';
import OrderStickyNavBar from '@components/user/order/OrderStickyNavBar';
import OrderPayNavBar from '@components/user/order/OrderPayNavBar';
import OrderPayDescription from '@components/user/order/OrderPayDescription';
import { HttpStatusCode } from 'axios';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const SubContainer = styled.div`
  margin-top: 50px;
  gap: 20px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const InputContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  ${colFlex({ align: 'center' })}
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  padding: 0 10px;
  border: none;
  border-bottom: 1px solid #898989;
  font-size: 14px;
`;

const DescriptionContainer = styled.div`
  width: 100%;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

function OrderPay() {
  const workspace = useRecoilValue(userWorkspaceAtom);
  const [orderBasket, setOrderBasket] = useRecoilState(orderBasketAtom);
  const productsMap = _.keyBy(workspace.products, 'id');
  const totalAmount = orderBasket.reduce((acc, cur) => {
    return acc + productsMap[cur.productId].price * cur.quantity;
  }, 0);

  const navigate = useNavigate();
  const { createOrder } = useOrder();
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');

  const account = workspace.owner.account;
  const tossAccountUrl = account?.tossAccountUrl;
  const isTossAvailable = !!tossAccountUrl;

  const [isTossPay, setIsTossPay] = useState<boolean>(isTossAvailable);
  const customerNameRef = useRef<HTMLInputElement>(null);

  const errorHandler = (error: any) => {
    if (error.response.status === HttpStatusCode.NotAcceptable) {
      alert('품절된 상품이 있습니다. 주문 화면으로 돌아갑니다.');
      setOrderBasket([]);
      navigate(-2);
      return;
    }
  };

  useEffect(() => {
    if (orderBasket.length === 0) {
      alert('잘못된 접근입니다.');
      navigate(1);
    }
    customerNameRef.current?.focus();
  }, [isTossPay]);

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
    const tossUrl = `${tossAccountUrl}&amount=${totalAmount}`;
    const userAgent = navigator.userAgent.toLowerCase();
    const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');

    let popup: Window | null = null;
    if (isSafari && totalAmount !== 0) {
      popup = window.open(undefined);
    }

    createOrder(workspaceId, tableNo, orderBasket, customerName)
      .then((res) => {
        navigate({
          pathname: '/order-complete',
          search: createSearchParams({
            orderId: res.data.id.toString(),
            workspaceId: workspaceId || '',
            tableNo: tableNo || '',
          }).toString(),
        });

        if (!isSafari && totalAmount !== 0) {
          window.open(tossUrl);
        }
      })
      .catch(errorHandler)
      .then(() => {
        if (isSafari && totalAmount !== 0) {
          popup?.location.replace(tossUrl);
        }
      });
  };

  const createOrderAndNavigateToComplete = (customerName: string) => {
    createOrder(workspaceId, tableNo, orderBasket, customerName)
      .then((res) => {
        navigate({
          pathname: '/order-complete',
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
        <OrderPayNavBar isTossAvailable={isTossAvailable} isTossPay={isTossPay} setIsTossPay={setIsTossPay} />
        <InputContainer>
          <Input type="text" placeholder={'입금자명을 입력해주세요.'} ref={customerNameRef} />
        </InputContainer>
        <DescriptionContainer>
          <OrderPayDescription isTossPay={isTossPay} />
        </DescriptionContainer>
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
