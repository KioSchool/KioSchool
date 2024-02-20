import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@pages/User/Home';
import AdminHome from '@pages/Admin/AdminHome';
import Login from '@pages/User/Login';
import AdminWorkspace from '@pages/Admin/AdminWorkspace';
import AdminOrder from '@pages/Admin/order/AdminOrder';
import Register from '@pages/User/Register';
import AdminProduct from '@pages/Admin/AdminProduct';
import Order from '@pages/User/order/Order';
import AdminAccount from '@pages/Admin/AdminAccount';
import { RecoilRoot } from 'recoil';
import LoadingModal from '@components/common/modal/LoadingModal';
import { Global } from '@emotion/react';
import { globalStyles } from '@styles/globalStyles';
import OrderBasket from '@pages/User/order/OrderBasket';
import OrderPay from '@pages/User/order/OrderPay';
import AdminProductManage from '@pages/Admin/AdminProductManage';
import OrderComplete from '@pages/User/order/OrderComplete';
import AdminOrderHistory from '@pages/Admin/order/AdminOrderHistory';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-account" element={<AdminAccount />} />
          <Route path="/order" element={<Order />} />
          <Route path="/orderbasket" element={<OrderBasket />} />
          <Route path="/order-pay" element={<OrderPay />} />
          <Route path="/order-complete" element={<OrderComplete />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/workspace/:workspaceId" element={<AdminWorkspace />} />
          <Route path="/admin/workspace/:workspaceId/orders" element={<AdminOrder />} />
          <Route path="/admin/workspace/:workspaceId/orders-history" element={<AdminOrderHistory />} />
          <Route path="/admin/workspace/:workspaceId/products" element={<AdminProduct />} />
          <Route path="/admin/workspace/:workspaceId/products/add-product" element={<AdminProductManage />} />
        </Routes>
      </BrowserRouter>
      <Global styles={globalStyles} />
      <LoadingModal />
    </RecoilRoot>
  );
}

export default App;
