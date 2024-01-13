import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useAuthentication from '../../hook/useAuthentication';

function Login() {
  const { login } = useAuthentication();
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

    login(userId, userPassword);
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
