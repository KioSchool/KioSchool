import React from 'react';
import { useParams } from 'react-router-dom';

function AdminWorkspace() {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  return (
    <div>
      <div>workspaceId: {workspaceId}</div>
    </div>
  );
}

export default AdminWorkspace;
