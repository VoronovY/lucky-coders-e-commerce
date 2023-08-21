import { useParams } from 'react-router-dom';

import styles from './CatalogPage.module.scss';

import RoutesName from '../../shared/routing';
import catalogLinks from '../../shared/constants/catalogLinks';

function CatalogPage(): JSX.Element {
  window.scrollTo(0, 0);

  const { category } = useParams();

  const allCatalogData = catalogLinks.find((link) => link.path === RoutesName.catalog);

  const categoryData = category
    ? catalogLinks.find((link) => link.path === `${RoutesName.catalog}/${category}`)
    : allCatalogData;

  return (
    <div className={styles.catalogPage}>
      {categoryData && (
        <>
          <h3>{categoryData.text}</h3>
          <div className={styles.catalogImg}>
            <img src={categoryData.src} alt={categoryData.text} />
          </div>
        </>
      )}
    </div>
  );
}

export default CatalogPage;
