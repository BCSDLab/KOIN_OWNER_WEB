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

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<MyStorePage />} />
        <Route path="/store-registration" element={<ShopRegistration />} />
        <Route path="/add-menu" element={<AddMenu />} />
        <Route path="/add-menu/:menuId" element={<AddMenu />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/complete-change-password" element={<CompleteChangePassword />} />
      </Route>
    </Routes>
  );
}

export default App;
