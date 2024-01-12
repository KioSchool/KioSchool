import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthenticationButton from '../../utils/AuthenticationButton ';

function Home() {
  return (
    <Fragment>
      <h1>Home</h1>
      <Link to={'/admin'}>Admin</Link>
      <br></br>
      <AuthenticationButton />
    </Fragment>
  );
}

export default Home;
