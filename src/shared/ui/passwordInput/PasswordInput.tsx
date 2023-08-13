import { FieldError } from 'react-hook-form';

import cn from 'classnames';

import { forwardRef, useState } from 'react';

import styles from './PasswordInput.module.scss';

import { EyeIcon, HiddenEyeIcon } from '../../../app/layouts/images';

export interface PasswordInputProps {
  id: string;
  name: string;
  placeholder?: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  error?: FieldError;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    { id, name, placeholder, label, value, defaultValue, error, ...otherProps }: PasswordInputProps,
    ref,
  ): JSX.Element => {
    const [inputType, setInputType] = useState('password');
    const inputStyle = cn(styles.input, {
      [styles.inputError]: error,
    });

    const handleShowPasswordBtn = (): void => {
      setInputType((prev) => (prev === 'text' ? 'password' : 'text'));
    };

    const icon = inputType === 'text' ? <HiddenEyeIcon /> : <EyeIcon />;

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
            ref={ref}
            {...otherProps}
          />
          <button className={styles.inputImgWrapper} onClick={handleShowPasswordBtn} type="button">
            {icon}
          </button>
        </div>
        {error && <span className={styles.errorMessage}>{error?.message && ` (${error.message})`}</span>}
      </label>
    );
  },
);

export { PasswordInput };
