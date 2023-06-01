import Header from 'component/common/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import useUserStore from 'store/user';
import useSetUser from 'utils/hooks/user';

export default function DefaultLayout() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const { setUser } = useSetUser();

  setUser()
    .catch(() => navigate('/login'));

  return (
    <div>
      {user && (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </div>
  );
}
