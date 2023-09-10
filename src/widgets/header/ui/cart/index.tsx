import { Link } from 'react-router-dom';

import styles from '../layoutHeader/LayoutHeader.module.scss';

import { CartIcon } from '../../../../app/layouts/images';
import RoutesName from '../../../../shared/routing';

function HeaderCart(): JSX.Element {
  return (
    <Link to={RoutesName.cart} className={styles.cartLink}>
      <CartIcon className={styles.cart} />
      <span className={styles.cartCounter}>0</span>
    </Link>
  );
}

export default HeaderCart;
