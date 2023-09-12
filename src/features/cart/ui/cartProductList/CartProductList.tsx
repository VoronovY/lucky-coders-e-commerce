import { useSelector } from 'react-redux';

import { Cart } from '@commercetools/platform-sdk';

import styles from './CartProductList.module.scss';

import CartProduct from '../../../../entities/product/ui/CartProduct/CartProductItem';
import { selectCart } from '../../../../entities/cart/model/selectCart';

function CartProductList(): JSX.Element | null {
  const currentCart: Cart | null = useSelector(selectCart);

  if (!currentCart) {
    return null;
  }

  const { lineItems, id: cartId, version } = currentCart;

  return (
    <div className={styles.productList}>
      {lineItems.map((lineItem) => (
        <CartProduct key={lineItem.id} lineItem={lineItem} cartId={cartId} version={version} />
      ))}
    </div>
  );
}

export default CartProductList;