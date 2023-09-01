import { useCallback, useEffect, useState } from 'react';

import cn from 'classnames';

import styles from './CatalogPage.module.scss';

import useScrollToTop from '../../shared/helpers/ScrollToTop';
import { ProductList } from '../../features/productList/ui/ProductList';
import FilterMenu from '../../widgets/filterMenu';
import widthMobileBig from '../../shared/constants/styles';
import CategoriesList from '../../shared/categories/ui/CategoriesList/CategoriesList';

function CatalogPage(): JSX.Element {
  useScrollToTop();

  const [showFilters, setShowFilters] = useState(false);

  const handleResizeWindow = useCallback((): void => {
    const body = document.querySelector('body');
    if (body) {
      if (window.innerWidth > widthMobileBig && showFilters) {
        setShowFilters(false);
        body.style.overflow = 'auto';
      }
    }
  }, [showFilters]);

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow);

    return () => window.removeEventListener('resize', handleResizeWindow);
  }, [showFilters, handleResizeWindow]);

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = showFilters ? 'hidden' : 'auto';
    }
  }, [showFilters]);

  const filterStyle = cn(styles.filters, {
    [styles.show]: showFilters,
  });

  const showFilterBtn = (
    <button
      className={styles.showFiltersBtn}
      onClick={(): void => {
        setShowFilters(!showFilters);
      }}
      type="button"
    >
      {showFilters ? 'Hide filters' : 'Show filter'}
    </button>
  );

  return (
    <div className={styles.catalogPage}>
      <div className={styles.showFiltersBtnWrapper}>{showFilterBtn}</div>
      <div className={styles.catalogBody}>
        <div className={filterStyle}>
          <CategoriesList />
          {showFilterBtn}
          <FilterMenu />
        </div>
        <div className={styles.catalog}>
          <ProductList />
        </div>
      </div>
    </div>
  );
}

export default CatalogPage;
