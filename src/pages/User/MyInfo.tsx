import Container from '@components/common/container/Container';
import MyInfoContent from '@components/common/content/MyInfoContent';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import styled from '@emotion/styled';
import useAdminUser from '@hooks/useAdminUser';
import { adminUserAtom } from '@recoils/atoms';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const MyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

function MyInfo() {
  const { fetchAdminUser } = useAdminUser();
  const user = useRecoilValue(adminUserAtom);
  useEffect(() => {
    fetchAdminUser();
  }, []);
  return (
    <>
      <Container justifyValue={'center'} alignItems={'center'} flexDirection={'column'}>
        <MyInfoContainer>
          <TitleNavBar title={`${user.name} 님의 마이페이지`} useBackIcon={true} />
          <MyInfoContent />
        </MyInfoContainer>
      </Container>
    </>
  );
}

export default MyInfo;
