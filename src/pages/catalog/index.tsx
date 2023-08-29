// import { useParams } from 'react-router-dom';

import styles from './CatalogPage.module.scss';

// import RoutesName from '../../shared/routing';
// import catalogLinks from '../../shared/constants/catalogLinks';
import useScrollToTop from '../../shared/helpers/ScrollToTop';
import { ProductList } from '../../features/productList/ui/ProductList';
import FilterMenu from '../../widgets/filterMenu';

function CatalogPage(): JSX.Element {
  useScrollToTop();

  return (
    <div className={styles.catalogPage}>
      <div className={styles.filters}>
        <FilterMenu />
      </div>
      <div className={styles.catalog}>
        <ProductList />
      </div>
    </div>
  );
}

export default CatalogPage;
