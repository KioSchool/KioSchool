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
import VerticalDivider from '@components/common/divider/VerticalDivider';
import AppLabel from '@components/common/label/AppLabel';
import _ from 'lodash';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import uploadPreview from '@resources/image/uploadPreview.png';
import { colFlex, rowFlex } from '@styles/flexStyles';
import AppContainer from '@components/common/container/AppContainer';
import { OrderStatus } from '@@types/index';
import { Color } from '@resources/colors';

const KanbanContainer = styled.div`
  width: 100%;
  gap: 24px;
  height: 450px;
  ${rowFlex({ justify: 'center' })}
`;

const OrderColumnContainer = styled.div`
  height: 100%;
  gap: 10px;
  overflow: auto;
  scrollbar-width: none;
  ${colFlex({ align: 'center' })}
`;

const OrderHeader = styled.div`
  background: ${Color.WHITE};
  position: sticky;
  top: 0;
  width: 350px;
  height: 110px;
  flex-basis: 0;
  z-index: 100;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const ProductsByOrderContainer = styled.div`
  width: 100%;
  height: 200px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const ProductsByOrderSubContainer = styled.div`
  width: 100%;
  height: 100%;
  gap: 10px;
  background: #f8f8f8;
  padding: 10px;
  box-sizing: border-box;
  ${colFlex()}
`;

const ProductsContainer = styled.div`
  height: 100%;
  gap: 10px;
  overflow: auto;
  ${rowFlex()}
`;

const ProductCard = styled.div`
  height: 100%;
  width: 160px;
  padding: 5px;
  box-sizing: border-box;
  background: ${Color.WHITE};
  border-radius: 10px;
  gap: 5px;
  ${colFlex({ justify: 'center', align: 'center' })}
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

  const notPaidOrders = orders.filter((it) => it.status === OrderStatus.NOT_PAID);
  const paidOrders = orders.filter((it) => it.status === OrderStatus.PAID);
  const servedOrders = orders.filter((it) => it.status === OrderStatus.SERVED).sort((a, b) => b.id - a.id);

  const productCounts = _.mapValues(
    _.groupBy(
      _.flatMap(
        orders.filter((it) => it.status == OrderStatus.PAID),
        'orderProducts',
      ).filter((it) => !it.isServed),
      'productId',
    ),
    (filteredProducts) => _.sumBy(filteredProducts, 'quantity'),
  );
  const productMap = _.keyBy(products, 'id');

  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })} customGap={'30px'} titleNavBarProps={{ title: '실시간 주문 조회' }}>
      <>
        <KanbanContainer className={'kanban-container'}>
          <OrderColumnContainer className={'order-column-container'}>
            <OrderHeader className={'order-header'}>
              <AppLabel size={22} style={{ fontWeight: 600 }}>
                결제 대기
              </AppLabel>
            </OrderHeader>
            {notPaidOrders.map((it) => (
              <NotPaidOrderCard order={it} key={it.id} />
            ))}
          </OrderColumnContainer>
          <VerticalDivider />
          <OrderColumnContainer className={'order-column-container'}>
            <OrderHeader className={'order-header'}>
              <AppLabel size={22} style={{ fontWeight: 600 }}>
                결제 완료
              </AppLabel>
            </OrderHeader>
            {paidOrders.map((it) => (
              <PaidOrderCard order={it} key={it.id} />
            ))}
          </OrderColumnContainer>
          <VerticalDivider />
          <OrderColumnContainer className={'order-column-container'}>
            <OrderHeader className={'order-header'}>
              <AppLabel size={22} style={{ fontWeight: 600 }}>
                서빙 완료
              </AppLabel>
            </OrderHeader>
            {servedOrders.map((it) => (
              <ServedOrderCard order={it} key={it.id} />
            ))}
          </OrderColumnContainer>
        </KanbanContainer>
        <ProductsByOrderContainer className={'products-by-order-container'}>
          <ProductsByOrderSubContainer className={'products-by-order-sub-container'}>
            <AppLabel size={23} style={{ fontWeight: 600, width: '100%', textAlign: 'center' }}>
              결제 완료 주문 중 서빙 필요한 상품 현황판
            </AppLabel>
            <ProductsContainer className={'products-container'}>
              {_.keys(productCounts).map((productId) => (
                <ProductCard key={`product_card_${productId}`} className={'product-card'}>
                  <ProductImage src={productMap[productId]?.imageUrl || uploadPreview} className={'product-image'} />
                  <AppLabel key={`product_name_${productId}`} size={14} style={{ fontWeight: 600 }}>
                    {productMap[productId]?.name || '삭제된 상품'}
                  </AppLabel>
                  <AppLabel key={`product_quantity_${productId}`} size={12}>
                    {productCounts[productId]}개
                  </AppLabel>
                </ProductCard>
              ))}
            </ProductsContainer>
          </ProductsByOrderSubContainer>
        </ProductsByOrderContainer>
      </>
    </AppContainer>
  );
}

export default AdminOrder;
