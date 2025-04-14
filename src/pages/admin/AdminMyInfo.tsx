import AppContainer from '@components/common/container/AppContainer';
import MyInfoContent from '@components/admin/my-info/MyInfoContent';
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

function AdminMyInfo() {
  const { fetchAdminUser } = useAdminUser();
  const user = useRecoilValue(adminUserAtom);

  useEffect(() => {
    fetchAdminUser();
  }, []);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center', align: 'center' })}
      titleNavBarProps={{
        title: `${user.name} 님의 마이페이지`,
        subTitle: user.email,
      }}
    >
      <MyInfoContainer className={'my-info-container'}>
        <MyInfoContent />
      </MyInfoContainer>
    </AppContainer>
  );
}

export default AdminMyInfo;
