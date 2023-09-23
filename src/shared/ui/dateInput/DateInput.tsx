import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { FieldError } from 'react-hook-form';

import cn from 'classnames';

import styles from './DateInput.module.scss';

export interface DateInputProps {
  value: Date;
  id?: string;
  title?: string | null;
  onChange: (date: Date) => void;
  error?: FieldError;
}

function DateInput({ id, value, title = null, onChange, error }: DateInputProps): JSX.Element {
  const datePickerStyle = cn(styles.input, {
    [styles.inputError]: error,
  });
  return (
    <div className={styles.wrapper}>
      {title && <p className={styles.title}>{title}</p>}
      <DatePicker id={id} className={datePickerStyle} dateFormat="dd.MM.yyyy" selected={value} onChange={onChange} />
      {error && <span className={styles.errorMessage}>{error?.message && `${error.message}`}</span>}
    </div>
  );
}

export { DateInput };
