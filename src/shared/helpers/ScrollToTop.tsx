import { useEffect } from 'react';

function useScrollToTop(): void {
  useEffect(() => {
    const scrollToTop = (): void => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    scrollToTop();
  }, []);
}

export default useScrollToTop;
