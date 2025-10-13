import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { ProductCategory } from '@@types/index';
import { adminCategoriesAtom } from 'src/jotai/admin/atoms';
import { useAtom } from 'jotai';
import { defaultCategory } from '@resources/data/categoryData';
import CategoryItem from '@components/admin/product-category/CategoryItem';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import CategoryDraggableContents from './CategoryDraggableContents';

const FixedHeightContainer = styled.div`
  ${colFlex({ align: 'center' })}
  height: 450px;
  width: 100%;
`;

const ListWrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  ${colFlex({ align: 'center' })}
  padding: 0 20px;
  box-sizing: border-box;
  scrollbar-gutter: stable;
`;

const FixedItemWrapper = styled.div`
  ${colFlex({ align: 'center' })}
`;

function CategoryDragAndDropContent() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchCategories } = useAdminProducts(workspaceId);
  const [rawCategories, setRawCategories] = useAtom(adminCategoriesAtom);

  useEffect(() => {
    fetchCategories();
  }, []);

  const reorder = (list: ProductCategory[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const changedCategories = reorder(rawCategories, result.source.index, result.destination.index);

    setRawCategories(changedCategories);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <FixedHeightContainer>
        <Droppable droppableId="droppable">
          {(provided) => (
            <ListWrapper ref={provided.innerRef} {...provided.droppableProps}>
              {rawCategories.map((category, index) => (
                <CategoryDraggableContents key={category.id} category={category} index={index} />
              ))}
              {provided.placeholder}
            </ListWrapper>
          )}
        </Droppable>

        <FixedItemWrapper>
          <CategoryItem category={defaultCategory} isDefault={true} />
        </FixedItemWrapper>
      </FixedHeightContainer>
    </DragDropContext>
  );
}

export default CategoryDragAndDropContent;
