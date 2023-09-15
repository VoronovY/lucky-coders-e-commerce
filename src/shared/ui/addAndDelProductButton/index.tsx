import { useSelector } from 'react-redux';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import { useState } from 'react';

import styles from './AddAndDelProductButton.module.scss';

import { useAppDispatch } from '../../../app/appStore/hooks';
import Button from '../button/Button';
import { LoadingIcon, CartButtonIcon, DeleteIcon } from '../../../app/layouts/images';
import { selectCart, selectCartLoading } from '../../../entities/cart/model/selectCart';
import { getCartAction, updateCartAction } from '../../../entities/cart/model/cartActions';

import ModalError from '../modalError/ModalError';
import { updateCart } from '../../../entities/cart/api/cartApi';
import { createRemoveLineItemAction, createUpdateCartBody } from '../../helpers/cartActions';
import { getErrorSignUpMessage } from '../../helpers/getErrorMessages';

function AddAndDelProductButton({ id }: { id: string }): JSX.Element | null {
  const [errorMessage, setErrorMessage] = useState('');
  const isCartLoading = useSelector(selectCartLoading);
  const currentCart: Cart | null = useSelector(selectCart);
  const dispatch = useAppDispatch();

  if (!currentCart) {
    return null;
  }
  const { id: cartId, version } = currentCart;

  const handleDeleteProduct = (): void => {
    setErrorMessage('');

    const lineItem = currentCart.lineItems.find((item: LineItem) => item.productId === id);
    const lineItemId = lineItem?.id;

    let action;
    let updateBody;
    if (lineItemId) {
      action = createRemoveLineItemAction(lineItemId);
      updateBody = createUpdateCartBody(version, [action]);
      updateCart(cartId, version, updateBody)
        .then(() => {
          dispatch(getCartAction());
        })
        .catch((error) => {
          setErrorMessage(getErrorSignUpMessage(error.body));
        });
    }
  };

  const handleAddProduct = (): void => {
    dispatch(updateCartAction(id));
  };
  const disableAddBtn = currentCart
    ? currentCart.lineItems.findIndex((lineItem: LineItem) => lineItem.productId === id) !== -1
    : false;

  if (disableAddBtn) {
    return (
      <>
        {errorMessage && <ModalError errorMessage={errorMessage} />}
        <Button onClick={handleDeleteProduct} className={styles.delButton}>
          {isCartLoading ? (
            <LoadingIcon className={styles.loadingIcon} />
          ) : (
            <>
              Remove from cart <DeleteIcon className={styles.delIcon} />
            </>
          )}
        </Button>
      </>
    );
  }
  return (
    <>
      {errorMessage && <ModalError errorMessage={errorMessage} />}
      <Button onClick={handleAddProduct} className={styles.addButton}>
        {isCartLoading ? (
          <LoadingIcon className={styles.loadingIcon} />
        ) : (
          <>
            Add to cart <CartButtonIcon className={styles.cartIcon} />
          </>
        )}
      </Button>
    </>
  );
}

export default AddAndDelProductButton;
