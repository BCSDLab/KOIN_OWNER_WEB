import { getMe } from 'api/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from 'store/user';

const useSetUser = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const setUserStore = useUserStore((state) => state.setUserStore);

  const setUser = () => {
    if (isLoading === false) {
      console.log(isLoading === false, 'setUser에서 요청');
      setIsLoading(true);

      getMe()
        .then((user) => {
          setUserStore(user);
          setIsLoading(false);
        })
        .catch(() => {
          console.log('에러 발생');
          navigate('/login');
        });
    }
  };

  return { setUser };
};

export default useSetUser;
