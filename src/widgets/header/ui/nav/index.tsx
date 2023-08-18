import { Link } from 'react-router-dom';

import styles from './HeaderNav.module.scss';

import Catalog from './catalog';

import RoutesName from '../../../../shared/routing';

function HeaderNav(): JSX.Element {
  const navArr = [
    { id: 1, url: RoutesName.home, text: 'Home' },
    { id: 2, url: RoutesName.about, text: 'About Us' },
  ];
  return (
    <nav className={styles.nav}>
      <Catalog />
      {navArr.map((item) => {
        return (
          <Link to={item.url} className={styles.navLink} key={item.id}>
            {item.text}
          </Link>
        );
      })}
    </nav>
  );
}

export default HeaderNav;
