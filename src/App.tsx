import {
  Routes, Route, Navigate, Outlet, useNavigate,
} from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';
import Login from 'page/Auth/Login';
import Signup from 'page/Auth/Signup';
import FindPassword from 'page/Auth/FindPassword/SendAuthNumber';
import NewPassword from 'page/Auth/FindPassword/NewPassword';
import CompleteChangePassword from 'page/Auth/FindPassword/CompleteChangePassword';
import AuthLayout from 'layout/AuthLayout';
import MyStorePage from 'page/MyShopPage';
import ShopRegistration from 'page/ShopRegistration';
import AddMenu from 'page/AddMenu';
import PageNotFound from 'page/Error/PageNotFound';
import ModifyMenu from 'page/ModifyMenu';
import { Suspense, useEffect } from 'react';
import Toast from 'component/common/Toast';
import { UserType } from 'model/auth';
import CoopLayout from 'layout/CoopLayout';
import CoopPage from 'page/CoopPage';
import useUserTypeStore from 'store/userType';

interface ProtectedRouteProps {
  userTypeRequired: UserType;
}

function ProtectedRoute({ userTypeRequired }: ProtectedRouteProps) {
  const { userType, setUserType } = useUserTypeStore();
  const navigate = useNavigate();

  setUserType();
  useEffect(() => {
    if (userType !== userTypeRequired) {
      if (userType === 'OWNER') {
        navigate('/owner', { replace: true });
      }
      if (userType === 'COOP') {
        navigate('/coop', { replace: true });
      }
      if (userType === 'NOT_LOGGED_IN') {
        navigate('/login', { replace: true });
      }
    }
  }, [userType, userTypeRequired, navigate]);

  return <Outlet />;
}

function App() {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route path="/" element={<Navigate to="/owner" />} />
        <Route element={<ProtectedRoute userTypeRequired="OWNER" />}>
          <Route path="/owner" element={<DefaultLayout />}>
            <Route path="/owner" element={<MyStorePage />} />
            <Route path="/owner/shop-registration" element={<ShopRegistration />} />
            <Route path="/owner/add-menu" element={<AddMenu />} />
            <Route path="/owner/modify-menu/:menuId" element={<ModifyMenu />} />
            <Route path="/owner/modify-info" element={<PageNotFound />} />
            <Route path="/owner/menu-management" element={<PageNotFound />} />
            <Route path="/owner/order-management" element={<PageNotFound />} />
            <Route path="/owner/sales-management" element={<PageNotFound />} />
            <Route path="/owner/shop-add" element={<PageNotFound />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute userTypeRequired="COOP" />}>
          <Route path="/coop" element={<CoopLayout />}>
            <Route path="/coop/coop-page1" element={<CoopPage />} />
            <Route path="/coop/coop-page2" element={<CoopPage />} />
            {/* CoopPage1, CoopPage2는 예시 경로임 */}
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route element={<ProtectedRoute userTypeRequired="NOT_LOGGED_IN" />}>
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
