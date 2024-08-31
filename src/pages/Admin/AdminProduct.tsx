import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useRecoilValue } from 'recoil';
import { categoriesAtom, productsAtom } from '@recoils/atoms';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import NavBar from '@components/common/nav/NavBar';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import ProductCard from '@components/admin/product/ProductCard';
import AppButton from '@components/common/button/AppButton';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  padding-top: 100px;
  ${colFlex({ align: 'center' })}
`;

const ManageButtonContainer = styled.div`
  gap: 20px;
  ${rowFlex()}
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
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <Container className={'admin-product-container'}>
      <NavBar useBackground={true} />
      <TitleNavBar
        title={'상품 관리'}
        onLeftArrowClick={() => {
          navigate(`/admin/workspace/${workspaceId}`);
        }}
      >
        <ManageButtonContainer className={'manage-button-container'}>
          <AppButton
            size={160}
            onClick={() => {
              appendPath('/categories');
            }}
          >
            카테고리 관리
          </AppButton>
          <AppButton
            size={130}
            onClick={() => {
              appendPath('/add-product');
            }}
          >
            상품 추가
          </AppButton>
        </ManageButtonContainer>
      </TitleNavBar>
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
    </Container>
  );
}

export default AdminProduct;
