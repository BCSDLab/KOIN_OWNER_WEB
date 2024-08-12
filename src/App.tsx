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
      return <Navigate to={ROUTES.Owner} replace />;
    }
    if (userType === null) {
      return <Navigate to={ROUTES.Login} replace />;
    }
  }

  return <Outlet />;
}

function App() {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route path={ROUTES.Main} element={<Navigate to={ROUTES.Owner} />} />
        <Route element={<ProtectedRoute userTypeRequired="OWNER" />}>
          <Route path={ROUTES.Owner} element={<OwnerLayout />}>
            <Route path={ROUTES.Owner} element={<MyShopPage />} />
            <Route path={ROUTES.OwnerShopRegistration} element={<ShopRegistration />} />
            <Route path={ROUTES.OwnerAddMenu} element={<AddMenu />} />
            <Route path={ROUTES.OwnerModifyMenu.path} element={<ModifyMenu />} />
            <Route path={ROUTES.OwnerModifyInfo} element={<PageNotFound />} />
            <Route path={ROUTES.OwnerMenuManagement} element={<PageNotFound />} />
            <Route path={ROUTES.OwnerOrderManagement} element={<PageNotFound />} />
            <Route path={ROUTES.OwnerSalesmanagement} element={<PageNotFound />} />
            <Route path={ROUTES.OwnerEvent.path} element={<AddingEvent />} />
            <Route path={ROUTES.OwnerEventModify.path} element={<ModifyEvent />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route element={<ProtectedRoute userTypeRequired={null} />}>
            <Route path={ROUTES.Login} element={<Login />} />
            <Route element={<CommonLayout />}>
              <Route path={ROUTES.Signup} element={<Signup />} />
              <Route path={ROUTES.FindPW} element={<FindPassword />} />
            </Route>
            <Route path={ROUTES.FindId} element={<PageNotFound />} />
          </Route>
        </Route>
      </Routes>
      <Toast />
      <LogPage />
    </Suspense>
  );
}

export default App;
