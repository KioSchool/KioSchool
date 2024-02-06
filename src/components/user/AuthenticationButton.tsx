import React from 'react';
import { Link } from 'react-router-dom';
import useAuthentication from '@hooks/useAuthentication';

function AuthenticationButton() {
  const { logout, isLoggedIn } = useAuthentication();

  return (
    <>
      {isLoggedIn() ? (
        <p onClick={logout}>Logout</p>
      ) : (
        <>
          <Link to={'/login'}>Login</Link>
          <br />
          <Link to={'/register'}>Sign Up</Link>{' '}
        </>
      )}
    </>
  );
}

export default AuthenticationButton;
