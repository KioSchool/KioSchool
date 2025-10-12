import { ProductCategory } from '@@types/index';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { RiMenuLine, RiDeleteBinFill } from '@remixicon/react';
import { rowFlex } from '@styles/flexStyles';
import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { expandButtonStyle } from '@styles/buttonStyles';
import { defaultCategoryNotice } from '@resources/data/categoryData';

const CategoryItemContainer = styled.div`
  position: relative;
  width: 650px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const CategoryContentsContainer = styled.div`
  box-sizing: border-box;
  padding: 15px 30px;
  width: 600px;
  height: 55px;
  background-color: ${Color.WHITE};
  border-radius: 51px;
  border: 1px solid rgba(201, 201, 201, 0.5);
  margin: 10px 0;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const CategoryName = styled.label`
  font-size: 18px;
  width: 50%;
`;

const DefaultCategoryNotice = styled.label`
  font-size: 14px;
  color: #8d8d8d;
`;

const DeleteIcon = styled(RiDeleteBinFill)`
  position: absolute;
  left: -10px;
  color: #b9b9b9;
  ${expandButtonStyle}
`;

const GripIcon = styled(RiMenuLine)`
  color: #b9b9b9;
`;

const DragHandle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
`;

interface CategoryItemProps {
  category: ProductCategory;
  isDefault: boolean;
  deleteHandler?: () => void;
  innerRef?: (element: HTMLElement | null) => void;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

function CategoryItem({ category, isDefault, deleteHandler, innerRef, draggableProps, dragHandleProps }: CategoryItemProps) {
  return (
    <CategoryItemContainer ref={innerRef} {...draggableProps}>
      {!isDefault && <DeleteIcon onClick={deleteHandler} />}
      <CategoryContentsContainer>
        <CategoryName>{category.name}</CategoryName>
        <DragHandle {...dragHandleProps}>
          {isDefault && <DefaultCategoryNotice>{defaultCategoryNotice}</DefaultCategoryNotice>}
          {!isDefault && <GripIcon />}
        </DragHandle>
      </CategoryContentsContainer>
    </CategoryItemContainer>
  );
}

export default CategoryItem;
