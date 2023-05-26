import Header from 'component/common/Header';
import {
  Outlet, redirect,
} from 'react-router-dom';
import { getMe } from 'api/auth';
import useUserStore from 'store/user';

export default function DefaultLayout() {
  const setUser = useUserStore((state) => state.setUser);

  const getUser = async () => {
    const user = await getMe();
    if (!user) redirect('/login');
    setUser(user);
  };
  getUser();

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
