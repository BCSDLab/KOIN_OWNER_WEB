import { Routes, Route } from 'react-router-dom';
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
import { Suspense } from 'react';
import Toast from 'component/common/Toast';

function App() {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<MyStorePage />} />
          <Route path="/store-registration" element={<ShopRegistration />} />
          <Route path="/add-menu" element={<AddMenu />} />
          <Route path="/modify-menu/:menuId" element={<ModifyMenu />} />
          <Route path="/modify-info" element={<PageNotFound />} />
          <Route path="/store-info" element={<PageNotFound />} />
          <Route path="/menu-management" element={<PageNotFound />} />
          <Route path="/order-management" element={<PageNotFound />} />
          <Route path="/sales-management" element={<PageNotFound />} />
          <Route path="/shop-add" element={<PageNotFound />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/find-password" element={<FindPassword />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/complete-change-password" element={<CompleteChangePassword />} />
        </Route>
      </Routes>
      <Toast />
    </Suspense>
  );
}

export default App;
