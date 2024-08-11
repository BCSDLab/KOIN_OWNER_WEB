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
import ROUTES from 'static/routes';

interface ProtectedRouteProps {
  userTypeRequired: UserType;
}

function ProtectedRoute({ userTypeRequired }: ProtectedRouteProps) {
  const { userType, updateUserType } = useUserTypeStore();
  updateUserType();

  if (userType !== userTypeRequired) {
    if (userType === 'OWNER') {
      return <Navigate to={ROUTES.OWNER} replace />;
    }
    if (userType === null) {
      return <Navigate to={ROUTES.LOGIN} replace />;
    }
  }

  return <Outlet />;
}

function App() {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route path={ROUTES.MAIN} element={<Navigate to={ROUTES.OWNER} />} />
        <Route element={<ProtectedRoute userTypeRequired="OWNER" />}>
          <Route path={ROUTES.OWNER} element={<OwnerLayout />}>
            <Route path={ROUTES.OWNER} element={<MyShopPage />} />
            <Route path={ROUTES.OWNER_SHOPREGISTRATION} element={<ShopRegistration />} />
            <Route path={ROUTES.OWNER_ADDMENU} element={<AddMenu />} />
            <Route path={ROUTES.OWNER_MODIFYMENU} element={<ModifyMenu />} />
            <Route path={ROUTES.OWNER_MODIFYINFO} element={<PageNotFound />} />
            <Route path={ROUTES.OWNER_MENUMANAGEMENT} element={<PageNotFound />} />
            <Route path={ROUTES.OWNER_ORDERMANAGEMENT} element={<PageNotFound />} />
            <Route path={ROUTES.OWNER_SALESMANAGEMENT} element={<PageNotFound />} />
            <Route path={ROUTES.OWNER_EVENT} element={<AddingEvent />} />
            <Route path={ROUTES.OWNER_EVENT_MODIFY} element={<ModifyEvent />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route element={<ProtectedRoute userTypeRequired={null} />}>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route element={<CommonLayout />}>
              <Route path={ROUTES.SIGNUP} element={<Signup />} />
              <Route path={ROUTES.FINDPW} element={<FindPassword />} />
            </Route>
            <Route path={ROUTES.FINDID} element={<PageNotFound />} />
          </Route>
        </Route>
      </Routes>
      <Toast />
      <LogPage />
    </Suspense>
  );
}

export default App;
