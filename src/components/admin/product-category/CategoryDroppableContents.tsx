import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import CategoryDraggableContents from '@components/admin/product-category/CategoryDraggableContents';
import { ProductCategory } from '@@types/index';
import { DroppableProvided } from 'react-beautiful-dnd';
import { defaultCategoryName } from '@resources/data/categoryData';

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
        const isDefault = category.name === defaultCategoryName;
        return <CategoryDraggableContents key={category.id} category={category} index={index} isDefault={isDefault} />;
      })}
      {provided.placeholder}
    </CategoriesContentContainer>
  );
}

export default CategoryDroppableContents;
