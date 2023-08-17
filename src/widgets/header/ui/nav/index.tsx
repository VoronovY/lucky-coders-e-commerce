import { Link } from 'react-router-dom';

import styles from './HeaderNav.module.scss';

import Catalog from './catalog';

import RoutesName from '../../../../shared/routing';

function HeaderNavCart(): JSX.Element {
  return (
    <nav className={styles.nav}>
      <Catalog />

      <Link to={RoutesName.home} className={styles.navLink} key={1}>
        Home
      </Link>
      <Link to={RoutesName.about} className={styles.navLink} key={2}>
        About Us
      </Link>
    </nav>
  );
}

export default HeaderNavCart;
