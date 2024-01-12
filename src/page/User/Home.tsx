import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ShowLogin from './ShowLogin';

function Home() {
  return (
    <Fragment>
      <h1>Home</h1>
      <Link to={'/admin'}>Admin</Link>
      <br></br>
      <ShowLogin />
    </Fragment>
  );
}

export default Home;
