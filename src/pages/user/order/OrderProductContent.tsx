import { Product, ProductStatus } from '@@types/index';
import HorizontalDivider from '@components/common/divider/HorizontalDivider';
import OrderFooter from '@components/user/order/OrderFooter';
import ProductCard from '@components/user/product/ProductCard';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useAtomValue } from 'jotai';
import _ from 'lodash';
import { Element } from 'react-scroll';
import { userCategoriesAtom, userOrderBasketAtom, userWorkspaceAtom } from 'src/jotai/user/atoms';

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

const CategoryTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${Color.BLACK};
  padding: 10px 0;
`;

const ProductContainer = styled.div`
  width: 100%;
`;

const PlaceHolder = styled.div`
  height: 130px;
  width: 100%;
  color: ${Color.GREY};
  padding-bottom: 15px;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

function OrderProductContent() {
  const workspace = useAtomValue(userWorkspaceAtom);
  const rawProductCategories = useAtomValue(userCategoriesAtom);
  const productsToShow = workspace.products.filter((it) => it.status !== ProductStatus.HIDDEN);
  const productsByCategoryId = _.groupBy<Product>(productsToShow, (product) => product.productCategory?.id);

  const productsWithCategory = rawProductCategories.map((category) => ({
    category,
    products: productsByCategoryId[category.id] || [],
  }));
  const isProductEmpty = productsWithCategory.every(({ products }) => products.length === 0);

  const defaultProducts = productsByCategoryId.undefined;
  const orderBasket = useAtomValue(userOrderBasketAtom);

  const isAllProductsEmpty = isProductEmpty && !defaultProducts;

  if (isAllProductsEmpty) {
    return (
      <MainContent>
        <PlaceHolder>현재 판매 중인 상품이 없습니다.</PlaceHolder>
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
              <CategoryTitle>{category.name}</CategoryTitle>
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
            <CategoryTitle>기본메뉴</CategoryTitle>
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
