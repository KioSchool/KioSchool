import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import { useRef } from 'react';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useParams } from 'react-router-dom';
import CategoryDragAndDropContent from '@components/admin/product-category/CategoryDragAndDropContent';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { adminCategoriesAtom } from 'src/jotai/admin/atoms';
import { useAtomValue } from 'jotai';
import NewCommonButton from '@components/common/button/NewCommonButton';

const Container = styled.div`
  width: 680px;
  gap: 15px;
  padding-top: 24px;
  ${colFlex({ align: 'center' })}
`;

const CategoriesInputContainer = styled.div`
  width: 100%;
  padding-bottom: 32px;
  ${colFlex({ justify: 'center' })}
`;

const CategoriesItemContainer = styled.div`
  width: 100%;
  ${colFlex({ justify: 'center' })}
`;

const SectionTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #464a4d;
  padding-bottom: 15px;
`;

const InputRow = styled.div`
  width: 100%;
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  border-bottom: 1px solid #e8eef2;
  padding: 12px 4px;
  font-size: 18px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-bottom-color: ${Color.KIO_ORANGE};
    caret-color: ${Color.KIO_ORANGE};
  }

  &::placeholder {
    color: #e8eef2;
  }
`;

const CategoriesButtonContainer = styled.div`
  padding-top: 64px;
  ${rowFlex({ justify: 'center' })}
`;

function AdminProductCategories() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { addCategory, reorderCategories } = useAdminProducts(workspaceId);
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const rawCategories = useAtomValue(adminCategoriesAtom);

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
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })}>
      <Container className={'admin-product-categories-container'}>
        <CategoriesInputContainer className={'categories-input-container'}>
          <SectionTitle>등록할 카테고리명</SectionTitle>
          <InputRow>
            <StyledInput ref={categoryInputRef} type="text" placeholder="카테고리 이름을 입력해주세요" />
            <NewCommonButton onClick={addCategoryHandler} size="sm">
              등록
            </NewCommonButton>
          </InputRow>
        </CategoriesInputContainer>

        <CategoriesItemContainer className={'categories-item-container'}>
          <SectionTitle>카테고리 순서</SectionTitle>
          <CategoryDragAndDropContent />
        </CategoriesItemContainer>

        <CategoriesButtonContainer className={'categories-button-container'}>
          <NewCommonButton onClick={saveCategory} size="md">
            편집 완료
          </NewCommonButton>
        </CategoriesButtonContainer>
      </Container>
    </AppContainer>
  );
}

export default AdminProductCategories;
