import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Route = 'new-password' | 'find-password';

export const useRouteCheck = (prevRoute: Route, entryRoute: string) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hasPrevState = location.state && (prevRoute in location.state);
    if (!hasPrevState) {
      navigate(entryRoute, { replace: true });
    }
  }, [location.state, navigate, entryRoute, prevRoute]);
};
