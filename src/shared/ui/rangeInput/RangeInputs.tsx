import { Controller, useFormContext } from 'react-hook-form';

import styles from './RangeInputs.module.scss';

import { TextInput } from '../textInput/TextInput';

export interface RangeInputsProps {
  namePrefix: string;
}

function RangeInputs({ namePrefix }: RangeInputsProps): JSX.Element {
  const { control, trigger, setValue, watch } = useFormContext();

  return (
    <div className={styles.rangeWrapper}>
      <div className={styles.rangeInputWrapper}>
        <Controller
          name={`${namePrefix}.from`}
          control={control}
          render={({ field, fieldState: { error } }): JSX.Element => (
            <TextInput
              type="number"
              id={`${namePrefix}-range1`}
              placeholder="from"
              label="from"
              error={error}
              {...field}
              onChange={(e): void => {
                const { value } = e.target;
                const fieldName = `${namePrefix}.to`;
                field.onChange(e);
                if (!Number.isNaN(Number(value))) {
                  if (Number(watch(fieldName)) < Number(value)) setValue(fieldName, value);
                  trigger(fieldName);
                }
              }}
            />
          )}
        />
      </div>
      <div className={styles.rangeInputWrapper}>
        <Controller
          name={`${namePrefix}.to`}
          control={control}
          render={({ field, fieldState: { error } }): JSX.Element => (
            <TextInput
              type="number"
              id={`${namePrefix}-range2`}
              placeholder="to"
              label="to"
              error={error}
              {...field}
              onChange={(e): void => {
                const { value } = e.target;
                const fieldName = `${namePrefix}.from`;
                field.onChange(e);
                if (!Number.isNaN(Number(value))) {
                  if (Number(watch(fieldName)) > Number(value)) setValue(fieldName, Number(value));
                  trigger(fieldName);
                }
              }}
            />
          )}
        />
      </div>
    </div>
  );
}

export { RangeInputs };
