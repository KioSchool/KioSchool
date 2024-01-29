import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/User/Home';
import AdminHome from './page/Admin/AdminHome';
import Login from './page/User/Login';
import AdminWorkspace from './page/Admin/AdminWorkspace';
import AdminOrder from './page/Admin/AdminOrder';
import Register from './page/User/Register';
import { RecoilRoot } from 'recoil';
import AdminProduct from './page/Admin/AdminProduct';
import Order from './page/User/Order';
import LoadingModal from './component/common/modal/LoadingModal';
import { Global } from '@emotion/react';
import { globalStyles } from './style/globalStyles';
import AdminAccount from './page/Admin/AdminAccount';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-account" element={<AdminAccount />} />
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
