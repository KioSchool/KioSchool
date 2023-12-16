import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { adminApi } from '../../axios';

function AdminOrder() {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  useEffect(() => {
    const url = new URL(`${adminApi.defaults.baseURL}/orders`);
    if (typeof workspaceId === 'string') url.searchParams.append('workspaceId', workspaceId);

    adminApi.get(url.href).then((res) => {
      console.log(res);
    });
  }, []);

  return <div>AdminOrder</div>;
}

export default AdminOrder;
