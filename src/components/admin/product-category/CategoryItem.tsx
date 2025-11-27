import { ProductCategory } from '@@types/index';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { RiMenuLine, RiDeleteBinFill } from '@remixicon/react';
import { rowFlex } from '@styles/flexStyles';
import { expandButtonStyle } from '@styles/buttonStyles';
import { defaultCategoryNotice } from '@constants/data/categoryData';

const CategoryItemContainer = styled.div`
  position: relative;
  width: 668px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const CategoryContentsContainer = styled.div`
  box-sizing: border-box;
  padding: 15px 30px;
  width: 630px;
  height: 55px;
  background-color: ${Color.WHITE};
  border-radius: 16px;
  border: 1px solid rgba(201, 201, 201, 0.5);
  box-shadow: 0px 4px 20px rgba(92, 92, 92, 0.05);
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
  width: 18px;
  height: 18px;
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
}

function CategoryItem({ category, isDefault, deleteHandler }: CategoryItemProps) {
  return (
    <CategoryItemContainer>
      {!isDefault && <DeleteIcon onClick={deleteHandler} />}
      <CategoryContentsContainer>
        <CategoryName>{category.name}</CategoryName>
        <DragHandle>
          {isDefault && <DefaultCategoryNotice>{defaultCategoryNotice}</DefaultCategoryNotice>}
          {!isDefault && <GripIcon />}
        </DragHandle>
      </CategoryContentsContainer>
    </CategoryItemContainer>
  );
}

export default CategoryItem;
