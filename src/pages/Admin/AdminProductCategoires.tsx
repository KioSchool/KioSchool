import AppContainer from '@components/common/container/AppContainer';
import NavBar from '@components/common/nav/NavBar';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import styled from '@emotion/styled';
import AppButton from '@components/common/button/AppButton';
import AppInputWithButton from '@components/common/input/AppInputWithButton';
import { useRef } from 'react';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { categoriesAtom } from '@recoils/atoms';
import DragAndDropContent from '@components/common/content/DragAndDropContent';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 100px;
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
  height: 300px;
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
  const { addCategories, reorderCategories } = useAdminProducts(workspaceId);
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const rawCategories = useRecoilValue(categoriesAtom);

  const addCategoryHandler = () => {
    const userInput = categoryInputRef.current?.value;

    if (userInput === '' || userInput === undefined) {
      alert('카테고리를 입력해주세요');
      return;
    }

    addCategories(userInput);
    if (categoryInputRef.current) categoryInputRef.current.value = '';
  };

  const fixCategory = () => {
    const categoriesId = rawCategories.map((itm) => itm.id);
    reorderCategories(categoriesId);
  };

  return (
    <>
      <NavBar useBackground={true} />
      <AppContainer justifyValue={'center'}>
        <Container>
          <TitleNavBar title={'카테고리 관리'}></TitleNavBar>
          <CategoriesInputContainer>
            <AppInputWithButton ref={categoryInputRef} onclick={addCategoryHandler} />
          </CategoriesInputContainer>
          <CategoriesContentContainer>
            <DragAndDropContent />
          </CategoriesContentContainer>
          <CategoriesButtonContainer>
            <AppButton
              size={'medium'}
              onClick={() => {
                fixCategory();
              }}
            >
              편집 완료
            </AppButton>
          </CategoriesButtonContainer>
        </Container>
      </AppContainer>
    </>
  );
}

export default AdminProductCategories;