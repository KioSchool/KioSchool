import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useApi from '../../hook/useApi';

function Login() {
  const { userApi } = useApi();
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Clear any previous error message on component re-render
    setErrorMessage('');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !password) {
      setErrorMessage('Both fields are required.');
      return;
    }
    userApi
      .post<any>(
        '/login',
        {
          id: userId,
          password: password,
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        console.log('Login successful:', response.data);

        setPassword('');
        setUserId('');

        // 로그인을 성공적으로 했을때
        navigate('/admin'); // Redirect to "/admin"
      })
      .catch((error) => {
        console.error('login error:', error);
        setErrorMessage('Invalid username or password');
      });
  };

  return (
    <>
      <h2>Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <Link to={'/register'}>Register</Link>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">ID:</label>
          <input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} autoFocus />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to={'/'}>Go Home</Link>
    </>
  );
}

export default Login;
