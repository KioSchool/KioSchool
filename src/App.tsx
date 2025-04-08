import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '@pages/user/Home';
import AdminHome from '@pages/admin/AdminHome';
import Login from '@pages/user/Login';
import AdminWorkspace from '@pages/admin/AdminWorkspace';
import Register from '@pages/user/Register';
import AdminProduct from '@pages/admin/AdminProduct';
import Order from '@pages/user/order/Order';
import AdminAccount from '@pages/admin/AdminAccount';
import { RecoilRoot } from 'recoil';
import LoadingModal from '@components/common/modal/LoadingModal';
import { Global } from '@emotion/react';
import { globalStyles } from '@styles/globalStyles';
import OrderBasket from '@pages/user/order/OrderBasket';
import OrderPay from '@pages/user/order/OrderPay';
import AdminProductAdd from '@pages/admin/AdminProductAdd';
import OrderComplete from '@pages/user/order/OrderComplete';
import AdminOrderHistory from '@pages/admin/order/AdminOrderHistory';
import AdminProductEdit from '@pages/admin/AdminProductEdit';
import ReactGA from 'react-ga4';
import RouterChangeTracker from './RouterChangeTracker';
import AdminMyInfo from '@pages/admin/AdminMyInfo';
import AdminProductCategories from '@pages/admin/AdminProductCategoires';
import AdminTableCount from '@pages/admin/order/AdminTableCount';
import ResetPassword from '@pages/user/ResetPassword';
import Info from '@pages/user/info/Info';
import SuperAdminHome from '@pages/super-admin/SuperAdminHome';
import SuperAdminWorkspace from '@pages/super-admin/SuperAdminWorkspace';
import SuperAdminManage from '@pages/super-admin/SuperAdminManage';
import SuperAdminUser from '@pages/super-admin/SuperAdminUser';
import AdminOrderTable from '@pages/admin/order/AdminOrderTable';
import AdminOrderTableHistory from '@pages/admin/order/AdminOrderTableHistory';
import AdminOrderRealtime from '@pages/admin/order/AdminOrderRealtime';
import SuperAdminEmailDomainList from '@pages/super-admin/SuperAdminEmailDomainList';
import UserEmailDomain from '@pages/user/UserEmailDomain';
import AdminWorkspaceEdit from '@pages/admin/AdminWorkspaceEdit';
import SuperAdminBank from '@pages/super-admin/SuperAdminBank';

ReactGA.initialize('G-XGYLSPGK2G');

function App() {
  RouterChangeTracker();

  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/info" element={<Info />} />
        <Route path="/email-domains" element={<UserEmailDomain />} />

        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/my-info" element={<AdminMyInfo />} />
        <Route path="/admin/register-account" element={<AdminAccount />} />
        <Route path="/admin/workspace/:workspaceId" element={<AdminWorkspace />} />
        <Route path="/admin/workspace/:workspaceId/edit" element={<AdminWorkspaceEdit />} />
        <Route path="/admin/workspace/:workspaceId/order/realtime" element={<AdminOrderRealtime />} />
        <Route path="/admin/workspace/:workspaceId/order/history" element={<AdminOrderHistory />} />
        <Route path="/admin/workspace/:workspaceId/order/table" element={<AdminOrderTable />} />
        <Route path="/admin/workspace/:workspaceId/order/table/:tableNumber" element={<AdminOrderTableHistory />} />
        <Route path="/admin/workspace/:workspaceId/table-count" element={<AdminTableCount />} />
        <Route path="/admin/workspace/:workspaceId/products" element={<AdminProduct />} />
        <Route path="/admin/workspace/:workspaceId/products/add-product" element={<AdminProductAdd />} />
        <Route path="/admin/workspace/:workspaceId/products/edit-product" element={<AdminProductEdit />} />
        <Route path="/admin/workspace/:workspaceId/products/categories" element={<AdminProductCategories />} />

        <Route path="/super-admin" element={<SuperAdminHome />} />
        <Route path="/super-admin/workspace" element={<SuperAdminWorkspace />} />
        <Route path="/super-admin/manage" element={<SuperAdminManage />} />
        <Route path="/super-admin/user" element={<SuperAdminUser />} />
        <Route path="/super-admin/email" element={<SuperAdminEmailDomainList />} />
        <Route path="/super-admin/bank" element={<SuperAdminBank />} />

        <Route path="/order" element={<Order />} />
        <Route path="/order-basket" element={<OrderBasket />} />
        <Route path="/order-pay" element={<OrderPay />} />
        <Route path="/order-complete" element={<OrderComplete />} />
      </Routes>
      <Global styles={globalStyles} />
      <LoadingModal />
    </RecoilRoot>
  );
}

export default App;
