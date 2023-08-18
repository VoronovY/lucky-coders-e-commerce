import { Link } from 'react-router-dom';

import styles from '../layoutHeader/LayoutHeader.module.scss';

import { CartIcon } from '../../../../app/layouts/images';
import RoutesName from '../../../../shared/routing';

function HeaderCart(): JSX.Element {
  return (
    <Link to={RoutesName.cart}>
      <CartIcon className={styles.cart} />
    </Link>
  );
}

export default HeaderCart;
