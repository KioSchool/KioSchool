import React from 'react';
import useUser from '../../hook/useUser';

function AdminHome() {
  const { isLoggedIn } = useUser();

  return (
    <div>
      <div>AdminHome 여기가 헤더가 되어야 할듯?</div>
      isLoggedIn: {isLoggedIn() ? 'true' : 'false'}
    </div>
  );
}

export default AdminHome;
