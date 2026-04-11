import useAuthentication from '@hooks/useAuthentication';
import { NavLinkItem } from '@components/common/nav/NavBar';
import { ADMIN_ROUTES, USER_ROUTES } from '@constants/routes';

function AuthenticationButton() {
  const { isLoggedIn } = useAuthentication();

  return (
    <>
      {isLoggedIn() ? (
        <NavLinkItem to={ADMIN_ROUTES.HOME} className={'nav-link-item'}>
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
