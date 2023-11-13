import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useRouteCheck = (prevRoute: string, entryRoute: string) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const 이전_상태를_가지고_넘어왔는가 = location.state && (prevRoute in location.state);
    if (!이전_상태를_가지고_넘어왔는가) {
      navigate(entryRoute, { replace: true });
    }
  }, [location.state, navigate, entryRoute, prevRoute]);
};

export default useRouteCheck;
