import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import CategoryDroppableContents from '@components/admin/product-category/CategoryDroppableContents';
import { ProductCategory } from '@@types/index';
import { adminCategoriesAtom } from 'src/jotai/admin/atoms';
import { useAtom } from 'jotai';
import { defaultCategory } from '@resources/data/categoryData';
import CategoryItem from '@components/admin/product-category/CategoryItem';
import styled from '@emotion/styled';

const ListWrapper = styled.div`
  width: 100%;
  min-height: 50px;
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
      <CategoryItem category={defaultCategory} isDefault={true} />
      <Droppable droppableId="droppable">
        {(provided) => (
          <ListWrapper ref={provided.innerRef} {...provided.droppableProps}>
            <CategoryDroppableContents categories={rawCategories} />
            {provided.placeholder}
          </ListWrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default CategoryDragAndDropContent;
