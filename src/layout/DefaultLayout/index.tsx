import Header from 'component/common/Header';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useUserStore from 'store/user';
import useSetUser from 'utils/hooks/user';

export default function DefaultLayout() {
  const user = useUserStore((state) => state.user);
  const { setUser } = useSetUser();

  console.log('렌더링');

  useEffect(() => {
    if (!user) {
      console.log('defaultLayout setUser 발생');
      setUser();
    }
  });

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
