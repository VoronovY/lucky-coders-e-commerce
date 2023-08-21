import styles from './CartPage.module.scss';
// import CartProductList from './ui/CartProductList/CartProductList';
// import CartSummary from './ui/CartSummary/CartSummary';
import CartEmpty from './ui/CartEmpty/CartEmpty';

import useScrollToTop from '../../shared/helpers/ScrollToTop';

function CartPage(): JSX.Element {
  useScrollToTop();

  return (
    <div className={styles.cart}>
      <CartEmpty />
      {/* <CartProductList />
      <CartSummary /> */}
    </div>
  );
}

export default CartPage;
