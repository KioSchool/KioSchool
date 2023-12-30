import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Fragment>
      <h1>Home</h1>
      <Link to={'/admin'}>Admin</Link>
      <br></br>
      <Link to={'/login'}>Login</Link>
    </Fragment>
  );
}

export default Home;
