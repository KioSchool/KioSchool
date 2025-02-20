import React, { useEffect, useRef, useState } from 'react';
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
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import OrderImageSlider from '@components/admin/order/OrderImageSlider';
import ArrowLeftSvg from '@resources/svg/ArrowLeftSvg';
import ShareSvg from '@resources/svg/ShareSvg';

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

const CategorizedProductsContainer = styled.div``;

const NormalCategoryProductsContainer = styled.div``;

const ContentContainer = styled.div`
  width: 100%;
`;

const ProductContainer = styled.div`
  padding: 10px;
`;

const OrderStickyNavBar = styled.div<{ isShow: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  height: 45px;
  background: ${Color.WHITE};
  transition: transform 0.1s ease-in-out;
  transform: translateY(${({ isShow }) => (isShow ? '0' : '-100%')});
  z-index: 1000;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const LeftContainer = styled.div`
  padding-left: 10px;
  width: 100px;
  height: 100%;
  gap: 5px;
  ${rowFlex({ justify: 'space-evenly', align: 'center' })}
`;

const RightContainer = styled.div`
  padding-right: 10px;
  ${rowFlex({ align: 'center' })}
`;

const ArrowLeftButton = styled(ArrowLeftSvg)`
  cursor: pointer;
  fill: ${Color.BLACK};
  transition: transform 0.1s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const ShareButton = styled(ShareSvg)`
  cursor: pointer;
  transition: transform 0.1s ease;
  &:hover {
    transform: scale(1.1);
  }
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

  const headerRef = useRef<HTMLDivElement>(null);
  const [showNavBar, setIsShowNavBar] = useState(false);

  useEffect(() => {
    fetchWorkspace(workspaceId);
    fetchCategories();

    const handleScroll = () => {
      if (!headerRef.current) return;

      const bufferedHeight = 65;
      const headerBottom = headerRef.current.getBoundingClientRect().bottom;
      const isShow = headerBottom - bufferedHeight <= 0;

      setIsShowNavBar(isShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onClickShare = async () => {
    if (!navigator.share) {
      alert('이 브라우저는 Web Share API를 지원하지 않습니다. 다른 브라우저를 사용해주세요.');
      return;
    }

    try {
      await navigator.share({
        title: document.title,
        text: `키오스쿨에서 같이 주문해요!!`,
        url: window.location.href,
      });
    } catch (error) {
      alert(`공유 실패: ${error}`);
    }
  };

  return (
    <Container className={'order-container'}>
      <OrderStickyNavBar isShow={showNavBar}>
        <LeftContainer>
          <ArrowLeftButton />
          <AppLabel color={Color.BLACK} size={20} style={{ fontWeight: '600' }}>
            {workspace.name}
          </AppLabel>
        </LeftContainer>
        <RightContainer>
          <ShareButton onClick={onClickShare} />
        </RightContainer>
      </OrderStickyNavBar>

      <OrderImageSlider images={workspace.images} />

      <Header ref={headerRef}>
        <AppLabel color={Color.BLACK} size={25} style={{ fontWeight: '600' }}>
          {workspace.name}
        </AppLabel>
        <AppLabel size={'small'} color={Color.GREY}>
          {workspace.description}
        </AppLabel>
      </Header>

      <StickyHeader>
        <CategoryBadgesContainer productCategories={rawProductCategories} productsByCategory={productsByCategoryId} categoryRefs={categoryRefs} />
      </StickyHeader>
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
