import Select, { OnChangeValue, Theme } from 'react-select';
import cn from 'classnames';

import { FieldError } from 'react-hook-form';

import styles from './Select.module.scss';

export type OptionInput = {
  value: string;
  label: string;
};

export interface SelectInputProps {
  id: string;
  placeholder: string;
  options?: OptionInput[];
  title?: string | null;
  value?: OptionInput | null;
  onChange?: (value: OnChangeValue<OptionInput, boolean>) => void;
  error?: FieldError | undefined;
}

function SelectInput({
  id,
  placeholder,
  options,
  title = null,
  value,
  onChange,
  error,
}: SelectInputProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      {title && <p>{title}</p>}
      <Select
        id={id}
        placeholder={placeholder}
        options={options}
        isClearable
        defaultValue={undefined}
        theme={(theme): Theme => ({
          ...theme,
          borderRadius: 8,
          colors: {
            ...theme.colors,
            primary25: 'neutral10',
            primary: 'black',
          },
        })}
        classNames={{
          control: (state): string => {
            return cn(state.isFocused && styles.select);
          },
        }}
        className={styles.select}
        value={value}
        onChange={onChange}
      />
      {error && <span className={styles.errorMessage}>{error?.message && `${error.message}`}</span>}
    </div>
  );
}

export { SelectInput };
