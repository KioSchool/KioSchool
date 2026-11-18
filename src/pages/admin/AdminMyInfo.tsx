import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import AppContainer from '@components/common/container/AppContainer';
import MyInfoContent from '@components/admin/my-info/MyInfoContent';
import useAdminUser from '@hooks/admin/useAdminUser';
import { colFlex } from '@styles/flexStyles';
import { adminUserAtom } from '@jotai/admin/atoms';

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
