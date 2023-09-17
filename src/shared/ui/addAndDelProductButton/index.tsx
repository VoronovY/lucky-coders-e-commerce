import { Cart, LineItem } from '@commercetools/platform-sdk';
import { useState } from 'react';

import styles from './AddAndDelProductButton.module.scss';

import { useAppDispatch, useLoadProduct, useAppSelector } from '../../../app/appStore/hooks';
import Button from '../button/Button';
import { LoadingIcon, CartButtonIcon, DeleteIcon } from '../../../app/layouts/images';
import { selectCart, selectCartLoading } from '../../../entities/cart/model/selectCart';
import { getCartAction, updateCartAction, createCartAction } from '../../../entities/cart/model/cartActions';

import ModalError from '../modalError/ModalError';
import { updateCart } from '../../../entities/cart/api/cartApi';
import { createRemoveLineItemAction, createUpdateCartBody } from '../../helpers/cartActions';
import { getErrorSignUpMessage } from '../../helpers/getErrorMessages';
import { updateInfoMessage, updateIsModalInfoOpen } from '../../model/appSlice';

function AddAndDelProductButton({ id }: { id: string }): JSX.Element | null {
  const [errorMessage, setErrorMessage] = useState('');
  const isCartLoading = useAppSelector(selectCartLoading);
  const currentCart: Cart | null = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const product = useLoadProduct();

  const handleDeleteProduct = (): void => {
    setErrorMessage('');

    const title = product?.title;
    const message = `You remove product ${title || ''} from the Cart`;

    const lineItem = currentCart?.lineItems.find((item: LineItem) => item.productId === id);
    const lineItemId = lineItem?.id;
    const version = currentCart?.version;
    const cartId = currentCart?.id;

    if (lineItemId && version && cartId) {
      const action = createRemoveLineItemAction(lineItemId);
      const updateBody = createUpdateCartBody(version, [action]);
      updateCart(cartId, version, updateBody)
        .then(() => {
          dispatch(getCartAction());

          dispatch(updateInfoMessage(message));
          dispatch(updateIsModalInfoOpen(true));
          setTimeout(() => {
            dispatch(updateIsModalInfoOpen(false));
            dispatch(updateInfoMessage(''));
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(getErrorSignUpMessage(error.body));
        });
    }
  };

  const handleAddProduct = (): void => {
    if (!currentCart) {
      dispatch(createCartAction());
    }
    dispatch(updateCartAction(id));
  };
  const disableAddBtn = currentCart
    ? currentCart.lineItems.findIndex((lineItem: LineItem) => lineItem.productId === id) !== -1
    : false;

  return (
    <>
      <CartButtonIcon className={styles.cartIcon} />
      {errorMessage && <ModalError errorMessage={errorMessage} />}
      <Button
        onClick={isCartLoading ? undefined : handleAddProduct}
        className={styles.addButton}
        disabled={disableAddBtn}
      >
        {isCartLoading ? (
          <LoadingIcon className={styles.loadingIcon} />
        ) : (
          <>
            Add to cart <CartButtonIcon className={styles.cartIcon} />
          </>
        )}
      </Button>
      {disableAddBtn ? (
        <Button onClick={isCartLoading ? undefined : handleDeleteProduct} className={styles.delButton}>
          {isCartLoading ? (
            <LoadingIcon className={styles.loadingIcon} />
          ) : (
            <>
              Remove from cart <DeleteIcon className={styles.delIcon} />
            </>
          )}
        </Button>
      ) : null}
    </>
  );
}

export default AddAndDelProductButton;
