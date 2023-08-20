import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import RoutesName from '../routing';

function RedirectToMain(): void {
  const navigate = useNavigate();

  const handleBrowserBackButton = useCallback(
    (event: PopStateEvent): void => {
      const customer = localStorage.getItem('accessToken');
      if (customer) {
        event.preventDefault();
        navigate(RoutesName.main);
      }
    },
    [navigate],
  );

  useEffect(() => {
    window.addEventListener('popstate', handleBrowserBackButton);

    const customer = localStorage.getItem('accessToken');
    if (customer) {
      navigate(RoutesName.main, { replace: true });
    }

    return () => {
      window.removeEventListener('popstate', handleBrowserBackButton);
    };
  }, [handleBrowserBackButton, navigate]);
}

export default RedirectToMain;
