import Header from 'component/common/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import useUserStore from 'store/user';
import useUser from 'utils/hooks/user';

export default function DefaultLayout() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const { setUser } = useUser();

  if (!user) {
    setUser()
      .catch(() => {
        navigate('/login');
      });
  }

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
