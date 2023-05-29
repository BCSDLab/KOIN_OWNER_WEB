import { getMe } from 'api/auth';
import { useNavigate } from 'react-router-dom';
import useUserStore from 'store/user';

const useSetUser = () => {
  const navigate = useNavigate();

  const setUserStore = useUserStore((state) => state.setUserStore);

  const setUser = async () => {
    try {
      const user = await getMe();
      setUserStore(user);
    } catch {
      navigate('/login');
    }
  };

  return { setUserStore, setUser };
};

export default useSetUser;
