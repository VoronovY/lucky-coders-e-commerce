import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import RoutesName from '../routing';
import { useAppSelector } from '../../app/appStore/hooks';
import { getAccessToken } from '../selectors/mainSettingsSelectors';

function RedirectToMain(): void {
  const navigate = useNavigate();
  const token = useAppSelector(getAccessToken);

  const handleBrowserBackButton = useCallback(
    (event: PopStateEvent): void => {
      if (token) {
        event.preventDefault();
        navigate(RoutesName.main);
      }
    },
    [navigate, token],
  );

  useEffect(() => {
    window.addEventListener('popstate', handleBrowserBackButton);

    if (token) {
      navigate(RoutesName.main, { replace: true });
    }

    return () => {
      window.removeEventListener('popstate', handleBrowserBackButton);
    };
  }, [handleBrowserBackButton, navigate, token]);
}

export default RedirectToMain;
