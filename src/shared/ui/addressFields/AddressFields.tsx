import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { ChangeEvent } from 'react';

import styles from './AddressFields.module.scss';

import AddressButtons from './AddressButtons';

import { vailadtePostal } from '../../helpers/validationFunctions';
import { SelectInput, TextInput } from '..';
import countries from '../../constants/countries';

import Checkbox from '../checkbox/CheckBox';
import { Address } from '../../types/types';

const nextAddresses = {
  isBillingAddress: false,
  isShippingAddress: false,
  country: undefined,
  city: '',
  street: '',
  postal: '',
};

function FieldArray(): JSX.Element {
  const { control, watch, setError, clearErrors, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'address',
    shouldUnregister: true,
  });

  const addressLength = watch('address').length;
  const changePostal = (index: number, postal: string): void => {
    const country = watch(`address.${index}.country`);
    if (country) {
      const { iso } = country;
      if (postal === '') return;
      vailadtePostal(postal, iso)
        .then(() => {
          clearErrors(`address.${index}.postal`);
        })
        .catch(() => {
          setError(`address.${index}.postal`, {
            type: 'manual',
            message: 'The entered postal code is not valid for the selected country.',
          });
        });
    }
  };

  const handleAddBtn = (): void => {
    append(nextAddresses);
  };

  const removeRestAddressBlocks = (currentFieldName: string, dependenseFieldName: string, index: number): void => {
    if (watch(`address.${index}.${currentFieldName}`) && watch(`address.${index}.${dependenseFieldName}`)) {
      watch('address').forEach((_: Address, idx: number) => (idx !== index ? remove(idx) : null));
    }
  };

  const clearRestCheckboxes = (currentFieldName: string, index: number): void => {
    if (watch(`address.${index}.${currentFieldName}`)) {
      watch('address').forEach((_: Address, idx: number) =>
        idx !== index ? setValue(`address.${idx}.${currentFieldName}`, false) : null,
      );
    }
  };

  return (
    <>
      {fields.map(({ id }, index: number): JSX.Element => {
        return (
          <div key={id} className={styles.addressWrapper}>
            <Controller
              name={`address.${index}.country`}
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => {
                return (
                  <SelectInput
                    id={`address.${index}.country`}
                    placeholder="Select Country"
                    title="Select Country *"
                    options={countries}
                    onChange={(selectedCountry): void => {
                      onChange(selectedCountry);
                      const postal = watch(`address.${index}.postal`);
                      changePostal(index, postal);
                    }}
                    value={value}
                    error={error}
                  />
                );
              }}
            />
            <Controller
              name={`address.${index}.city`}
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState: { error } }): JSX.Element => {
                return (
                  <TextInput id={`address.${index}.city`} placeholder="City" label="City *" {...field} error={error} />
                );
              }}
            />
            <Controller
              name={`address.${index}.street`}
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState: { error } }): JSX.Element => {
                return (
                  <TextInput
                    id={`address.${index}.street`}
                    placeholder="Street"
                    label="Street *"
                    {...field}
                    error={error}
                  />
                );
              }}
            />
            <Controller
              name={`address.${index}.postal`}
              control={control}
              rules={{
                required: true,
              }}
              render={({ field, fieldState: { error } }): JSX.Element => {
                return (
                  <TextInput
                    id={`address.${index}.postal`}
                    placeholder="Postal"
                    label="Postal *"
                    {...field}
                    error={error}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                      field.onChange(e.target.value);
                      const country = watch(`address.${index}.country`);
                      if (country) {
                        changePostal(index, e.target.value);
                      }
                    }}
                  />
                );
              }}
            />
            <div className={styles.address}>
              <Controller
                name={`address.${index}.isShippingAddress`}
                control={control}
                render={({ field: { onChange } }): JSX.Element => {
                  return (
                    <Checkbox
                      text="Default Shipping Address"
                      id={`address.${index}.isShippingAddress`}
                      checked={watch(`address.${index}.isShippingAddress`)}
                      onChange={(e): void => {
                        onChange(e);
                        removeRestAddressBlocks('isShippingAddress', 'isBillingAddress', index);
                        clearRestCheckboxes('isShippingAddress', index);
                      }}
                    />
                  );
                }}
              />
              <Controller
                name={`address.${index}.isBillingAddress`}
                control={control}
                render={({ field: { onChange } }): JSX.Element => {
                  return (
                    <Checkbox
                      text="Default Billing Address"
                      checked={watch(`address.${index}.isBillingAddress`)}
                      id={`address.${index}.isBillingAddress`}
                      onChange={(e): void => {
                        onChange(e);
                        removeRestAddressBlocks('isBillingAddress', 'isShippingAddress', index);
                        clearRestCheckboxes('isBillingAddress', index);
                      }}
                    />
                  );
                }}
              />
            </div>
            <AddressButtons
              firstBtnDisable={addressLength > 1}
              secondBtnDisable={addressLength <= 1}
              firstBtnText="Add Address"
              secondBtnText="Delete Address"
              handleFirstBtn={handleAddBtn}
              handleSecondBtn={(): void => remove(index)}
            />
          </div>
        );
      })}
    </>
  );
}

export default FieldArray;
