import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import styled from '@emotion/styled';
import ProductCard from '@components/admin/product/ProductCard';
import { colFlex, rowFlex } from '@styles/flexStyles';
import AppContainer from '@components/common/container/AppContainer';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { adminCategoriesAtom, adminProductsAtom } from 'src/jotai/admin/atoms';
import { useAtomValue } from 'jotai';
import NewCommonButton from '@components/common/button/NewCommonButton';

const Container = styled.div`
  width: 100%;
  color: #464a4d;
  gap: 10px;
  ${colFlex({ align: 'center' })}
`;

const ProductContainer = styled.div`
  min-width: 1000px;
  max-height: 296px;
  padding: 18px 30px;
  gap: 10px;
  border: 1px solid #e8eef2;
  border-radius: 16px;
  background: #ffffff50;
  box-shadow: 0 4px 20px 0 rgba(92, 92, 92, 0.05) outset;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const CategoryTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  width: 100%;
`;

const ProductCardsContainer = styled.div`
  gap: 8px;
  width: 100%;
  ${rowFlex({ justify: 'start', align: 'center' })};
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: 220px;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

function AdminProduct() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchProducts, fetchCategories } = useAdminProducts(workspaceId);
  const products = useAtomValue(adminProductsAtom);
  const rawCategories = useAtomValue(adminCategoriesAtom);
  const categories = [...rawCategories, { id: null, name: '기본메뉴' }];
  const { appendPath } = useCustomNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })} customWidth={'100%'}>
      <Container>
        <NewCommonButton
          size="sm"
          onClick={() => {
            appendPath('/add-product');
          }}
        >
          상품 추가
        </NewCommonButton>
        {categories.map((category) => (
          <ProductContainer className={'products-container'}>
            <CategoryTitle>{category.name}</CategoryTitle>
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
              {products.filter((product) => (product.productCategory?.id || null) === category.id).length === 0 && (
                <EmptyContainer className={'product-empty-container'}>등록된 상품이 없습니다.</EmptyContainer>
              )}
            </ProductCardsContainer>
          </ProductContainer>
        ))}
      </Container>
    </AppContainer>
  );
}

export default AdminProduct;
