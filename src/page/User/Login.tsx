import React, { Fragment, useState, useEffect } from 'react';
import { userApi } from '../../axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [register, setRegister] = useState(false);

  useEffect(() => {
    // Clear any previous error message on component re-render
    setErrorMessage('');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage('Both fields are required.');
      return;
    }
    try {
      const response = await userApi.post<any>(
        '/login',
        {
          id: username,
          password: password,
        },
        {
          withCredentials: true,
        },
      );

      console.log('Login successful:', response.data);

      setPassword('');
      setUsername('');

      if (response.data === 'login success') {
        // 로그인을 성공적으로 했을때
        navigate('/admin'); // Redirect to "/admin"
      } else {
        setErrorMessage('Invalid username or password'); // Handle unsuccessful login
        setRegister(true);
      }
    } catch (error) {
      console.error('login error:', error);
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <Fragment>
      <h2>Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {register && (
        <div>
          <Link to={'/register'}>Register</Link>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to={'/'}>Go Home</Link>
    </Fragment>
  );
}

export default Login;
