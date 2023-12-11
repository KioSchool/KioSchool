import React, { useEffect } from 'react';
import axios from 'axios';

function Login() {
  useEffect(() => {
    axios
      .post(
        'http://localhost:8080/login',
        {
          id: 'test',
          password: 'test',
        },
        {
          withCredentials: true,
        },
      )
      .then((r) => console.log(r));
  }, []);

  return <div>Login</div>;
}

export default Login;
