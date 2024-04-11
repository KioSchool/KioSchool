import AppContainer from '@components/common/container/AppContainer';
import MyInfoContent from '@components/common/content/MyInfoContent';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import styled from '@emotion/styled';
import useAdminUser from '@hooks/admin/useAdminUser';
import { adminUserAtom } from '@recoils/atoms';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const MyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

function MyInfo() {
  const { fetchAdminUser } = useAdminUser();
  const user = useRecoilValue(adminUserAtom);

  useEffect(() => {
    fetchAdminUser();
  }, []);

  return (
    <AppContainer justifyValue={'center'} alignItems={'center'} flexDirection={'column'}>
      <MyInfoContainer>
        <TitleNavBar title={`${user.name} 님의 마이페이지`} subTitle={user.email} useBackIcon={true} />
        <MyInfoContent />
      </MyInfoContainer>
    </AppContainer>
  );
}

export default MyInfo;
