import { Cart } from '@commercetools/platform-sdk';

import styles from './CartPage.module.scss';

import CartPageLayout from './ui/cartPageLayout/CartPageLayout';

import CartEmpty from './ui/CartEmpty/CartEmpty';

import useScrollToTop from '../../shared/helpers/ScrollToTop';
import { selectCart } from '../../entities/cart/model/selectCart';
import { useAppSelector } from '../../app/appStore/hooks';

function CartPage(): JSX.Element {
  useScrollToTop();
  const currentCart: Cart | null = useAppSelector(selectCart);

  const content = currentCart && currentCart.lineItems.length > 0 ? <CartPageLayout /> : <CartEmpty />;

  return <div className={styles.cartPage}>{content}</div>;
}

export default CartPage;
