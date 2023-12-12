import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { adminApi } from '../../axios';

function AdminOrder() {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  useEffect(() => {
    adminApi.get(`/${workspaceId}/orders`).then((res) => {
      console.log(res);
    });
  }, []);

  return <div>AdminOrder</div>;
}

export default AdminOrder;
