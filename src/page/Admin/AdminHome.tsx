import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminWorkspace from './AdminWorkspace';

function AdminHome() {
  return (
    <div>
      <div>AdminHome 여기가 헤더가 되어야 할듯?</div>
      <Routes>
        <Route path="workspace/:workspaceId/*" element={<AdminWorkspace />} />
      </Routes>
    </div>
  );
}

export default AdminHome;
