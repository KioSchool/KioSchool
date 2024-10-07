import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
import AdminProductAdd from '@pages/Admin/AdminProductAdd';
import OrderComplete from '@pages/User/order/OrderComplete';
import AdminOrderHistory from '@pages/Admin/order/AdminOrderHistory';
import AdminProductEdit from '@pages/Admin/AdminProductEdit';
import ReactGA from 'react-ga4';
import RouterChangeTracker from './RouterChangeTracker';
import MyInfo from '@pages/Admin/MyInfo';
import AdminProductCategories from '@pages/Admin/AdminProductCategoires';
import AdminOrderManage from '@pages/Admin/order/AdminOrderManage';
import ResetPassword from '@pages/User/ResetPassword';
import Info from '@pages/User/Info';
import SuperAdminHome from '@pages/SuperAdmin/SuperAdminHome';
import SuperAdminWorkspace from '@pages/SuperAdmin/SuperAdminWorkspace';
import SuperAdminManage from '@pages/SuperAdmin/SuperAdminManage';
import SuperAdminUser from '@pages/SuperAdmin/SuperAdminUser';
import AdminOrderCheck from '@pages/Admin/order/AdminOrderCheck';

ReactGA.initialize('G-XGYLSPGK2G');
function App() {
  RouterChangeTracker();

  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order" element={<Order />} />
        <Route path="/orderbasket" element={<OrderBasket />} />
        <Route path="/order-pay" element={<OrderPay />} />
        <Route path="/order-complete" element={<OrderComplete />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/register-account" element={<AdminAccount />} />
        <Route path="/admin/my-info" element={<MyInfo />} />
        <Route path="/info" element={<Info />} />
        <Route path="/super-admin/home" element={<SuperAdminHome />} />
        <Route path="/admin/workspace/:workspaceId" element={<AdminWorkspace />} />
        <Route path="/super-admin/workspace" element={<SuperAdminWorkspace />} />
        <Route path="/super-admin/manage" element={<SuperAdminManage />} />
        <Route path="/super-admin/user" element={<SuperAdminUser />} />
        <Route path="/admin/workspace/:workspaceId/order-check" element={<AdminOrderCheck />} />
        <Route path="/admin/workspace/:workspaceId/orders" element={<AdminOrder />} />
        <Route path="/admin/workspace/:workspaceId/orders-history" element={<AdminOrderHistory />} />
        <Route path="/admin/workspace/:workspaceId/orders-manage" element={<AdminOrderManage />} />
        <Route path="/admin/workspace/:workspaceId/products" element={<AdminProduct />} />
        <Route path="/admin/workspace/:workspaceId/products/add-product" element={<AdminProductAdd />} />
        <Route path="/admin/workspace/:workspaceId/products/categories" element={<AdminProductCategories />} />
        <Route path="/admin/workspace/:workspaceId/products/edit-product" element={<AdminProductEdit />} />
      </Routes>
      <Global styles={globalStyles} />
      <LoadingModal />
    </RecoilRoot>
  );
}

export default App;
