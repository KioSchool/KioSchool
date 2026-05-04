import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import useAdminProductDnd from '@hooks/admin/useAdminProductDnd';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useSetAtom } from 'jotai';
import { externalSidebarAtom } from '@jotai/admin/atoms';
import { RIGHT_SIDEBAR_ACTION } from '@@types/index';
import useConfirm from '@hooks/useConfirm';
import AppContainer from '@components/common/container/AppContainer';
import NewCommonButton from '@components/common/button/NewCommonButton';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';
import ProductAdd from '@components/admin/product/ProductAdd';
import ProductEdit from '@components/admin/product/ProductEdit';
import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core';
import ProductDroppableContainer from '@components/admin/product/ProductDroppableContainer';
import ProductCard from '@components/admin/product/ProductCard';
import { Color } from '@resources/colors';
import OnboardingStepHint from '@components/admin/workspace/onboarding/OnboardingStepHint';
import { ONBOARDING_STEP } from '@components/admin/workspace/onboarding/onboardingData';

const Container = styled.div`
  width: 100%;
  color: #464a4d;
  gap: 10px;
  ${colFlex({ align: 'center' })}
`;

const ProductAddButtonContainer = styled.div`
  width: 95%;
  padding-bottom: 24px;
  ${rowFlex({ justify: 'space-between', align: 'end' })}
`;

const DragHintText = styled.div`
  font-size: 14px;
  color: #8e9599;
  gap: 6px;
  ${rowFlex({ align: 'center' })}

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${Color.KIO_ORANGE};
  }
`;

function AdminProduct() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const location = useLocation();

  const { fetchProducts, fetchCategories, deleteProduct } = useAdminProducts(workspaceId);
  const { products, categories, activeProduct, sensors, handleDragStart, handleDragOver, handleDragEnd } = useAdminProductDnd(workspaceId);

  const setExternalSidebar = useSetAtom(externalSidebarAtom);

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
    <AppContainer useFlex={colFlex({ justify: 'start', align: 'center' })}>
      <Container>
        <OnboardingStepHint step={ONBOARDING_STEP.MENU} width="95%" />
        <ProductAddButtonContainer>
          <DragHintText>상품 카드를 드래그하여 순서를 변경하거나 카테고리를 변경할 수 있습니다.</DragHintText>
          <NewCommonButton size="sm" onClick={handleOpenAddProduct}>
            상품 추가
          </NewCommonButton>
        </ProductAddButtonContainer>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
          {categories.map((category) => (
            <ProductDroppableContainer
              key={category.id || 'default'}
              categoryId={category.id}
              categoryName={category.name}
              products={products.filter((p) => (p.productCategory?.id || null) === category.id)}
              onProductClick={handleOpenEditProduct}
            />
          ))}

          <DragOverlay>{activeProduct ? <ProductCard product={activeProduct} showStatusSelector={false} /> : null}</DragOverlay>
        </DndContext>

        <RightSidebarModal useExternalControl={{ location: location }} />
        <ConfirmModal />
      </Container>
    </AppContainer>
  );
}

export default AdminProduct;
