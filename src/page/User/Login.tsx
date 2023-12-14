import React, { useEffect } from 'react';
import { userApi } from '../../axios';

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

  return <div>Login</div>;
}

export default Login;
