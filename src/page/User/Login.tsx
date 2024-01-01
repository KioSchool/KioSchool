import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useApi from '../../hook/useApi';

function Login() {
  const { userApi } = useApi();
  const navigate = useNavigate();
  const userIdInputRef = useRef<HTMLInputElement>(null);
  const userPasswordInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setErrorMessage('');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userId = userIdInputRef.current?.value;
    const userPassword = userPasswordInputRef.current?.value;
    if (!userId || !userPassword) {
      setErrorMessage('Both fields are required.');
      return;
    }
    userApi
      .post<any>(
        '/login',
        {
          id: userId,
          password: userPassword,
        },
        {
          withCredentials: true,
        },
      )
      .then(() => {
        navigate('/admin');
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
          <input type="text" id="userId" ref={userIdInputRef} autoFocus required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" ref={userPasswordInputRef} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to={'/'}>Go Home</Link>
    </>
  );
}

export default Login;
