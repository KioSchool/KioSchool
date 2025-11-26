import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useAtomValue, useSetAtom } from 'jotai';
import { adminCategoriesAtom, adminProductsAtom, externalSidebarAtom } from 'src/jotai/admin/atoms';
import { RIGHT_SIDEBAR_ACTION } from '@@types/index';
import useConfirm from '@hooks/useConfirm';
import AppContainer from '@components/common/container/AppContainer';
import NewCommonButton from '@components/common/button/NewCommonButton';
import ProductCard from '@components/admin/product/ProductCard';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';
import ProductAdd from '@components/admin/product/ProductAdd';
import ProductEdit from '@components/admin/product/ProductEdit';

const Container = styled.div`
  width: 100%;
  color: #464a4d;
  gap: 10px;
  ${colFlex({ align: 'center' })}
`;

const ProductAddButtonContainer = styled.div`
  width: 1000px;
  padding-bottom: 24px;
  ${colFlex({ align: 'end' })}
`;

const ProductContainer = styled.div`
  width: 1000px;
  height: 276x;
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
  overflow-x: auto;
  padding-bottom: 150px; // Select 메뉴가 열릴 공간 확보 (메뉴 높이만큼)
  margin-bottom: -150px; // 확보한 공간만큼 마진을 당겨서 레이아웃이 붕 뜨지 않게 보정

  // 스크롤바가 나타나면 다음 영역을 침범하기에 나타낼 수 없음
  &::-webkit-scrollbar {
    height: 0px;
  }

  flex-wrap: nowrap;
  flex-shrink: 0;
  ${rowFlex({ justify: 'start', align: 'center' })};
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: 220px;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

function AdminProduct() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const location = useLocation();
  const { fetchProducts, fetchCategories, deleteProduct } = useAdminProducts(workspaceId); // [추가] deleteProduct 가져오기
  const products = useAtomValue(adminProductsAtom);
  const rawCategories = useAtomValue(adminCategoriesAtom);
  const categories = [...rawCategories, { id: null, name: '기본메뉴' }];

  const setExternalSidebar = useSetAtom(externalSidebarAtom);

  //TODO : useConfirm hook 수정 여부
  const { ConfirmModal, confirm } = useConfirm({
    title: `해당 상품을 삭제하시겠습니까?`,
    description: '확인 후 되돌릴 수 없습니다.',
    okText: '삭제하기',
    cancelText: '취소',
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleOpenAddProduct = () => {
    setExternalSidebar({
      location: location,
      title: '상품 추가',
      subtitle: '*편집 중 창을 닫지 마세요.',
      action: RIGHT_SIDEBAR_ACTION.OPEN,
      content: <ProductAdd />,
    });
  };

  const handleDeleteProduct = async (productId: number) => {
    const userInput = await confirm();
    if (!userInput) return;

    await deleteProduct(productId);
    await fetchProducts();
    alert('상품이 삭제되었습니다.');
    setExternalSidebar({ action: RIGHT_SIDEBAR_ACTION.CLOSE });
  };

  const handleOpenEditProduct = (productId: number) => {
    setExternalSidebar({
      location: location,
      title: '상품 편집',
      subtitle: '*편집 중 창을 닫지 마세요.',
      action: RIGHT_SIDEBAR_ACTION.OPEN,
      content: <ProductEdit productId={productId} onDelete={() => handleDeleteProduct(productId)} />,
    });
  };

  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })} customWidth={'100%'}>
      <Container>
        <ProductAddButtonContainer>
          <NewCommonButton size="sm" onClick={handleOpenAddProduct}>
            상품 추가
          </NewCommonButton>
        </ProductAddButtonContainer>
        {categories.map((category) => (
          <ProductContainer key={category.id || 'default'} className={'products-container'}>
            <CategoryTitle>{category.name}</CategoryTitle>
            <ProductCardsContainer className={'product-cards-container'}>
              {products
                .filter((product) => (product.productCategory?.id || null) === category.id)
                .map((product) => (
                  <ProductCard key={product.id} product={product} onClick={() => handleOpenEditProduct(product.id)} />
                ))}
              {products.filter((product) => (product.productCategory?.id || null) === category.id).length === 0 && (
                <EmptyContainer className={'product-empty-container'}>등록된 상품이 없습니다.</EmptyContainer>
              )}
            </ProductCardsContainer>
          </ProductContainer>
        ))}
        <RightSidebarModal useExternalControl={{ location: location }} />
        <ConfirmModal />
      </Container>
    </AppContainer>
  );
}

export default AdminProduct;
