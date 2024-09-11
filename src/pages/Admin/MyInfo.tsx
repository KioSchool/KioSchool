import AppContainer from '@components/common/container/AppContainer';
import MyInfoContent from '@components/admin/my-info/MyInfoContent';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import styled from '@emotion/styled';
import useAdminUser from '@hooks/admin/useAdminUser';
import { adminUserAtom } from '@recoils/atoms';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { colFlex } from '@styles/flexStyles';

const MyInfoContainer = styled.div`
  width: 100%;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

function MyInfo() {
  const { fetchAdminUser } = useAdminUser();
  const user = useRecoilValue(adminUserAtom);

  useEffect(() => {
    fetchAdminUser();
  }, []);

  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })}>
      <MyInfoContainer className={'my-info-container'}>
        <TitleNavBar title={`${user.name} 님의 마이페이지`} subTitle={user.email} useBackIcon={true} />
        <MyInfoContent />
      </MyInfoContainer>
    </AppContainer>
  );
}

export default MyInfo;
