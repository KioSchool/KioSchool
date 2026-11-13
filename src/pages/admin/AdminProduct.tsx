import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core';
import { useParams } from 'react-router-dom';

import ProductAdd from '@components/admin/product/ProductAdd';
import ProductCard from '@components/admin/product/ProductCard';
import ProductDroppableContainer from '@components/admin/product/ProductDroppableContainer';
import ProductEdit from '@components/admin/product/ProductEdit';
import ProductEditorModal from '@components/admin/product/ProductEditorModal';
import { ONBOARDING_STEP } from '@components/admin/workspace/onboarding/onboardingData';
import OnboardingStepHint from '@components/admin/workspace/onboarding/OnboardingStepHint';
import NewCommonButton from '@components/common/button/NewCommonButton';
import AppContainer from '@components/common/container/AppContainer';
import useAdminProductDnd from '@hooks/admin/useAdminProductDnd';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import useConfirm from '@hooks/useConfirm';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { ProductType } from '@@types/index';

const Container = styled.div`
  width: 100%;
  color: ${Color.TEXT_BODY};
  gap: 10px;
  ${colFlex({ align: 'center' })}
`;

const ProductAddButtonContainer = styled.div`
  width: 95%;
  padding-bottom: 24px;
  ${rowFlex({ justify: 'space-between', align: 'end' })}
`;

const AddButtonGroup = styled.div`
  gap: 8px;
  ${rowFlex({ align: 'center' })}
`;

const DragHintText = styled.div`
  font-size: 14px;
  color: ${Color.MUTED_GREY};
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

type ProductEditorState = { mode: 'ADD'; productType: ProductType } | { mode: 'EDIT'; productId: number; productType: ProductType } | null;

function AdminProduct() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [editorState, setEditorState] = useState<ProductEditorState>(null);

  const { fetchProducts, fetchCategories, deleteProduct } = useAdminProducts(workspaceId);
  const { products, categories, activeProduct, sensors, handleDragStart, handleDragOver, handleDragEnd } = useAdminProductDnd(workspaceId);

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

  const handleOpenAddProduct = (productType: ProductType) => {
    setEditorState({ mode: 'ADD', productType });
  };

  const handleCloseEditor = () => {
    setEditorState(null);
  };

  const handleDeleteProduct = async (productId: number) => {
    const product = products.find((item) => item.id === productId);
    if (!product) return;

    if (product.linkedSets.length > 0) {
      await confirm({
        title: '연결된 세트가 있어 삭제할 수 없습니다.',
        description: `${product.linkedSets.map((linkedSet) => linkedSet.name).join(', ')}에서 연결 상품으로 사용하고 있습니다.`,
        okText: '확인',
        cancelText: undefined,
      });
      return;
    }

    const userInput = await confirm({
      title: `${product.name} 메뉴를 삭제하시겠습니까?`,
      description: '삭제한 메뉴는 되돌릴 수 없습니다.',
      okText: '삭제하기',
      cancelText: '취소',
    });
    if (!userInput) return;

    try {
      await deleteProduct(productId);
      alert('상품이 삭제되었습니다.');
      handleCloseEditor();
    } catch {
      alert('상품을 삭제하지 못했습니다. 연결된 세트와 주문 상태를 확인해주세요.');
    }
  };

  const handleOpenEditProduct = (productId: number) => {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    setEditorState({ mode: 'EDIT', productId, productType: product.type });
  };

  const isSetEditor = editorState?.productType === ProductType.SET;
  const editorProductLabel = isSetEditor ? '세트 메뉴' : '일반 메뉴';
  const editorActionLabel = editorState?.mode === 'EDIT' ? '수정' : '추가';
  const editorTitle = `${editorProductLabel} ${editorActionLabel}`;

  return (
    <AppContainer useFlex={colFlex({ justify: 'start', align: 'center' })}>
      <Container>
        <OnboardingStepHint step={ONBOARDING_STEP.MENU} width="95%" />
        <ProductAddButtonContainer>
          <DragHintText>상품 카드를 드래그하여 순서를 변경하거나 카테고리를 변경할 수 있습니다.</DragHintText>
          <AddButtonGroup>
            <NewCommonButton size="sm" color="blue_gray" onClick={() => handleOpenAddProduct(ProductType.SINGLE)}>
              일반 메뉴 추가
            </NewCommonButton>
            <NewCommonButton size="sm" onClick={() => handleOpenAddProduct(ProductType.SET)}>
              세트 메뉴 추가
            </NewCommonButton>
          </AddButtonGroup>
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

        {editorState && (
          <ProductEditorModal
            eyebrow={isSetEditor ? 'SET MENU' : 'MENU'}
            title={editorTitle}
            description={isSetEditor ? '가격과 제공 구성, 품절 상태를 연결할 일반 메뉴를 설정합니다.' : '손님 주문 화면에 보일 메뉴 정보를 설정합니다.'}
            onClose={handleCloseEditor}
          >
            {editorState.mode === 'ADD' ? (
              <ProductAdd productType={editorState.productType} onClose={handleCloseEditor} />
            ) : (
              <ProductEdit productId={editorState.productId} onDelete={() => handleDeleteProduct(editorState.productId)} onClose={handleCloseEditor} />
            )}
          </ProductEditorModal>
        )}
        <ConfirmModal />
      </Container>
    </AppContainer>
  );
}

export default AdminProduct;
