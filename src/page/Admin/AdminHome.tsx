import React, { useEffect, useState } from 'react';
import { adminApi } from '../../axios';

function AdminHome() {
  const [url, setUrl] = useState();

  useEffect(() => {
    adminApi.get('/user').then((res) => {
      setUrl(res.data.accountUrl);
    });
  }, []);

  return (
    <div>
      <div>AdminHome 여기가 헤더가 되어야 할듯?</div>
      <button onClick={() => window.open(`${url}&amount=5000`)}>test</button>
    </div>
  );
}

export default AdminHome;
