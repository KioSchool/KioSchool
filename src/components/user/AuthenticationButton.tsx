import React from 'react';
import useAuthentication from '@hooks/useAuthentication';
import { NavLinkItem } from '@components/common/nav/NavBar';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { navBarLabelStyle } from '@styles/navBarStyles';

const LogoutText = styled.p`
  margin: 0;
  ${navBarLabelStyle}
`;

function AuthenticationButton() {
  const { logout, isLoggedIn } = useAuthentication();
  const navigate = useNavigate();

  return (
    <>
      {isLoggedIn() ? (
        <LogoutText
          onClick={async () => {
            await logout();
            navigate('/');
          }}
        >
          로그아웃
        </LogoutText>
      ) : (
        <>
          <NavLinkItem to={'/login'}>로그인</NavLinkItem>
          <NavLinkItem to={'/register'}>회원가입</NavLinkItem>
        </>
      )}
    </>
  );
}

export default AuthenticationButton;
