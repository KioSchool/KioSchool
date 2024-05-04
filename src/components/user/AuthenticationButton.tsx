import React from 'react';
import useAuthentication from '@hooks/useAuthentication';
import { NavLinkItem } from '@components/common/nav/NavBar';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const LogoutText = styled.p`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  text-align: center;
  font-size: 24px;
  font-weight: 400;
  line-height: 43px;
  margin: 0px;
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
          Logout
        </LogoutText>
      ) : (
        <>
          <NavLinkItem to={'/login'}>Login</NavLinkItem>
          <NavLinkItem to={'/register'}>Sign Up</NavLinkItem>
        </>
      )}
    </>
  );
}

export default AuthenticationButton;
