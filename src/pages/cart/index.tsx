import { useSelector } from 'react-redux';

import { Cart } from '@commercetools/platform-sdk';

import styles from './CartPage.module.scss';

import CartPageLayout from './ui/cartPageLayout/CartPageLayout';

import CartEmpty from './ui/cartEmpty/CartEmpty';

import useScrollToTop from '../../shared/helpers/ScrollToTop';
import { selectCart } from '../../entities/cart/model/selectCart';

function CartPage(): JSX.Element {
  useScrollToTop();
  const currentCart: Cart | null = useSelector(selectCart);

  let content: JSX.Element;

  if (!currentCart) {
    content = <CartEmpty />;
  } else if (currentCart.lineItems.length > 0) {
    content = <CartPageLayout />;
  } else {
    content = <CartEmpty />;
  }

  return <div className={styles.cartPage}>{content}</div>;
}

export default CartPage;
