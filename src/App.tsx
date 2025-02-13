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
import EditMenu from 'page/MyShopPage/components/EditMenu';

interface ProtectedRouteProps {
  userTypeRequired: UserType;
}

function ProtectedRoute({ userTypeRequired }: ProtectedRouteProps) {
  const { userType, updateUserType } = useUserTypeStore();
  updateUserType();

  if (userType !== userTypeRequired) {
    if (userType === 'OWNER') {
      return <Navigate to={ROUTES.Owner.Root()} replace />;
    }
    if (userType === null) {
      return <Navigate to={ROUTES.Login()} replace />;
    }
  }

  return <Outlet />;
}

function App() {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route path={ROUTES.Main()} element={<Navigate to={ROUTES.Owner.Root()} />} />
        <Route element={<ProtectedRoute userTypeRequired="OWNER" />}>
          <Route path={ROUTES.Owner.Root()} element={<OwnerLayout />}>
            <Route path={ROUTES.Owner.Root()} element={<MyShopPage />} />
            <Route path={ROUTES.Owner.ShopRegistration()} element={<ShopRegistration />} />
            <Route path={ROUTES.Owner.AddMenu()} element={<AddMenu />} />
            <Route path={ROUTES.Owner.EditMenu()} element={<EditMenu />} />
            <Route path={ROUTES.Owner.ModifyMenu({ isLink: false })} element={<ModifyMenu />} />
            <Route path={ROUTES.Owner.ModifyInfo()} element={<PageNotFound />} />
            <Route path={ROUTES.Owner.MenuManagement()} element={<PageNotFound />} />
            <Route path={ROUTES.Owner.OrderManagement()} element={<PageNotFound />} />
            <Route path={ROUTES.Owner.SalesManagement()} element={<PageNotFound />} />
            <Route path={ROUTES.Owner.Event({ isLink: false })} element={<AddingEvent />} />
            <Route path={ROUTES.Owner.EventModify({ isLink: false })} element={<ModifyEvent />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route element={<ProtectedRoute userTypeRequired={null} />}>
            <Route path={ROUTES.Login()} element={<Login />} />
            <Route element={<CommonLayout />}>
              <Route path={ROUTES.Signup()} element={<Signup />} />
              <Route path={ROUTES.FindPW()} element={<FindPassword />} />
            </Route>
            <Route path={ROUTES.FindId()} element={<PageNotFound />} />
          </Route>
        </Route>
      </Routes>
      <Toast />
      <LogPage />
    </Suspense>
  );
}

export default App;
