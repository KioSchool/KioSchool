import React, { useEffect, useState } from 'react';
import { adminApi } from '../../axios';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
  const [url, setUrl] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    adminApi
      .get('/user')
      .then((res) => {
        setUrl(res.data.accountUrl);
      })
      .catch(() => {
        alert('로그인이 필요합니다.');
        navigate('/login');
      });
  }, []);

  return (
    <div>
      <div>AdminHome 여기가 헤더가 되어야 할듯?</div>
      <div>{url}</div>
      <button onClick={() => window.open(`${url}&amount=5000`)}>test</button>
    </div>
  );
}

export default AdminHome;
