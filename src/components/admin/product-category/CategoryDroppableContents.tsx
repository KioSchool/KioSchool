import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import CategoryDraggableContents from './CategoryDraggableContents';
import { ProductCategory } from '@@types/index';
import { DroppableProvided } from 'react-beautiful-dnd';
const hi = '';
const CategoriesContentContainer = styled.div`
  width: 100%;
  height: 400px;
  overflow: auto;
  ${colFlex({ align: 'center' })}
`;

interface DroppableProps {
  provided: DroppableProvided;
  categories: ProductCategory[];
}

function CategoryDroppableContents({ provided, categories }: DroppableProps) {
  return (
    <CategoriesContentContainer ref={provided.innerRef} {...provided.droppableProps} className={'droppable-container'}>
      {categories.map((category, index) => {
        return <CategoryDraggableContents key={category.id} category={category} index={index} />;
      })}
      {provided.placeholder}
    </CategoriesContentContainer>
  );
}

export default CategoryDroppableContents;
