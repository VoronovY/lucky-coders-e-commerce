import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { ChangeEvent } from 'react';

import styles from './AddressFields.module.scss';

import Button from '../button/Button';
import { vailadtePostal } from '../../helpers/validationFunctions';
import { SelectInput, TextInput } from '..';
import countries from '../../constants/countries';

function FieldArray(): JSX.Element {
  const { control, watch, setError, clearErrors } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'address',
    shouldUnregister: true,
  });

  const addressLength = watch('address').length;
  const changePostal = (index: number, postal: string): void => {
    const { iso } = watch(`address.${index}.country`);
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
  };

  const handleAddBtn = (): void => {
    append({
      country: undefined,
      city: '',
      street: '',
      postal: '',
    });
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
            <div className={styles.btnConteiner}>
              <Button disabled={addressLength >= 2} type="button" width="40%" height="50px" onClick={handleAddBtn}>
                Add Address
              </Button>
              <Button
                disabled={addressLength <= 1}
                type="button"
                width="40%"
                height="50px"
                onClick={(): void => {
                  remove(index);
                }}
              >
                Delete Address
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default FieldArray;
