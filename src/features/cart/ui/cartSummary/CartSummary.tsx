import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useSelector } from 'react-redux';

import { Cart, LineItem } from '@commercetools/platform-sdk';

import { useEffect, useState } from 'react';

import styles from './CartSummary.module.scss';

import Button from '../../../../shared/ui/button/Button';
import { TextInput } from '../../../../shared/ui';
import ButtonCancel from '../../../../entities/user/ui/modal/buttonCancel/ButtonCancel';
import { selectCart } from '../../../../entities/cart/model/selectCart';
import { addDiscountCode, removeDiscountCode, removeProduct } from '../../../../entities/cart/api/cartApi';
import { useAppDispatch } from '../../../../app/appStore/hooks';
import { getCartAction } from '../../../../entities/cart/model/cartActions';
import { getErrorSignUpMessage } from '../../../../shared/helpers/getErrorMessages';
import ModalError from '../../../../shared/ui/modalError/ModalError';
import ModalForm from '../../../../shared/ui/form/modalForm/ModalForm';
import getDiscounts from '../../../../shared/api/discounts/getDiscounts';
import { updateInfoMessage, updateIsModalInfoOpen } from '../../../../shared/model/appSlice';
import SuccessfulMessages from '../../../../shared/successfulMessages';

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
  const [activeDiscountCode, setActiveDiscountCode] = useState<{ id: string; code: string }[]>([]);

  useEffect(() => {
    setErrorMessage('');
    const getDiscountCodes = (): void => {
      getDiscounts()
        .then((response) => {
          const activeCodes = response.body.results
            .filter((discountCode) => {
              return currentCart?.discountCodes.some(
                (cartDiscountCode) => cartDiscountCode.discountCode.id === discountCode.id,
              );
            })
            .map((discountCode) => ({ id: discountCode.id, code: discountCode.code }));

          setActiveDiscountCode(activeCodes);
        })
        .catch((error) => {
          setErrorMessage(getErrorSignUpMessage(error.body));
        });
    };

    getDiscountCodes();
  }, [currentCart?.discountCodes]);

  if (!currentCart) {
    return null;
  }

  const totalPrice = currentCart.totalPrice.centAmount / 100;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setErrorMessage('');

    addDiscountCode(currentCart.id, data.promoCode, currentCart.version)
      .then(() => {
        dispatch(updateInfoMessage(SuccessfulMessages.addPromo));
        dispatch(updateIsModalInfoOpen(true));
        setTimeout(() => {
          dispatch(updateIsModalInfoOpen(false));
          dispatch(updateInfoMessage(''));
        }, 5000);
      })
      .then(() => {
        dispatch(getCartAction());
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

  const handleRemoveDiscountCode = (discountCodeId: string): void => {
    setErrorMessage('');

    removeDiscountCode(currentCart.id, discountCodeId, currentCart.version)
      .then(() => {
        dispatch(updateInfoMessage(SuccessfulMessages.removePromo));
        dispatch(updateIsModalInfoOpen(true));
        setTimeout(() => {
          dispatch(updateIsModalInfoOpen(false));
          dispatch(updateInfoMessage(''));
        }, 5000);
      })
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
            <div
              className={`${styles.totalPrice} ${
                currentCart.discountCodes && currentCart.discountCodes.length > 0 ? styles.strikethrough : ''
              }`}
            >
              Total:{' '}
              {currentCart.lineItems.reduce(
                (total, item) =>
                  total +
                  (item.price.discounted ? item.price.discounted.value.centAmount : item.price.value.centAmount) *
                    item.quantity,
                0,
              ) / 100}{' '}
              €
            </div>
            {currentCart.discountCodes && currentCart.discountCodes.length > 0 && (
              <div className={styles.totalPrice}>
                Total with discount: <span>{totalPrice} €</span>
              </div>
            )}
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
        <div className={styles.promoCode}>
          {currentCart?.discountCodes?.length > 0 && <div>Applied codes:</div>}
          <div className={styles.codes}>
            {activeDiscountCode.map((discount, index) => (
              <div key={`${index + 1}-code`} className={styles.codeWrapper}>
                <span>{discount.code}</span>
                <button type="button" onClick={(): void => handleRemoveDiscountCode(discount.id)}>
                  -
                </button>
              </div>
            ))}
          </div>
        </div>
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
