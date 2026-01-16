import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { adminCategoriesAtom } from '@jotai/admin/atoms';
import { useAtom } from 'jotai';
import { defaultCategory } from '@constants/data/categoryData';
import CategoryItem from '@components/admin/product-category/CategoryItem';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import CategoryDraggableContents from '@components/admin/product-category/CategoryDraggableContents';
import { closestCenter, DndContext, DragEndEvent, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

const ListWrapper = styled.div`
  width: 100%;
  max-height: 360px;
  overflow-y: auto;
  gap: 18px;
  box-sizing: border-box;
  scrollbar-gutter: stable;
  ${colFlex({ align: 'center' })}
`;

const FixedItemWrapper = styled.div`
  padding-top: 18px;
  ${colFlex({ align: 'center' })}
`;

function CategoryDragAndDropContent() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchCategories } = useAdminProducts(workspaceId);
  const [categories, setCategories] = useAtom(adminCategoriesAtom);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    }),
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  const onDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const oldIndex = categories.findIndex((c) => c.id === active.id);
    const newIndex = categories.findIndex((c) => c.id === over.id);
    if (oldIndex !== newIndex) {
      const newList = arrayMove(categories, oldIndex, newIndex);
      setCategories(newList);
    }
  };

  const activeCategory = categories.find((c) => c.id === activeId);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <SortableContext items={categories.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        <ListWrapper>
          {categories.map((category) => (
            <CategoryDraggableContents key={category.id} category={category} />
          ))}
        </ListWrapper>
      </SortableContext>
      <FixedItemWrapper>
        <CategoryItem category={defaultCategory} isDefault={true} />
      </FixedItemWrapper>
      <DragOverlay>{activeCategory ? <CategoryItem category={activeCategory} isDefault={false} /> : null}</DragOverlay>
    </DndContext>
  );
}

export default CategoryDragAndDropContent;
