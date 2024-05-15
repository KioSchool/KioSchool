import ManageAccount from '@components/admin/info/ManageAccount';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';

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
        <ManageAccount />
      </ContentContainer>
    </AppContainer>
  );
}

export default Info;
