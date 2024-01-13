import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../../hook/useApi';
import useAuthentication from '../../hook/useAuthentication';

function AuthenticationButton() {
  const { logout } = useAuthentication();
  const { sessionApi } = useApi();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    sessionApi
      .get('/user')
      .then(() => setIsLoggedIn(true))
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, [logout]);

  return <Fragment>{isLoggedIn ? <p onClick={logout}>Logout</p> : <Link to={'/login'}>Login</Link>}</Fragment>;
}

export default AuthenticationButton;
