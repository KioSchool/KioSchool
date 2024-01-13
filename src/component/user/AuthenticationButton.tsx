import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../../hook/useApi';
import useLogout from '../../hook/useLogout';

function AuthenticationButton() {
  const { logoutHandler } = useLogout();
  const { sessionApi } = useApi();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    sessionApi
      .get('/user')
      .then(() => setIsLoggedIn(true))
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, [logoutHandler]);

  return <Fragment>{isLoggedIn ? <p onClick={logoutHandler}>Logout</p> : <Link to={'/login'}>Login</Link>}</Fragment>;
}

export default AuthenticationButton;
