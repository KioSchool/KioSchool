import AppContainer from '@components/common/container/AppContainer';
import NavBar from '@components/common/nav/NavBar';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import styled from '@emotion/styled';
import AppButton from '@components/common/button/AppButton';
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
  background-color: yellow;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoriesContentContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: gray;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoriesButtonContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: skyBlue;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoriesInputSubContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 60px;
  width: 420px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 17px 0px rgba(0, 0, 0, 0.1);
`;
const CategoriesInput = styled.input`
  border: none;
  height: 50px;
  width: 250px;
  &:focus {
    outline: none;
  }
`;
function AdminProductCategories() {
  return (
    <>
      <NavBar useBackground={true} />
      <AppContainer justifyValue={'center'}>
        <Container>
          <TitleNavBar title={'카테고리 관리'}></TitleNavBar>
          <CategoriesInputContainer>
            <CategoriesInputSubContainer>
              <CategoriesInput placeholder="카테고리명" />
              <AppButton>카테고리 추가</AppButton>
            </CategoriesInputSubContainer>
          </CategoriesInputContainer>
          <CategoriesContentContainer />
          <CategoriesButtonContainer>
            <AppButton size={'medium'}>편집 완료</AppButton>
          </CategoriesButtonContainer>
        </Container>
      </AppContainer>
    </>
  );
}

export default AdminProductCategories;
