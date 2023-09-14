import { Link } from 'react-router-dom';

import { Cart } from '@commercetools/platform-sdk';

import styles from '../layoutHeader/LayoutHeader.module.scss';

import { CartIcon } from '../../../../app/layouts/images';
import RoutesName from '../../../../shared/routing';

import { selectCart } from '../../../../entities/cart/model/selectCart';
import { useAppSelector } from '../../../../app/appStore/hooks';

function HeaderCart(): JSX.Element {
  const currentCart: Cart | null = useAppSelector(selectCart);

  const cartCounter = (
    <span className={styles.cartCounter}>{currentCart ? currentCart.totalLineItemQuantity ?? 0 : 0}</span>
  );

  return (
    <Link to={RoutesName.cart} className={styles.cartLink}>
      <CartIcon className={styles.cart} />
      {cartCounter}
    </Link>
  );
}

export default HeaderCart;
