import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from 'layout/DefaultLayout';
import Login from 'page/Auth/Login';
import Signup from 'page/Auth/Signup';
import FindPassword from 'page/Auth/FindPassword';
import AuthLayout from 'layout/AuthLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-password" element={<FindPassword />} />
      </Route>
    </Routes>
  );
}

export default App;
