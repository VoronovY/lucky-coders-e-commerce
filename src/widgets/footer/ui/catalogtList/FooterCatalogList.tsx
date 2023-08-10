import { Link } from 'react-router-dom';

import styles from './FooterCatalogList.module.scss';

import RoutesName from '../../../../shared/routing';

const categories = ['Pearl', 'Collectible minerals', 'Beads', 'Magical stones'];
function FooterCatalogList(): JSX.Element {
  return (
    <div className={styles.footer_catalogs_list}>
      <Link to={RoutesName.category}>
        <span>Catalog</span>
      </Link>
      <ul>
        {categories.map((category) => (
          <li>{category}</li>
        ))}
      </ul>
    </div>
  );
}

export default FooterCatalogList;
