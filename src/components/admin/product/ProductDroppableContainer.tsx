import styled from '@emotion/styled';
import { useDroppable } from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { Product } from '@@types/index';
import { colFlex, rowFlex } from '@styles/flexStyles';
import ProductSortableItem from './ProductSortableItem';

const Container = styled.div`
  box-sizing: border-box;
  width: 95%;
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

const ProductCardsContainer = styled.div<{ isOver: boolean }>`
  gap: 8px;
  width: 100%;
  overflow-x: auto;
  flex-wrap: nowrap;
  padding-bottom: 4px;
  min-height: 220px;
  background-color: ${({ isOver }) => (isOver ? 'rgba(0, 0, 0, 0.02)' : 'transparent')};
  transition: background-color 0.2s ease;
  border-radius: 16px;
  ${rowFlex({ justify: 'start', align: 'center' })};
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: 220px;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

interface CategoryDroppableContainerProps {
  categoryId: number | null;
  categoryName: string;
  products: Product[];
  onProductClick: (productId: number) => void;
}

function ProductDroppableContainer({ categoryId, categoryName, products, onProductClick }: CategoryDroppableContainerProps) {
  const droppableId = `category-${categoryId === null ? 'default' : categoryId}`;

  const { setNodeRef, isOver } = useDroppable({
    id: droppableId,
    data: {
      type: 'Category',
      categoryId,
    },
  });

  return (
    <Container className="products-container">
      <CategoryTitle>{categoryName}</CategoryTitle>

      <SortableContext id={droppableId} items={products.map((p) => `product-${p.id}`)} strategy={horizontalListSortingStrategy}>
        <ProductCardsContainer ref={setNodeRef} isOver={isOver} className="product-cards-container">
          {products.map((product) => (
            <ProductSortableItem key={product.id} product={product} onClick={() => onProductClick(product.id)} />
          ))}
          {products.length === 0 && <EmptyContainer className="product-empty-container">등록된 상품이 없습니다.</EmptyContainer>}
        </ProductCardsContainer>
      </SortableContext>
    </Container>
  );
}

export default ProductDroppableContainer;
