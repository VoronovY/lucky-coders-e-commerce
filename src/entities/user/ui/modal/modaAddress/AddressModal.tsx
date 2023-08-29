import { Controller, useForm } from 'react-hook-form';

import { ChangeEvent } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';

import { ObjectSchema } from 'yup';

import styles from './AddressModal.module.scss';

import ModalForm from '../../../../../shared/ui/form/modalForm/ModalForm';
import Button from '../../../../../shared/ui/button/Button';
import { SelectInput } from '../../../../../shared/ui/select/SelectInput';
import { TextInput } from '../../../../../shared/ui/textInput/TextInput';
import countries from '../../../../../shared/constants/countries';
import { vailadtePostalCode } from '../../../../../shared/helpers/validationFunctions';
import addressSchema from '../../../model/addressSchema';
import { ProfileAddressFields } from '../../../../../shared/types/types';

export interface AddressModalProps extends ProfileAddressFields {
  onCloseAddAddress: () => void;
  title: string;
}

function AddressModal({
  onCloseAddAddress,
  title,
  country,
  city,
  state,
  street,
  postalCode,
}: AddressModalProps): JSX.Element {
  const defaultValues = {
    country,
    city,
    state,
    street,
    postalCode,
  };

  const {
    handleSubmit,
    watch,
    clearErrors,
    setError,
    control,
    formState: { errors },
  } = useForm<ProfileAddressFields>({
    resolver: yupResolver(addressSchema as ObjectSchema<ProfileAddressFields>),
    mode: 'onChange',
    defaultValues,
  });

  const changePostalCode = (postal: string): void => {
    const currentCountry = watch('country');
    if (currentCountry) {
      const { iso } = currentCountry;
      if (postalCode === '') return;
      vailadtePostalCode(postal, iso)
        .then(() => {
          clearErrors('postalCode');
        })
        .catch(() => {
          setError('postalCode', {
            type: 'manual',
            message: 'The entered postal code is not valid for the selected country.',
          });
        });
    }
  };

  const disableSubmit = Object.values(errors).length > 0;
  const onSubmit = (data: ProfileAddressFields): ProfileAddressFields => {
    return data;
  };

  return (
    <ModalForm title={title}>
      <form className={styles.addressModal} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="country"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => {
            return (
              <SelectInput
                id="1"
                placeholder="Select Country"
                title="Select Country *"
                options={countries}
                onChange={(selectedCountry): void => {
                  onChange(selectedCountry);
                  const postal = watch('postalCode');
                  changePostalCode(postal);
                }}
                value={value}
                error={error}
              />
            );
          }}
        />
        <Controller
          name="city"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }): JSX.Element => {
            return <TextInput id="2" placeholder="City" label="City *" {...field} error={error} />;
          }}
        />
        <Controller
          name="street"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }): JSX.Element => {
            return <TextInput id="3" placeholder="Street" label="Street *" {...field} error={error} />;
          }}
        />
        <Controller
          name="state"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }): JSX.Element => {
            return <TextInput id="4" placeholder="State" label="State" {...field} error={error} />;
          }}
        />
        <Controller
          name="postalCode"
          control={control}
          rules={{
            required: true,
            validate: () => false,
          }}
          render={({ field, fieldState: { error } }): JSX.Element => {
            return (
              <TextInput
                id="5"
                placeholder="Postal code"
                label="Postal code *"
                {...field}
                error={error}
                onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                  field.onChange(e.target.value);
                  const currentCountry = watch('country');
                  if (currentCountry) {
                    changePostalCode(e.target.value);
                  }
                }}
              />
            );
          }}
        />
        <Button type="submit" width="100%" disabled={disableSubmit}>
          Save
        </Button>
        <Button type="button" width="100%" onClick={onCloseAddAddress}>
          Cancel
        </Button>
      </form>
    </ModalForm>
  );
}

export default AddressModal;
