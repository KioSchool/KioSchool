import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import ProductCounterBadge from '@components/user/product/ProductCounterBadge';
import _ from 'lodash';
import OrderButton from '@components/user/order/OrderButton';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OrderStickyNavBar from '@components/user/order/OrderStickyNavBar';
import { Color } from '@resources/colors';
import HorizontalDivider from '@components/common/divider/HorizontalDivider';
import { userOrderBasketAtom, userWorkspaceAtom } from 'src/jotai/user/atoms';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useMemo } from 'react';
import useOrder from '@hooks/user/useOrder';
import { HttpStatusCode } from 'axios';

const Container = styled.div`
  min-height: 100vh;
  padding-top: 50px;
  box-sizing: border-box;
`;

const SubContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px 120px 20px;
  gap: 20px;
  padding-top: 12px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const OrderBasketContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 15px 20px;
  gap: 10px;
  border-radius: 9px;
  border: 0.5px solid #939393;
  ${colFlex({ align: 'center' })}
`;

const Header = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Button = styled.button`
  width: 80px;
  height: 20px;
  background: #c2c2c2;
  color: ${Color.WHITE};
  font-size: 12px;
  border: none;
  font-weight: 600;
  border-radius: 20px;
`;

const StyledLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const ProductCounterBadgeContainer = styled.div`
  width: 100%;
  gap: 10px;
  ${colFlex()}
`;

function OrderBasket() {
  const workspace = useAtomValue(userWorkspaceAtom);
  const [orderBasket, setOrderBasket] = useAtom(userOrderBasketAtom);
  const productsMap = useMemo(() => {
    return _.keyBy(workspace.products, 'id');
  }, [workspace.products]);

  useEffect(() => {
    const invalidItems = orderBasket.filter((item) => !productsMap[item.productId]);

    if (invalidItems.length > 0) {
      console.error('장바구니에서 유효하지 않은 상품이 감지되어 제거되었습니다.', {
        제거된_상품: invalidItems,
        현재_장바구니_상태: orderBasket,
        현재_상품_목록_ID: Object.keys(productsMap),
        Workspace: workspace,
        ProductsMap: productsMap,
      });
      const validBasket = orderBasket.filter((item) => productsMap[item.productId]);
      setOrderBasket(validBasket);
    }
  }, [orderBasket, productsMap, setOrderBasket]);

  const validOrderBasket = orderBasket.filter((item) => productsMap[item.productId]);

  const totalAmount = validOrderBasket.reduce((acc, cur) => {
    return acc + productsMap[cur.productId].price * cur.quantity;
  }, 0);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');

  const { createOrder } = useOrder();

  useEffect(() => {
    if (orderBasket.length > 0 && validOrderBasket.length === 0) {
      navigate(-1);
    } else if (orderBasket.length === 0) {
      navigate(-1);
    }
  }, [orderBasket.length, validOrderBasket.length, navigate]);

  const clearOrderBasket = () => {
    if (confirm('정말로 모두 삭제하시겠습니까?')) {
      setOrderBasket([]);
    }
  };

  const errorHandler = (error: any) => {
    if (error.response.status === HttpStatusCode.NotAcceptable) {
      alert('품절된 상품이 있습니다. 주문 화면으로 돌아갑니다.');
      setOrderBasket([]);
      navigate(-1);
      return;
    }
  };

  const navigateHandler = () => {
    if (totalAmount === 0) {
      createOrder(workspaceId, tableNo, validOrderBasket, '0원 주문')
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

      return;
    }

    navigate({
      pathname: '/order-pay',
      search: createSearchParams({
        workspaceId: workspaceId || '',
        tableNo: tableNo || '',
      }).toString(),
    });
  };

  return (
    <Container className={'order-basket-container'}>
      <OrderStickyNavBar showNavBar={true} workspaceName={workspace.name} tableNo={tableNo} useShareButton={false} />
      <SubContainer>
        <Header>
          <StyledLabel>장바구니</StyledLabel>
          <Button onClick={clearOrderBasket}>전체 삭제 </Button>
        </Header>
        <OrderBasketContainer className={'order-basket-content'}>
          {validOrderBasket.map((basket, index) => {
            const product = productsMap[basket.productId];
            const isShowDivider = index !== validOrderBasket.length - 1;

            return (
              <ProductCounterBadgeContainer key={index}>
                <ProductCounterBadge product={product} />
                {isShowDivider && <HorizontalDivider />}
              </ProductCounterBadgeContainer>
            );
          })}
        </OrderBasketContainer>
        <OrderButton showButton={validOrderBasket.length > 0} buttonLabel={`${totalAmount.toLocaleString()}원 주문하기`} onClick={navigateHandler} />
      </SubContainer>
    </Container>
  );
}

export default OrderBasket;
