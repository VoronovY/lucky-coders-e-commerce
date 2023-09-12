import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useSelector } from 'react-redux';

import { Cart, LineItem } from '@commercetools/platform-sdk';

import { useState } from 'react';

import styles from './CartSummary.module.scss';

import Button from '../../../../shared/ui/button/Button';
import { TextInput } from '../../../../shared/ui';
import ButtonCancel from '../../../../entities/user/ui/modal/buttonCancel/ButtonCancel';
import { selectCart } from '../../../../entities/cart/model/selectCart';
import { addDiscountCode, removeProduct } from '../../../../entities/cart/api/cartApi';
import { useAppDispatch } from '../../../../app/appStore/hooks';
import { getCartAction } from '../../../../entities/cart/model/cartActions';
import { getErrorSignUpMessage } from '../../../../shared/helpers/getErrorMessages';
import ModalError from '../../../../shared/ui/modalError/ModalError';
import ModalForm from '../../../../shared/ui/form/modalForm/ModalForm';

type FormData = {
  promoCode: string;
};

const defaultValues = {
  promoCode: '',
};

function CartSummary(): JSX.Element | null {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues,
  });

  const dispatch = useAppDispatch();
  const currentCart: Cart | null = useSelector(selectCart);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  if (!currentCart) {
    return null;
  }

  const totalPrice = currentCart.totalPrice.centAmount / 100;
  const onSubmit: SubmitHandler<FormData> = (data) => {
    setErrorMessage('');

    addDiscountCode(currentCart.id, data.promoCode, currentCart.version)
      .then(() => {
        dispatch(getCartAction());
        setPromoCode(data.promoCode);
      })
      .catch((error) => {
        setErrorMessage(getErrorSignUpMessage(error.body));
      });
  };

  const handleOpenModal = (): void => {
    setIsModalsOpen(true);
  };
  const onCloseModal = (): void => {
    setIsModalsOpen(false);
  };
  const clearCart = (cartId: string, lineItems: LineItem[], version: number): void => {
    setErrorMessage('');

    const lineItemIds = lineItems.map((item) => item.id);

    removeProduct(cartId, lineItemIds, version)
      .then(() => {
        dispatch(getCartAction());
      })
      .catch((error) => {
        setErrorMessage(getErrorSignUpMessage(error.body));
      });
  };

  return (
    <div className={styles.summaryWrapper}>
      <div className={styles.summary}>
        {errorMessage && <ModalError errorMessage={errorMessage} />}
        {currentCart && (
          <div>
            <div className={styles.totalPrice}>
              Total: <span>{totalPrice} €</span>
            </div>
            {/* <div>Total with discount: 900 €</div> */}
          </div>
        )}
        <form className={styles.addPromo} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="promoCode"
            control={control}
            render={({ field }): JSX.Element => {
              return (
                <div>
                  <div className={styles.inputWrapper}>
                    <TextInput id="1" placeholder="" label="Promo Code" error={errors.promoCode} {...field} />
                    <button type="submit" className={styles.addButton}>
                      +
                    </button>
                  </div>
                </div>
              );
            }}
          />
        </form>
        {promoCode && (
          <div className={styles.promoCode}>
            <div>Applied codes:</div>
            <div>{promoCode}</div>
          </div>
        )}
        <Button height="46px">Buy Now</Button>
        <ButtonCancel onClick={handleOpenModal} name="Clear Cart" />
        {isModalOpen && (
          <ModalForm title="Do you want to clear the cart?">
            <div className={styles.modalBody}>
              <Button
                type="submit"
                width="100%"
                height="46px"
                onClick={(): void => clearCart(currentCart.id, currentCart.lineItems, currentCart.version)}
              >
                Yes
              </Button>
              <ButtonCancel onClick={onCloseModal} name="No" />
            </div>
          </ModalForm>
        )}
      </div>
    </div>
  );
}

export default CartSummary;
