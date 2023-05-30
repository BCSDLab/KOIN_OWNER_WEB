import { getMe } from 'api/auth';
import useUserStore from 'store/user';

const useSetUser = () => {
  const setUserStore = useUserStore((state) => state.setUserStore);

  const setUser = async () => {
    const user = await getMe();
    setUserStore(user);
  };

  return setUser;
};

export default useSetUser;
