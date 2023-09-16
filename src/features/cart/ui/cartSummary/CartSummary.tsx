import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Cart, MyCartRemoveDiscountCodeAction, MyCartRemoveLineItemAction } from '@commercetools/platform-sdk';

import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { useSelector } from 'react-redux';

import styles from './CartSummary.module.scss';

import Button from '../../../../shared/ui/button/Button';
import { TextInput } from '../../../../shared/ui';
import ButtonCancel from '../../../../entities/user/ui/modal/buttonCancel/ButtonCancel';
import { selectCart, selectCartLoading } from '../../../../entities/cart/model/selectCart';
import { updateCart } from '../../../../entities/cart/api/cartApi';
import { useAppDispatch, useAppSelector } from '../../../../app/appStore/hooks';
import { getCartAction } from '../../../../entities/cart/model/cartActions';
import { getErrorSignUpMessage } from '../../../../shared/helpers/getErrorMessages';
import ModalError from '../../../../shared/ui/modalError/ModalError';
import ModalForm from '../../../../shared/ui/form/modalForm/ModalForm';
import getDiscounts from '../../../../shared/api/discounts/getDiscounts';
import { CartEmptyIcon, LoadingIcon } from '../../../../app/layouts/images';
import {
  createAddDiscountCodeAction,
  createRemoveDiscountCodeAction,
  createRemoveLineItemAction,
  createUpdateCartBody,
} from '../../../../shared/helpers/productCartActions';

type FormData = {
  promoCode: string;
};

interface DiscountCode {
  id: string;
  code: string;
}

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
  const currentCart: Cart | null = useAppSelector(selectCart);
  const isCartLoading = useSelector(selectCartLoading);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalsOpen] = useState(false);
  const [isBuyNowModalOpen, setIsBuyNowModalOpen] = useState(false);
  const [activeDiscountCode, setActiveDiscountCode] = useState<DiscountCode[]>([]);

  const getDiscountCodes = useCallback(() => {
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
  }, [currentCart?.discountCodes]);

  useEffect(() => {
    setErrorMessage('');
    getDiscountCodes();
  }, [getDiscountCodes]);

  if (!currentCart) {
    return null;
  }

  const totalPrice = currentCart.totalPrice.centAmount / 100;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setErrorMessage('');
    const action = createAddDiscountCodeAction(data.promoCode);
    const updateBody = createUpdateCartBody(currentCart.version, [action]);

    updateCart(currentCart.id, currentCart.version, updateBody)
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

  const handleOpenBuyNowModal = (): void => {
    setIsBuyNowModalOpen(true);
  };

  const onCloseBuyNowModal = (): void => {
    setIsBuyNowModalOpen(false);
  };
  const clearCart = (): void => {
    setErrorMessage('');
    const discountCodeIds = currentCart.discountCodes.map((code) => code.discountCode.id);

    const removeDiscountCodeActions: MyCartRemoveDiscountCodeAction[] = discountCodeIds.map((discountCodeId) => {
      return createRemoveDiscountCodeAction(discountCodeId);
    });
    const updateBodyRemoveCodes = createUpdateCartBody(currentCart.version, removeDiscountCodeActions);

    updateCart(currentCart.id, currentCart.version, updateBodyRemoveCodes).then((response) => {
      const lineItemIds = response.body.lineItems.map((item) => item.id);

      const removeLineItemActions: MyCartRemoveLineItemAction[] = lineItemIds.map((lineItemId) => {
        return createRemoveLineItemAction(lineItemId);
      });
      const updateBodyRemoveProducts = createUpdateCartBody(response.body.version, removeLineItemActions);
      updateCart(response.body.id, response.body.version, updateBodyRemoveProducts)
        .then(() => {
          dispatch(getCartAction());
        })
        .catch((error) => {
          setErrorMessage(getErrorSignUpMessage(error.body));
        });
    });
  };

  const handleRemoveDiscountCode = (discountCodeId: string): void => {
    setErrorMessage('');
    const action = createRemoveDiscountCodeAction(discountCodeId);
    const updateBody = createUpdateCartBody(currentCart.version, [action]);

    updateCart(currentCart.id, currentCart.version, updateBody)
      .then(() => {
        dispatch(getCartAction());
      })
      .catch((error) => {
        setErrorMessage(getErrorSignUpMessage(error.body));
      });
  };

  const totalAmount =
    currentCart.lineItems.reduce(
      (total, item) =>
        total +
        (item.price.discounted ? item.price.discounted.value.centAmount : item.price.value.centAmount) * item.quantity,
      0,
    ) / 100;

  const totalPriceClassName = cn(styles.totalPrice, {
    [styles.strikethrough]: currentCart?.discountCodes && currentCart.discountCodes.length > 0,
  });

  return (
    <div className={styles.summaryWrapper}>
      <div className={styles.summary}>
        {errorMessage && <ModalError errorMessage={errorMessage} />}
        {currentCart && (
          <div>
            <div className={totalPriceClassName}>Total: {totalAmount} €</div>
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
                    <button type="submit" className={styles.addButton} disabled={isCartLoading}>
                      Apply
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
        <Button height="46px" onClick={handleOpenBuyNowModal}>
          Buy Now
        </Button>
        {isBuyNowModalOpen && (
          <ModalForm title="Section Under Development">
            <div className={styles.modalBuyNow}>
              <p>Sorry, this section is currently under development and not available yet.</p>
              <LoadingIcon className={styles.loadingIcon} />
              <ButtonCancel onClick={onCloseBuyNowModal} name="Close" />
            </div>
          </ModalForm>
        )}
        <ButtonCancel onClick={handleOpenModal} name="Clear Cart" />
        {isModalOpen && (
          <ModalForm title="Do you want to clear the cart?">
            <CartEmptyIcon className={styles.cartEmptyIcon} />
            <div className={styles.modalBody}>
              <Button height="46px" onClick={(): void => clearCart()}>
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
