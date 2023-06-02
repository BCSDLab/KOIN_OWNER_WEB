import { getMe } from 'api/auth';
import useUserStore from 'store/user';

const useUser = () => {
  const setUserStore = useUserStore((state) => state.setUserStore);

  const setUser = async () => {
    const user = await getMe();
    setUserStore(user);
  };

  const removeUser = () => {
    setUserStore(null);
    sessionStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  return { setUser, removeUser };
};

export default useUser;
