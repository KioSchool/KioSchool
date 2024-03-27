import React from 'react';
import useAuthentication from '@hooks/useAuthentication';
import { NavLinkItem } from '@components/common/nav/NavBar';
import styled from '@emotion/styled';

const LogOutText = styled.p`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

function AuthenticationButton() {
  const { logout, isLoggedIn } = useAuthentication();

  return (
    <>
      {isLoggedIn() ? (
        <LogOutText
          onClick={() => {
            logout().then(() => {
              location.reload();
            });
          }}
        >
          Logout
        </LogOutText>
      ) : (
        <>
          <NavLinkItem to={'/login'}>Login</NavLinkItem>
          <br />
          <NavLinkItem to={'/register'}>Sign Up</NavLinkItem>{' '}
        </>
      )}
    </>
  );
}

export default AuthenticationButton;
