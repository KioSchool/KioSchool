import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import CategoryDraggableContents from './CategoryDraggableContents';
import { ProductCategory } from '@@types/index';
import { DroppableProvided } from 'react-beautiful-dnd';

const CategoriesContentContainer = styled.div`
  width: 100%;
  height: 400px;
  overflow: auto;
  ${colFlex({ align: 'center' })}
`;

interface DroppableProps {
  provided: DroppableProvided;
  categoryArray: ProductCategory[];
}

function CategoryDroppableContents({ provided, categoryArray }: DroppableProps) {
  return (
    <CategoriesContentContainer ref={provided.innerRef} {...provided.droppableProps} className={'droppable-container'}>
      {categoryArray.map((category, index) => {
        return <CategoryDraggableContents category={category} index={index} />;
      })}
      {provided.placeholder}
    </CategoriesContentContainer>
  );
}

export default CategoryDroppableContents;
