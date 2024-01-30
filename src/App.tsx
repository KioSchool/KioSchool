import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/User/Home';
import AdminHome from './pages/Admin/AdminHome';
import Login from './pages/User/Login';
import AdminWorkspace from './pages/Admin/AdminWorkspace';
import AdminOrder from './pages/Admin/AdminOrder';
import Register from './pages/User/Register';
import { RecoilRoot } from 'recoil';
import AdminProduct from './pages/Admin/AdminProduct';
import Order from './pages/User/Order';
import LoadingModal from './components/common/modal/LoadingModal';
import { Global } from '@emotion/react';
import { globalStyles } from './styles/globalStyles';
import AdminAccount from './pages/Admin/AdminAccount';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-account" element={<AdminAccount />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/workspace/:workspaceId" element={<AdminWorkspace />} />
          <Route path="/admin/workspace/:workspaceId/orders" element={<AdminOrder />} />
          <Route path="/admin/workspace/:workspaceId/products" element={<AdminProduct />} />
        </Routes>
      </BrowserRouter>
      <Global styles={globalStyles} />
      <LoadingModal />
    </RecoilRoot>
  );
}

export default App;
