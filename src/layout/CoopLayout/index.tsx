import { Outlet } from 'react-router-dom';
import Header from 'component/common/Header';

export default function CoopLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
