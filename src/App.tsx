import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';
import Login from 'page/Auth/Login';
import Signup from 'page/Auth/Signup';
import FindPassword from 'page/Auth/FindPassword';
import MystorePage from 'page/Mypage/MystorePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/mystorepage" element={<MystorePage />} />
      </Route>
    </Routes>
  );
}

export default App;
