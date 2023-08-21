import styles from './CartPage.module.scss';
// import CartProductList from './ui/CartProductList/CartProductList';
// import CartSummary from './ui/CartSummary/CartSummary';
import CartEmpty from './ui/CartEmpty/CartEmpty';

function CartPage(): JSX.Element {
  return (
    <div className={styles.cart}>
      <CartEmpty />
      {/* <CartProductList />
      <CartSummary /> */}
    </div>
  );
}

export default CartPage;
