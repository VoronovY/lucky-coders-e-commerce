import styles from './CartPage.module.scss';
import CartProductList from './ui/CartProductList/CartProductList';
import CartSummary from './ui/CartSummary/CartSummary';

function CartPage(): JSX.Element {
  return (
    <div className={styles.cart}>
      <span>Cart Page</span>
      <CartProductList />
      <CartSummary />
    </div>
  );
}

export default CartPage;
