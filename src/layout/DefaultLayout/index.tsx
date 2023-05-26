import Header from 'component/common/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { getMe } from 'api/auth';
import useUserStore from 'store/user';

export default function DefaultLayout() {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const user = await getMe();
      setUser(user);
    } catch {
      navigate('/login');
    }
  };
  getUser();

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
