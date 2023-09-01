import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import styles from './FooterCatalogList.module.scss';

import RoutesName from '../../../../shared/routing';
import selectCategories from '../../../../shared/categories/categoriesSelectors';

function FooterCatalogList(): JSX.Element {
  const categories = useSelector(selectCategories);

  return (
    <div className={styles.footerCatalogsList}>
      <Link to={RoutesName.catalog}>
        <span>Catalog</span>
      </Link>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`${RoutesName.catalog}/${category.key}`} key={category.id}>
              {category.name.en}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterCatalogList;
