import styles from './CartEmpty.module.scss';

import Button from '../../../../shared/ui/button/Button';

import { CartEmptyIcon } from '../../../../app/layouts/images';

function CartEmpty(): JSX.Element {
  return (
    <div className={styles.cart}>
      <CartEmptyIcon className={styles.cartIcon} />
      <p className={styles.cartText}>Your cart is empty.</p>
      <Button width="300px" height="35px">
        Go to Catalog
      </Button>
    </div>
  );
}

export default CartEmpty;
