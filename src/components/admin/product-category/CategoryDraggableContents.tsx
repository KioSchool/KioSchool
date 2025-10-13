import { ProductCategory } from '@@types/index';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import useConfirm from '@hooks/useConfirm';
import { Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import CategoryItem from '@components/admin/product-category/CategoryItem';

interface DraggableProps {
  category: ProductCategory;
  index: number;
}

function CategoryDraggableContents({ category, index }: DraggableProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { deleteCategory } = useAdminProducts(workspaceId);
  const { ConfirmModal, confirm } = useConfirm({
    title: '카테고리에 포함된 상품이 있습니다.',
    description: '카테고리에 포함된 상품이 없어야 카테고리를 삭제할 수 있습니다.',
    okText: '확인',
  });

  const deleteCategoryHandler = () => {
    deleteCategory(category.id).catch((e) => {
      if (e.response.status === 405) {
        confirm();
      }
    });
  };

  return (
    <>
      <Draggable key={category.id} draggableId={String(category.id)} index={index}>
        {(provided) => (
          <CategoryItem
            category={category}
            isDefault={false}
            deleteHandler={deleteCategoryHandler}
            innerRef={provided.innerRef}
            draggableProps={provided.draggableProps}
            dragHandleProps={provided.dragHandleProps}
          />
        )}
      </Draggable>
      <ConfirmModal />
    </>
  );
}

export default CategoryDraggableContents;
