import { useSelector } from 'react-redux';

import { Cart } from '@commercetools/platform-sdk';

import styles from './CartPage.module.scss';

import CartPageLayout from './ui/cartPageLayout/CartPageLayout';

import CartEmpty from './ui/cartEmpty/CartEmpty';

import useScrollToTop from '../../shared/helpers/ScrollToTop';
import { selectCart } from '../../entities/cart/model/selectCart';

function CartPage(): JSX.Element | null {
  useScrollToTop();
  const currentCart: Cart | null = useSelector(selectCart);

  if (!currentCart) {
    return null;
  }

  return <div className={styles.cartPage}>{currentCart.lineItems.length > 0 ? <CartPageLayout /> : <CartEmpty />}</div>;
}

export default CartPage;
