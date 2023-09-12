import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { Cart } from '@commercetools/platform-sdk';

import styles from '../layoutHeader/LayoutHeader.module.scss';

import { CartIcon } from '../../../../app/layouts/images';
import RoutesName from '../../../../shared/routing';

import { selectCart } from '../../../../entities/cart/model/selectCart';

function HeaderCart(): JSX.Element | null {
  const currentCart: Cart | null = useSelector(selectCart);

  if (!currentCart) {
    return null;
  }

  return (
    <Link to={RoutesName.cart} className={styles.cartLink}>
      <CartIcon className={styles.cart} />
      <span className={styles.cartCounter}>{currentCart.totalLineItemQuantity}</span>
    </Link>
  );
}

export default HeaderCart;
