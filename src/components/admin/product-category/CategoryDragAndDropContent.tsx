import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import CategoryDroppableContents from './CategoryDroppableContents';
import { ProductCategory } from '@@types/index';
import { adminCategoriesAtom } from 'src/jotai/admin/atoms';
import { useAtom } from 'jotai';
import { defaultCategory } from '@resources/data/categoryData';

function CategoryDragAndDropContent() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchCategories } = useAdminProducts(workspaceId);
  const [rawCategories, setRawCategories] = useAtom(adminCategoriesAtom);
  const categories: ProductCategory[] = [defaultCategory, ...rawCategories.map((category) => ({ ...category }))];

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

    if (result.destination.index === 0) {
      return;
    }

    const changedCategories = reorder(categories, result.source.index, result.destination.index);

    setRawCategories(changedCategories.slice(1));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">{(provided) => <CategoryDroppableContents provided={provided} categories={categories} />}</Droppable>
    </DragDropContext>
  );
}

export default CategoryDragAndDropContent;
