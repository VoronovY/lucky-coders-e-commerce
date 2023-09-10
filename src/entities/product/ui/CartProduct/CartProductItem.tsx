import { useState } from 'react';

import styles from './CartProductItem.module.scss';

import { DeleteIcon } from '../../../../app/layouts/images';
import CrystalIcon from '../../../../../public/assets/crystals.png';

function CartProduct(): JSX.Element {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = (): void => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = (): void => {
    setQuantity(quantity + 1);
  };

  return (
    <div className={styles.productItem}>
      <div className={styles.productImage}>
        <img src={CrystalIcon} alt="Crystal" />
      </div>
      <div className={styles.productInfoWrapper}>
        <div className={styles.productInfo}>
          <div className={styles.productName}>Clear Quartz Crystal</div>
          <div className={styles.productQuantity}>In Stock: 12</div>
          <div className={styles.productPrice}>
            Price: <span className={styles.oldPrice}>5.99 €</span> 4.99 €
          </div>
        </div>
        <div className={styles.productPriceQuantity}>
          <div className={styles.productPrice}>4.99 €</div>
          <div className={styles.productControls}>
            <button type="button" className={styles.button} onClick={decreaseQuantity}>
              -
            </button>
            <span>{quantity}</span>
            <button type="button" className={styles.button} onClick={increaseQuantity}>
              +
            </button>
          </div>
          <DeleteIcon className={styles.delete} />
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
