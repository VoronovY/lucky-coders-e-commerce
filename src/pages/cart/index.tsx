import styles from './CartPage.module.scss';

import CartPageLayout from './ui/cartPageLayout/CartPageLayout';

// import CartEmpty from './ui/cartEmpty/CartEmpty';

import useScrollToTop from '../../shared/helpers/ScrollToTop';

function CartPage(): JSX.Element {
  useScrollToTop();

  return (
    <div className={styles.cartPage}>
      <CartPageLayout />
      {/* <CartEmpty /> */}
    </div>
  );
}

export default CartPage;
