import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import { useRef } from 'react';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { categoriesAtom } from '@recoils/atoms';
import CategoryDragAndDropContent from '@components/admin/product-category/CategoryDragAndDropContent';
import { colFlex, rowFlex } from '@styles/flexStyles';
import NewRoundedButton from '@components/common/button/NewRoundedButton';
import { Color } from '@resources/colors';

const Container = styled.div`
  gap: 15px;
  padding-top: 100px;
  ${colFlex({ align: 'center' })}
`;

const CategoriesInputContainer = styled.div`
  width: 100%;
  height: 100px;
  gap: 15px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const StyledInput = styled.input`
  border: none;
  box-sizing: border-box;
  width: 370px;
  height: 35px;
  padding: 5 20px;
  border-bottom: 1px solid #c9c9c9;
  font-size: 20px;

  &:focus {
    outline: none;
    caret-color: ${Color.KIO_ORANGE};
  }

  &::placeholder {
    color: #c9c9c9;
  }
`;

const CategoriesButtonContainer = styled.div`
  width: 100%;
  height: 100px;
  ${colFlex({ align: 'center' })}
`;

function AdminProductCategories() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { addCategory, reorderCategories } = useAdminProducts(workspaceId);
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const rawCategories = useRecoilValue(categoriesAtom);

  const addCategoryHandler = () => {
    const userInput = categoryInputRef.current?.value;

    if (!userInput) {
      alert('카테고리를 입력해주세요');
      return;
    }

    addCategory(userInput);
    if (categoryInputRef.current) categoryInputRef.current.value = '';
  };

  const saveCategory = () => {
    const categoriesId = rawCategories.map((itm) => itm.id);
    reorderCategories(categoriesId);
  };

  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })} titleNavBarProps={{ title: '카테고리 관리' }}>
      <Container className={'admin-product-categories-container'}>
        <CategoriesInputContainer className={'categories-input-container'}>
          <StyledInput ref={categoryInputRef} type="text" placeholder="카테고리 이름을 입력해주세요" />
          <NewRoundedButton size={'sm'} onClick={addCategoryHandler}>
            카테고리 추가
          </NewRoundedButton>
        </CategoriesInputContainer>
        <CategoryDragAndDropContent />
        <CategoriesButtonContainer className={'categories-button-container'}>
          <NewRoundedButton onClick={saveCategory}>편집 완료</NewRoundedButton>
        </CategoriesButtonContainer>
      </Container>
    </AppContainer>
  );
}

export default AdminProductCategories;
