import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/User/Home';
import AdminHome from './page/Admin/AdminHome';
import Login from './page/User/Login';
import WebsocketComponent from './component/WebsocketComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/websocket-test" element={<WebsocketComponent workspaceId={38} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
