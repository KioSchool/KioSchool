import React from 'react';
import useAuthentication from '@hooks/useAuthentication';
import { NavLinkItem } from '@components/common/nav/NavBar';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const LogoutText = styled.p`
  text-decoration: none;
  color: #5c5c5c;
  cursor: pointer;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  line-height: 43px;
  margin: 0;
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
