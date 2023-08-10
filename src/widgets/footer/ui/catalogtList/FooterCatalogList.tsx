import { Link } from 'react-router-dom';

import styles from './FooterCatalogList.module.scss';

import RoutesName from '../../../../shared/routing';

const categories = [
  { id: 1, name: 'Pearl' },
  { id: 2, name: 'Collectible minerals' },
  { id: 3, name: 'Beads' },
  { id: 4, name: 'Magical stones' },
];
function FooterCatalogList(): JSX.Element {
  return (
    <div className={styles.footer_catalogs_list}>
      <Link to={RoutesName.category}>
        <span>Catalog</span>
      </Link>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FooterCatalogList;
