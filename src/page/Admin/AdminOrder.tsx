import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AdminOrder() {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  useEffect(() => {
    axios.get(`http://localhost:8080/admin/${workspaceId}/orders`, { withCredentials: true }).then((res) => {
      console.log(res);
    });
  }, []);

  return <div>AdminOrder</div>;
}

export default AdminOrder;
