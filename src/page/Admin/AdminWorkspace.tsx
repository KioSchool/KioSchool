import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import AdminOrder from './AdminOrder';

function AdminWorkspace() {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  return (
    <div>
      <div>workspaceId: {workspaceId}</div>
      <Routes>
        <Route path="orders" element={<AdminOrder />} />
      </Routes>
    </div>
  );
}

export default AdminWorkspace;
