import Header from 'component/common/Header';
import { Outlet } from 'react-router-dom';
import useSetUser from 'utils/hooks/user';

export default function DefaultLayout() {
  const { setUser } = useSetUser();

  setUser();
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
