import { LineItem } from '@commercetools/platform-sdk';

import { useState } from 'react';

import { useSelector } from 'react-redux';

import styles from './CartProductItem.module.scss';

import { DeleteIcon } from '../../../../app/layouts/images';
import { updateCart } from '../../../cart/api/cartApi';
import { useAppDispatch } from '../../../../app/appStore/hooks';
import { getCartAction } from '../../../cart/model/cartActions';
import { getErrorSignUpMessage } from '../../../../shared/helpers/getErrorMessages';
import ModalError from '../../../../shared/ui/modalError/ModalError';
import { selectCartLoading } from '../../../cart/model/selectCart';
import {
  createRemoveLineItemAction,
  createDecreaseQuantityAction,
  createIncreaseQuantityAction,
  createUpdateCartBody,
} from '../../../../shared/helpers/cartActions';

interface CartProductListProps {
  lineItem: LineItem;
  cartId: string;
  version: number;
}

function CartProduct({ lineItem, cartId, version }: CartProductListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const isCartLoading = useSelector(selectCartLoading);

  const productName = lineItem.name['en-US'];
  const inStockQuantity = lineItem.variant.availability?.availableQuantity || 0;
  const productQuantity = lineItem.quantity;
  const totalPrice = lineItem.totalPrice.centAmount / 100;
  const oldPrice = lineItem.price.value.centAmount / 100;
  const discountedPrice = lineItem.price.discounted ? lineItem.price.discounted.value.centAmount / 100 : null;
  const lineItemId = lineItem.id;

  const handleQuantityChange = (newQuantity: number): void => {
    setErrorMessage('');

    if (newQuantity >= 1 && newQuantity <= inStockQuantity) {
      const action =
        newQuantity < productQuantity
          ? createDecreaseQuantityAction(lineItemId, newQuantity)
          : createIncreaseQuantityAction(lineItemId, newQuantity);

      const updateBody = createUpdateCartBody(version, [action]);

      updateCart(cartId, version, updateBody)
        .then(() => {
          dispatch(getCartAction());
        })
        .catch((error) => {
          setErrorMessage(getErrorSignUpMessage(error.body));
        });
    }
  };

  const handleDecreaseQuantity = (): void => {
    handleQuantityChange(productQuantity - 1);
  };

  const handleIncreaseQuantity = (): void => {
    handleQuantityChange(productQuantity + 1);
  };

  const handleDeleteProduct = (): void => {
    setErrorMessage('');

    const action = createRemoveLineItemAction(lineItemId);
    const updateBody = createUpdateCartBody(version, [action]);

    updateCart(cartId, version, updateBody)
      .then(() => {
        dispatch(getCartAction());
      })
      .catch((error) => {
        setErrorMessage(getErrorSignUpMessage(error.body));
      });
  };

  const isDecreaseDisabled = productQuantity === 1 || isCartLoading;
  const isIncreaseDisabled = productQuantity === inStockQuantity || isCartLoading;

  return (
    <>
      {errorMessage && <ModalError errorMessage={errorMessage} />}
      <div className={styles.productItem}>
        <div className={styles.productImage}>
          {lineItem.variant.images?.length && <img src={lineItem.variant.images[0].url} alt={productName} />}
        </div>
        <div className={styles.productInfoWrapper}>
          <div className={styles.productInfo}>
            <div className={styles.productName}>{productName}</div>
            <div className={styles.productQuantity}>In Stock: {inStockQuantity}</div>
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
              <button
                type="button"
                className={styles.button}
                onClick={handleDecreaseQuantity}
                disabled={isDecreaseDisabled}
              >
                -
              </button>
              <span>{productQuantity}</span>
              <button
                type="button"
                className={styles.button}
                onClick={handleIncreaseQuantity}
                disabled={isIncreaseDisabled}
              >
                +
              </button>
            </div>
            <button type="button" className={styles.deleteButton} onClick={handleDeleteProduct}>
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartProduct;
