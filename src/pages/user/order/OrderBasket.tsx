import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import ProductCounterBadge from '@components/user/product/ProductCounterBadge';
import _ from 'lodash';
import OrderButton from '@components/user/order/OrderButton';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OrderStickyNavBar from '@components/user/order/OrderStickyNavBar';
import { Color } from '@resources/colors';
import HorizontalDivider from '@components/common/divider/HorizontalDivider';
import { userOrderBasketAtom, userProductsAtom, userWorkspaceAtom } from '@jotai/user/atoms';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useMemo } from 'react';
import useOrder from '@hooks/user/useOrder';
import { API_ERROR_CODES } from '@constants/errorCodes';
import { isApiErrorCode } from '@utils/apiError';
import { calculateBasketTotalAmount, getBasketItemsWithProduct } from '@utils/orderBasket';

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
  const products = useAtomValue(userProductsAtom);
  const [orderBasket, setOrderBasket] = useAtom(userOrderBasketAtom);
  const productsMap = useMemo(() => {
    return _.keyBy(products, 'id');
  }, [products]);

  const basketItems = useMemo(() => getBasketItemsWithProduct(orderBasket, productsMap), [orderBasket, productsMap]);
  const totalAmount = calculateBasketTotalAmount(orderBasket, productsMap);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');
  const tableHash = searchParams.get('tableHash');

  const { createOrder } = useOrder();

  // 담긴 게 없으면 주문 화면으로 되돌린다.
  // 상품 목록에서 사라진 항목만 남은 경우도 "보여줄 게 없는" 상태이므로 같이 처리한다.
  // 이 화면은 상품을 직접 조회하지 않고 주문 화면이 채워둔 목록을 쓰므로, 로딩 중을 빈 목록으로 오인할 여지가 없다.
  useEffect(() => {
    if (basketItems.length === 0) {
      navigate(-1);
    }
  }, [basketItems.length, navigate]);

  const clearOrderBasket = () => {
    if (confirm('정말로 모두 삭제하시겠습니까?')) {
      setOrderBasket([]);
    }
  };

  const errorHandler = (error: unknown) => {
    if (isApiErrorCode(error, API_ERROR_CODES.NOT_SELLABLE_PRODUCT)) {
      alert('품절된 상품이 있습니다. 주문 화면으로 돌아갑니다.');
      setOrderBasket([]);
      navigate(-1);
      return;
    }
  };

  const navigateHandler = () => {
    if (totalAmount === 0) {
      createOrder(workspaceId, tableHash, orderBasket, '0원 주문')
        .then((res) => {
          navigate({
            pathname: '/order-complete',
            search: createSearchParams({
              orderId: res.data.id.toString(),
              workspaceId: workspaceId || '',
              tableNo: tableNo || '',
              tableHash: tableHash || '',
            }).toString(),
          });
        })
        .catch(errorHandler);

      return;
    }

    navigate({
      pathname: '/order-pay',
      search: createSearchParams(searchParams).toString(),
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
          {basketItems.map(({ basketItem, product }, index) => {
            const isShowDivider = index !== basketItems.length - 1;

            return (
              <ProductCounterBadgeContainer key={basketItem.productId}>
                <ProductCounterBadge product={product} />
                {isShowDivider && <HorizontalDivider />}
              </ProductCounterBadgeContainer>
            );
          })}
        </OrderBasketContainer>
        <OrderButton showButton={basketItems.length > 0} buttonLabel={`${totalAmount.toLocaleString()}원 주문하기`} onClick={navigateHandler} />
      </SubContainer>
    </Container>
  );
}

export default OrderBasket;
