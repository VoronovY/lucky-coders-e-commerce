import { Link } from 'react-router-dom';

import styles from './CartEmpty.module.scss';

import Button from '../../../../shared/ui/button/Button';

import { CartEmptyIcon } from '../../../../app/layouts/images';

import RoutesName from '../../../../shared/routing';

function CartEmpty(): JSX.Element {
  return (
    <div className={styles.cart}>
      <CartEmptyIcon className={styles.cartIcon} />
      <p className={styles.cartText}>Your cart is empty.</p>
      <Link to={RoutesName.catalog} className={styles.linkWrapper}>
        <Button width="300px" height="46px">
          Go to Catalog
        </Button>
      </Link>
    </div>
  );
}

export default CartEmpty;
