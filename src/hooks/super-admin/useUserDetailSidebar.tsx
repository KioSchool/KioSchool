import { useAtom } from 'jotai';
import { Location } from 'react-router-dom';
import { SuperAdminUser, RIGHT_SIDEBAR_ACTION } from '@@types/index';
import { externalSidebarAtom } from '@jotai/atoms';
import UserDetailContent from '@components/super-admin/user/UserDetailContent';

function useUserDetailSidebar(pathname: string) {
  const [externalSidebar, setExternalSidebar] = useAtom(externalSidebarAtom);

  const closeUserDetail = () => setExternalSidebar({ action: RIGHT_SIDEBAR_ACTION.CLOSE });

  const toggleUserDetail = (user: SuperAdminUser) => {
    const isSameOpen = externalSidebar.action === RIGHT_SIDEBAR_ACTION.OPEN && externalSidebar.title === user.name;
    if (isSameOpen) {
      closeUserDetail();
      return;
    }

    setExternalSidebar({
      action: RIGHT_SIDEBAR_ACTION.OPEN,
      title: user.name,
      content: <UserDetailContent key={user.id} user={user} onClose={closeUserDetail} />,
      location: { pathname } as Location,
    });
  };

  return { toggleUserDetail };
}

export default useUserDetailSidebar;
