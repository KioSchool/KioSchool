import useAdminProducts from '@hooks/admin/useAdminProducts';
import { categoriesAtom } from '@recoils/atoms';
import { useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import DroppableContents from './DroppableContents';
import { ProductCategory } from '@@types/index';

function CategoryDragAndDropContent() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchCategories } = useAdminProducts(workspaceId);
  const [rawCategories, setRawCategories] = useRecoilState(categoriesAtom);
  const categories: ProductCategory[] = rawCategories.map((category) => ({
    ...category,
    id: String(category.id),
  }));

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

    const categoriesIdParsedNumber = categories.map((itm) => ({ ...itm, id: Number(itm.id) }));
    const changedCategories = reorder(categoriesIdParsedNumber, result.source.index, result.destination.index);

    setRawCategories(changedCategories);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">{(provided) => <DroppableContents provided={provided} categories={categories} />}</Droppable>
    </DragDropContext>
  );
}

export default CategoryDragAndDropContent;