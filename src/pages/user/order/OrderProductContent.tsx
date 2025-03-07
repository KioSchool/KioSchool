import { Product } from '@@types/index';
import HorizontalDivider from '@components/common/divider/HorizontalDivider';
import AppLabel from '@components/common/label/AppLabel';
import OrderFooter from '@components/user/order/OrderFooter';
import ProductCard from '@components/user/product/ProductCard';
import styled from '@emotion/styled';
import { categoriesAtom, orderBasketAtom, userWorkspaceAtom } from '@recoils/atoms';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import _ from 'lodash';
import { Element } from 'react-scroll';
import { useRecoilValue } from 'recoil';

const MainContent = styled.div`
  width: 100%;
  ${colFlex({ align: 'center' })}
`;

const SubContent = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;
`;

const CategoryProduct = styled(Element, {
  shouldForwardProp: (prop) => prop !== 'isLastElement',
})<{ isLastElement: boolean }>`
  padding: 17px 0 10px 0;
  border-bottom: 7px solid ${({ isLastElement }) => (isLastElement ? 'transparent' : Color.LIGHT_GREY)};
`;

const ProductContainer = styled.div`
  width: 100%;
`;

const PlaceHolder = styled.div`
  height: 50px;
  width: 100%;
  color: ${Color.GREY};
  padding-bottom: 15px;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

function OrderProductContent() {
  const workspace = useRecoilValue(userWorkspaceAtom);
  const rawProductCategories = useRecoilValue(categoriesAtom);
  const sellableProducts = workspace.products.filter((it) => it.isSellable);
  const productsByCategoryId = _.groupBy<Product>(sellableProducts, (product) => product.productCategory?.id);

  const productsWithCategory = rawProductCategories.map((category) => ({
    category,
    products: productsByCategoryId[category.id] || [],
  }));
  const isProductEmpty = productsWithCategory.every(({ products }) => products.length === 0);

  const defaultProducts = productsByCategoryId.undefined;
  const orderBasket = useRecoilValue(orderBasketAtom);

  const isAllProductsEmpty = isProductEmpty && !defaultProducts;

  if (isAllProductsEmpty) {
    return (
      <MainContent>
        <PlaceHolder>상품이 비어있습니다.</PlaceHolder>
        <OrderFooter />
      </MainContent>
    );
  }

  return (
    <MainContent className={'order-content'}>
      <SubContent>
        {productsWithCategory.map(({ category, products }) => {
          if (!products.length) return null;

          return (
            <CategoryProduct isLastElement={false} name={`category_${category.id}`} key={`product_category_${category.id}`}>
              <AppLabel color={Color.BLACK} size={22} style={{ padding: '10px 0' }}>
                {category.name}
              </AppLabel>
              {products.map((product, productIndex) => {
                const productInBasket = orderBasket.find((item) => item.productId === product.id);
                const quantity = productInBasket?.quantity || 0;
                const isShowDivider = productIndex !== products.length - 1;

                return (
                  <ProductContainer key={`product${product.id}`} className="product-container">
                    <ProductCard product={product} quantity={quantity} />
                    {isShowDivider && <HorizontalDivider />}
                  </ProductContainer>
                );
              })}
            </CategoryProduct>
          );
        })}

        {defaultProducts && (
          <CategoryProduct isLastElement={true} name="category_default" key="product_category_default">
            <AppLabel color={Color.BLACK} size={22} style={{ padding: '10px 0' }}>
              기본메뉴
            </AppLabel>
            {defaultProducts.map((product, productIndex) => {
              const productInBasket = orderBasket.find((item) => item.productId === product.id);
              const quantity = productInBasket?.quantity || 0;
              const isShowDivider = productIndex !== defaultProducts.length - 1;

              return (
                <ProductContainer key={`product${product.id}`} className="product-container">
                  <ProductCard product={product} quantity={quantity} />
                  {isShowDivider && <HorizontalDivider />}
                </ProductContainer>
              );
            })}
          </CategoryProduct>
        )}
      </SubContent>
      <OrderFooter />
    </MainContent>
  );
}

export default OrderProductContent;
