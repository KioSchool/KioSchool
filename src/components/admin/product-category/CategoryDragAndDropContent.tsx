import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { adminCategoriesAtom } from 'src/jotai/admin/atoms';
import { useAtom } from 'jotai';
import { defaultCategory } from '@resources/data/categoryData';
import CategoryItem from '@components/admin/product-category/CategoryItem';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import CategoryDraggableContents from './CategoryDraggableContents';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

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

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const oldIndex = rawCategories.findIndex((c) => c.id === active.id);
    const newIndex = rawCategories.findIndex((c) => c.id === over.id);
    if (oldIndex !== newIndex) {
      const newList = arrayMove(rawCategories, oldIndex, newIndex);
      setRawCategories(newList);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={rawCategories.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        <ListWrapper>
          {rawCategories.map((category) => (
            <CategoryDraggableContents key={category.id} category={category} />
          ))}
        </ListWrapper>
      </SortableContext>
      <FixedItemWrapper>
        <CategoryItem category={defaultCategory} isDefault={true} />
      </FixedItemWrapper>
    </DndContext>
  );
}

export default CategoryDragAndDropContent;
