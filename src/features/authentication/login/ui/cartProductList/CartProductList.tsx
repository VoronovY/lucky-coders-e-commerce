import styles from './CartProductList.module.scss';

import CartProduct from '../../../../../entities/product/ui/CartProduct/CartProductItem';

function CartProductList(): JSX.Element {
  return (
    <div className={styles.productList}>
      <CartProduct />
      <CartProduct />
      <CartProduct />
    </div>
  );
}

export default CartProductList;
