import { FieldError } from 'react-hook-form';
import { ChangeEvent, forwardRef } from 'react';

import cn from 'classnames';

import styles from './TextInput.module.scss';

export interface ITextInputProps {
  id: string;
  name: string | string[];
  placeholder: string;
  label?: string;
  defaultValue?: string;
  error?: FieldError;
  type?: 'text' | 'email' | 'number';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = forwardRef<HTMLInputElement, ITextInputProps>(
  (
    { id, name, placeholder, label, defaultValue, error, type = 'text', onChange, ...otherProps }: ITextInputProps,
    ref,
  ) => {
    const inputStyle = cn(styles.input, {
      [styles.inputError]: error,
    });
    return (
      <label htmlFor={id} className={styles.label}>
        {label && <span>{label}</span>}
        {onChange ? (
          <input
            ref={ref}
            id={id}
            placeholder={placeholder}
            className={inputStyle}
            defaultValue={defaultValue}
            type={type}
            {...otherProps}
            onChange={onChange}
          />
        ) : (
          <input
            ref={ref}
            id={id}
            placeholder={placeholder}
            className={inputStyle}
            defaultValue={defaultValue}
            type={type}
            {...otherProps}
          />
        )}

        {error && <span className={styles.errorMessage}>{error?.message && `${error.message}`}</span>}
      </label>
    );
  },
);

export { TextInput };
