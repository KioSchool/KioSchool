import { ProductCategory } from '@@types/index';
import styled from '@emotion/styled';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import useConfirm from '@hooks/useConfirm';
import { Color } from '@resources/colors';
import { RiMenuLine, RiDeleteBinLine } from '@remixicon/react';
import { rowFlex } from '@styles/flexStyles';
import { Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { expandButtonStyle } from '@styles/buttonStyles';

const CategoryItemContainer = styled.div`
  position: relative;
  width: 600px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const CategoryContentsContainer = styled.div`
  width: 500px;
  height: 60px;
  background-color: ${Color.WHITE};
  border-radius: 12px;
  box-shadow: 0 4px 17px 0 rgba(0, 0, 0, 0.1);
  margin: 10px 0;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const CategoryName = styled.label`
  font-size: 20px;
  width: 50%;
  padding-left: 20px;
`;

const DeleteIcon = styled(RiDeleteBinLine)`
  position: absolute;
  left: 13px;
  color: ${Color.GREY};
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  ${expandButtonStyle}
`;

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
          <CategoryItemContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={'draggable-category-container'}>
            <DeleteIcon onClick={deleteCategoryHandler} />
            <CategoryContentsContainer>
              <CategoryName>{category.name}</CategoryName>
              <RiMenuLine style={{ paddingRight: '20px' }} />
            </CategoryContentsContainer>
          </CategoryItemContainer>
        )}
      </Draggable>
      <ConfirmModal />
    </>
  );
}

export default CategoryDraggableContents;
