import React, { useEffect, useRef, useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Element } from 'react-scroll';
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
import { colFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import OrderImageSlider from '@components/admin/order/OrderImageSlider';
import OrderStickyNavBar from '@components/admin/order/OrderStickyNavBar';
import OrderFooter from '@components/user/order/OrderFooter';
import WorkspaceNotice from '@components/user/order/WorkspaceNotice';

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  ${colFlex({ align: 'center' })}
`;

const StickyHeader = styled.div`
  width: 100%;
  position: sticky;
  top: 45px;
  background: ${Color.WHITE};
  z-index: 1000;
`;

const Header = styled.div`
  width: 100%;
  height: 120px;
  ${colFlex({ justify: 'center', align: 'center' })}
  gap: 7px;
`;

const ContentContainer = styled.div`
  width: 100%;
`;

const ProductContainer = styled.div``;

function Order() {
  const workspace = useRecoilValue(userWorkspaceAtom);
  const isShowNotice = workspace.notice.length;
  const rawProductCategories = useRecoilValue(categoriesAtom);
  const sellableProducts = workspace.products.filter((it) => it.isSellable);

  const productsByCategoryId = _.groupBy<Product>(sellableProducts, (product) => product.productCategory?.id);

  const productsWithCategory = rawProductCategories.map((category) => ({
    category,
    products: productsByCategoryId[category.id] || [],
  }));

  const defaultProducts = productsByCategoryId.undefined;
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

  const headerRef = useRef<HTMLDivElement>(null);
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    fetchWorkspace(workspaceId);
    fetchCategories();

    const updateStickyNavBarVisibility = () => {
      if (!headerRef.current) return;

      const bufferedHeight = 65;
      const headerBottom = headerRef.current.getBoundingClientRect().bottom;
      const isShow = headerBottom - bufferedHeight <= 0;

      setShowNavBar(isShow);
    };

    window.addEventListener('scroll', updateStickyNavBarVisibility);

    return () => window.removeEventListener('scroll', updateStickyNavBarVisibility);
  }, []);

  return (
    <Container className={'order-container'}>
      <OrderImageSlider images={workspace.images} />

      <Header ref={headerRef}>
        <AppLabel color={Color.BLACK} size={25} style={{ fontWeight: '600' }}>
          {workspace.name}
        </AppLabel>
        <AppLabel size={'small'} color={Color.GREY}>
          {workspace.description}
        </AppLabel>
      </Header>

      <OrderStickyNavBar showNavBar={showNavBar} workspaceName={workspace.name} />

      <StickyHeader>
        <CategoryBadgesContainer productCategories={rawProductCategories} productsByCategory={productsByCategoryId} />
      </StickyHeader>
      {isShowNotice && <WorkspaceNotice />}
      <ContentContainer className={'order-content'}>
        {productsWithCategory.map(({ category, products }) => {
          if (!products.length) return null;

          return (
            <Element name={`category_${category.id}`} key={`product_category_${category.id}`}>
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
            </Element>
          );
        })}

        {defaultProducts && (
          <Element name="category_default" key="product_category_default">
            <AppLabel size={22}>기본메뉴</AppLabel>
            {defaultProducts.map((product) => {
              const productInBasket = orderBasket.find((item) => item.productId === product.id);
              const quantity = productInBasket?.quantity || 0;

              return (
                <ProductContainer key={`product${product.id}`} className="product-container">
                  <ProductCard product={product} quantity={quantity} />
                  <HorizontalDivider />
                </ProductContainer>
              );
            })}
          </Element>
        )}

        <OrderFooter />
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
