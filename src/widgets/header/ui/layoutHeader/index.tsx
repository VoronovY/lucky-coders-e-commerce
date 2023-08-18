import styles from './LayoutHeader.module.scss';

import Logo from '../../../../shared/ui/logo/Logo';
import HeaderProfile from '../profile';
import HeaderCart from '../cart';
import HeaderNav from '../nav';

function LayoutHeader(): JSX.Element {
  return (
    <header className={styles.header}>
      <Logo />
      <HeaderNav />
      <div className={styles.imgs}>
        <HeaderProfile />
        <HeaderCart />
      </div>
    </header>
  );
}

export default LayoutHeader;
