import styles from './CartPage.module.scss';
// import CartProductList from './ui/CartProductList/CartProductList';
// import CartSummary from './ui/CartSummary/CartSummary';
import CartEmpty from './ui/CartEmpty/CartEmpty';

function CartPage(): JSX.Element {
  window.scrollTo(0, 0);

  return (
    <div className={styles.cart}>
      <CartEmpty />
      {/* <CartProductList />
      <CartSummary /> */}
    </div>
  );
}

export default CartPage;
