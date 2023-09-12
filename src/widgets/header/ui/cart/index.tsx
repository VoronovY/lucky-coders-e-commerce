import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { Cart } from '@commercetools/platform-sdk';

import styles from '../layoutHeader/LayoutHeader.module.scss';

import { CartIcon } from '../../../../app/layouts/images';
import RoutesName from '../../../../shared/routing';

import { selectCart } from '../../../../entities/cart/model/selectCart';

function HeaderCart(): JSX.Element {
  const currentCart: Cart | null = useSelector(selectCart);

  const cartCounter = currentCart ? (
    <span className={styles.cartCounter}>{currentCart.totalLineItemQuantity ?? 0}</span>
  ) : (
    <span className={styles.cartCounter}>0</span>
  );

  return (
    <Link to={RoutesName.cart} className={styles.cartLink}>
      <CartIcon className={styles.cart} />
      {cartCounter}
    </Link>
  );
}

export default HeaderCart;
