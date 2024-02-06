import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import useAuthentication from '@hooks/useAuthentication';

function AuthenticationButton() {
  const { logout, isLoggedIn } = useAuthentication();

  return <Fragment>{isLoggedIn() ? <p onClick={logout}>Logout</p> : <Link to={'/login'}>Login</Link>}</Fragment>;
}

export default AuthenticationButton;
