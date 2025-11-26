import { Route } from 'react-router-dom';
import Home from '@pages/user/home/Home';
import AdminHome from '@pages/admin/AdminHome';
import Login from '@pages/user/Login';
import AdminWorkspace from '@pages/admin/AdminWorkspace';
import Register from '@pages/user/Register';
import AdminProduct from '@pages/admin/AdminProduct';
import Order from '@pages/user/order/Order';
import AdminAccount from '@pages/admin/AdminAccount';
import LoadingModal from '@components/common/modal/LoadingModal';
import AuthErrorListener from '@components/common/AuthErrorListener';
import { Global } from '@emotion/react';
import { globalStyles } from '@styles/globalStyles';
import OrderBasket from '@pages/user/order/OrderBasket';
import OrderPay from '@pages/user/order/OrderPay';
import OrderComplete from '@pages/user/order/OrderComplete';
import AdminOrderStatistics from '@pages/admin/order/AdminOrderStatistics';
import AdminMyInfo from '@pages/admin/AdminMyInfo';
import AdminProductCategories from '@pages/admin/AdminProductCategories';
import ResetPassword from '@pages/user/ResetPassword';
import Info from '@pages/user/info/Info';
import SuperAdminHome from '@pages/super-admin/SuperAdminHome';
import SuperAdminWorkspace from '@pages/super-admin/SuperAdminWorkspace';
import SuperAdminManage from '@pages/super-admin/SuperAdminManage';
import SuperAdminUser from '@pages/super-admin/SuperAdminUser';
import AdminOrderTable from '@pages/admin/table/AdminOrderTable';
import AdminOrderTableHistory from '@pages/admin/order/AdminOrderTableHistory';
import AdminOrderRealtime from '@pages/admin/order/AdminOrderRealtime';
import SuperAdminEmailDomainList from '@pages/super-admin/SuperAdminEmailDomainList';
import UserEmailDomain from '@pages/user/UserEmailDomain';
import AdminWorkspaceEdit from '@pages/admin/AdminWorkspaceEdit';
import SuperAdminBank from '@pages/super-admin/SuperAdminBank';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useNetworkStatusNotifier from '@hooks/useNetworkStatusNotifier';
import useServerHealth from '@hooks/useServerHealth';
import ServerErrorFallback from '@components/common/fallback/ServerErrorFallback';
import OrderWait from '@pages/user/order/OrderWait';
import AdminOrderTableManage from '@pages/admin/table/AdminOrderTableManage';
import AdminTableOrder from '@pages/admin/order/AdminTableOrder';
import SentryTestPage from '@components/common/test/SentryTestPage';
import { SentryRoutes } from 'src';
import { USER_ROUTES, ORDER_ROUTES, ADMIN_ROUTES, SUPER_ADMIN_ROUTES, TEST_ROUTES } from '@constants/routes';

function App() {
  useNetworkStatusNotifier();
  const { isServerHealthy, isChecking, error, manualRetry } = useServerHealth();

  if (!isServerHealthy && !isChecking) {
    return <ServerErrorFallback error={error} onRetry={manualRetry} isRetrying={isChecking} />;
  }

  return (
    <>
      <AuthErrorListener />
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <SentryRoutes>
        <Route path={USER_ROUTES.HOME} element={<Home />} />
        <Route path={USER_ROUTES.LOGIN} element={<Login />} />
        <Route path={USER_ROUTES.REGISTER} element={<Register />} />
        <Route path={USER_ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={USER_ROUTES.INFO} element={<Info />} />
        <Route path={USER_ROUTES.EMAIL_DOMAINS} element={<UserEmailDomain />} />
        <Route path={ADMIN_ROUTES.HOME} element={<AdminHome />} />
        <Route path={ADMIN_ROUTES.MY_INFO} element={<AdminMyInfo />} />
        <Route path={ADMIN_ROUTES.REGISTER_ACCOUNT} element={<AdminAccount />} />
        <Route path={ADMIN_ROUTES.WORKSPACE} element={<AdminWorkspace />} />
        <Route path={ADMIN_ROUTES.WORKSPACE_EDIT} element={<AdminWorkspaceEdit />} />
        <Route path={ADMIN_ROUTES.ORDER_REALTIME} element={<AdminOrderRealtime />} />
        <Route path={ADMIN_ROUTES.ORDER_STATISTICS} element={<AdminOrderStatistics />} />
        <Route path={ADMIN_ROUTES.ORDER_TABLE} element={<AdminOrderTable />} />
        <Route path={ADMIN_ROUTES.TABLE_ORDER} element={<AdminTableOrder />} />
        <Route path={ADMIN_ROUTES.ORDER_TABLE_HISTORY} element={<AdminOrderTableHistory />} />
        <Route path={ADMIN_ROUTES.ORDER_TABLE_MANAGE} element={<AdminOrderTableManage />} />
        <Route path={ADMIN_ROUTES.PRODUCTS} element={<AdminProduct />} />
        <Route path={ADMIN_ROUTES.PRODUCTS_CATEGORIES} element={<AdminProductCategories />} />
        <Route path={SUPER_ADMIN_ROUTES.HOME} element={<SuperAdminHome />} />
        <Route path={SUPER_ADMIN_ROUTES.WORKSPACE} element={<SuperAdminWorkspace />} />
        <Route path={SUPER_ADMIN_ROUTES.MANAGE} element={<SuperAdminManage />} />
        <Route path={SUPER_ADMIN_ROUTES.USER} element={<SuperAdminUser />} />
        <Route path={SUPER_ADMIN_ROUTES.EMAIL} element={<SuperAdminEmailDomainList />} />
        <Route path={SUPER_ADMIN_ROUTES.BANK} element={<SuperAdminBank />} />
        <Route path={ORDER_ROUTES.ORDER} element={<Order />} />
        <Route path={ORDER_ROUTES.ORDER_BASKET} element={<OrderBasket />} />
        <Route path={ORDER_ROUTES.ORDER_PAY} element={<OrderPay />} />
        <Route path={ORDER_ROUTES.ORDER_WAIT} element={<OrderWait />} />
        <Route path={ORDER_ROUTES.ORDER_COMPLETE} element={<OrderComplete />} />
        <Route path={TEST_ROUTES.SENTRY_TEST} element={<SentryTestPage />} />
      </SentryRoutes>
      <Global styles={globalStyles} />
      <LoadingModal />
    </>
  );
}

export default App;
