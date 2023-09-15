import styles from './CartPageLayout.module.scss';

import CartProductList from '../../../../features/cart/ui/cartProductList/CartProductList';
import CartSummary from '../../../../features/cart/ui/cartSummary/CartSummary';

function CartPageLayout(): JSX.Element {
  return (
    <div className={styles.cartWrapper}>
      <h2>Cart</h2>
      <div className={styles.cart}>
        <CartProductList />
        <CartSummary />
      </div>
    </div>
  );
}

export default CartPageLayout;
