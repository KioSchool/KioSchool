import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useOrdersWebsocket from '@hooks/user/useOrdersWebsocket';
import { useRecoilValue } from 'recoil';
import { ordersAtom, productsAtom } from '@recoils/atoms';
import PaidOrderCard from '@components/admin/order/PaidOrderCard';
import NotPaidOrderCard from '@components/admin/order/NotPaidOrderCard';
import ServedOrderCard from '@components/admin/order/ServedOrderCard';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import styled from '@emotion/styled';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import VerticalDivider from '@components/common/divider/VerticalDivider';
import AppLabel from '@components/common/label/AppLabel';
import _ from 'lodash';
import useAdminProducts from '@hooks/admin/useAdminProducts';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const KanbanContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
  height: 65%;
  justify-content: center;
`;

const OrderColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  gap: 10px;
  overflow: auto;
  scrollbar-width: none;
`;

const OrderHeader = styled.div`
  background: white;
  position: sticky;
  top: 0;
  width: 350px;
  height: 110px;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ProductsByOrderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
`;

const ProductsByOrderSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;
  gap: 10px;
  background: #f8f8f8;
  padding: 10px;
  box-sizing: border-box;
`;

const ProductsContainer = styled.div`
  display: flex;
  height: 100%;
  gap: 10px;
  overflow: auto;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 160px;
  padding: 5px;
  box-sizing: border-box;
  background: white;
  border-radius: 10px;
  gap: 5px;
`;

const ProductImage = styled.img`
  border-radius: 10px;
  width: 80px;
  height: 80px;
  object-fit: fill;
`;

function AdminOrder() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { subscribeOrders } = useOrdersWebsocket(workspaceId);
  const { fetchTodayOrders } = useAdminOrder(workspaceId);
  const { fetchProducts } = useAdminProducts(workspaceId);

  const products = useRecoilValue(productsAtom);
  const orders = useRecoilValue(ordersAtom);

  useEffect(() => {
    subscribeOrders();
    fetchTodayOrders();
    fetchProducts();
  }, []);

  const notPaidOrders = orders.filter((it) => it.status === 'NOT_PAID');
  const paidOrders = orders.filter((it) => it.status === 'PAID');
  const servedOrders = orders.filter((it) => it.status === 'SERVED').sort((a, b) => b.id - a.id);

  const productCounts = _.mapValues(
    _.groupBy(
      _.flatMap(
        orders.filter((it) => it.status == 'PAID'),
        'orderProducts',
      ).filter((it) => !it.isServed),
      'product.id',
    ),
    (filteredProducts) => _.sumBy(filteredProducts, 'quantity'),
  );
  const productMap = _.keyBy(products, 'id');

  return (
    <Container>
      <TitleNavBar title={'실시간 주문 조회'} />
      <KanbanContainer>
        <OrderColumnContainer>
          <OrderHeader>
            <AppLabel size={22} style={{ fontWeight: 600 }}>
              결제 대기
            </AppLabel>
          </OrderHeader>
          {notPaidOrders.map((it) => (
            <NotPaidOrderCard order={it} key={it.id} />
          ))}
        </OrderColumnContainer>
        <VerticalDivider />
        <OrderColumnContainer>
          <OrderHeader>
            <AppLabel size={22} style={{ fontWeight: 600 }}>
              결제 완료
            </AppLabel>
          </OrderHeader>
          {paidOrders.map((it) => (
            <PaidOrderCard order={it} key={it.id} />
          ))}
        </OrderColumnContainer>
        <VerticalDivider />
        <OrderColumnContainer>
          <OrderHeader>
            <AppLabel size={22} style={{ fontWeight: 600 }}>
              서빙 완료
            </AppLabel>
          </OrderHeader>
          {servedOrders.map((it) => (
            <ServedOrderCard order={it} key={it.id} />
          ))}
        </OrderColumnContainer>
      </KanbanContainer>
      <ProductsByOrderContainer>
        <ProductsByOrderSubContainer>
          <AppLabel size={23} style={{ fontWeight: 600, width: '100%', textAlign: 'center' }}>
            결제 완료 주문 중 서빙 필요한 상품 현황판
          </AppLabel>
          <ProductsContainer>
            {_.keys(productCounts).map((productId) => (
              <ProductCard key={productId}>
                <ProductImage src={productMap[productId].imageUrl} />
                <AppLabel key={productId} size={14} style={{ fontWeight: 600 }}>
                  {productMap[productId].name}
                </AppLabel>
                <AppLabel key={productId} size={12}>
                  {productCounts[productId]}개
                </AppLabel>
              </ProductCard>
            ))}
          </ProductsContainer>
        </ProductsByOrderSubContainer>
      </ProductsByOrderContainer>
    </Container>
  );
}

export default AdminOrder;
