import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useUser from '../../hook/useUser';

function Home() {
  const checkLogin = useUser().isLoggedIn;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log(checkLogin);
    setIsLoggedIn(checkLogin);
  }, [checkLogin]);

  return (
    <Fragment>
      <h1>Home</h1>
      <Link to={'/admin'}>Admin</Link>
      <br></br>
      {`${isLoggedIn}`}
      {isLoggedIn ? <p>Logout</p> : <Link to={'/login'}>Login</Link>}
    </Fragment>
  );
}

export default Home;
