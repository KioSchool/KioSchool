import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/User/Home';
import AdminHome from './page/Admin/AdminHome';
import Login from './page/User/Login';
import AdminWorkspace from './page/Admin/AdminWorkspace';
import AdminOrder from './page/Admin/AdminOrder';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/workspace/:workspaceId" element={<AdminWorkspace />} />
          <Route path="/admin/workspace/:workspaceId/orders" element={<AdminOrder />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
