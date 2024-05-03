import styled from '@emotion/styled';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { categoriesAtom } from '@recoils/atoms';
import DeleteButtonGraySvg from '@resources/svg/DeleteButtonGraySvg';
import DragIconSvg from '@resources/svg/DragIconSvg';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const CategoriesItemContainer = styled.div`
  position: relative;
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoriesContensContainer = styled.div`
  width: 500px;
  height: 60px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 17px 0px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CategoriesName = styled.label`
  font-family: Poppins;
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

function DragAndDropContent() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchCategories, deleteCategory } = useAdminProducts(workspaceId);
  const [rawCategories, setRawCategories] = useRecoilState(categoriesAtom);
  const [enabled, setEnabled] = useState(false);
  const categories = rawCategories.map((category) => ({
    ...category,
    id: String(category.id),
  }));

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    fetchCategories();

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const categoriesIdParsedNumber = categories.map((itm) => ({ ...itm, id: Number(itm.id) }));
    const changedCategories = reorder(categoriesIdParsedNumber, result.source.index, result.destination.index);

    setRawCategories(changedCategories);
  };

  if (!enabled) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {categories.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(pro) => (
                  <CategoriesItemContainer ref={pro.innerRef} {...pro.draggableProps} {...pro.dragHandleProps}>
                    <DeleteIcon
                      onClick={() => {
                        deleteCategory(Number(item.id));
                      }}
                    />
                    <CategoriesContensContainer>
                      <CategoriesName>{item.name}</CategoriesName>
                      <DragIconSvg style={{ paddingRight: '20px' }} />
                    </CategoriesContensContainer>
                  </CategoriesItemContainer>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragAndDropContent;
