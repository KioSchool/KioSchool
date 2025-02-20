import React, { useEffect, useRef } from 'react';
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
import OrderImageSlider from '@components/admin/order/OrderImageSlider';

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const Header = styled.div`
  background: ${Color.WHITE};
  position: sticky;
  top: 0;
  width: 100%;
  flex-basis: 0;
  z-index: 100;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const CategorizedProductsContainer = styled.div``;

const NormalCategoryProductsContainer = styled.div``;

const ContentContainer = styled.div`
  width: 100%;
`;

const ProductContainer = styled.div`
  padding: 10px;
`;

function Order() {
  const workspace = useRecoilValue(userWorkspaceAtom);
  const rawProductCategories = useRecoilValue(categoriesAtom);
  const sellableProducts = workspace.products.filter((it) => it.isSellable);

  const productsByCategoryId = _.groupBy<Product>(sellableProducts, (product) => product.productCategory?.id);

  const productsWithCategory = rawProductCategories.map((category) => ({
    category,
    products: productsByCategoryId[category.id] || [],
  }));

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

  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    fetchWorkspace(workspaceId);
    fetchCategories();
  }, []);

  return (
    <Container className={'order-container'}>
      <Header className={'order-header'}>
        <OrderImageSlider images={workspace.images} />
        <AppLabel size={'medium'}>{workspace.name}</AppLabel>
        <AppLabel size={'small'} color={Color.GREY}>
          {tableNo}번 테이블
        </AppLabel>
        <CategoryBadgesContainer productCategories={rawProductCategories} productsByCategory={productsByCategoryId} categoryRefs={categoryRefs} />
      </Header>
      <ContentContainer className={'order-content'}>
        {productsWithCategory.map(({ category, products }) => {
          if (!products.length) return null;

          return (
            <CategorizedProductsContainer ref={(el) => (categoryRefs.current[category.id] = el)} key={`product_category_${category.id}`}>
              <AppLabel size={22}>{category.name}</AppLabel>
              {products.map((product) => {
                const productInBasket = orderBasket.find((item) => item.productId === product.id);
                const quantity = productInBasket?.quantity || 0;
                return (
                  <ProductContainer key={`product${product.id}`} className="product-container">
                    <ProductCard product={product} quantity={quantity} />
                    <HorizontalDivider />
                  </ProductContainer>
                );
              })}
            </CategorizedProductsContainer>
          );
        })}

        {productsByCategoryId.undefined && (
          <NormalCategoryProductsContainer ref={(el) => (categoryRefs.current['.'] = el)} key={`product_category_undefined`}>
            <AppLabel size={22}>기본메뉴</AppLabel>
            {productsByCategoryId.undefined.map((product) => {
              const productInBasket = orderBasket.find((item) => item.productId === product.id);
              const quantity = productInBasket?.quantity || 0;
              return (
                <ProductContainer key={`product${product.id}`} className={'product-container'}>
                  <ProductCard product={product} quantity={quantity} />
                  <HorizontalDivider />
                </ProductContainer>
              );
            })}
          </NormalCategoryProductsContainer>
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
