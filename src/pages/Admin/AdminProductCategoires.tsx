import AppContainer from '@components/common/container/AppContainer';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import styled from '@emotion/styled';
import AppButton from '@components/common/button/AppButton';
import AppInputWithButton from '@components/common/input/AppInputWithButton';
import { useRef } from 'react';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { categoriesAtom } from '@recoils/atoms';
import DragAndDropContent from '@components/admin/product-category/DragAndDropContent';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  padding-top: 100px;
`;

const CategoriesInputContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CategoriesContentContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

const CategoriesButtonContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    <AppContainer justifyValue={'center'}>
      <Container>
        <TitleNavBar title={'카테고리 관리'}></TitleNavBar>
        <CategoriesInputContainer>
          <AppInputWithButton ref={categoryInputRef} onButtonClick={addCategoryHandler} />
        </CategoriesInputContainer>
        <CategoriesContentContainer>
          <DragAndDropContent />
        </CategoriesContentContainer>
        <CategoriesButtonContainer>
          <AppButton size={'medium'} onClick={saveCategory}>
            편집 완료
          </AppButton>
        </CategoriesButtonContainer>
      </Container>
    </AppContainer>
  );
}

export default AdminProductCategories;
