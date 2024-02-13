import React from 'react';
import { Link } from 'react-router-dom';
import AuthenticationButton from '@components/user/AuthenticationButton';

function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link to={'/admin'}>Admin</Link>
      <br></br>
      <AuthenticationButton />
    </>
  );
}

export default Home;
