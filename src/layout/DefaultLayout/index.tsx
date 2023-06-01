import Header from 'component/common/Header';
import { Outlet } from 'react-router-dom';
import useUserStore from 'store/user';
import useSetUser from 'utils/hooks/user';

export default function DefaultLayout() {
  const user = useUserStore((state) => state.user);
  const { setUser } = useSetUser();

  if (!user) {
    setUser();
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
