import styled from '@emotion/styled';
import myInfoImage1 from '../../../resources/image/myInfoImage1.png';
const Container = styled.div`
  background: #f4f4f4;
  width: 100%;
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainTitleContainer = styled.div`
  padding-bottom: 20px;
  width: 75%;
  font-weight: 800;
  font-size: 40px;
`;
const SubTitleContainer = styled.div`
  padding-bottom: 20px;
  width: 75%;
  font-weight: 400;
  font-size: 20px;
`;

function ManageAccountInfo() {
  return (
    <Container>
      <MainTitleContainer>{`마이페이지 > 계좌관리`}</MainTitleContainer>
      <SubTitleContainer>{`1. 먼저 로그인 후 계좌 등록을 해야 워크스페이스 등록을 진행할 수 있습니다.`}</SubTitleContainer>
      <img src={myInfoImage1} width={'1000px'} height={'500px'} alt="계좌 등록 설명1"></img>
    </Container>
  );
}

export default ManageAccountInfo;
