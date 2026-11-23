import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import ProductAdd from '@components/admin/product/ProductAdd';
import ProductCard from '@components/admin/product/ProductCard';
import ProductDroppableContainer from '@components/admin/product/ProductDroppableContainer';
import ProductEdit from '@components/admin/product/ProductEdit';
import ProductEditorModal from '@components/admin/product/ProductEditorModal';
import ProductListPreview from '@components/admin/product/ProductListPreview';
import { ONBOARDING_STEP } from '@components/admin/workspace/onboarding/onboardingData';
import OnboardingStepHint from '@components/admin/workspace/onboarding/OnboardingStepHint';
import NewCommonButton from '@components/common/button/NewCommonButton';
import AppContainer from '@components/common/container/AppContainer';
import useAdminProductDnd from '@hooks/admin/useAdminProductDnd';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import useConfirm from '@hooks/useConfirm';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { tabletMediaQuery } from '@styles/globalStyles';
import { ProductType } from '@@types/index';

const Container = styled.div`
  width: 100%;
  color: ${Color.TEXT_DEFAULT};
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

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  width: 95%;
  gap: 24px;
  align-items: start;

  ${tabletMediaQuery} {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const CategoryList = styled.div`
  min-width: 0;
  gap: 14px;
  ${colFlex()}
`;

const PreviewColumn = styled.div`
  position: sticky;
  top: 24px;

  ${tabletMediaQuery} {
    position: static;
  }
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
    const userInput = await confirm();
    if (!userInput) return;

    const isDeleted = await deleteProduct(productId);
    if (!isDeleted) return;

    await fetchProducts();
    alert('상품이 삭제되었습니다.');
    handleCloseEditor();
  };

  const handleOpenEditProduct = (productId: number) => {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    setEditorState({ mode: 'EDIT', productId, productType: product.type });
  };

  const isSetEditor = editorState?.productType === ProductType.SET;
  const editorTitle = editorState?.mode === 'EDIT' ? `${isSetEditor ? '세트 메뉴' : '일반 메뉴'} 수정` : `${isSetEditor ? '세트 메뉴' : '일반 메뉴'} 추가`;

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
          <ContentLayout>
            <CategoryList>
              {categories.map((category) => (
                <ProductDroppableContainer
                  key={category.id || 'default'}
                  categoryId={category.id}
                  categoryName={category.name}
                  products={products.filter((product) => (product.productCategory?.id || null) === category.id)}
                  onProductClick={handleOpenEditProduct}
                />
              ))}
            </CategoryList>
            <PreviewColumn>
              <ProductListPreview categories={categories} products={products} />
            </PreviewColumn>
          </ContentLayout>

          <DragOverlay>{activeProduct ? <ProductCard product={activeProduct} showStatusSelector={false} /> : null}</DragOverlay>
        </DndContext>

        {editorState && (
          <ProductEditorModal title={editorTitle} onClose={handleCloseEditor}>
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
