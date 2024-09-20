import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import AppButton from '@components/common/button/AppButton';
import AppInputWithButton from '@components/common/input/AppInputWithButton';
import { useRef } from 'react';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { categoriesAtom } from '@recoils/atoms';
import DragAndDropContent from '@components/admin/product-category/DragAndDropContent';
import { colFlex } from '@styles/flexStyles';

const Container = styled.div`
  gap: 15px;
  padding-top: 100px;
  ${colFlex({ align: 'center' })}
`;

const CategoriesInputContainer = styled.div`
  width: 100%;
  height: 100px;
  ${colFlex({ justify: 'center', align: 'center' })}
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
    const categoriesId = rawCategories.map((itm) => Number(itm.id));
    reorderCategories(categoriesId);
  };

  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })} titleNavBarProps={{ title: '카테고리 관리' }}>
      <Container className={'admin-product-categories-container'}>
        <CategoriesInputContainer className={'categories-input-container'}>
          <AppInputWithButton ref={categoryInputRef} onButtonClick={addCategoryHandler} />
        </CategoriesInputContainer>
        <DragAndDropContent />
        <CategoriesButtonContainer className={'categories-button-container'}>
          <AppButton size={'medium'} onClick={saveCategory}>
            편집 완료
          </AppButton>
        </CategoriesButtonContainer>
      </Container>
    </AppContainer>
  );
}

export default AdminProductCategories;
