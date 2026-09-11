import { ProductCategory } from '@@types/index';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import useConfirm from '@hooks/useConfirm';
import { useParams } from 'react-router-dom';
import CategoryItem from './CategoryItem';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from '@emotion/styled';
import { API_ERROR_CODES } from '@constants/errorCodes';
import { isApiErrorCode } from '@utils/apiError';

const DraggableContainer = styled.div<{ transform?: string; transition?: string; isDragging?: boolean }>`
  transform: ${({ transform }) => transform};
  transition: ${({ transition }) => transition};
  z-index: ${({ isDragging }) => (isDragging ? 999 : 'auto')};
  opacity: ${({ isDragging }) => (isDragging ? 0 : 1)};
  touch-action: none;
`;

interface DraggableProps {
  category: ProductCategory;
}

function CategoryDraggableContents({ category }: DraggableProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { deleteCategory } = useAdminProducts(workspaceId);
  const { ConfirmModal, confirm } = useConfirm({
    title: '카테고리에 포함된 상품이 있습니다.',
    description: '카테고리에 포함된 상품이 없어야 카테고리를 삭제할 수 있습니다.',
    okText: '확인',
  });

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: category.id });

  const deleteCategoryHandler = () => {
    deleteCategory(category.id).catch((e) => {
      // 405는 워크스페이스 접근 불가(WORKSPACE_INACCESSIBLE)와도 겹치므로 code로 판정한다.
      if (isApiErrorCode(e, API_ERROR_CODES.CANNOT_DELETE_USING_PRODUCT_CATEGORY)) {
        confirm();
      }
    });
  };

  return (
    <>
      <DraggableContainer
        ref={setNodeRef}
        transform={CSS.Transform.toString(transform)}
        transition={transition}
        isDragging={isDragging}
        {...attributes}
        {...listeners}
      >
        <CategoryItem category={category} isDefault={false} deleteHandler={deleteCategoryHandler} />
      </DraggableContainer>
      <ConfirmModal />
    </>
  );
}

export default CategoryDraggableContents;
