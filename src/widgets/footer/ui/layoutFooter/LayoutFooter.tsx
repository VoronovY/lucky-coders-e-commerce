import { Link } from 'react-router-dom';

import styles from './LayoutFooter.module.scss';

import Logo from '../../../../../public/assets/logo.png';
import FooterInfo from '../info/FooterInfo';
import RoutesName from '../../../../shared/routing';

function LayoutFooter(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.logo}>
          <img width="145" src={Logo} alt="Stones Fall Store Logo" />
        </div>
        <div>
          <Link to={RoutesName.category}>
            <span>Catalog</span>
          </Link>
          <ul>
            <li>Pearl</li>
            <li>Collectible minerals</li>
            <li>Beads</li>
            <li>Magical stones</li>
          </ul>
        </div>
        <FooterInfo />
      </div>
    </footer>
  );
}

export default LayoutFooter;
