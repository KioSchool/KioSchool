import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/User/Home';
import AdminHome from './page/Admin/AdminHome';
import Login from './page/User/Login';
import WebsocketComponent from './component/WebsocketComponent';
import AdminWorkspace from './page/Admin/AdminWorkspace';
import AdminOrder from './page/Admin/AdminOrder';
import Register from './page/User/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/workspace/:workspaceId" element={<AdminWorkspace />} />
        <Route path="/admin/workspace/:workspaceId/orders" element={<AdminOrder />} />
        <Route path="/websocket-test" element={<WebsocketComponent workspaceId={38} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
