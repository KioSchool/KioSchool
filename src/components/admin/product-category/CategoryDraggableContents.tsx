import { ProductCategory } from '@@types/index';
import styled from '@emotion/styled';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import useConfirm from '@hooks/useConfirm';
import { Color } from '@resources/colors';
import { RiMenuLine, RiDeleteBinFill } from '@remixicon/react';
import { rowFlex } from '@styles/flexStyles';
import { Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { expandButtonStyle } from '@styles/buttonStyles';

const CategoryItemContainer = styled.div`
  position: relative;
  width: 650px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const CategoryContentsContainer = styled.div`
  box-sizing: border-box;
  padding: 15px 30px;
  width: 600px;
  height: 55px;
  background-color: ${Color.WHITE};
  border-radius: 51px;
  border: 1px solid rgba(201, 201, 201, 0.5);
  margin: 10px 0;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const CategoryName = styled.label`
  font-size: 18px;
  width: 50%;
`;

const DeleteIcon = styled(RiDeleteBinFill)`
  position: absolute;
  left: -10px;
  color: #b9b9b9;
  ${expandButtonStyle}
`;

const GripIcon = styled(RiMenuLine)`
  color: #b9b9b9;
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
              <GripIcon />
            </CategoryContentsContainer>
          </CategoryItemContainer>
        )}
      </Draggable>
      <ConfirmModal />
    </>
  );
}

export default CategoryDraggableContents;
