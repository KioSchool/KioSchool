import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../hook/useApi';

function AuthenticationButton() {
  const { sessionApi } = useApi();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    sessionApi
      .get('/user')
      .then(() => setIsLoggedIn(true))
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  return <Fragment>{isLoggedIn ? <Link to={'/logout'}>Logout</Link> : <Link to={'/login'}>Login</Link>}</Fragment>;
}

export default AuthenticationButton;
