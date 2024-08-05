import {
  Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import OwnerLayout from 'layout/OwnerLayout';
import Login from 'page/Auth/Login';
import Signup from 'page/Auth/Signup';
import AuthLayout from 'layout/AuthLayout';
import MyShopPage from 'page/MyShopPage';
import ShopRegistration from 'page/ShopRegistration';
import AddMenu from 'page/AddMenu';
import PageNotFound from 'page/Error/PageNotFound';
import ModifyMenu from 'page/ModifyMenu';
import { Suspense } from 'react';
import Toast from 'component/common/Toast';
import { UserType } from 'model/auth';
import useUserTypeStore from 'store/useUserTypeStore';
import AddingEvent from 'page/ManageEvent/AddingEvent';
import ModifyEvent from 'page/ManageEvent/ModifyEvent';
import LogPage from 'component/common/PageLog';
import CommonLayout from 'page/Auth/components/Common';
import FindPassword from 'page/Auth/FindPassword';

interface ProtectedRouteProps {
  userTypeRequired: UserType;
}

function ProtectedRoute({ userTypeRequired }: ProtectedRouteProps) {
  const { userType, updateUserType } = useUserTypeStore();
  updateUserType();

  if (userType !== userTypeRequired) {
    if (userType === 'OWNER') {
      return <Navigate to="/owner" replace />;
    }
    if (userType === null) {
      return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />;
}

function App() {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route path="/" element={<Navigate to="/owner" />} />
        <Route element={<ProtectedRoute userTypeRequired="OWNER" />}>
          <Route path="/owner" element={<OwnerLayout />}>
            <Route path="/owner" element={<MyShopPage />} />
            <Route path="/owner/shop-registration" element={<ShopRegistration />} />
            <Route path="/owner/add-menu" element={<AddMenu />} />
            <Route path="/owner/modify-menu/:menuId" element={<ModifyMenu />} />
            <Route path="/owner/modify-info" element={<PageNotFound />} />
            <Route path="/owner/menu-management" element={<PageNotFound />} />
            <Route path="/owner/order-management" element={<PageNotFound />} />
            <Route path="/owner/sales-management" element={<PageNotFound />} />
            <Route path="/owner/event-add/:id" element={<AddingEvent />} />
            <Route path="/owner/event-modify/:id" element={<ModifyEvent />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route element={<ProtectedRoute userTypeRequired={null} />}>
            <Route path="/login" element={<Login />} />
            <Route element={<CommonLayout />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/find-password" element={<FindPassword />} />
            </Route>
            <Route path="/find-id" element={<PageNotFound />} />
          </Route>
        </Route>
      </Routes>
      <Toast />
      <LogPage />
    </Suspense>
  );
}

export default App;
