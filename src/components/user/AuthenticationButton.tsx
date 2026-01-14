import useAuthentication from '@hooks/useAuthentication';
import { NavLinkItem } from '@components/common/nav/NavBar';
import { useAtomValue } from 'jotai';
import { adminWorkspaceAtom } from '@jotai/admin/atoms';
import { USER_ROUTES, getAdminWorkspacePath } from '@constants/routes';

function AuthenticationButton() {
  const { isLoggedIn } = useAuthentication();
  const workspace = useAtomValue(adminWorkspaceAtom);

  return (
    <>
      {isLoggedIn() ? (
        <NavLinkItem to={getAdminWorkspacePath(workspace.id)} className={'nav-link-item'}>
          내 주점
        </NavLinkItem>
      ) : (
        <>
          <NavLinkItem to={USER_ROUTES.LOGIN} className={'nav-link-item'}>
            로그인
          </NavLinkItem>
          <NavLinkItem to={USER_ROUTES.REGISTER} className={'nav-link-item'}>
            회원가입
          </NavLinkItem>
        </>
      )}
    </>
  );
}

export default AuthenticationButton;
