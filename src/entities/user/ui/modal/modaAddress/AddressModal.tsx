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
import { CountriesOption } from '../../../../../shared/types/types';

interface AddressModalProps {
  onCloseAddAddress: () => void;
  title: string;
}

interface AddressFields {
  country: CountriesOption | null;
  city: string;
  state: string;
  street: string;
  postalCode: string;
}

const defaultValues = {
  country: null,
  city: '',
  state: '',
  street: '',
  postalCode: '',
};
function AddressModal({ onCloseAddAddress, title }: AddressModalProps): JSX.Element {
  const { handleSubmit, watch, clearErrors, setError, control } = useForm<AddressFields>({
    resolver: yupResolver(addressSchema as ObjectSchema<AddressFields>),
    mode: 'onChange',
    defaultValues,
  });

  const changePostalCode = (postalCode: string): void => {
    const country = watch('country');
    if (country) {
      const { iso } = country;
      if (postalCode === '') return;
      vailadtePostalCode(postalCode, iso)
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
  const onSubmit = (data: AddressFields): AddressFields => {
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
                  const postalCode = watch('postalCode');
                  changePostalCode(postalCode);
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
            return <TextInput id="4" placeholder="State" label="State *" {...field} error={error} />;
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
                  const country = watch('country');
                  if (country) {
                    changePostalCode(e.target.value);
                  }
                }}
              />
            );
          }}
        />
        <Button type="submit" width="100%">
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
