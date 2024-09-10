import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useRecoilValue } from 'recoil';
import { categoriesAtom, productsAtom } from '@recoils/atoms';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import ProductCard from '@components/admin/product/ProductCard';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { colFlex, rowFlex } from '@styles/flexStyles';
import AppContainer from '@components/common/container/AppContainer';
import RoundedAppButton from '@components/common/button/RoundedAppButton';

const ManageButtonContainer = styled.div`
  gap: 20px;
  ${rowFlex({ align: 'center' })}
`;

const ContainerPerCategory = styled.div`
  gap: 30px;
  padding: 50px 0;
  min-width: 1000px;
  width: 70%;
  ${colFlex()}
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  row-gap: 40px;
  column-gap: 40px;
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

  const titleNavBarChildren = (
    <ManageButtonContainer className={'manage-button-container'}>
      <RoundedAppButton
        size={'160px'}
        onClick={() => {
          appendPath('/categories');
        }}
      >
        카테고리 관리
      </RoundedAppButton>
      <RoundedAppButton
        size={'130px'}
        onClick={() => {
          appendPath('/add-product');
        }}
      >
        상품 추가
      </RoundedAppButton>
    </ManageButtonContainer>
  );

  return (
    <AppContainer
      useNavBackground={true}
      contentsJustify={'center'}
      contentsAlign={'center'}
      titleNavBarProps={{
        title: '상품관리',
        children: titleNavBarChildren,
      }}
      customWidth={'100%'}
      useScroll={true}
    >
      <>
        <AppLabel size={'small'} style={{ textAlign: 'center' }}>
          HIDE 상태인 메뉴는 주문 화면에서 숨김처리 되며, ON 상태로 변경 시 다시 나타나게 됩니다.
        </AppLabel>
        {categories.map((category) => (
          <ContainerPerCategory key={`product_category_${category.id}`} className={'container-per-category'}>
            <AppLabel size={36} style={{ fontWeight: 800 }}>
              {category.name}
            </AppLabel>
            <ProductsContainer className={'products-container'}>
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
            </ProductsContainer>
          </ContainerPerCategory>
        ))}
      </>
    </AppContainer>
  );
}

export default AdminProduct;
