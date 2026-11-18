import styled from '@emotion/styled';
import useMarketingLoginStatus from '@hooks/useMarketingLoginStatus';
import { NavLinkItem } from '@components/common/nav/NavBar';
import { ADMIN_ROUTES, USER_ROUTES } from '@constants/routes';

const Wrapper = styled.div`
  display: contents;
`;

function AuthenticationButton() {
  const isLoggedIn = useMarketingLoginStatus();

  return (
    <Wrapper>
      {isLoggedIn ? (
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
    </Wrapper>
  );
}

export default AuthenticationButton;
