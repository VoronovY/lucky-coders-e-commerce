import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import RoutesName from '../routing';

function RedirectToMain(): void {
  const navigate = useNavigate();

  const handleBrowserBackButton = useCallback(
    (event: PopStateEvent): void => {
      const customer = sessionStorage.getItem('customer');
      if (customer) {
        event.preventDefault();
        navigate(RoutesName.main);
      }
    },
    [navigate],
  );

  useEffect(() => {
    window.addEventListener('popstate', handleBrowserBackButton);

    const customer = sessionStorage.getItem('customer');
    if (customer) {
      navigate(RoutesName.main, { replace: true });
    }

    return () => {
      window.removeEventListener('popstate', handleBrowserBackButton);
    };
  }, [handleBrowserBackButton, navigate]);
}

export default RedirectToMain;
