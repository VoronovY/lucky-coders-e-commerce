import { FieldError } from 'react-hook-form';

import cn from 'classnames';

import { useState } from 'react';

import styles from './PasswordInput.module.scss';

export interface PasswordInputProps {
  id: string;
  name: string;
  placeholder?: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  error?: FieldError;
}

export function PasswordInput({
  id,
  name,
  placeholder,
  label,
  value,
  defaultValue,
  error,
}: PasswordInputProps): JSX.Element {
  const [inputType, setInputType] = useState('text');
  const inputStyle = cn(styles.input, {
    [styles.inputError]: error,
  });

  const handleShowPasswordBtn = (): void => {
    setInputType((prev) => (prev === 'text' ? 'password' : 'text'));
  };

  return (
    <label htmlFor={id} className={styles.label}>
      {label && <span>{label}</span>}
      <div className={styles.wrapper}>
        <input
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          className={inputStyle}
          defaultValue={defaultValue}
          type={inputType}
        />
        <button className={styles.inputImgWrapper} onClick={handleShowPasswordBtn} type="button">
          icon
        </button>
      </div>
      {error && <span className={styles.errorMessage}>{error?.message && ` (${error.message})`}</span>}
    </label>
  );
}
