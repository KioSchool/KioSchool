import { ProductCategory } from '@@types/index';
import styled from '@emotion/styled';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import DeleteButtonGraySvg from '@resources/svg/DeleteButtonGraySvg';
import DragIconSvg from '@resources/svg/DragIconSvg';
import { rowFlex } from '@styles/flexStyles';
import { Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';

const CategoriesItemContainer = styled.div`
  position: relative;
  width: 600px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const CategoriesContentsContainer = styled.div`
  width: 500px;
  height: 60px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 17px 0 rgba(0, 0, 0, 0.1);
  margin: 10px 0;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const CategoriesName = styled.label`
  font-size: 20px;
  width: 50%;
  padding-left: 20px;
`;

const DeleteIcon = styled(DeleteButtonGraySvg)`
  position: absolute;
  left: 13px;
  &:hover {
    transform: scale(1.2);
  }
`;

interface DraggableProps {
  item: ProductCategory;
  index: number;
  confirm: () => Promise<unknown>;
}

function DraggableContents({ item, index, confirm }: DraggableProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { deleteCategory } = useAdminProducts(workspaceId);

  return (
    <Draggable key={item.id} draggableId={String(item.id)} index={index}>
      {(provided) => (
        <CategoriesItemContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <DeleteIcon
            onClick={() => {
              deleteCategory(Number(item.id)).catch((e) => {
                if (e.response.status === 405) {
                  confirm();
                }
              });
            }}
          />
          <CategoriesContentsContainer>
            <CategoriesName>{item.name}</CategoriesName>
            <DragIconSvg style={{ paddingRight: '20px' }} />
          </CategoriesContentsContainer>
        </CategoriesItemContainer>
      )}
    </Draggable>
  );
}

export default DraggableContents;
