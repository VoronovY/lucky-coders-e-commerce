import { FieldError } from 'react-hook-form';

import cn from 'classnames';

import styles from './TextInput.module.scss';

export interface ITextInputProps {
  id: string;
  name: string;
  placeholder: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  error?: FieldError;
}

export function TextInput({ id, name, placeholder, label, value, defaultValue, error }: ITextInputProps): JSX.Element {
  const inputStyle = cn(styles.input, {
    [styles.inputError]: error,
  });
  return (
    <label htmlFor={id} className={styles.label}>
      {label && <span>{label}</span>}
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        className={inputStyle}
        defaultValue={defaultValue}
        type="text"
      />
      {error && <span className={styles.errorMessage}>{error?.message && ` (${error.message})`}</span>}
    </label>
  );
}
