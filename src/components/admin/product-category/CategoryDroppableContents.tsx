import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import CategoryDraggableContents from '@components/admin/product-category/CategoryDraggableContents';
import { ProductCategory } from '@@types/index';

const CategoriesContentContainer = styled.div`
  width: 100%;
  overflow: auto;
  ${colFlex({ align: 'center' })}
`;

interface DroppableProps {
  categories: ProductCategory[];
}

function CategoryDroppableContents({ categories }: DroppableProps) {
  return (
    <CategoriesContentContainer className={'droppable-container'}>
      {categories.map((category, index) => {
        return <CategoryDraggableContents key={category.id} category={category} index={index} />;
      })}
    </CategoriesContentContainer>
  );
}

export default CategoryDroppableContents;
