import { Routes, Route } from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';
import Login from 'page/Auth/Login';
import Signup from 'page/Auth/Signup';
import FindPassword from 'page/Auth/FindPassword';
import AuthLayout from 'layout/AuthLayout';
import MystorePage from 'page/MyStorePage';
import StoreReg from 'page/Auth/StoreReg';
import OperateTime from 'page/Auth/StoreReg/component/OperateTime';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<MystorePage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/store-registration" element={<StoreReg />} />
        <Route path="/operate-time" element={<OperateTime />} />
      </Route>
    </Routes>
  );
}

export default App;
