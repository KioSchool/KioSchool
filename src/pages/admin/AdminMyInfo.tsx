import AppContainer from '@components/common/container/AppContainer';
import MyInfoContent from '@components/admin/my-info/MyInfoContent';
import useAdminUser from '@hooks/admin/useAdminUser';
import { useEffect } from 'react';
import { colFlex } from '@styles/flexStyles';
import { adminUserAtom } from 'src/jotai/admin/atoms';
import { useAtomValue } from 'jotai';

function AdminMyInfo() {
  const { fetchAdminUser } = useAdminUser();
  const user = useAtomValue(adminUserAtom);

  useEffect(() => {
    fetchAdminUser();
  }, []);

  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })}>
      <MyInfoContent user={user} />
    </AppContainer>
  );
}

export default AdminMyInfo;
