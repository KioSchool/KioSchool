import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useAtomValue } from 'jotai';
import { ProductStatus } from '@@types/index';
import { DEMO_CATEGORIES, DEMO_PRODUCTS } from '@constants/data/demo/demoSeed';
import OrderFooter from '@components/user/order/OrderFooter';
import { OrderCardDivider } from '@components/user/order/orderCardStyles';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import DemoProductCard from './DemoProductCard';

const MainContent = styled.div`
  width: 100%;
  ${colFlex({ align: 'center' })}
`;

const SubContent = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;
`;

const lastCategoryStyle = css`
  border-bottom-color: transparent;
`;

const CategoryProduct = styled.div<{ isLastElement: boolean }>`
  padding: 17px 0 10px 0;
  border-bottom: 7px solid ${Color.LIGHT_GREY};
  ${({ isLastElement }) => isLastElement && lastCategoryStyle}
`;

const CategoryTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
  padding: 10px 0;
`;

const ProductContainer = styled.div`
  width: 100%;
`;

const CATEGORY_SECTIONS = DEMO_CATEGORIES.map((category) => ({
  category,
  products: DEMO_PRODUCTS.filter((product) => product.status !== ProductStatus.HIDDEN && product.productCategory?.id === category.id),
})).filter(({ products }) => products.length > 0);

function DemoProductList() {
  const { basket } = useAtomValue(demoStateAtom);

  return (
    <MainContent>
      <SubContent>
        {CATEGORY_SECTIONS.map(({ category, products }, index) => (
          <CategoryProduct key={category.id} isLastElement={index === CATEGORY_SECTIONS.length - 1} data-category-section={category.id}>
            <CategoryTitle>{category.name}</CategoryTitle>
            {products.map((product, productIndex) => {
              const quantity = basket.find((entry) => entry.productId === product.id)?.quantity ?? 0;
              return (
                <ProductContainer key={product.id}>
                  <DemoProductCard product={product} quantity={quantity} />
                  {productIndex !== products.length - 1 && <OrderCardDivider />}
                </ProductContainer>
              );
            })}
          </CategoryProduct>
        ))}
      </SubContent>
      <OrderFooter />
    </MainContent>
  );
}

export default DemoProductList;
