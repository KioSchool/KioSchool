import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import DraggableContents from './DraggableContents';
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
  categories: ProductCategory[];
  confirm: () => Promise<unknown>;
}

function DroppableContents({ provided, categories, confirm }: DroppableProps) {
  return (
    <CategoriesContentContainer ref={provided.innerRef} {...provided.droppableProps}>
      {categories.map((item, index) => {
        return <DraggableContents item={item} index={index} confirm={confirm} />;
      })}
      {provided.placeholder}
    </CategoriesContentContainer>
  );
}

export default DroppableContents;
