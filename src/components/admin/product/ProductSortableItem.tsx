import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from '@emotion/styled';
import { Product } from '@@types/index';
import ProductCard from './ProductCard';

const DraggableContainer = styled.div<{ transform?: string; transition?: string; isDragging?: boolean }>`
  position: relative;
  transform: ${({ transform }) => transform};
  transition: ${({ transition }) => transition || 'box-shadow 0.2s ease'};
  z-index: ${({ isDragging }) => (isDragging ? 999 : 'auto')};
  opacity: ${({ isDragging }) => (isDragging ? 0.3 : 1)};
  touch-action: none;
  cursor: ${({ isDragging }) => (isDragging ? 'grabbing' : 'grab')};
  border-radius: 16px;

  /* ProductCard 내부의 포인터 커서보다 드래그 커서가 우선되도록 설정 */
  * {
    cursor: ${({ isDragging }) => (isDragging ? 'grabbing !important' : '')};
  }

  &:hover {
    box-shadow: ${({ isDragging }) => (isDragging ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.08)')};
  }
`;

interface ProductSortableItemProps {
  product: Product;
  onClick?: () => void;
}

function ProductSortableItem({ product, onClick }: ProductSortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `product-${product.id}`,
    data: {
      type: 'Product',
      product,
    },
  });

  return (
    <DraggableContainer
      ref={setNodeRef}
      transform={CSS.Transform.toString(transform)}
      transition={transition}
      isDragging={isDragging}
      {...attributes}
      {...listeners}
    >
      <ProductCard product={product} onClick={onClick} />
    </DraggableContainer>
  );
}

export default ProductSortableItem;
