import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useRecoilValue } from 'recoil';
import { categoriesAtom, productsAtom } from '@recoils/atoms';
import styled from '@emotion/styled';
import ProductCard from '@components/admin/product/ProductCard';
import { colFlex } from '@styles/flexStyles';
import AppContainer from '@components/common/container/AppContainer';
import AdminProductTitleNavBarChildren from './AdminProductTitleNavBarChildren';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { Color } from '@resources/colors';

const ContainerPerCategory = styled.div`
  gap: 30px;
  padding: 50px 0;
  min-width: 1000px;
  width: 100%;
  ${colFlex({ align: 'center' })}
`;

const CategoryTitle = styled.div`
  font-size: 30px;
  font-weight: 800;
  min-width: 1000px;
  width: 70%;
  color: ${Color.GREY};
`;

const ProductContainer = styled.div`
  width: 100%;
  min-width: 1000px;
  padding: 50px 0;
  background: ${Color.LIGHT_GREY};
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const ProductCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  row-gap: 40px;
  column-gap: 40px;
  min-width: 1000px;
  width: 70%;
`;

function AdminProduct() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchProducts, fetchCategories } = useAdminProducts(workspaceId);
  const products = useRecoilValue(productsAtom);
  const rawCategories = useRecoilValue(categoriesAtom);
  const categories = [...rawCategories, { id: null, name: '기본메뉴' }];
  const { appendPath } = useCustomNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <AppContainer
      useNavBackground={true}
      useFlex={colFlex({ justify: 'center', align: 'center' })}
      titleNavBarProps={{
        title: '상품관리',
        children: <AdminProductTitleNavBarChildren />,
      }}
      customWidth={'100%'}
      useScroll={true}
    >
      <>
        {categories.map((category) => (
          <ContainerPerCategory key={`product_category_${category.id}`} className={'container-per-category'}>
            <CategoryTitle>{category.name}</CategoryTitle>
            <ProductContainer className={'products-container'}>
              <ProductCardsContainer className={'product-cards-container'}>
                {products
                  .filter((product) => (product.productCategory?.id || null) === category.id)
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => {
                        appendPath(`/edit-product?productId=${product.id}`);
                      }}
                    />
                  ))}
              </ProductCardsContainer>
            </ProductContainer>
          </ContainerPerCategory>
        ))}
      </>
    </AppContainer>
  );
}

export default AdminProduct;
