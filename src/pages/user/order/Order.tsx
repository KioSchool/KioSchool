import React, { useEffect } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import CategoryBadgesContainer from '@components/user/order/CategoryBadgesContainer';
import ProductCard from '@components/user/product/ProductCard';
import HorizontalDivider from '@components/common/divider/HorizontalDivider';
import useWorkspace from '@hooks/user/useWorkspace';
import { categoriesAtom, orderBasketAtom, userWorkspaceAtom } from '@recoils/atoms';
import { useRecoilValue } from 'recoil';
import { Product } from '@@types/index';
import _ from 'lodash';
import OrderButton from '@components/user/order/OrderButton';
import useProduct from '@hooks/user/useProduct';
import AppFooter from '@components/common/footer/AppFooter';
import { colFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

const Container = styled.div`
  width: 100vw;
  padding: 60px 0 80px;
  box-sizing: border-box;
`;

const Header = styled.div`
  background: ${Color.WHITE};
  position: sticky;
  top: 0;
  width: 100vw;
  height: 110px;
  flex-basis: 0;
  z-index: 100;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const ContentContainer = styled.div`
  padding: 30px;
`;

const ProductContainer = styled.div`
  padding: 10px;
`;

function Order() {
  const workspace = useRecoilValue(userWorkspaceAtom);
  const productsByCategory = _.groupBy<Product>(
    workspace.products.filter((it) => it.isSellable),
    (product) => product.productCategory?.id,
  );
  const rawProductCategories = useRecoilValue(categoriesAtom);
  const productsMap = _.keyBy(workspace.products, 'id');

  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');
  const isPreview = searchParams.get('preview') === 'true';

  const { fetchWorkspace } = useWorkspace();
  const { fetchCategories } = useProduct(workspaceId);
  const navigate = useNavigate();
  const orderBasket = useRecoilValue(orderBasketAtom);
  const totalAmount = orderBasket.reduce((acc, cur) => {
    return acc + productsMap[cur.productId].price * cur.quantity;
  }, 0);

  useEffect(() => {
    fetchWorkspace(workspaceId);
    fetchCategories();
  }, []);

  return (
    <Container className={'order-container'}>
      <Header className={'order-header'}>
        <AppLabel size={'medium'}>{workspace.name}</AppLabel>
        <AppLabel size={'small'} style={{ color: 'gray' }}>
          {tableNo}번 테이블
        </AppLabel>
        <CategoryBadgesContainer productCategories={rawProductCategories} productsByCategory={productsByCategory} />
      </Header>
      <ContentContainer className={'order-content'}>
        {Object.values(productsByCategory).map((categoryItems) => {
          if (!categoryItems.length) return null;

          const category = categoryItems[0]?.productCategory;
          if (!category) return null;

          return (
            <div id={`product_category_${category.id}`} key={`product_category_${category.id}`}>
              <AppLabel size={22}>{category.name}</AppLabel>
              {categoryItems.map((product) => {
                const productInBasket = orderBasket.find((item) => item.productId === product.id);
                const quantity = productInBasket ? productInBasket.quantity : 0;

                return (
                  <ProductContainer key={`product${product.id}`} className="product-container">
                    <ProductCard product={product} quantity={quantity} />
                    <HorizontalDivider />
                  </ProductContainer>
                );
              })}
            </div>
          );
        })}

        {productsByCategory.undefined && (
          <div id={`product_category_undefined`} key={`product_category_undefined`}>
            <AppLabel size={22}>기본메뉴</AppLabel>
            {productsByCategory.undefined?.map((product) => {
              const productInBasket = orderBasket.find((item) => item.productId === product.id);
              const quantity = productInBasket ? productInBasket.quantity : 0;

              return (
                <ProductContainer key={`product${product.id}`} className={'product-container'}>
                  <ProductCard product={product} quantity={quantity} />
                  <HorizontalDivider />
                </ProductContainer>
              );
            })}
          </div>
        )}

        <AppFooter fixed={false} />
      </ContentContainer>
      <OrderButton
        showButton={orderBasket.length > 0}
        buttonLabel={`${totalAmount.toLocaleString()}원 장바구니`}
        onClick={() => {
          if (isPreview) return;

          navigate({
            pathname: '/order-basket',
            search: createSearchParams({
              workspaceId: workspaceId || '',
              tableNo: tableNo || '',
            }).toString(),
          });
        }}
      />
    </Container>
  );
}

export default Order;
