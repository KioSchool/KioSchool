import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '@hooks/useProducts';
import { useRecoilValue } from 'recoil';
import { categoriesAtom, productsAtom } from '@recoils/atoms';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import NavBar from '@components/common/nav/NavBar';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import ProductCard from '@components/admin/product/ProductCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 100px;
`;

const ContainerPerCategory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 50px 0;
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  gap: 45px;
`;

function AdminProduct() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchProducts, fetchCategories } = useProducts(workspaceId);
  const products = useRecoilValue(productsAtom);
  const rawCategories = useRecoilValue(categoriesAtom);
  const categories = [{ id: null, name: '기본메뉴' }, ...rawCategories];

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <>
      <NavBar logoSize={'small'} />
      <TitleNavBar title={'상품 조회'} />
      <Container>
        <AppLabel size={'small'} style={{ textAlign: 'center' }}>
          판매대기 상태인 메뉴는 메뉴 주문 화면에서 숨김처리 되며, 판매 상태로 변경 시 다시 나타나게 됩니다.
        </AppLabel>
        {categories.map((category) => (
          <ContainerPerCategory key={`product_category${category.id}`}>
            <AppLabel size={36} style={{ fontWeight: 800 }}>
              {category.name}
            </AppLabel>
            <ProductsContainer>
              {products
                .filter((product) => (product.productCategory?.id || null) === category.id)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </ProductsContainer>
          </ContainerPerCategory>
        ))}
      </Container>
    </>
  );
}

export default AdminProduct;
