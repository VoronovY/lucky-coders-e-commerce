import { Link } from 'react-router-dom';

import styles from './FooterCatalogList.module.scss';

import RoutesName from '../../../../shared/routing';

const categories = [
  { id: 1, name: 'Pearl', path: '/pearls' },
  { id: 2, name: 'Collectible minerals', path: '/collectible-minerals' },
  { id: 3, name: 'Beads', path: '/beads' },
  { id: 4, name: 'Magical stones', path: '/magical-stones' },
];
function FooterCatalogList(): JSX.Element {
  return (
    <div className={styles.footerCatalogsList}>
      <Link to={RoutesName.catalog}>
        <span>Catalog</span>
      </Link>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={category.name.toLowerCase().replace(/\s/g, '-')} key={category.id}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterCatalogList;
