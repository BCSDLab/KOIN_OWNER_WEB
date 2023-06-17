import { Routes, Route } from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';
import Login from 'page/Auth/Login';
import Signup from 'page/Auth/Signup';
import FindPassword from 'page/Auth/FindPassword';
import AuthLayout from 'layout/AuthLayout';
import MyStorePage from 'page/MyStorePage';
import StoreRegistration from 'page/Auth/StoreRegistration';
import OperateTime from 'page/Auth/StoreRegistration/component/OperateTime';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<MyStorePage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/store-registration" element={<StoreRegistration />} />
        <Route path="/operate-time" element={<OperateTime />} />
      </Route>
    </Routes>
  );
}

export default App;
