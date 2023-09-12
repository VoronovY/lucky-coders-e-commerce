import { LineItem } from '@commercetools/platform-sdk';

import styles from './CartProductItem.module.scss';

import { DeleteIcon } from '../../../../app/layouts/images';

interface CartProductListProps {
  lineItem: LineItem;
}

function CartProduct({ lineItem }: CartProductListProps): JSX.Element {
  const productName = lineItem.name['en-US'];
  const productQuantity = lineItem.quantity;
  const totalPrice = lineItem.totalPrice.centAmount / 100;
  const oldPrice = lineItem.price.value.centAmount / 100;
  const discountedPrice = lineItem.price.discounted ? lineItem.price.discounted.value.centAmount / 100 : null;

  return (
    <div className={styles.productItem}>
      <div className={styles.productImage}>
        {lineItem.variant.images && lineItem.variant.images.length > 0 && (
          <img src={lineItem.variant.images[0].url} alt={productName} />
        )}
      </div>
      <div className={styles.productInfoWrapper}>
        <div className={styles.productInfo}>
          <div className={styles.productName}>{productName}</div>
          <div className={styles.productQuantity}>In Stock: {lineItem.variant.availability?.availableQuantity}</div>
          <div className={styles.productPrice}>
            Price:&nbsp;
            {discountedPrice ? (
              <>
                <span className={styles.oldPrice}>{oldPrice} €</span>
                <span className={styles.discountedPrice}> {discountedPrice} €</span>
              </>
            ) : (
              <span className={styles.discountedPrice}>{oldPrice} €</span>
            )}
          </div>
        </div>
        <div className={styles.productPriceQuantity}>
          <div className={styles.productPrice}>{totalPrice} €</div>
          <div className={styles.productControls}>
            <button type="button" className={styles.button}>
              -
            </button>
            <span>{productQuantity}</span>
            <button type="button" className={styles.button}>
              +
            </button>
          </div>
          <button type="button" className={styles.deleteButton}>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
