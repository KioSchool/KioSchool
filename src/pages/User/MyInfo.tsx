import Container from '@components/common/container/Container';
import MyInfoContent from '@components/common/content/MyInfoContent';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import styled from '@emotion/styled';

const MyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

function MyInfo() {
  return (
    <>
      <Container justifyValue={'center'} alignItems={'center'} flexDirection={'column'}>
        <MyInfoContainer>
          <TitleNavBar title={'님의 마이페이지'} useBackIcon={true} />
          <MyInfoContent />
        </MyInfoContainer>
      </Container>
    </>
  );
}

export default MyInfo;
