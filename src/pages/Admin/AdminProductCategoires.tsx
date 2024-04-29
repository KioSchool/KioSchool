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

function AdminProductCategories() {
  return (
    <>
      <NavBar useBackground={true} />
      <AppContainer justifyValue={'center'}>
        <Container>
          <TitleNavBar title={'카테고리 관리'}></TitleNavBar>
          <CategoriesInputContainer />
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
