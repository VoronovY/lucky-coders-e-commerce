import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useSelector } from 'react-redux';

import { Cart } from '@commercetools/platform-sdk';

import styles from './CartSummary.module.scss';

import Button from '../../../../../shared/ui/button/Button';
import { TextInput } from '../../../../../shared/ui';
import ButtonCancel from '../../../../../entities/user/ui/modal/buttonCancel/ButtonCancel';
import { selectCart } from '../../../../../entities/cart/model/selectCart';

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

  const currentCart: Cart | null = useSelector(selectCart);

  if (!currentCart) {
    return null;
  }

  const totalPrice = currentCart.totalPrice.centAmount / 100;
  const onSubmit: SubmitHandler<FormData> = (data) => {
    return data;
  };

  return (
    <div className={styles.summary}>
      <div>
        <div className={styles.totalPrice}>
          Total: <span>{totalPrice} €</span>
        </div>
        {/* <div>Total with discount: 900 €</div> */}
      </div>
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
      <Button height="46px">Buy Now</Button>
      <ButtonCancel onClick={(): void => {}} name="Clear Cart" />
    </div>
  );
}

export default CartSummary;
