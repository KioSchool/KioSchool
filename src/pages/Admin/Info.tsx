import AccountInfo from '@components/admin/info/AccountInfo';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import infoImage1 from '../../resources/image/myInfoImage1.png';

const ContentContainer = styled.div`
  padding-top: 100px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  justify-direction: column;
`;

function Info() {
  return (
    <AppContainer justifyValue={'center'} alignItems={'center'} fullWidth={true}>
      <ContentContainer>
        <AccountInfo
          mainDescription="마이페이지 > 계좌관리"
          subDescription="먼저 로그인 후 계좌 등록을 해야 운영할 워크스페이스를 생성할 수 있습니다."
          imageSrc={infoImage1}
          imageWidth="1050px"
          imageHeight="500px"
        />
      </ContentContainer>
    </AppContainer>
  );
}

export default Info;
