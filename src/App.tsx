import {
  Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import OwnerLayout from 'layout/OwnerLayout';
import CoopLayout from 'layout/CoopLayout';
import Login from 'page/Auth/Login';
import Signup from 'page/Auth/Signup';
import FindPassword from 'page/Auth/FindPassword/SendAuthNumber';
import NewPassword from 'page/Auth/FindPassword/NewPassword';
import CompleteChangePassword from 'page/Auth/FindPassword/CompleteChangePassword';
import AuthLayout from 'layout/AuthLayout';
import MyShopPage from 'page/MyShopPage';
import ShopRegistration from 'page/ShopRegistration';
import AddMenu from 'page/AddMenu';
import PageNotFound from 'page/Error/PageNotFound';
import ModifyMenu from 'page/ModifyMenu';
import { Suspense } from 'react';
import Toast from 'component/common/Toast';
import { UserType } from 'model/auth';
import Coop from 'page/Coop';
import useUserTypeStore from 'store/userType';
import AddingEvent from 'page/ManageEvent/AddingEvent';
import ModifyEvent from 'page/ManageEvent/ModifyEvent';

interface ProtectedRouteProps {
  userTypeRequired: UserType;
}

function ProtectedRoute({ userTypeRequired }: ProtectedRouteProps) {
  const { userType, setUserType } = useUserTypeStore();
  setUserType();

  if (userType !== userTypeRequired) {
    if (userType === 'OWNER') {
      return <Navigate to="/owner" replace />;
    }
    if (userType === 'COOP') {
      return <Navigate to="/coop" replace />;
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
            <Route path="/owner/shop-add" element={<PageNotFound />} />
            <Route path="/owner/event-add/:id" element={<AddingEvent />} />
            <Route path="/owner/event-modify/:id" element={<ModifyEvent />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute userTypeRequired="COOP" />}>
          <Route path="/coop" element={<CoopLayout />}>
            <Route path="/coop" element={<Coop />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route element={<ProtectedRoute userTypeRequired={null} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/find-id" element={<PageNotFound />} />
            <Route path="/find-password" element={<FindPassword />} />
          </Route>
          <Route element={<ProtectedRoute userTypeRequired="OWNER" />}>
            <Route path="/new-password" element={<NewPassword />} />
            <Route path="/complete-change-password" element={<CompleteChangePassword />} />
          </Route>
        </Route>
      </Routes>
      <Toast />
    </Suspense>
  );
}

export default App;
