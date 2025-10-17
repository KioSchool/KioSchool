import useAuthentication from '@hooks/useAuthentication';
import { NavLinkItem } from '@components/common/nav/NavBar';
import { useAtomValue } from 'jotai';
import { adminWorkspaceAtom } from 'src/jotai/admin/atoms';

function AuthenticationButton() {
  const { isLoggedIn } = useAuthentication();
  const workspace = useAtomValue(adminWorkspaceAtom);

  return (
    <>
      {isLoggedIn() ? (
        <NavLinkItem to={`/admin/workspace/${workspace.id}`} className={'nav-link-item'}>
          내 주점
        </NavLinkItem>
      ) : (
        <>
          <NavLinkItem to={'/login'} className={'nav-link-item'}>
            로그인
          </NavLinkItem>
          <NavLinkItem to={'/register'} className={'nav-link-item'}>
            회원가입
          </NavLinkItem>
        </>
      )}
    </>
  );
}

export default AuthenticationButton;
