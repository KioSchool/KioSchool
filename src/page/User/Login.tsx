import React, { Fragment, useEffect } from 'react';
import { userApi } from '../../axios';
import { Link } from 'react-router-dom';

function Login() {
  useEffect(() => {
    userApi
      .post(
        '/login',
        {
          id: 'test',
          password: 'test',
        },
        {
          withCredentials: true,
        },
      )
      .then((r) => alert(r.data));
  }, []);

  return (
    <Fragment>
      <div>Login</div>
      <Link to={'/'}>Go Home</Link>
    </Fragment>
  );
}

export default Login;
